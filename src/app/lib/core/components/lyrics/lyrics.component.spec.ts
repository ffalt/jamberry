import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { LyricsComponent } from './lyrics.component';
import { TEST_IMPORTS } from '../../../../app.mock';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JamService, JamObjectType } from '@jam';
import { PlayerService } from '../../services/player/player.service';

describe('LyricsComponent', () => {
	let component: LyricsComponent;
	let fixture: ComponentFixture<LyricsComponent>;
	let jam: JamService;
	let player: PlayerService;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, LyricsComponent],
			teardown: { destroyAfterEach: false }
		})
			.compileComponents());

	beforeEach(() => {
		jam = TestBed.inject(JamService);
		player = TestBed.inject(PlayerService);
		fixture = TestBed.createComponent(LyricsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display synced lyrics with time prefixes and highlight the current line', async () => {
		vi.spyOn(jam.track, 'lyrics').mockResolvedValue({
			syncedLyrics: '[00:10.00]Line one\n[00:20.00]Line two\n[00:30.00]Line three'
		});

		fixture.componentRef.setInput('trackID', 't1');
		await fixture.whenStable();
		fixture.detectChanges();

		expect(component.syncedLyrics()).toEqual([
			{ time: 10_000, text: 'Line one' },
			{ time: 20_000, text: 'Line two' },
			{ time: 30_000, text: 'Line three' }
		]);

		const el = fixture.nativeElement as HTMLElement;
		const lines = el.querySelectorAll('.synced-line');
		expect(lines).toHaveLength(3);
		expect(lines[0].querySelector('.synced-time')?.textContent?.trim()).toBe('00:10');
		expect(lines[0].querySelector('.synced-text')?.textContent?.trim()).toBe('Line one');

		// Set current player track and time to 22s (22000ms) -> line 2 (index 1) should be active
		player.currentTrack = { id: 't1', name: 'Track 1', objType: JamObjectType.track } as any;
		player.currentTime = 22_000;
		fixture.detectChanges();

		expect(component.currentLineIndex()).toBe(1);
		const activeLine = el.querySelector('.synced-line.active');
		expect(activeLine).toBeTruthy();
		expect(activeLine?.querySelector('.synced-text')?.textContent?.trim()).toBe('Line two');
	});

	it('should seek only when a synced time prefix is clicked and track is currently playing', async () => {
		vi.spyOn(jam.track, 'lyrics').mockResolvedValue({
			syncedLyrics: '[00:10.00]Line one\n[00:20.00]Line two'
		});
		const seekSpy = vi.spyOn(player, 'seek');

		// 1. When track is NOT currently playing (e.g. viewing track on profile page while another/no track plays)
		player.currentTrack = undefined;
		fixture.componentRef.setInput('trackID', 't1');
		await fixture.whenStable();
		fixture.detectChanges();

		const el = fixture.nativeElement as HTMLElement;
		const syncedContainer = el.querySelector('.synced-lyrics') as HTMLElement;
		expect(syncedContainer.classList.contains('is-playing')).toBe(false);

		const secondLine = el.querySelectorAll('.synced-line')[1] as HTMLElement;
		const secondText = secondLine.querySelector('.synced-text') as HTMLElement;
		const secondTime = secondLine.querySelector('.synced-time') as HTMLElement;

		// Clicking timestamp when track is not playing should not seek
		secondTime.click();
		expect(seekSpy).not.toHaveBeenCalled();

		// 2. When track IS currently playing
		player.currentTrack = { id: 't1', name: 'Track 1', objType: JamObjectType.track } as any;
		fixture.detectChanges();
		expect(syncedContainer.classList.contains('is-playing')).toBe(true);

		// Clicking text or line itself should not seek
		secondText.click();
		expect(seekSpy).not.toHaveBeenCalled();

		// Clicking timestamp should seek
		secondTime.click();
		expect(seekSpy).toHaveBeenCalledWith(20_000);
	});

	it('should display unsynced lyrics preserving empty lines in the middle', async () => {
		vi.spyOn(jam.track, 'lyrics').mockResolvedValue({
			lyrics: '\n\nVerse 1 line 1\nVerse 1 line 2\n\nVerse 2 line 1\n\n'
		});

		fixture.componentRef.setInput('trackID', 't2');
		await fixture.whenStable();
		fixture.detectChanges();

		expect(component.lyrics()).toEqual([
			'Verse 1 line 1',
			'Verse 1 line 2',
			'',
			'Verse 2 line 1'
		]);

		const el = fixture.nativeElement as HTMLElement;
		const lines = el.querySelectorAll('.lyrics-line');
		expect(lines).toHaveLength(4);
	});
});
