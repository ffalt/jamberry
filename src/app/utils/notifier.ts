import {EventEmitter} from '@angular/core';

export class Notifiers<T> {
	private readonly notifiers: { [id: string]: EventEmitter<T> } = {};

	notifier(id: string): EventEmitter<T> {
		if (!this.notifiers[id]) {
			this.notifiers[id] = new EventEmitter<T>();
		}
		return this.notifiers[id];
	}

	observed(id: string): boolean {
		return !this.notifiers[id] ? false : this.notifiers[id].observed;
	}

	emit(id: string, data?: T): void {
		if (this.notifiers[id]) {
			this.notifiers[id].emit(data);
		}
	}
}
