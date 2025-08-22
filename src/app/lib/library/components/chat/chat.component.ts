import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
	imports: [FormsModule, CommonModule, CoverartImageComponent]
})
export class ChatComponent implements OnInit, OnDestroy {
	msg: string = '';
	messages: Array<Jam.Chat> = [];
	isPolling: boolean = false;
	timer?: ReturnType<typeof setInterval>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	poll(): void {
		if (this.isPolling) {
			return;
		}
		this.isPolling = true;
		const since = this.messages.length > 0 ? this.messages.at(-1)?.created : undefined;
		this.jam.chat.list({ since })
			.then(messages => {
				this.isPolling = false;
				this.messages = [...this.messages, ...messages];
			})
			.catch((error: unknown) => {
				this.isPolling = false;
				this.notify.error(error);
			});
	}

	refresh(): void {
		this.jam.chat.list({})
			.then(messages => {
				this.messages = messages;
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	post(): void {
		const message = this.msg.trim();
		this.msg = '';
		if (message.length > 0) {
			this.jam.chat.create({ message })
				.then(() => {
					this.poll();
				})
				.catch((error: unknown) => {
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
