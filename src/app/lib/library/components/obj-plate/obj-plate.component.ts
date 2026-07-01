import type { FocusableOption } from '@angular/cdk/a11y';
import { Component, computed, effect, input, signal, viewChild } from '@angular/core';
import { JamObjectType } from '@jam';
import type { JamLibraryObject } from '../../model/objects';
import { AlbumListComponent } from '../album-list/album-list.component';
import { EpisodeListComponent } from '../episode-list/episode-list.component';
import { MediaListComponent } from '../media-list/media-list.component';
import { TrackListComponent } from '../track-list/track-list.component';
import { MediaPlateComponent } from '@core/components/media-plate/media-plate.component';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-obj-plate',
	templateUrl: './obj-plate.component.html',
	host: {
		'[tabindex]': 'tabindex'
	},
	imports: [AlbumListComponent, EpisodeListComponent, TrackListComponent, MediaListComponent, MediaPlateComponent, LoadingComponent]
})
export class ObjPlateComponent implements FocusableOption {
	readonly obj = input<JamLibraryObject>();
	readonly showParent = input<boolean>(false);
	readonly loading = signal(false);
	readonly expanded = signal(false);
	readonly hasTracks = computed(() => this.obj()?.childrenTypes?.includes(JamObjectType.track));
	readonly hasAlbums = computed(() => this.obj()?.childrenTypes?.includes(JamObjectType.album));
	readonly hasEpisodes = computed(() => this.obj()?.childrenTypes?.includes(JamObjectType.episode));
	readonly hasMedia = computed(() => this.obj()?.childrenTypes?.includes('media'));
	tabindex = -1;
	protected readonly plate = viewChild(MediaPlateComponent);

	constructor() {
		effect(() => {
			this.obj();
			this.expanded.set(false);
			this.check();
		});
	}

	focus() {
		this.plate()?.focus();
	}

	check(): void {
		const obj = this.obj();
		const hasResult = obj?.tracks ?? obj?.albums ?? obj?.episodes ?? obj?.media;
		this.loading.set(!obj || !hasResult);
	}

	toggleExpansion(): void {
		const obj = this.obj();
		if (!obj?.childrenTypes || obj.childrenTypes.length === 0) {
			return;
		}
		this.expanded.set(!this.expanded());
		if (this.expanded()) {
			obj.loadChildren()
				.then(() => {
					this.check();
				})
				.catch((error: unknown) => {
					console.error(error);
				});
		}
	}
}
