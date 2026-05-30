import { Component, inject, input, type OnChanges } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService } from '@jam';
import type { Discogs } from '@modules/jam/model/discogs-rest-data';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

export interface DiscogsReleaseInfo {
	name: string;
	value: string;
}

export interface DiscogsReleaseEntry {
	id: number;
	uri: string;
	title: string;
	infos: Array<DiscogsReleaseInfo>;
}

@Component({
	selector: 'app-discogs-album',
	templateUrl: './discogs-album.component.html',
	styleUrls: ['./discogs-album.component.scss'],
	imports: [BackgroundTextComponent, LoadingComponent]
})
export class DiscogsAlbumComponent implements OnChanges {
	readonly artist = input<string>();
	readonly title = input<string>();
	releases?: Array<DiscogsReleaseEntry>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnChanges(): void {
		this.refresh();
	}

	refresh(): void {
		const artist = this.artist();
		const title = this.title();
		if (!artist || !title) {
			return;
		}
		this.releases = undefined;
		this.jam.metadata.discogsReleaseSearch({ artist, title })
			.then(res => {
				const data = res.data as Discogs.SearchResponse | undefined;
				this.releases = (data?.results ?? []).map(r => this.toEntry(r));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	private toEntry(result: Discogs.SearchResult): DiscogsReleaseEntry {
		const infos: Array<DiscogsReleaseInfo | null> = [
			result.year ? { name: 'Year', value: result.year } : null,
			result.country ? { name: 'Country', value: result.country } : null,
			result.label?.length ? { name: 'Label', value: result.label.join(', ') } : null,
			result.catno ? { name: 'Catalog Number', value: result.catno } : null,
			result.format?.length ? { name: 'Format', value: result.format.join(', ') } : null,
			result.genres?.length ? { name: 'Genres', value: result.genres.join(', ') } : null,
			result.styles?.length ? { name: 'Styles', value: result.styles.join(', ') } : null,
			result.barcode?.length ? { name: 'Barcode', value: result.barcode.join(', ') } : null,
			result.community ? { name: 'Want / Have', value: `${result.community.want} / ${result.community.have}` } : null
		];
		return {
			id: result.id,
			uri: result.uri,
			title: result.title,
			infos: infos.filter((i): i is DiscogsReleaseInfo => i !== null)
		};
	}
}
