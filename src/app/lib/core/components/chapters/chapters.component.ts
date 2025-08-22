import { Component, inject, input } from '@angular/core';
import type { Jam } from '@jam';
import { MediadurationPipe } from '../../pipes/mediaduration.pipe';
import { PlayerService } from '../../services/player/player.service';
import { QueueService } from '../../services/queue/queue.service';

@Component({
	selector: 'app-chapters',
	templateUrl: './chapters.component.html',
	styleUrls: ['./chapters.component.scss'],
	imports: [MediadurationPipe]
})
export class ChaptersComponent {
	readonly episode = input<Jam.Episode>();
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
}
