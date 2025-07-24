import {Component, type OnDestroy, type OnInit, inject} from '@angular/core';
import {NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
	standalone: false
})
export class ChatComponent implements OnInit, OnDestroy {
	msg: string = '';
	messages: Array<Jam.Chat> = [];
	isPolling: boolean = false;
	timer: any;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	poll(): void {
		if (this.isPolling) {
			return;
		}
		this.isPolling = true;
		const since = this.messages.length > 0 ? this.messages.at(-1)?.created : undefined;
		this.jam.chat.list({since})
			.then(messages => {
				this.isPolling = false;
				this.messages = [...this.messages, ...messages];
			})
			.catch(error => {
				this.isPolling = false;
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.jam.chat.list({})
			.then(messages => {
				this.messages = messages;
			})
			.catch(error => this.notify.error(error));
	}

	post(): void {
		const message = this.msg.trim();
		this.msg = '';
		if (message.length > 0) {
			this.jam.chat.create({message})
				.then(() => {
					this.poll();
				})
				.catch(error => {
					this.msg = message;
					this.notify.error(error);
				});
		}
	}

	ngOnInit(): void {
		this.refresh();
		this.timer = setInterval(() => {
			this.poll();
		}, 10_000);
	}

	ngOnDestroy(): void {
		clearInterval(this.timer);
	}
}
