import { NgComponentOutlet } from '@angular/common';
import { Component, type Type, viewChild, ChangeDetectionStrategy } from '@angular/core';
import type { JamLibraryObject } from '../../model/objects';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { ContextEntryRateComponent } from '@core/components/context-entry-rate/context-entry-rate.component';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { IconDownloadCloudComponent } from '@core/components/icons/icon-download-cloud.component';
import { IconListAddComponent } from '@core/components/icons/icon-list-add.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconPlaylistComponent } from '@core/components/icons/icon-playlist.component';
import { IconViewDetailsComponent } from '@core/components/icons/icon-view-details.component';
import { IconHeartEmptyComponent } from '@core/components/icons/icon-heart-empty.component';
import { IconHeartFullComponent } from '@core/components/icons/icon-heart-full.component';

export interface ContextMenuObjComponentOptionsExtra {
	text: string;
	icon: Type<unknown>;

	click(): void;
}

export interface ContextMenuObjComponentOptions {
	hideGoto?: boolean;
	extras?: Array<ContextMenuObjComponentOptionsExtra>;
}

@Component({
	selector: 'app-context-menu-obj',
	templateUrl: './context-menu-obj.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [
		ContextEntryRateComponent, ContextMenuModule, NgComponentOutlet,
		IconDownloadCloudComponent, IconListAddComponent, IconPlayComponent, IconPlaylistComponent, IconViewDetailsComponent,
		IconHeartEmptyComponent, IconHeartFullComponent
	]
})
export class ContextMenuObjComponent implements ContextMenuHostComponentInterface<ContextMenuObjComponentOptions> {
	readonly contextMenu = viewChild.required<ContextMenuComponent>('objMenu');
	extras?: Array<ContextMenuObjComponentOptionsExtra> = [];
	showGoto: boolean = true;

	initOpts(opts?: ContextMenuObjComponentOptions): void {
		this.showGoto = !opts?.hideGoto;
		this.extras = opts ? opts.extras : [];
	}

	toLibraryObject(item: unknown): JamLibraryObject {
		return item as JamLibraryObject;
	}
}
