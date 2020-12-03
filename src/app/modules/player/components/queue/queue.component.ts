import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, PlayerService, QueueService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContextMenuQueueTrackComponent} from '../context-menu-queue-track/context-menu-queue-track.component';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, OnDestroy {
	@Input() showControls: boolean = true;
	entries: Array<Jam.MediaBase> = [];
	protected unsubscribe = new Subject();
	private currentSwipeElement?: HTMLElement;

	constructor(
		public queue: QueueService, public player: PlayerService, public navig: NavigService, public actions: ActionsService,
		private contextMenuService: ContextMenuService) {
	}

	ngOnInit(): void {
		this.entries = this.queue.entries.slice(0);
		this.queue.queueChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.entries = this.queue.entries.slice(0);
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: Event, item: Jam.MediaBase): void {
		this.contextMenuService.open(ContextMenuQueueTrackComponent, item, $event);
	}

	onDrop(event: CdkDragDrop<Array<Jam.MediaBase>>): void {
		moveItemInArray(this.queue.entries, event.previousIndex, event.currentIndex);
		this.queue.publishChanges();
	}

	tapPlayQueuePos(event: Event & { tapCount?: number }, index: number): void {
		if (event.tapCount === 2) {
			this.player.playQueuePos(index);
		}
	}

	onPanStart(event: Event): void {
		this.currentSwipeElement = undefined;
		let element: HTMLElement | null = (event as unknown as HammerInput).target;
		if (element && !element.classList.contains('track')) {
			element = element.parentElement;
		}
		if (element && element.classList.contains('track')) {
			this.currentSwipeElement = element;
		}
	}

	onPanMove(event: Event): void {
		if (this.currentSwipeElement) {
			const deltaX = (event as unknown as HammerInput).deltaX;
			this.currentSwipeElement.style.marginLeft = Math.min(Math.max(0, deltaX), 200).toString() + 'px';
		}
	}

	onPanEnd(event: Event, track: Jam.MediaBase): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			this.currentSwipeElement = undefined;
			const deltaX = (event as unknown as HammerInput).deltaX;
			if (deltaX >= 200) {
				setTimeout(() => {
					this.queue.remove(track);
				});
			}
		}
	}

	onPanCancel(_: Event): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			this.currentSwipeElement = undefined;
		}
	}

}
