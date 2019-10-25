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
	tracks: Array<Jam.Track> = [];
	protected unsubscribe = new Subject();
	private currentSwipeElement: HTMLElement;

	constructor(
		public queue: QueueService, public player: PlayerService, public navig: NavigService, public actions: ActionsService,
		private contextMenuService: ContextMenuService) {
	}

	ngOnInit(): void {
		this.tracks = this.queue.tracks.slice(0);
		this.queue.queueChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.tracks = this.queue.tracks.slice(0);
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: MouseEvent, item: Jam.Track): void {
		this.contextMenuService.open(ContextMenuQueueTrackComponent, item, $event);
	}

	onDrop(event: CdkDragDrop<Array<Jam.Track>>): void {
		moveItemInArray(this.queue.tracks, event.previousIndex, event.currentIndex);
		this.queue.publishChanges();
	}

	tapPlayQueuePos(event, index: number): void {
		if (event.tapCount === 2) {
			this.player.playQueuePos(index);
		}
	}

	onPanStart(event: HammerInput): void {
		this.currentSwipeElement = undefined;
		let element = event.target;
		if (!element.classList.contains('track')) {
			element = element.parentElement;
		}
		if (element && element.classList.contains('track')) {
			this.currentSwipeElement = element;
		}
	}

	onPanMove(event: HammerInput): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = Math.min(Math.max(0, event.deltaX), 200).toString() + 'px';
		}
	}

	onPanEnd(event: HammerInput, track: Jam.Track): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			this.currentSwipeElement = undefined;
			if (event.deltaX >= 200) {
				setTimeout(() => {
					this.queue.remove(track);
				});
			}
		}
	}

	onPanCancel(event: HammerInput): void {
		if (this.currentSwipeElement) {
			this.currentSwipeElement.style.marginLeft = '0px';
			this.currentSwipeElement = undefined;
		}
	}

}
