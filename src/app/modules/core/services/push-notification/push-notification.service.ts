/**
 * https://github.com/alexcastillo/ng2-notifications
 */

import {Injectable, OnDestroy} from '@angular/core';

declare const Notification: any;

@Injectable({
	providedIn: 'root'
})
export class PushNotificationService implements OnDestroy {
	title: string;
	body: string;
	icon: string;
	sound: string;
	data: any;
	tag: string;
	dir: string = 'auto';
	lang: string = 'en-US';
	renotify: boolean = false;
	sticky: boolean = false;
	vibrate: Array<number>;
	noscreen: boolean = false;
	enabled: boolean = false;
	silent: boolean = true;
	closeDelay: number = 0;

	checkCompatibility(): boolean {
		return ('Notification' in window);
	}

	isPermissionGranted(permission?: string): boolean {
		return permission === 'granted';
	}

	async requestPermission(): Promise<string> {
		return Notification.requestPermission();
	}

	async show(notify: { title: string; body: string; icon: string; silent?: boolean; autoclose: number; }): Promise<Notification | undefined> {
		if (!this.enabled) {
			return;
		}
		this.title = notify.title;
		this.body = notify.body;
		if (notify.hasOwnProperty('silent')) {
			this.silent = notify.silent;
		}
		if (notify.hasOwnProperty('autoclose')) {
			this.closeDelay = notify.autoclose * 1000;
		}
		if (notify.hasOwnProperty('icon')) {
			this.icon = notify.icon;
		}
		if (!this.checkCompatibility()) {
			console.error('Notification API not available in this browser.');
			return;
		}
		return this.requestPermission()
			.then((permission: string) => this.isPermissionGranted(permission))
			.then(() => this.create());
	}

	create(): Notification {
		const notification = new Notification(this.title, {
			dir: this.dir || 'auto',
			lang: this.lang || 'en-US',
			data: this.data,
			tag: this.tag,
			body: this.body,
			icon: this.icon,
			silent: this.silent,
			sound: this.sound,
			renotify: this.renotify,
			sticky: this.sticky,
			vibrate: this.vibrate,
			noscreen: this.noscreen
		});

		// notification.onshow = () => {
		// 	this.onShow.emit({notification});
		// };
		//
		// notification.onclick = (event) => {
		// 	this.onClick.emit({event, notification});
		// };
		//
		// notification.onerror = () => {
		// 	this.onError.emit({notification});
		// };
		//
		// notification.onclose = () => {
		// 	this.onClose.emit({notification});
		// };

		this.close(notification);
		return notification;
	}

	close(notification: Notification): void {
		if (this.closeDelay) {
			setTimeout(() => {
				notification.close();
			}, this.closeDelay);
		} else {
			notification.close();
		}
	}

	closeAll(): void {
		Notification.close();
	}

	ngOnDestroy(): void {
		this.closeAll();
	}

}
