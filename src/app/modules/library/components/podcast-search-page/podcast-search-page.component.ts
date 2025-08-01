import {Component, inject} from '@angular/core';
import {AppService, NavigService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import PodcastDiscover = Jam.PodcastDiscover;

export interface PodcastSearchResult {
	url: URL;
	displayURL: string;
	result: PodcastDiscover;
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
	styleUrls: ['./podcast-search-page.component.scss'],
	standalone: false
})
export class PodcastSearchPageComponent {
	podcasts?: Array<PodcastSearch>;
	searchValue: string = '';
	isSearching: boolean = false;
	readonly app = inject(AppService);
	readonly jam = inject(JamService);
	readonly navig = inject(NavigService);
	notify = inject(NotifyService);

	subscribe(pod?: PodcastSearchResult): void {
		if (!pod) {
			return;
		}
		this.jam.podcast.create({url: pod.url.toString()})
			.then(() => {
				this.notify.success('Podcast subscribed');
			})
			.catch(error => this.notify.error(error));
	}

	search(query: string): void {
		this.podcasts = undefined;
		if (query && query.length > 0) {
			this.isSearching = true;
			this.jam.podcast.discover({query})
				.then(data => {
					if (this.searchValue === query) {
						this.buildSearchResults(data);
						this.isSearching = false;
					}
				}).catch(error => {
				this.isSearching = false;
				this.notify.error(error);
			});
		}
	}

	private buildSearchResults(data: Array<PodcastDiscover>): void {
		const collect: {
			[name: string]: PodcastSearch;
		} = {};
		for (const result of data) {
			const url = new URL(result.url);
			const allowedHosts = ['feedburner.com', 'www.feedburner.com'];
			if (!allowedHosts.includes(url.hostname)) {
				return;
			}
			let podcast = collect[result.title];
			if (!podcast) {
				podcast = {
					name: result.title,
					logoUrl: result.scaled_logo_url,
					description: result.description,
					pods: []
				};
				collect[result.title] = podcast;
			}
			if (!podcast.description || podcast.description.length === 0) {
				podcast.description = result.description;
			}
			if (!podcast.logoUrl || podcast.logoUrl.length === 0) {
				podcast.logoUrl = result.scaled_logo_url;
			}
			if (!podcast.pods.some(p => p.url.toString() === url.toString())) {
				podcast.pods.push({result, url, displayURL: url.toString()});
			}
		}
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
