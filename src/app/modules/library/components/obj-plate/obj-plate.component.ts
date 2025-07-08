import {FocusableOption} from '@angular/cdk/a11y';
import {Component, OnChanges, viewChild, input} from '@angular/core';
import {JamObjectType} from '@jam';
import {JamLibraryObject} from '@library/model/objects';
import {MediaPlateComponent} from '@shared/components';

@Component({
	selector: 'app-obj-plate',
	templateUrl: './obj-plate.component.html',
	styleUrls: ['./obj-plate.component.scss'],
	standalone: false,
	host: {
		tabindex: 'tabindex'
	}
})
export class ObjPlateComponent implements OnChanges, FocusableOption {
	readonly obj = input<JamLibraryObject>();
	readonly showParent = input<boolean>(false);
	tabindex = -1;
	loading: boolean = false;
	expanded: boolean = false;
	hasTracks?: boolean = false;
	hasAlbums?: boolean = false;
	hasEpisodes?: boolean = false;
	hasMedia?: boolean = false;
	protected readonly plate = viewChild(MediaPlateComponent);

	ngOnChanges(): void {
		this.expanded = false;
		const obj = this.obj();
		this.hasTracks = obj?.childrenTypes?.includes(JamObjectType.track);
		const objValue = this.obj();
		this.hasAlbums = objValue?.childrenTypes?.includes(JamObjectType.album);
		const objVal = this.obj();
		this.hasEpisodes = objVal?.childrenTypes?.includes(JamObjectType.episode);
		const objInput = this.obj();
		this.hasMedia = objInput?.childrenTypes?.includes('media');
		this.check();
	}

	focus() {
		this.plate()?.focus();
	}

	check(): void {
		const obj = this.obj();
		const hasResult = obj?.tracks || obj?.albums || obj?.episodes || obj?.media;
		this.loading = !obj || !hasResult;
	}

	toggleExpansion(): void {
		const obj = this.obj();
		if (obj?.childrenTypes && obj.childrenTypes.length > 0) {
			this.expanded = !this.expanded;
			if (this.expanded) {
				obj.loadChildren()
					.then(() => {
						this.check();
					})
					.catch(e => {
						console.error(e);
					});
			}
		}
	}
}
