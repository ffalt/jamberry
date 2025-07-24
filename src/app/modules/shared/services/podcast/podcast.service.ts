import {EventEmitter, Injectable, inject} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {Poller} from '@app/utils/poller';
import {NotifyService} from '@core/services';
import {type Jam, JamService, PodcastStatus} from '@jam';
import {DialogsService} from '../dialogs/dialogs.service';

@Injectable()
export class PodcastService {
	podcastsChange = new EventEmitter<Array<Jam.Podcast>>();
	podcastChange = new Notifiers<Jam.Podcast>();
	episodeChange = new EventEmitter<string>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly dialogsService = inject(DialogsService);
	private podcasts: Array<Jam.Podcast> = [];
	private readonly episodePoll = new Poller<Jam.Episode>((episode, cb) => {
		this.jam.episode.status({id: episode.id})
			.then(data => {
				if (data.status === 'downloading') {
					cb(true);
				} else {
					episode.status = data.status;
					episode.error = data.error;
					this.episodeChange.emit(episode.id);
					cb(false);
				}
			})
			.catch(error => {
				console.error('error while polling episode download status', error);
			});
	});
	private readonly podcastPoll = new Poller<Jam.Podcast>((podcast, cb) => {
		this.jam.podcast.status({id: podcast.id})
			.then(data => {
				if (data.status === 'downloading') {
					cb(true);
				} else {
					podcast.status = data.status;
					podcast.error = data.error;
					podcast.lastCheck = data.lastCheck;
					this.refreshPodcast(podcast.id);
					cb(false);
				}
			})
			.catch(error => {
				console.error('error while polling podcast download status', error);
			});
	});

	removePodcast(podcast: Jam.Podcast): void {
		this.dialogsService.confirm('Remove Podcast', 'Do you want to remove the podcast?', () => {
			this.remove(podcast)
				.then(() => {
					this.notify.success('Podcast removed');
				})
				.catch(error => this.notify.error(error));
		});
	}

	async remove(podcast: Jam.Podcast): Promise<void> {
		await this.jam.podcast.remove({id: podcast.id});
		this.podcasts = this.podcasts.filter(pl => pl.id !== podcast.id);
		this.podcastsChange.emit(this.podcasts);
		this.podcastChange.emit(podcast.id);
	}

	checkPodcasts(): void {
		this.jam.podcast.refresh({})
			.then(() => {
				this.notify.success('Podcasts are updating');
				this.refresh();
			})
			.catch(error => this.notify.error(error));

	}

	checkPodcast(podcast: Jam.Podcast): void {
		this.jam.podcast.refresh({id: podcast.id})
			.then(() => {
				this.notify.success('Podcast is updating');
				this.refreshPodcast(podcast.id);
			})
			.catch(error => this.notify.error(error));

	}

	refreshPodcast(id: string): void {
		this.jam.podcast.id({
			id,
			podcastIncState: true,
			podcastIncEpisodes: true,
			episodeIncState: true,
			episodeIncTag: true,
			episodeIncMedia: true
		})
			.then(podcast => {
				const index = this.podcasts.findIndex(p => p.id === id);
				if (index === -1) {
					this.podcasts.push(podcast);
				} else {
					this.podcasts[index] = podcast;
				}
				this.podcastsChange.emit(this.podcasts);
				this.podcastChange.emit(id, podcast);
				if (podcast.status === PodcastStatus.downloading) {
					this.podcastPoll.poll(podcast);
				}
			})
			.catch(error => this.notify.error(error));

	}

	getTracks(id: string, cb: (episodes: Array<Jam.Episode>) => void): void {
		this.jam.podcast.id({id, podcastIncEpisodes: true, episodeIncState: true, episodeIncTag: true, episodeIncMedia: true})
			.then(podcast => {
				cb(podcast.episodes || []);
			})
			.catch(error => this.notify.error(error));

	}

	refresh(): void {
		this.jam.podcast.search({podcastIncState: true})
			.then(data => {
				this.podcasts = data.items;
				this.podcastsChange.emit(this.podcasts);
				for (const podcast of data.items) {
					if (podcast.status === PodcastStatus.downloading) {
						this.podcastPoll.poll(podcast);
					}
				}
			})
			.catch(error => this.notify.error(error));

	}

	retrieveEpisode(episode: Jam.Episode): void {
		this.jam.episode.retrieve({id: episode.id})
			.then(() => {
				episode.status = PodcastStatus.downloading;
				this.episodePoll.poll(episode);
			})
			.catch(error => this.notify.error(error));

	}
}
