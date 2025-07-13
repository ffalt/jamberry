import {Component, type OnChanges, inject, input} from '@angular/core';
import {NotifyService} from '@core/services';
import {JamService} from '@jam';

@Component({
	selector: 'app-lyrics',
	templateUrl: './lyrics.component.html',
	styleUrls: ['./lyrics.component.scss'],
	standalone: false
})
export class LyricsComponent implements OnChanges {
	readonly trackID = input<string>();
	lyrics?: Array<string>;
	lyricsSource?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	loadLyrics(): void {
		this.lyrics = undefined;
		const trackID = this.trackID();
		if (!trackID) {
			return;
		}
		this.jam.track.lyrics({id: trackID})
			.then(data => {
				this.lyrics = data.lyrics ? data.lyrics.split('\n') : undefined;
				this.lyricsSource = data.source;
				if (!this.lyrics) {
					this.lyrics = ['No Lyrics found'];
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	ngOnChanges(): void {
		this.loadLyrics();
	}
}
