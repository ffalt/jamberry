import type { Highlightable } from '@angular/cdk/a11y';
import { Directive, inject, input, output, TemplateRef } from '@angular/core';
import type { ContextMenuComponent } from './contextmenu.component';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[contextMenuItem]'
})
export class ContextMenuItemDirective implements Highlightable {
	readonly subMenu = input<ContextMenuComponent>();
	readonly divider = input(false);
	readonly enabled = input<boolean | ((item: unknown) => boolean)>(true);
	readonly passive = input(false);
	readonly visible = input<boolean | ((item: unknown) => boolean)>(true);
	readonly execute = output<{
		event?: Event;
		item: unknown;
	}>();

	readonly template = inject<TemplateRef<{ item: unknown }>>(TemplateRef);
	currentItem: unknown;
	isActive = false;

	get isVisible(): boolean {
		return this.evaluateIfFunction(this.visible(), this);
	}

	get isEnabled(): boolean {
		return this.evaluateIfFunction(this.enabled(), this);
	}

	get disabled() {
		return this.passive() || this.divider() || !this.evaluateIfFunction(this.enabled(), this.currentItem);
	}

	evaluateIfFunction<T, Y>(value: T | ((item: Y) => T), item: Y): T {
		if (typeof value === 'function') {
			return (value as (item: Y) => T)(item);
		}
		return value;
	}

	setActiveStyles(): void {
		this.isActive = true;
	}

	setInactiveStyles(): void {
		this.isActive = false;
	}

	triggerExecute(item: unknown, $event?: Event): void {
		if (this.isEnabled) {
			this.execute.emit({ event: $event, item });
		}
	}
}
