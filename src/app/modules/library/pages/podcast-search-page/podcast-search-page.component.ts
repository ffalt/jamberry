import {Component} from '@angular/core';
import {AppService, NavigService, NotifyService} from '@core/services';
import {JamService} from '@jam';
import {GpodderResult, PodcastService} from '@shared/services';

export interface PodcastSearchResult {
	url: URL;
	result: GpodderResult;
}

export interface PodcastSearch {
	name: string;
	logoUrl: string;
	description: string;
	selected?: PodcastSearchResult;
	pods: Array<PodcastSearchResult>;
}

@Component({
	selector: 'app-page-podcast-search',
	templateUrl: './podcast-search-page.component.html',
	styleUrls: ['./podcast-search-page.component.scss']
})
export class PodcastSearchPageComponent {
	podcasts: Array<PodcastSearch>;
	searchValue: string = '';
	searching: number = 0;

	// TODO: PodcastService is in parent module not in core or shared, it works but see docs if this is valid (probably not)
	constructor(
		public app: AppService,
		public jam: JamService,
		public navig: NavigService,
		public notify: NotifyService,
		private podcastService: PodcastService
	) {
		this.searchValue = '';
	}

	subscribe(pod: PodcastSearchResult): void {
		this.jam.podcast.create({url: pod.url.toString()})
			.then(() => {
				this.notify.success('Podcast subscribed');
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	search(name: string): void {
		this.podcasts = undefined;
		if (name && name.length > 0) {
			this.searching++;
			this.podcastService.searchPodcast(name, data => {
				this.searching--;
				this.buildSearchResults(data);
			});
		}
	}

	private buildSearchResults(data: Array<GpodderResult>): void {
		const collect: {
			[name: string]: PodcastSearch;
		} = {};
		data.forEach(result => {
			const url = new URL(result.url);
			if (url.hostname.includes('feedburner.com')) {
				return;
			}
			let podcast = collect[result.title];
			if (!podcast) {
				podcast = {
					name: result.title,
					logoUrl: result.logo_url,
					description: result.description,
					pods: []
				};
				collect[result.title] = podcast;
			}
			if (!podcast.description || podcast.description.length === 0) {
				podcast.description = result.description;
			}
			if (!podcast.logoUrl || podcast.logoUrl.length === 0) {
				podcast.logoUrl = result.logo_url;
			}
			podcast.pods.push({result, url});
		});
		this.podcasts = Object.keys(collect).map(key => {
			const pod = collect[key];
			pod.selected = pod.pods.find(p => p.url.pathname.includes('mp3'));
			if (!pod.selected) {
				pod.selected = pod.pods[0];
			}
			return pod;
		});
	}

}
