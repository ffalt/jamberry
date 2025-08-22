import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { StringTogglePipe } from '@core/pipes/string-toggle/string-toggle.pipe';
import { ClickStopDirective } from '@core/directives/click-stop.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';

@Component({
	selector: 'app-queue-item',
	templateUrl: './queue-item.component.html',
	styleUrls: ['./queue-item.component.scss'],
	imports: [DragDropModule, DurationPipe, StringTogglePipe, ClickStopDirective]
})
export class QueueItemComponent {
	readonly entry = input<Jam.MediaBase>();
	readonly index = input<number>(0);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly navig = inject(NavigService);
}
