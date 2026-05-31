import { Component, inject, input, type OnChanges } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService } from '@jam';
import type { Discogs } from '@modules/jam/model/discogs-rest-data';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { DiscogsIconComponent } from '@core/components/discogs-icon/discogs-icon.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

export interface DiscogsArtistMemberDisplay {
	name: string;
	active: boolean;
}

export interface DiscogsArtistDisplay {
	images: Array<string>;
	discogsUrl: string;
	name?: string;
	realName?: string;
	nameVariations?: string;
	profile?: string;
	urls: Array<string>;
	aliases: Array<string>;
	members: Array<DiscogsArtistMemberDisplay>;
}

@Component({
	selector: 'app-discogs-artist',
	templateUrl: './discogs-artist.component.html',
	styleUrls: ['./discogs-artist.component.scss'],
	imports: [BackgroundTextComponent, DiscogsIconComponent, LoadingComponent]
})
export class DiscogsArtistComponent implements OnChanges {
	readonly artist = input<string>();
	searchDone = false;
	hasResults = false;
	artistDisplay?: DiscogsArtistDisplay;
	isLoadingDetail = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		const query = this.artist()?.trim();
		if (!query) {
			return;
		}
		this.searchDone = false;
		this.hasResults = false;
		this.artistDisplay = undefined;
		this.jam.metadata.discogsArtistSearch({ query })
			.then(res => {
				const data = res.data as Discogs.SearchResponse | undefined;
				const id = data?.results.find(r => r.id)?.id;
				this.hasResults = !!id;
				this.searchDone = true;
				if (id) {
					this.loadArtistDetail(id).catch((error: unknown) => {
						this.notify.error(error);
					});
				}
			})
			.catch((error: unknown) => {
				this.searchDone = true;
				this.notify.error(error);
			});
	}

	private async loadArtistDetail(id: number): Promise<void> {
		this.isLoadingDetail = true;
		this.artistDisplay = undefined;
		try {
			const res = await this.jam.metadata.discogsArtistLookup({ id });
			const detail = res.data as Discogs.Artist | undefined;
			if (detail) {
				this.artistDisplay = this.buildDisplay(detail);
			}
		} catch (error: unknown) {
			this.notify.error(error);
		} finally {
			this.isLoadingDetail = false;
		}
	}

	private buildDisplay(detail: Discogs.Artist): DiscogsArtistDisplay {
		const unique = (arr?: Array<string>) => arr?.length ? [...new Set(arr)].join(', ') : undefined;
		const stripProfile = (profile?: string) => profile
			?.replaceAll(/\[url=[^\]]*]([^[]*)\[\/url]/g, '$1')
			.replaceAll(/\[[a-z]=?\d+]/g, '')
			.trim();
		const discogsUrl = detail.uri.startsWith('http') ? detail.uri : `https://www.discogs.com${detail.uri}`;
		return {
			images: (detail.images ?? []).map(i => this.jam.metadata.discogsImageUrl({ url: i.uri150 })),
			discogsUrl,
			name: detail.name,
			realName: detail.real_name,
			nameVariations: unique(detail.namevariations),
			profile: stripProfile(detail.profile),
			urls: detail.urls ?? [],
			aliases: (detail.aliases ?? []).map(a => a.name),
			members: (detail.members ?? []).map(m => ({ name: m.name, active: m.active }))
		};
	}
}
