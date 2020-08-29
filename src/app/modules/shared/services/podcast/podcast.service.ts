import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Notifiers} from '@app/utils/notifier';
import {Poller} from '@app/utils/poller';
import {NotifyService} from '@core/services';
import {Jam, JamService, PodcastStatus} from '@jam';
import {take} from 'rxjs/operators';
import {DialogsService} from '../dialogs/dialogs.service';

export interface GpodderResult {
	logo_url: string;
	scaled_logo_url: string;
	title: string;
	mygpo_link: string;
	url: string;
	description: string;
	subscribers: number;
	subscribers_last_week: number;
	website: string;
}

@Injectable()
export class PodcastService {
	podcastsChange = new EventEmitter<Array<Jam.Podcast>>();
	podcastChange = new Notifiers<Jam.Podcast>();
	episodeChange = new EventEmitter<string>();
	private podcasts: Array<Jam.Podcast> = [];
	private episodePoll = new Poller<Jam.Episode>((episode, cb) => {
		this.jam.episode.status({id: episode.id})
			.then(data => {
				if (data.status !== 'downloading') {
					episode.status = data.status;
					episode.error = data.error;
					this.episodeChange.emit(episode.id);
					cb(false);
				} else {
					cb(true);
				}
			})
			.catch(err => {
				console.error('error while polling episode download status', err);
			});
	});
	private podcastPoll = new Poller<Jam.Podcast>((podcast, cb) => {
		this.jam.podcast.status({id: podcast.id})
			.then(data => {
				if (data.status !== 'downloading') {
					podcast.status = data.status;
					podcast.error = data.error;
					podcast.lastCheck = data.lastCheck;
					this.refreshPodcast(podcast.id);
					cb(false);
				} else {
					cb(true);
				}
			})
			.catch(err => {
				console.error('error while polling podcast download status', err);
			});
	});

	constructor(private jam: JamService, private http: HttpClient, private notify: NotifyService, private dialogsService: DialogsService) {
	}

	searchPodcast(query: string, cb: (data: Array<GpodderResult>) => void, onError: (error: Error) => void): void {
		const url = `https://gpodder.net/search.json?q=${query}`;
		this.http.get<Array<GpodderResult>>(url)
			.pipe(take(1))
			.subscribe(
				(data: Array<GpodderResult>) => {
					for (const result of data) {
						if (result.logo_url && result.logo_url.toLowerCase().startsWith('http:')) {
							result.logo_url = 'https:' + result.logo_url.slice(5);
						}
					}
					cb(data);
				},
				err => {
					if (err.status === 0) {
						this.notify.error({error: 'Could not reach server https://gpodder.net'});
						onError(err);
						return;
					}
					onError(err);
					this.notify.error(err);
				}
			);
	}

	removePodcast(podcast: Jam.Podcast): void {
		this.dialogsService.confirm('Remove Podcast', 'Do you want to remove the podcast?', () => {
			this.remove(podcast)
				.then(() => {
					this.notify.success('Podcast removed');
				})
				.catch(e => {
					this.notify.error(e);
				});
		});
	}

	async remove(podcast: Jam.Podcast): Promise<void> {
		await this.jam.podcast.remove({id: podcast.id});
		this.podcasts = this.podcasts.filter(pl => pl.id !== podcast.id);
		this.podcastsChange.emit(this.podcasts);
		this.podcastChange.emit(podcast.id, undefined);
	}

	checkPodcasts(): void {
		this.jam.podcast.refresh({})
			.then(() => {
				this.notify.success('Podcasts are updating');
				this.refresh();
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	checkPodcast(podcast: Jam.Podcast): void {
		this.jam.podcast.refresh({id: podcast.id})
			.then(() => {
				this.notify.success('Podcast is updating');
				this.refreshPodcast(podcast.id);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refreshPodcast(id: string): void {
		this.jam.podcast.id({id, podcastIncState: true, podcastIncEpisodes: true, episodeIncState: true, episodeIncTag: true, episodeIncMedia: true})
			.then(podcast => {
				const index = this.podcasts.findIndex(p => p.id === id);
				if (index < 0) {
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
			.catch(e => {
				this.notify.error(e);
			});
	}

	getTracks(id: string, cb: (episodes: Array<Jam.Episode>) => void): void {
		this.jam.podcast.id({id, podcastIncEpisodes: true, episodeIncState: true, episodeIncTag: true, episodeIncMedia: true})
			.then(podcast => {
				cb(podcast.episodes || []);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.jam.podcast.search({podcastIncState: true})
			.then(data => {
				this.podcasts = data.items;
				this.podcastsChange.emit(this.podcasts);
				data.items.forEach(podcast => {
					if (podcast.status === PodcastStatus.downloading) {
						this.podcastPoll.poll(podcast);
					}
				});
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	retrieveEpisode(episode: Jam.Episode): void {
		this.jam.episode.retrieve({id: episode.id})
			.then(() => {
				episode.status = PodcastStatus.downloading;
				this.episodePoll.poll(episode);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}
}
