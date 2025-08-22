import { inject, Injectable } from '@angular/core';
import { ToastService } from '@modules/toast';
import { serverErrorMsg } from '@utils/errors';

@Injectable({
	providedIn: 'root'
})
export class NotifyService {
	private readonly toastService = inject(ToastService);
	private lastError?: string;
	private lastErrorTimestamp: number = 0;

	success(text: string): void {
		this.toastService.success(text, 'Success', { timeOut: 3000 });
	}

	error(err: unknown): void {
		if (err) {
			const newtext = serverErrorMsg(err);
			const newtimestamp = Date.now();
			if (this.lastError === newtext && ((newtimestamp - this.lastErrorTimestamp) < 10_000)) {
				return;
			}
			this.lastError = newtext;
			this.lastErrorTimestamp = newtimestamp;
			this.toastService.error(newtext, 'Error', { timeOut: 10_000 });
			console.error(err);
		}
	}

	info(s: string): void {
		this.toastService.info(s, 'Info', { timeOut: 10_000 });
	}
}
