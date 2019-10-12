import {Component, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Component({
	selector: 'app-splitter',
	templateUrl: 'splitter.component.html',
	styleUrls: ['splitter.component.scss']
})
export class SplitterComponent {
	@Input() leftSnap: boolean = true;
	@HostBinding('class.dragging') dragging: boolean = false;
	private drag: { element: HTMLElement; width: number; };

	constructor(public element: ElementRef) {
	}

	startDrag(): void {
		this.drag = {
			element: this.leftSnap ? this.element.nativeElement.previousSibling : this.element.nativeElement.nextSibling,
			width: 0
		};
		this.drag.width = this.drag.element.getBoundingClientRect().width || 1;
		this.dragging = true;
	}

	stopDrag(): void {
		this.dragging = false;
	}

	doDrag(x: number): void {
		let offsetX = this.drag.width + x;
		if (!this.leftSnap) {
			offsetX = this.element.nativeElement.parentNode.offsetWidth - offsetX;
		}
		this.drag.element.style.width = Math.max(0, offsetX).toString() + 'px';
	}

	@HostListener('panstart', ['$event'])
	onPanStart(event): void {
		this.startDrag();
	}

	@HostListener('panmove', ['$event'])
	onPanMove(event): void {
		this.doDrag(event.deltaX);
	}

	@HostListener('panend', ['$event'])
	onPanEnd(event): void {
		this.stopDrag();
	}

	@HostListener('pancancel', ['$event'])
	onPanCancel(event): void {
		this.stopDrag();
	}

}
