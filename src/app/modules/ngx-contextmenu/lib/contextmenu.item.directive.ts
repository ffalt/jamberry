import {Highlightable} from '@angular/cdk/a11y';
import {Directive, TemplateRef, inject, output, input} from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[contextMenuItem]',
	standalone: false
})
export class ContextMenuItemDirective implements Highlightable {
	readonly subMenu = input<any>();
	readonly divider = input(false);
	readonly enabled = input<boolean | ((item: any) => boolean)>(true);
	readonly passive = input(false);
	readonly visible = input<boolean | ((item: any) => boolean)>(true);
	readonly execute = output<{
		event?: Event;
		item: any;
	}>();
	readonly template = inject<TemplateRef<{ item: any; }>>(TemplateRef);
	currentItem: any;
	isActive = false;

	get isVisible(): boolean {
		return this.evaluateIfFunction(this.visible(), this);
	}

	get isEnabled(): boolean {
		return this.evaluateIfFunction(this.enabled(), this);
	}

	get disabled() {
		return this.passive() ||
			this.divider() ||
			!this.evaluateIfFunction(this.enabled(), this.currentItem);
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

	triggerExecute(item: any, $event?: Event): void {
		if (this.isEnabled) {
			this.execute.emit({event: $event, item});
		}
	}

}
