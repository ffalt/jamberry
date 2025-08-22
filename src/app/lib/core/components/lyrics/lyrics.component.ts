import { Component, inject, input, type OnChanges } from '@angular/core';
import { JamService } from '@jam';
import { LoadingComponent } from '../loading/loading.component';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
	selector: 'app-lyrics',
	templateUrl: './lyrics.component.html',
	styleUrls: ['./lyrics.component.scss'],
	imports: [LoadingComponent]
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
		this.jam.track.lyrics({ id: trackID })
			.then(data => {
				this.lyrics = data.lyrics ? data.lyrics.split('\n') : undefined;
				this.lyricsSource = data.source;
				this.lyrics ??= ['No Lyrics found'];
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	ngOnChanges(): void {
		this.loadLyrics();
	}
}
