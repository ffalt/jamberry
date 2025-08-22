import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { TabComponent } from '@modules/tab-portal';
import { QueueComponent } from '../../../player/components/queue/queue.component';

@Component({
	selector: 'app-tab-queue',
	templateUrl: './tab-queue.component.html',
	styleUrls: ['./tab-queue.component.scss'],
	imports: [CommonModule, QueueComponent]
})
export class TabQueueComponent implements TabComponent {
	onActivate(): void {
		//
	}
}
