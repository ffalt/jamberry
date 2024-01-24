import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
	msg: string = '';
	messages: Array<Jam.Chat> = [];
	isPolling: boolean = false;
	timer: any;

	constructor(protected jam: JamService, protected notify: NotifyService) {
	}

	poll(): void {
		if (this.isPolling) {
			return;
		}
		this.isPolling = true;
		const since = this.messages.length > 0 ? this.messages[this.messages.length - 1].created : undefined;
		this.jam.chat.list({since})
			.then(messages => {
				this.isPolling = false;
				this.messages = this.messages.concat(messages);
			})
			.catch(e => {
				this.isPolling = false;
				this.notify.error(e);
			});
	}

	refresh(): void {
		this.jam.chat.list({})
			.then(messages => {
				this.messages = messages;
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	post(): void {
		const message = this.msg.trim();
		this.msg = '';
		if (message.length > 0) {
			this.jam.chat.create({message})
				.then(() => {
					this.poll();
				})
				.catch(e => {
					this.msg = message;
					this.notify.error(e);
				});
		}
	}

	ngOnInit(): void {
		this.refresh();
		this.timer = setInterval(() => {
			this.poll();
		}, 10000);
	}

	ngOnDestroy(): void {
		clearInterval(this.timer);
	}
}
