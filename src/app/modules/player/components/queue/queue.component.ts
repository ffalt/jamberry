import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, Input, OnDestroy, OnInit, inject} from '@angular/core';
import {NavigService, PlayerService, QueueService} from '@core/services';
import {Jam} from '@jam';
import {ActionsService, MenuService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContextMenuQueueTrackComponent} from '../context-menu-queue-track/context-menu-queue-track.component';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss'],
	standalone: false
})
export class QueueComponent implements OnInit, OnDestroy {
	@Input() showControls: boolean = true;
	entries: Array<Jam.MediaBase> = [];
	readonly queue = inject(QueueService);
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
	protected readonly unsubscribe = new Subject<void>();
	private menuService = inject(MenuService);
	private currentSwipeElement?: HTMLElement;

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
		this.menuService.openMenuComponent(ContextMenuQueueTrackComponent, item, $event);
	}

	onDrop(event: CdkDragDrop<Array<Jam.MediaBase>>): void {
		moveItemInArray(this.queue.entries, event.previousIndex, event.currentIndex);
		this.queue.publishChanges();
	}

	playQueuePos(index: number): void {
		this.player.playQueuePos(index);
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
			this.currentSwipeElement.style.marginLeft = `${Math.min(Math.max(0, deltaX), 200).toString()}px`;
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

	onPanCancel(): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			this.currentSwipeElement = undefined;
		}
	}

}
