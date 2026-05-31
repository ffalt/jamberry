import { Component, inject, viewChild } from '@angular/core';
import type { Jam } from '@jam';
import type { ContextMenuHostComponentInterface } from '@core/services/contextmenu/menu.service';
import { ActionsService } from '@core/services/actions/actions.service';
import { ContextEntryRateComponent } from '@core/components/context-entry-rate/context-entry-rate.component';
import { QueueService } from '@core/services/queue/queue.service';
import { NavigService } from '@core/services/navig/navig.service';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import { IconDownloadCloudComponent } from '@core/components/icons/icon-download-cloud.component';
import { IconListAddComponent } from '@core/components/icons/icon-list-add.component';
import { IconTrackComponent } from '@core/components/icons/icon-track.component';
import { IconHeartEmptyComponent } from '@core/components/icons/icon-heart-empty.component';
import { IconHeartFullComponent } from '@core/components/icons/icon-heart-full.component';

@Component({
	selector: 'app-context-menu-queue-track',
	templateUrl: './context-menu-queue-track.component.html',
	imports: [
		ContextEntryRateComponent, ContextMenuModule,
		IconDownloadCloudComponent, IconListAddComponent, IconTrackComponent, IconHeartEmptyComponent, IconHeartFullComponent
	]
})
export class ContextMenuQueueTrackComponent implements ContextMenuHostComponentInterface<any> {
	readonly contextMenu = viewChild.required<ContextMenuComponent>('queueMenu');
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
	readonly queue = inject(QueueService);

	toTrack(item: unknown): Jam.Track {
		return item as Jam.Track;
	}
}
