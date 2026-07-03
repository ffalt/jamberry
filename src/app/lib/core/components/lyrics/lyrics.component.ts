import { Component, effect, inject, input, signal } from '@angular/core';
import { JamService } from '@jam';
import { LoadingComponent } from '../loading/loading.component';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
	selector: 'app-lyrics',
	templateUrl: './lyrics.component.html',
	styleUrls: ['./lyrics.component.scss'],
	imports: [LoadingComponent]
})
export class LyricsComponent {
	readonly trackID = input<string>();
	readonly lyrics = signal<Array<string> | undefined>(undefined);
	readonly lyricsSource = signal<string | undefined>(undefined);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			this.loadLyrics();
		});
	}

	loadLyrics(): void {
		this.lyrics.set(undefined);
		const trackID = this.trackID();
		if (!trackID) {
			return;
		}
		this.jam.track.lyrics({ id: trackID })
			.then(data => {
				this.lyrics.set(data.lyrics ? data.lyrics.split('\n') : ['No Lyrics found']);
				this.lyricsSource.set(data.source);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
