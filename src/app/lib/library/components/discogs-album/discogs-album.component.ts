import { Component, inject, input, type OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService } from '@jam';
import type { Discogs } from '@modules/jam/model/discogs-rest-data';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { IconDiscogsComponent } from '@core/components/icons/icon-discogs.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

export interface DiscogsTrackDisplay {
	position: string;
	title: string;
	duration: string;
	isHeading: boolean;
}

export interface DiscogsVideoDisplay {
	url: string;
	title: string;
}

export interface DiscogsReleaseDisplay {
	images: Array<string>;
	discogsUrl: string;
	title?: string;
	artist?: string;
	year?: string;
	genres?: string;
	styles?: string;
	notes?: string;
	tracklist: Array<DiscogsTrackDisplay>;
	videos: Array<DiscogsVideoDisplay>;
}

@Component({
	selector: 'app-discogs-album',
	templateUrl: './discogs-album.component.html',
	styleUrls: ['./discogs-album.component.scss'],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [BackgroundTextComponent, IconDiscogsComponent, LoadingComponent]
})
export class DiscogsAlbumComponent implements OnChanges {
	readonly artist = input<string>();
	readonly title = input<string>();
	searchDone = false;
	hasResults = false;
	releaseDisplay?: DiscogsReleaseDisplay;
	isLoadingDetail = false;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		const artist = this.sanitize(this.artist() ?? '');
		const title = this.sanitize(this.title() ?? '');
		if (!artist || !title) {
			return;
		}
		this.searchDone = false;
		this.hasResults = false;
		this.releaseDisplay = undefined;
		this.jam.metadata.discogsReleaseSearch({ artist, title })
			.then(res => {
				const data = res.data as Discogs.SearchResponse | undefined;
				const masterId = data?.results.find(r => r.master_id)?.master_id;
				this.hasResults = !!masterId;
				this.searchDone = true;
				if (masterId) {
					this.loadReleaseDetail(masterId).catch((error: unknown) => {
						this.notify.error(error);
					});
				}
			})
			.catch((error: unknown) => {
				this.searchDone = true;
				this.notify.error(error);
			});
	}

	private async loadReleaseDetail(id: number): Promise<void> {
		this.isLoadingDetail = true;
		this.releaseDisplay = undefined;
		try {
			const res = await this.jam.metadata.discogsMasterLookup({ id });
			const detail = res.data as Discogs.Master | undefined;
			if (detail) {
				this.releaseDisplay = this.buildDisplay(detail);
			}
		} catch (error: unknown) {
			this.notify.error(error);
		} finally {
			this.isLoadingDetail = false;
		}
	}

	private sanitize(text: string): string {
		return text
			// parenthetical edition/version markers
			.replaceAll(/\s*\((?:super\s+)?(?:deluxe|special|limited|expanded|anniversary|collector'?s?|remastered?|reissue|bonus|explicit|clean|radio\s+edit|live|acoustic|stereo|mono|promo(?:tional)?|import)[^)]*\)/gi, '')
			// parenthetical format/media markers
			.replaceAll(/\s*\((?:ep|lp|single|maxi|original\s+soundtrack|ost|hi[\s-]?res|flac|digital|vinyl|cassette)[^)]*\)/gi, '')
			// parenthetical year + remaster, e.g. "(2018 Remaster)"
			.replaceAll(/\s*\(\d{4}\s+remastered?\)/gi, '')
			// parenthetical anniversary, e.g. "(25th Anniversary Edition)"
			.replaceAll(/\s*\(\d+(?:st|nd|rd|th)\s+anniversary[^)]*\)/gi, '')
			// parenthetical disc/cd/volume/part numbers, e.g. "(Disc 1)", "(CD2)", "(Vol. 1)", "(Pt. 2)"
			.replaceAll(/\s*\((?:disc|cd|volume|vol\.?|part|pt\.?)\s*\d+\)/gi, '')
			// parenthetical featuring, e.g. "(feat. Artist)", "(ft. Someone)"
			.replaceAll(/\s*\((?:feat(?:uring)?\.?|ft\.?)\s+[^)]+\)/gi, '')
			// square bracket markers, e.g. "[Deluxe Edition]", "[Remastered]", "[Explicit]"
			.replaceAll(/\s*\[(?:deluxe|special|limited|expanded|remastered?|reissue|bonus|explicit|clean|live|acoustic|ep|lp|single|feat(?:uring)?\.?|ft\.?)[^\]]*]/gi, '')
			// trailing dash + format, e.g. "- EP", "- Single", "- CD1"
			.replaceAll(/\s*[-–—]\s*(?:ep|lp|single|maxi|cd\d*|promo)\s*$/gi, '')
			// bare trailing format word, e.g. "And So Is Love CD", "Title EP"
			.replaceAll(/\s+(?:cd\d*|ep|lp|single|maxi|promo)\s*$/gi, '')
			.trim()
			.replaceAll(/\s+/g, ' ');
	}

	private buildDisplay(detail: Discogs.Master): DiscogsReleaseDisplay {
		const unique = (arr?: Array<string>) => arr?.length ? [...new Set(arr)].join(', ') : undefined;
		const uniqueNames = (arr?: Array<{ name: string }>) => arr?.length ? [...new Set(arr.map(i => i.name))].join(', ') : undefined;
		const stripNotes = (notes?: string) => notes
			?.replaceAll(/\[url=[^\]]*]([^[]*)\[\/url]/g, '$1')
			.replaceAll(/\[[a-z]=?\d+]/g, '')
			.trim();
		const discogsUrl = detail.uri.startsWith('http') ? detail.uri : `https://www.discogs.com${detail.uri}`;
		return {
			images: (detail.images ?? []).map(i => this.jam.metadata.discogsImageUrl({ url: i.uri150 })),
			discogsUrl,
			title: detail.title,
			artist: uniqueNames(detail.artists),
			year: detail.year ? String(detail.year) : undefined,
			genres: unique(detail.genres),
			styles: unique(detail.styles),
			notes: stripNotes(detail.notes),
			tracklist: (detail.tracklist ?? []).map(t => ({
				position: t.position,
				title: t.title,
				duration: t.duration,
				isHeading: t.type_ === 'heading'
			})),
			videos: (detail.videos ?? []).map(v => ({ url: v.uri, title: v.title }))
		};
	}
}
