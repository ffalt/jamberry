import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Jam, JamService } from '@jam';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';
import { AppService } from '@core/services/app/app.service';
import { NavigService } from '@core/services/navig/navig.service';
import { NotifyService } from '@core/services/notify/notify.service';
import PodcastDiscover = Jam.PodcastDiscover;
import { IconListAddComponent } from '@core/components/icons/icon-list-add.component';
import { IconPodcastComponent } from '@core/components/icons/icon-podcast.component';
import { IconSearchComponent } from '@core/components/icons/icon-search.component';

export interface PodcastSearchResult {
	url: URL;
	displayURL: string;
	result: PodcastDiscover;
}

export interface PodcastSearch {
	name: string;
	logoUrl?: string;
	description?: string;
	selected?: PodcastSearchResult;
	pods: Array<PodcastSearchResult>;
}

@Component({
	selector: 'app-page-podcast-search',
	templateUrl: './podcast-search-page.component.html',
	styleUrls: ['./podcast-search-page.component.scss'],
	imports: [FormsModule, HeaderIconSectionComponent, IconListAddComponent, IconSearchComponent, LoadingComponent]
})
export class PodcastSearchPageComponent {
	readonly headerIcon = IconPodcastComponent;
	readonly app = inject(AppService);
	readonly jam = inject(JamService);
	readonly navig = inject(NavigService);
	readonly podcasts = signal<Array<PodcastSearch> | undefined>(undefined);
	readonly isSearching = signal(false);
	searchValue: string = '';
	notify = inject(NotifyService);

	subscribe(pod?: PodcastSearchResult): void {
		if (!pod) {
			return;
		}
		this.jam.podcast.create({ url: pod.url.href })
			.then(() => {
				this.notify.success('Podcast subscribed');
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	search(query: string): void {
		this.podcasts.set(undefined);
		if (!query || query.length === 0) {
			return;
		}
		this.isSearching.set(true);
		this.jam.podcast.discover({ query })
			.then(data => {
				if (this.searchValue !== query) {
					return;
				}
				this.buildSearchResults(data);
				this.isSearching.set(false);
			})
			.catch((error: unknown) => {
				this.isSearching.set(false);
				this.notify.error(error);
			});
	}

	private buildSearchResults(data: Array<PodcastDiscover>): void {
		const collect: Record<string, PodcastSearch | undefined> = {};
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
			if (podcast.description?.length === 0) {
				podcast.description = result.description;
			}
			if (podcast.logoUrl?.length === 0) {
				podcast.logoUrl = result.scaled_logo_url;
			}
			if (podcast.pods.every(p => p.url.href !== url.href)) {
				podcast.pods.push({ result, url, displayURL: url.href });
			}
		}
		const podcasts: Array<PodcastSearch> =
			Object.values(collect)
				.map(pod => {
					pod!.selected = pod!.pods.find(p => p.url.pathname.includes('mp3'));
					pod!.selected ??= pod!.pods[0];
					return pod!;
				});
		this.podcasts.set(podcasts);
	}
}
