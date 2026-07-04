import { type CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Jam } from '@jam';
import { map } from 'rxjs';
import { ContextMenuQueueTrackComponent } from '../context-menu-queue-track/context-menu-queue-track.component';
import { QueueItemComponent } from '../queue-item/queue-item.component';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { MenuService } from '@core/services/contextmenu/menu.service';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { QueueService } from '@core/services/queue/queue.service';
import { PlayerService } from '@core/services/player/player.service';
import { IconRemoveComponent } from '@core/components/icons/icon-remove.component';
import { IconShuffleComponent } from '@core/components/icons/icon-shuffle.component';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss'],
	imports: [BackgroundTextComponent, DragDropModule, FocusKeyListDirective, FocusKeyListItemDirective, IconRemoveComponent, IconShuffleComponent, QueueItemComponent, ScrollingModule]
})
export class QueueComponent {
	readonly showControls = input<boolean>(true);
	readonly queue = inject(QueueService);
	readonly entries = toSignal(
		this.queue.queueChange.pipe(map(() => [...this.queue.entries])),
		{ initialValue: [...this.queue.entries] }
	);

	private readonly player = inject(PlayerService);
	private readonly menuService = inject(MenuService);
	private currentSwipeElement?: HTMLElement;
	private touchStartX = 0;
	private currentTouchX = 0;

	onContextMenu($event: Event, item: Jam.MediaBase): void {
		this.menuService.openMenuComponent<undefined>(ContextMenuQueueTrackComponent, item, $event);
	}

	onDrop(event: CdkDragDrop<Array<Jam.MediaBase>>): void {
		const entries = [...this.queue.entries];
		moveItemInArray(entries, event.previousIndex, event.currentIndex);
		this.queue.entries = entries;
		this.queue.publishChanges();
	}

	playQueuePos(index: number): void {
		this.player.playQueuePos(index);
	}

	doubleClickPlayQueuePos(index: number): void {
		this.player.playQueuePos(index);
	}

	onTouchStart(event: TouchEvent): void {
		this.currentSwipeElement = undefined;
		if (event.touches.length !== 1) {
			return;
		}
		this.touchStartX = event.touches[0].clientX;
		this.currentTouchX = this.touchStartX;

		let element = event.target as HTMLElement | null;
		if (element && !element.classList.contains('track')) {
			element = element.parentElement;
		}
		if (element?.classList.contains('track')) {
			this.currentSwipeElement = element;
		}
	}

	onTouchMove(event: TouchEvent): void {
		if (!this.currentSwipeElement || event.touches.length !== 1) {
			return;
		}
		this.currentTouchX = event.touches[0].clientX;
		const deltaX = this.currentTouchX - this.touchStartX;
		this.currentSwipeElement.style.marginLeft = `${Math.min(Math.max(0, deltaX), 200).toString()}px`;
	}

	onTouchEnd(event: TouchEvent, track: Jam.MediaBase): void {
		if (!this.currentSwipeElement) {
			return;
		}

		this.currentSwipeElement.style.marginLeft = '0px';
		const deltaX = this.currentTouchX - this.touchStartX;
		this.currentSwipeElement = undefined;
		this.touchStartX = 0;
		this.currentTouchX = 0;

		if (deltaX >= 200) {
			setTimeout(() => {
				this.queue.remove(track);
			}, 0);
		}
	}

	onTouchCancel(): void {
		if (!this.currentSwipeElement) {
			return;
		}

		this.currentSwipeElement.style.marginLeft = '0px';
		this.currentSwipeElement = undefined;
		this.touchStartX = 0;
		this.currentTouchX = 0;
	}
}
