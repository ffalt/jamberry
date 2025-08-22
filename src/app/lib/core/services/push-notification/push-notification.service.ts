/**
 * https://github.com/alexcastillo/ng2-notifications
 */

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PushNotificationService {
	title?: string;
	body?: string;
	icon?: string;
	tag?: string;
	dir?: NotificationDirection = 'auto';
	lang: string = 'en-US';
	badge?: string;
	enabled: boolean = false;
	requireInteraction: boolean = false;
	silent?: boolean = true;

	checkCompatibility(): boolean {
		return ('Notification' in globalThis);
	}

	isPermissionGranted(permission?: string): boolean {
		return permission === 'granted';
	}

	async requestPermission(): Promise<string> {
		return Notification.requestPermission();
	}

	async show(notify: {
		title: string;
		body: string;
		icon: string;
		silent?: boolean;
	}): Promise<Notification | undefined> {
		if (!this.enabled) {
			return;
		}
		this.title = notify.title;
		this.body = notify.body;
		if (Object.hasOwn(notify, 'silent')) {
			this.silent = notify.silent;
		}
		if (Object.hasOwn(notify, 'icon')) {
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
		const options: NotificationOptions = {
			dir: this.dir ?? 'auto',
			lang: this.lang || 'en-US',
			tag: this.tag,
			body: this.body,
			icon: this.icon,
			silent: this.silent,
			badge: this.badge,
			requireInteraction: this.requireInteraction
		};
		const notification = new Notification(this.title ?? '', options);
		this.close(notification);
		return notification;
	}

	close(notification: Notification): void {
		notification.close();
	}
}
