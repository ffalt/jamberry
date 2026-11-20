import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PlayerBarComponent } from './player-bar.component';
import { ActionsService } from '@core/services/actions/actions.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import type { Jam } from '@jam';

function buildTrack(): Jam.Track {
	return {
		id: 'track-1',
		name: 'track-1.mp3',
		objType: 'track',
		albumID: 'album-1',
		artistID: 'artist-1',
		tag: { title: 'Midnight City', artist: 'M83', album: 'Hurry Up' },
		state: {}
	} as Jam.Track;
}

describe('PlayerBarComponent', () => {
	let component: PlayerBarComponent;
	let fixture: ComponentFixture<PlayerBarComponent>;
	let player: PlayerService;
	let queue: QueueService;

	const text = (selector: string): string => fixture.debugElement.query(By.css(selector))?.nativeElement.textContent.trim() ?? '';
	const element = (selector: string): HTMLElement | undefined => fixture.debugElement.query(By.css(selector))?.nativeElement;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, PlayerBarComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerBarComponent);
		component = fixture.componentInstance;
		player = TestBed.inject(PlayerService);
		queue = TestBed.inject(QueueService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('shows nothing playing while the player is empty', () => {
		expect(text('.now-playing .name')).toBe('Nothing playing');
		expect(element('.now-playing .art')).toBeUndefined();
	});

	it('shows cover, title and artist of the current track', () => {
		const track = buildTrack();
		player.currentMedia = track;
		player.currentTrack = track;
		fixture.detectChanges();

		expect(text('.now-playing .name')).toBe('Midnight City');
		expect(text('.now-playing .sub')).toContain('M83');
		expect(text('.now-playing .sub')).toContain('Hurry Up');
		expect(element('.now-playing .art')).toBeTruthy();
	});

	it('announces the current track in a live region', () => {
		const track = buildTrack();
		player.currentMedia = track;
		player.currentTrack = track;
		fixture.detectChanges();

		const live = element('[aria-live="polite"]');
		expect(live?.textContent).toContain('Midnight City');
		expect(live?.textContent).toContain('M83');
	});

	it('shows episode and podcast name for a podcast episode', () => {
		const episode = {
			id: 'episode-1',
			name: 'Episode 1',
			objType: 'episode',
			podcastID: 'podcast-1',
			podcastName: 'A Podcast',
			tag: { title: 'The First One' },
			state: {}
		} as Jam.Episode;
		player.currentMedia = episode;
		player.currentEpisode = episode;
		fixture.detectChanges();

		expect(text('.now-playing .name')).toBe('The First One');
		expect(text('.now-playing .sub')).toContain('A Podcast');
	});

	it('cycles repeat from off over the queue to the track and back', () => {
		expect(component.repeatMode()).toBe('off');

		component.cycleRepeat();
		expect(component.repeatMode()).toBe('queue');
		expect(queue.repeatQueue).toBe(true);
		expect(player.repeatTrack).toBe(false);

		component.cycleRepeat();
		expect(component.repeatMode()).toBe('track');
		expect(queue.repeatQueue).toBe(false);
		expect(player.repeatTrack).toBe(true);

		component.cycleRepeat();
		expect(component.repeatMode()).toBe('off');
		expect(queue.repeatQueue).toBe(false);
		expect(player.repeatTrack).toBe(false);
	});

	it('marks the repeat button as pressed only while repeating', () => {
		expect(element('.ctrl.repeat')?.getAttribute('aria-pressed')).toBe('false');

		component.cycleRepeat();
		fixture.detectChanges();
		expect(element('.ctrl.repeat')?.getAttribute('aria-pressed')).toBe('true');
	});

	it('shuffles the queue', () => {
		queue.entries = [buildTrack()];
		fixture.detectChanges();
		const shuffle = vi.spyOn(queue, 'shuffle').mockImplementation(() => undefined);

		element('.ctrl.shuffle')?.click();

		expect(shuffle).toHaveBeenCalled();
	});

	it('disables shuffle while the queue is empty', () => {
		expect((element('.ctrl.shuffle') as HTMLButtonElement | undefined)?.disabled).toBe(true);
	});

	it('toggles the favorite state of the current media', async () => {
		const track = buildTrack();
		player.currentMedia = track;
		player.currentTrack = track;
		fixture.detectChanges();

		const actions = TestBed.inject(ActionsService);
		const toggle = vi.spyOn(actions, 'toggleMediaBaseFav').mockImplementation(async media => {
			media.state = { faved: 1 };
			return Promise.resolve();
		});

		component.toggleFav();
		await new Promise(resolve => {
			setTimeout(resolve, 0);
		});
		fixture.detectChanges();

		expect(toggle).toHaveBeenCalledWith(track);
		expect(component.faved()).toBe(true);
		expect(element('.ctrl.fav')?.getAttribute('aria-pressed')).toBe('true');
	});

	it('does not toggle the favorite state without current media', () => {
		const actions = TestBed.inject(ActionsService);
		const toggle = vi.spyOn(actions, 'toggleMediaBaseFav');
		component.toggleFav();
		expect(toggle).not.toHaveBeenCalled();
	});

	it('plays the next entry when nothing is loaded yet', () => {
		const next = vi.spyOn(player, 'next').mockImplementation(() => undefined);
		const toggle = vi.spyOn(player, 'togglePlayPause').mockImplementation(() => undefined);

		component.togglePlayPause();

		expect(next).toHaveBeenCalled();
		expect(toggle).not.toHaveBeenCalled();
	});

	it('toggles play and pause while media is loaded', () => {
		player.currentMedia = buildTrack();
		const next = vi.spyOn(player, 'next').mockImplementation(() => undefined);
		const toggle = vi.spyOn(player, 'togglePlayPause').mockImplementation(() => undefined);

		component.togglePlayPause();

		expect(toggle).toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});

	it('keeps previous, play, next, queue and the overflow menu available', () => {
		const selectors = ['.ctrl.previous', '.ctrl.play', '.ctrl.next', '.ctrl.queue', '.ctrl.more'];
		expect(selectors.filter(selector => !element(selector))).toEqual([]);
	});

	it('brackets the transport with the cover and the overflow button', () => {
		expect(element('.bar-row > .now-playing')).toBeTruthy();
		expect(element('.bar-row > .transport')).toBeTruthy();
		expect(element('.bar-row > .utils > .ctrl.more')).toBeTruthy();
	});

	it('renders title and artist as one text block that can take its own row', () => {
		const track = buildTrack();
		player.currentMedia = track;
		player.currentTrack = track;
		fixture.detectChanges();

		const texts = element('.now-playing .texts');
		expect(texts?.querySelector('.name')?.textContent?.trim()).toBe('Midnight City');
		expect(texts?.querySelector('.sub')?.textContent).toContain('M83');
	});

	it('omits the artist and its separator when the track has no artist tag', () => {
		const track = buildTrack();
		track.tag = { title: 'Untagged' };
		player.currentMedia = track;
		player.currentTrack = track;
		fixture.detectChanges();

		expect(text('.now-playing .name')).toBe('Untagged');
		expect(element('.now-playing .sub .lead-dot')).toBeUndefined();
		expect(text('.now-playing .sub')).toBe('');
	});

	it('renders a compact seek slider spanning the bar', () => {
		const seek = element('app-time-slider.seek');
		expect(seek).toBeTruthy();
		expect(seek?.classList.contains('compact')).toBe(true);
		expect(seek?.getAttribute('role')).toBe('slider');
	});
});
