import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ImageFormatType, type Jam, JamService } from '@jam';
import { SliderSpeedComponent } from '../player-slider-speed/slider-speed.component';
import { SliderTimeComponent } from '../player-slider-time/slider-time.component';
import { SliderVolumeComponent } from '../player-slider-volume/slider-volume.component';
import { BackgroundTextComponent } from '@core/components/background-text/background-text.component';
import { ChaptersComponent } from '@core/components/chapters/chapters.component';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { LyricsComponent } from '@core/components/lyrics/lyrics.component';
import { IconExpandComponent } from '@core/components/icons/icon-expand.component';
import { IconFastBackwardComponent } from '@core/components/icons/icon-fast-backward.component';
import { IconFastForwardComponent } from '@core/components/icons/icon-fast-forward.component';
import { IconLeftBoldComponent } from '@core/components/icons/icon-left-bold.component';
import { IconFavComponent } from '@core/components/icons/icon-fav.component';
import { IconLoopComponent } from '@core/components/icons/icon-loop.component';
import { IconPauseComponent } from '@core/components/icons/icon-pause.component';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';
import { IconShuffleComponent } from '@core/components/icons/icon-shuffle.component';
import { IconSpeedComponent } from '@core/components/icons/icon-speed.component';
import { IconVolumeOffComponent } from '@core/components/icons/icon-volume-off.component';
import { IconVolumeUpComponent } from '@core/components/icons/icon-volume-up.component';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { MediadurationPipe } from '@core/pipes/mediaduration.pipe';
import { StringTogglePipe } from '@core/pipes/string-toggle/string-toggle.pipe';
import { ActionsService } from '@core/services/actions/actions.service';
import { AppService } from '@core/services/app/app.service';
import { NavigService } from '@core/services/navig/navig.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import { SettingsStoreService } from '@core/services/settings-store/settings-store.service';

export interface NowPlayingPanel {
	id: string;
	name: string;
}

@Component({
	selector: 'app-now-playing',
	templateUrl: './now-playing.component.html',
	styleUrls: ['./now-playing.component.scss'],
	host: {
		'[class.full-view]': 'fullView',
		'(document:keydown.escape)': 'onEscape()'
	},
	imports: [
		BackgroundTextComponent,
		ChaptersComponent,
		ClickKeyEnterDirective,
		CoverartImageComponent,
		DatePipe,
		DurationPipe,
		IconExpandComponent,
		IconFastBackwardComponent,
		IconFastForwardComponent,
		IconFavComponent,
		IconLeftBoldComponent,
		IconLoopComponent,
		IconPauseComponent,
		IconPlayComponent,
		IconShuffleComponent,
		IconSpeedComponent,
		IconVolumeOffComponent,
		IconVolumeUpComponent,
		LyricsComponent,
		MediadurationPipe,
		SliderSpeedComponent,
		SliderTimeComponent,
		SliderVolumeComponent,
		StringTogglePipe
	]
})
export class NowPlayingComponent {
	readonly player = inject(PlayerService);
	readonly queue = inject(QueueService);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);
	readonly app = inject(AppService);
	readonly showSpeed = signal(false);

	readonly backdropUrl = computed<string | undefined>(() => {
		const media = this.player.currentMedia;
		return media ? `url("${this.jam.image.imageUrl({ id: media.id, size: 300, format: ImageFormatType.webp })}")` : undefined;
	});

	readonly panels = computed<Array<NowPlayingPanel>>(() => {
		const panels: Array<NowPlayingPanel> = [];
		if (this.player.currentTrack) {
			panels.push({ id: 'lyrics', name: 'Lyrics' });
		}
		const episode = this.player.currentEpisode;
		if (episode) {
			panels.push({ id: 'notes', name: 'Episode Notes' });
			if (episode.chapters && episode.chapters.length > 0) {
				panels.push({ id: 'chapters', name: 'Chapters' });
			}
		}
		panels.push({ id: 'upnext', name: 'Up Next' });
		return panels;
	});

	readonly activePanel = computed<string | undefined>(() => {
		const panels = this.panels();
		const selected = this.selectedPanel();
		return panels.some(panel => panel.id === selected) ? selected : panels[0]?.id;
	});

	readonly upNext = computed<Array<Jam.MediaBase>>(() => this.queue.entries.slice(this.queue.currentIndex + 1));

	private readonly jam = inject(JamService);
	private readonly location = inject(Location);
	private readonly settingsStore = inject(SettingsStoreService);
	private readonly selectedPanel = signal<string | undefined>(undefined);

	get fullView(): boolean {
		return this.app.settings.nowPlayingFullView;
	}

	close(): void {
		if (history.length > 1) {
			this.location.back();
		} else {
			this.navig.toLibraryStart();
		}
	}

	toggleFullView(): void {
		this.app.settings.nowPlayingFullView = !this.fullView;
		this.settingsStore.saveSettings();
	}

	onEscape(): void {
		if (this.fullView) {
			this.toggleFullView();
		}
	}

	selectPanel(id: string): void {
		this.selectedPanel.set(id);
	}

	togglePlayPause(): void {
		if (this.player.isPlaying || this.player.currentMedia) {
			this.player.togglePlayPause();
		} else {
			this.player.next();
		}
	}

	toggleRepeat(): void {
		this.player.repeatTrack = !this.player.repeatTrack;
	}

	toggleSpeedControl(): void {
		this.showSpeed.update(value => !value);
	}

	playUpNext(offset: number): void {
		this.player.playQueuePos(this.queue.currentIndex + 1 + offset);
	}
}
