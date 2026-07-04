import { Component, effect, inject, input, signal } from '@angular/core';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService, type MusicBrainz, MusicBrainzLookupType, MusicBrainzSearchType } from '@jam';
import { MbRelationsComponent } from '../mb-relations/mb-relations.component';
import { MbArtistCreditsPipe } from '@core/pipes/mb-artist-credits.pipe';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { IconMusicbrainzComponent } from '@core/components/icons/icon-musicbrainz.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

export interface MBAlbumInfo {
	name: string;
	value: string;
}

export interface MBAlbumInfoGroup {
	infos: Array<MBAlbumInfo>;
	name: string;
}

@Component({
	selector: 'app-mb-album',
	templateUrl: './mb-album.component.html',
	styleUrls: ['./mb-album.component.scss'],
	imports: [MbRelationsComponent, MbArtistCreditsPipe, MediadurationPipe, IconMusicbrainzComponent, BackgroundTextComponent, LoadingComponent]
})
export class MbAlbumComponent {
	readonly mbAlbumID = input<string>();
	readonly artist = input<string>();
	readonly title = input<string>();
	readonly mbAlbum = signal<MusicBrainz.Release | undefined>(undefined);
	readonly infoGroups = signal<Array<MBAlbumInfoGroup>>([]);
	readonly loading = signal(false);
	readonly searchDone = signal(false);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			this.refresh();
		});
	}

	refresh(): void {
		const mbAlbumID = this.mbAlbumID();
		this.mbAlbum.set(undefined);
		this.infoGroups.set([]);
		this.searchDone.set(false);
		if (mbAlbumID) {
			this.lookup(mbAlbumID);
			return;
		}
		this.searchByName();
	}

	display(mbAlbum: MusicBrainz.Release): void {
		let tags = mbAlbum.tags ?? [];
		if (tags.length === 0) {
			tags = mbAlbum.releaseGroup.tags ?? [];
		}
		const group: MBAlbumInfoGroup = {
			name: 'Release information',
			infos: [
				{ name: 'Title', value: mbAlbum.title },
				{ name: 'Artist', value: this.compactArtist(mbAlbum.artistCredit) },
				{ name: 'Disambiguation', value: mbAlbum.disambiguation },
				{ name: 'Date', value: mbAlbum.date },
				{ name: 'First Release Date', value: mbAlbum.releaseGroup.firstReleaseDate },
				{ name: 'Country', value: mbAlbum.country },
				{ name: 'Tags', value: tags.map(tag => tag.name).join(' / ') },
				{ name: 'Album Type', value: [mbAlbum.releaseGroup.primaryType, ...(mbAlbum.releaseGroup.secondaryTypes ?? [])].join(' / ') },
				{ name: 'Status', value: mbAlbum.status },
				{ name: 'Packaging', value: mbAlbum.packaging },
				{ name: 'Release ID', value: mbAlbum.id },
				{ name: 'Release Group ID', value: mbAlbum.releaseGroup.id },
				{ name: 'Barcode', value: mbAlbum.barcode },
				{ name: 'ASIN', value: mbAlbum.asin },
				{ name: 'Data Quality', value: mbAlbum.quality }
			].filter(item => !!item.value) as Array<MBAlbumInfo>
		};
		this.mbAlbum.set(mbAlbum);
		this.infoGroups.set([group]);
	}

	compactArtist(artistCredit?: Array<MusicBrainz.ArtistCredit>): string {
		if (!artistCredit?.length) {
			return '';
		}
		return artistCredit.map(a => a.name + (a.joinphrase || ' ')).join('').trim();
	}

	private searchByName(): void {
		const artist = this.artist();
		const title = this.title();
		if (!artist || !title) {
			return;
		}
		this.loading.set(true);
		this.jam.metadata.musicbrainzSearch({ type: MusicBrainzSearchType.release, artist, release: title })
			.then(res => {
				const data = res.data as MusicBrainz.Response;
				const mbID = data.releases?.[0]?.id;
				if (mbID) {
					this.lookup(mbID);
				} else {
					this.loading.set(false);
					this.searchDone.set(true);
				}
			})
			.catch((error: unknown) => {
				this.loading.set(false);
				this.searchDone.set(true);
				this.notify.error(error);
			});
	}

	private lookup(mbAlbumID: string): void {
		this.loading.set(true);
		this.jam.metadata.musicbrainzLookup({ type: MusicBrainzLookupType.release, mbID: mbAlbumID })
			.then(res => {
				const data = res.data as MusicBrainz.Response;
				this.display(data.release!);
				this.loading.set(false);
				this.searchDone.set(true);
			})
			.catch((error: unknown) => {
				this.loading.set(false);
				this.searchDone.set(true);
				this.notify.error(error);
			});
	}
}
