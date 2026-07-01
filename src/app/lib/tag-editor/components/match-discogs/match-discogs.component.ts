import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Discogs } from '@modules/jam/model/discogs-rest-data';
import { type Jam, type JamParameters, JamService } from '@jam';
import { NotifyService } from '@core/services/notify/notify.service';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { IconDiscogsComponent } from '@core/components/icons/icon-discogs.component';
import type { ReleaseMatching } from '../match-release/match-release.component';
import type { MediaTagRawFramesAccess } from '../../model/tag-editor.utils';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';

function buildDiscogsTag(
	existing: Jam.MediaTagRaw | undefined,
	artistID: number | undefined,
	releaseID: number,
	masterID: number | undefined,
	labelID: number | undefined
): Jam.MediaTagRaw {
	const DISCOGS_ID_KEYS = new Set(['DISCOGS_ARTIST_ID', 'DISCOGS_RELEASE_ID', 'DISCOGS_MASTER_ID', 'DISCOGS_LABEL_ID']);
	const frames = existing ? (structuredClone(existing.frames) as MediaTagRawFramesAccess) : ({} as MediaTagRawFramesAccess);
	const txxx = ((frames.TXXX ?? []) as Array<Jam.MediaTagRawFrameIdText>)
		.filter(f => !DISCOGS_ID_KEYS.has(f.value.id));
	if (artistID !== undefined) {
		txxx.push({ id: 'TXXX', value: { id: 'DISCOGS_ARTIST_ID', text: String(artistID) } });
	}
	txxx.push({ id: 'TXXX', value: { id: 'DISCOGS_RELEASE_ID', text: String(releaseID) } });
	if (masterID !== undefined) {
		txxx.push({ id: 'TXXX', value: { id: 'DISCOGS_MASTER_ID', text: String(masterID) } });
	}
	if (labelID !== undefined) {
		txxx.push({ id: 'TXXX', value: { id: 'DISCOGS_LABEL_ID', text: String(labelID) } });
	}
	frames.TXXX = txxx;
	return { version: existing?.version ?? 4, frames };
}

@Component({
	selector: 'app-match-discogs',
	templateUrl: './match-discogs.component.html',
	styleUrls: ['./match-discogs.component.scss'],
	imports: [IconDiscogsComponent, FormsModule, IconSpinComponent, LoadingComponent]
})
export class MatchDiscogsComponent {
	readonly data = input<ReleaseMatching>();
	searchArtist = '';
	searchTitle = '';
	readonly results = signal<Array<Discogs.SearchResult>>([]);
	selected?: Discogs.SearchResult;
	readonly isSearching = signal(false);
	readonly isApplying = signal(false);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			const data = this.data();
			if (!data) {
				return;
			}
			const first = data.matchings[0]?.track?.tag;
			this.searchArtist = first?.artist ?? '';
			this.searchTitle = first?.title ?? data.folder.name;
			this.search();
		});
	}

	search(): void {
		if (!this.searchTitle && !this.searchArtist) {
			return;
		}
		this.isSearching.set(true);
		this.selected = undefined;
		this.results.set([]);
		const q: JamParameters.DiscogsSearchParameters = {};
		if (this.searchArtist) {
			q.artist = this.searchArtist;
		}
		if (this.searchTitle) {
			q.title = this.searchTitle;
		}
		this.jam.metadata.discogsReleaseSearch(q)
			.then(response => {
				const res = response.data as Discogs.SearchResponse;
				this.results.set(res.results);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			})
			.finally(() => {
				this.isSearching.set(false);
			});
	}

	resultMeta(result: Discogs.SearchResult): string {
		return [result.year, result.label?.[0], result.format?.[0]].filter(Boolean).join(' · ');
	}

	imageUrl(url: string): string {
		return this.jam.metadata.discogsImageUrl({ url });
	}

	async apply(): Promise<void> {
		if (!this.selected) {
			return;
		}
		const data = this.data();
		if (!data) {
			return;
		}
		this.isApplying.set(true);
		try {
			const response = await this.jam.metadata.discogsReleaseLookup({ id: this.selected.id });
			const release = response.data as Discogs.Release;
			const artistID = release.artists?.[0]?.id;
			const releaseID = release.id;
			const masterID = release.master_id;
			const labelID = release.labels?.[0]?.id;
			for (const m of data.matchings) {
				m.rawTag = buildDiscogsTag(m.track.tagRaw, artistID, releaseID, masterID, labelID);
			}
			data.apply();
			data.close?.();
		} catch (error: unknown) {
			this.notify.error(error);
		} finally {
			this.isApplying.set(false);
		}
	}
}
