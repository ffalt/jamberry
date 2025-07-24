import {type CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, type OnDestroy, type OnInit, inject, input} from '@angular/core';
import {PlayerService, QueueService} from '@core/services';
import type {Jam} from '@jam';
import {MenuService} from '@shared/services';
import {Subject, takeUntil} from 'rxjs';
import {ContextMenuQueueTrackComponent} from '../context-menu-queue-track/context-menu-queue-track.component';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss'],
	standalone: false
})
export class QueueComponent implements OnInit, OnDestroy {
	readonly showControls = input<boolean>(true);
	entries: Array<Jam.MediaBase> = [];
	readonly queue = inject(QueueService);
	private readonly player = inject(PlayerService);
	private currentSwipeElement?: HTMLElement;
	private readonly unsubscribe = new Subject<void>();
	private readonly menuService = inject(MenuService);
	private touchStartX = 0;
	private currentTouchX = 0;

	ngOnInit(): void {
		this.entries = [...this.queue.entries];
		this.queue.queueChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.entries = [...this.queue.entries];
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: Event, item: Jam.MediaBase): void {
		this.menuService.openMenuComponent(ContextMenuQueueTrackComponent, item, $event);
	}

	onDrop(event: CdkDragDrop<Array<Jam.MediaBase>>): void {
		moveItemInArray(this.queue.entries, event.previousIndex, event.currentIndex);
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

		let element: HTMLElement | null = event.target as HTMLElement;
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
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			const deltaX = this.currentTouchX - this.touchStartX;
			this.currentSwipeElement = undefined;
			this.touchStartX = 0;
			this.currentTouchX = 0;

			if (deltaX >= 200) {
				setTimeout(() => {
					this.queue.remove(track);
				});
			}
		}
	}

	onTouchCancel(): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			this.currentSwipeElement = undefined;
			this.touchStartX = 0;
			this.currentTouchX = 0;
		}
	}
}
