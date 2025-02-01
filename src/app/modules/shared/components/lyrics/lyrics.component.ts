import {Component, Input, OnChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {JamService} from '@jam';

@Component({
    selector: 'app-lyrics',
    templateUrl: './lyrics.component.html',
    styleUrls: ['./lyrics.component.scss'],
    standalone: false
})
export class LyricsComponent implements OnChanges {
	@Input() trackID?: string;
	lyrics?: Array<string>;
	lyricsSource?: string;

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	loadLyrics(): void {
		this.lyrics = undefined;
		if (!this.trackID) {
			return;
		}
		this.jam.track.lyrics({id: this.trackID})
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
