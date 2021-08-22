import {Highlightable} from '@angular/cdk/a11y';
import {Directive, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[contextMenuItem]'
})
export class ContextMenuItemDirective implements Highlightable {
	@Input() subMenu: any;
	@Input() divider = false;
	@Input() enabled: boolean | ((item: any) => boolean) = true;
	@Input() passive = false;
	@Input() visible: boolean | ((item: any) => boolean) = true;
	@Output() readonly execute: EventEmitter<{ event?: MouseEvent | KeyboardEvent; item: any }> = new EventEmitter();

	currentItem: any;
	isActive = false;

	constructor(public template: TemplateRef<{ item: any }>) {
	}

	get isVisible(): boolean {
		return this.evaluateIfFunction(this.visible, this);
	}

	get isEnabled(): boolean {
		return this.evaluateIfFunction(this.enabled, this);
	}

	get disabled() {
		return this.passive ||
			this.divider ||
			!this.evaluateIfFunction(this.enabled, this.currentItem);
	}

	evaluateIfFunction(value: any, item: any): any {
		if (value instanceof Function) {
			return value(item);
		}
		return value;
	}

	setActiveStyles(): void {
		this.isActive = true;
	}

	setInactiveStyles(): void {
		this.isActive = false;
	}

	triggerExecute(item: any, $event?: MouseEvent | KeyboardEvent): void {
		if (this.isEnabled) {
			this.execute.emit({event: $event, item});
		}
	}

}
