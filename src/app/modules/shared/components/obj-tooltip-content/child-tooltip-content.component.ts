import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, model} from '@angular/core';
import {positionElements} from './child-tooltip-content.position';

export interface TooltipInfo {
	title?: string;
	items: Array<{ key: string; value: string }>;
}

@Component({
	selector: 'app-child-tooltip-content',
	templateUrl: './child-tooltip-content.component.html',
	styleUrls: ['./child-tooltip-content.component.scss'],
	standalone: false
})
export class ChildTooltipContentComponent implements AfterViewInit {
	readonly hostElement = model<HTMLElement>();
	readonly content = model<TooltipInfo>();
	readonly placement = model<'top' | 'bottom' | 'left' | 'right'>('bottom');
	readonly animation = model<boolean>(true);
	top: number = -1000;
	left: number = -1000;
	isIn: boolean = false;
	isFade: boolean = false;
	private readonly element = inject(ElementRef);
	private readonly cdr = inject(ChangeDetectorRef);

	ngAfterViewInit(): void {
		this.show();
		this.cdr.detectChanges();
	}

	show(): void {
		const hostElement = this.hostElement();
		if (!hostElement) {
			return;
		}
		document.body.appendChild(this.element.nativeElement);
		const p = positionElements(hostElement, this.element.nativeElement.children[0], this.placement(), true);
		this.top = p.top;
		this.left = p.left;
		this.isIn = true;
		if (this.animation()) {
			this.isFade = true;
		}
	}
}
