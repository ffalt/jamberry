import {Component, ElementRef, inject, input} from '@angular/core';

@Component({
	selector: 'app-splitter',
	templateUrl: './splitter.component.html',
	styleUrls: ['./splitter.component.scss'],
	standalone: false,
	host: {
		'[class.dragging]': 'dragging',
		'(touchstart)': 'onTouchStart($event)',
		'(touchmove)': 'onTouchMove($event)',
		'(touchend)': 'onTouchEnd()',
		'(touchcancel)': 'onTouchCancel()',
		'(mousedown)': 'onMouseDown($event)',
		'(document:mousemove)': 'onMouseMove($event)',
		'(document:mouseup)': 'onMouseUp()'
	}
})
export class SplitterComponent {
	readonly leftSnap = input<boolean>(true);
	dragging: boolean = false;
	element = inject(ElementRef);
	private drag?: { element: HTMLElement; width: number };
	private dragStartX = 0;

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

	onTouchStart(event: TouchEvent): void {
		if (event.touches.length !== 1) {
			return;
		}
		this.dragStartX = event.touches[0].clientX;
		this.startDrag();
	}

	onTouchMove(event: TouchEvent): void {
		if (event.touches.length !== 1 || !this.dragging) {
			return;
		}
		const currentX = event.touches[0].clientX;
		const deltaX = currentX - this.dragStartX;
		this.doDrag(deltaX);
	}

	onTouchEnd(): void {
		this.dragStartX = 0;
		this.stopDrag();
	}

	onTouchCancel(): void {
		this.dragStartX = 0;
		this.stopDrag();
	}

	onMouseDown(event: MouseEvent): void {
		this.dragStartX = event.clientX;
		this.startDrag();
		event.preventDefault(); // Prevent text selection during drag
	}

	onMouseMove(event: MouseEvent): void {
		if (!this.dragging) {
			return;
		}
		const deltaX = event.clientX - this.dragStartX;
		this.doDrag(deltaX);
		event.preventDefault(); // Prevent text selection during drag
	}

	onMouseUp(): void {
		this.dragStartX = 0;
		this.stopDrag();
	}
}
