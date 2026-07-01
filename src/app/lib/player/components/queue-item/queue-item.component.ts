import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import type { Jam } from '@jam';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { ClickStopDirective } from '@core/directives/click-stop.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import { IconHashComponent } from '@core/components/icons/icon-hash.component';
import { IconPauseComponent } from '@core/components/icons/icon-pause.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconRemoveComponent } from '@core/components/icons/icon-remove.component';
import { IconStopwatchComponent } from '@core/components/icons/icon-stopwatch.component';

@Component({
	selector: 'app-queue-item',
	templateUrl: './queue-item.component.html',
	styleUrls: ['./queue-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [ClickStopDirective, DragDropModule, DurationPipe, IconHashComponent, IconPauseComponent, IconPlayComponent, IconRemoveComponent, IconStopwatchComponent]
})
export class QueueItemComponent {
	readonly entry = input<Jam.MediaBase>();
	readonly index = input<number>(0);
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly navig = inject(NavigService);
}
