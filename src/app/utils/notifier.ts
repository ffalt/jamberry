import { EventEmitter } from '@angular/core';

export class Notifiers<T> {
	private readonly notifiers: { [id: string]: EventEmitter<T> | undefined } = {};

	notifier(id: string): EventEmitter<T> {
		this.notifiers[id] ??= new EventEmitter<T>();
		return this.notifiers[id];
	}

	observed(id: string): boolean {
		return this.notifiers[id] ? this.notifiers[id].observed : false;
	}

	emit(id: string, data?: T): void {
		if (this.notifiers[id]) {
			this.notifiers[id].emit(data);
		}
	}
}
