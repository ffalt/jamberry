import {FocusableOption} from '@angular/cdk/a11y';
import {Component, HostBinding, Input, OnChanges, viewChild} from '@angular/core';
import {JamObjectType} from '@jam';
import {JamLibraryObject} from '@library/model/objects';
import {MediaPlateComponent} from '@shared/components';

@Component({
    selector: 'app-obj-plate',
    templateUrl: './obj-plate.component.html',
    styleUrls: ['./obj-plate.component.scss'],
    standalone: false
})
export class ObjPlateComponent implements OnChanges, FocusableOption {
	@Input() obj?: JamLibraryObject;
	@Input() showParent: boolean = false;
	@HostBinding() tabindex = -1;
	loading: boolean = false;
	expanded: boolean = false;
	hasTracks?: boolean = false;
	hasAlbums?: boolean = false;
	hasEpisodes?: boolean = false;
	hasMedia?: boolean = false;
	protected readonly plate = viewChild(MediaPlateComponent);

	ngOnChanges(): void {
		this.expanded = false;
		this.hasTracks = this.obj?.childrenTypes && this.obj.childrenTypes.includes(JamObjectType.track);
		this.hasAlbums = this.obj?.childrenTypes && this.obj.childrenTypes.includes(JamObjectType.album);
		this.hasEpisodes = this.obj?.childrenTypes && this.obj.childrenTypes.includes(JamObjectType.episode);
		this.hasMedia = this.obj?.childrenTypes && this.obj.childrenTypes.includes('media');
		this.check();
	}

	focus() {
		this.plate()?.focus();
	}

	check(): void {
		this.loading = !this.obj || !(this.obj.tracks || this.obj.albums || this.obj.episodes || this.obj.media);
	}

	toggleExpansion(): void {
		if (this.obj?.childrenTypes && this.obj.childrenTypes.length > 0) {
			this.expanded = !this.expanded;
			if (this.expanded) {
				this.obj.loadChildren()
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
