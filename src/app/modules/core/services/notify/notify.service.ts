import {Injectable, inject} from '@angular/core';
import {ToastService} from '@app/modules/toast';

export type BrowserError = unknown;

export function serverErrorMsg(error: any): string {
	let e = error;
	if (e.error?.error) {
		e = e.error;
	}
	let msg: string;
	if (e.error) {
		msg = typeof e.error === 'string' ? e.error : 'Invalid Server Response';
	} else if (e.status) {
		msg = `${e.status} - ${e.statusText}`;
	} else {
		msg = e.toString() || 'Unknown error';
	}
	if (msg.startsWith('Error:')) {
		msg = msg.slice(6).trim();
	}
	return msg;
}

@Injectable({
	providedIn: 'root'
})
export class NotifyService {
	private readonly toastService = inject(ToastService);
	private lastError?: string;
	private lastErrorTimestamp: number = 0;

	success(text: string): void {
		this.toastService.success(text, 'Success', {timeOut: 3000});
	}

	error(err: BrowserError): void {
		if (err) {
			const newtext = serverErrorMsg(err);
			const newtimestamp = Date.now();
			if (this.lastError === newtext && ((newtimestamp - this.lastErrorTimestamp) < 10_000)) {
				return;
			}
			this.lastError = newtext;
			this.lastErrorTimestamp = newtimestamp;
			this.toastService.error(newtext, 'Error', {timeOut: 10_000});
			console.error(err);
		}
	}

	info(s: string): void {
		this.toastService.info(s, 'Info', {timeOut: 10_000});
	}
}
