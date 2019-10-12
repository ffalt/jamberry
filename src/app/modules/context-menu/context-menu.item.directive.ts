import {Highlightable} from '@angular/cdk/a11y';
import {Directive, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[contextMenuItem]'
})
export class ContextMenuItemDirective implements Highlightable {
	@Input() subMenu: any;
	@Input() divider = false;
	@Input() enabled: boolean = true;
	@Input() passive = false;
	@Input() visible: boolean = true;
	@Output() readonly execute: EventEmitter<{ event: MouseEvent | KeyboardEvent, item: any }> = new EventEmitter();

	currentItem: any;
	isActive = false;

	get disabled(): boolean {
		return this.passive || this.divider || !this.enabled;
	}

	constructor(public template: TemplateRef<{ item: any }>) {
	}

	setActiveStyles(): void {
		this.isActive = true;
	}

	setInactiveStyles(): void {
		this.isActive = false;
	}

	triggerExecute(item: any, $event?: MouseEvent | KeyboardEvent): void {
		if (this.enabled) {
			this.execute.emit({event: $event, item});
		}
	}
}
