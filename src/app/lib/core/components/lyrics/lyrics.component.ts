import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { type Jam, JamService } from '@jam';
import { LoadingComponent } from '../loading/loading.component';
import { NotifyService } from '../../services/notify/notify.service';
import { PlayerService } from '../../services/player/player.service';
import { MediadurationPipe } from '../../pipes/mediaduration.pipe';
import { cleanUnsyncedLyrics } from '@utils/lyrics';

@Component({
	selector: 'app-lyrics',
	templateUrl: './lyrics.component.html',
	styleUrls: ['./lyrics.component.scss'],
	imports: [LoadingComponent, MediadurationPipe]
})
export class LyricsComponent {
	readonly trackID = input<string>();
	readonly lyrics = signal<Array<string> | undefined>(undefined);
	readonly syncedLyrics = signal<Array<Jam.TrackLyricsLine> | undefined>(undefined);
	readonly lyricsSource = signal<string | undefined>(undefined);
	readonly player = inject(PlayerService);

	readonly isCurrentlyPlaying = computed(() => {
		const trackID = this.trackID();
		return !!trackID && this.player.currentTrack?.id === trackID;
	});

	readonly currentLineIndex = computed(() => {
		if (!this.isCurrentlyPlaying()) {
			return -1;
		}
		const lines = this.syncedLyrics();
		if (!lines || lines.length === 0) {
			return -1;
		}
		const currentTime = this.player.currentTime;
		if (currentTime === undefined) {
			return -1;
		}
		let activeIndex = -1;
		for (const [i, line] of lines.entries()) {
			if (currentTime >= line.timestamp) {
				activeIndex = i;
			} else {
				break;
			}
		}
		return activeIndex;
	});

	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			this.loadLyrics();
		});
	}

	loadLyrics(): void {
		this.lyrics.set(undefined);
		this.syncedLyrics.set(undefined);
		this.lyricsSource.set(undefined);
		const trackID = this.trackID();
		if (!trackID) {
			return;
		}
		this.jam.track.lyrics({ id: trackID, lyricsIncSynced: false })
			.then(data => {
				const entries = data.entries;
				const synced = entries.find(entry => (entry.syncedLines?.length ?? 0) > 0);
				if (synced?.syncedLines) {
					this.lyricsSource.set(synced.source);
					this.syncedLyrics.set(synced.syncedLines);
					return;
				}
				const unsynced = entries.find(entry => !!entry.lyrics);
				this.lyricsSource.set(unsynced?.source);
				const cleaned = unsynced?.lyrics ? cleanUnsyncedLyrics(unsynced.lyrics) : [];
				this.lyrics.set(cleaned.length > 0 ? cleaned : ['No Lyrics found']);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	seek(time: number): void {
		if (this.isCurrentlyPlaying()) {
			this.player.seek(time);
		}
	}
}
