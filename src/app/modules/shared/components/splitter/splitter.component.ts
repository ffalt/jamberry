import {Component, ElementRef, inject, input} from '@angular/core';

@Component({
	selector: 'app-splitter',
	templateUrl: './splitter.component.html',
	styleUrls: ['./splitter.component.scss'],
	standalone: false,
	host: {
		'[class.dragging]': 'dragging',
		'(panstart)': 'onPanStart()',
		'(panmove)': 'onPanMove($event)',
		'(panend)': 'onPanEnd()',
		'(pancancel)': 'onPanCancel()'
	}
})
export class SplitterComponent {
	readonly leftSnap = input<boolean>(true);
	dragging: boolean = false;
	element = inject(ElementRef);
	private drag?: { element: HTMLElement; width: number };

	startDrag(): void {
		this.drag = {
			element: this.leftSnap() ? this.element.nativeElement.previousSibling : this.element.nativeElement.nextSibling,
			width: 0
		};
		this.drag.width = this.drag.element.getBoundingClientRect().width || 1;
		this.dragging = true;
	}

	stopDrag(): void {
		this.dragging = false;
	}

	doDrag(x: number): void {
		if (this.drag) {
			let offsetX = this.drag.width + x;
			if (!this.leftSnap()) {
				offsetX = this.element.nativeElement.parentNode.offsetWidth - offsetX;
			}
			this.drag.element.style.width = `${Math.max(0, offsetX).toString()}px`;
		}
	}

	onPanStart(): void {
		this.startDrag();
	}

	onPanMove(event: { deltaX: number }): void {
		this.doDrag(event.deltaX);
	}

	onPanEnd(): void {
		this.stopDrag();
	}

	onPanCancel(): void {
		this.stopDrag();
	}
}
