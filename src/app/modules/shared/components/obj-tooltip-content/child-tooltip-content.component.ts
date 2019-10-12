import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input} from '@angular/core';
import {positionElements} from './child-tooltip-content.position';

export interface TooltipInfo {
	title?: string;
	items: Array<{ key: string; value: string }>;
}

@Component({
	selector: 'app-child-tooltip-content',
	templateUrl: 'child-tooltip-content.component.html',
	styleUrls: ['child-tooltip-content.component.scss']

})
export class ChildTooltipContentComponent implements AfterViewInit {
	@Input() hostElement: HTMLElement;
	@Input() content: TooltipInfo;
	@Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	@Input() animation: boolean = true;
	top: number = -1000;
	left: number = -1000;
	isIn: boolean = false;
	isFade: boolean = false;

	constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {
	}

	ngAfterViewInit(): void {
		this.show();
		this.cdr.detectChanges();
	}

	show(): void {
		if (!this.hostElement) {
			return;
		}
		document.body.appendChild(this.element.nativeElement);
		const p = positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement, true);
		this.top = p.top;
		this.left = p.left;
		this.isIn = true;
		if (this.animation) {
			this.isFade = true;
		}
	}

	hide(): void {
		this.top = -1000;
		this.left = -1000;
		this.isIn = true;
		if (this.animation) {
			this.isFade = false;
		}
	}

}
