import { describe, expect, it, vi } from 'vitest';
import type { JamService } from '@jam';
import type { NotifyService } from '@core/services/notify/notify.service';
import type { Matching, MatchRelease } from '../../model/release-matching.helper';
import { Matcher } from './matcher';

function setup() {
	const metadata = { lyricsSearch: vi.fn() };
	const trackService = { lyricsSidecars: vi.fn().mockResolvedValue({ entries: [] }), lyrics: vi.fn() };
	const notify = { error: vi.fn() };
	const matcher = new Matcher({ metadata, track: trackService } as unknown as JamService, notify as unknown as NotifyService);
	const match = {
		track: { id: '1', name: 'Song', duration: 170_360 },
		mbTrack: { title: 'Song', artistCredit: [{ name: 'Artist' }] }
	} as Matching;
	const release = {
		mbRelease: { title: 'Album' },
		media: [{ tracks: [{ mbTrack: match.mbTrack, currentMatch: { match } }] }]
	} as unknown as MatchRelease;
	matcher.prepare([match]);
	return { matcher, match, release, metadata, trackService, notify };
}

describe('Matcher lyrics lookup', () => {
	it('loads plain and synced lyrics from external search results', async () => {
		const { matcher, match, release, metadata, trackService } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Plain', syncedLyrics: '[00:01.00]Plain', source: 'Lyrics service' }] });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(trackService.lyricsSidecars).toHaveBeenCalledWith({ id: '1' });
		expect(metadata.lyricsSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', album: 'Album', duration: 170 });
		expect(match.lyrics).toEqual({ lyrics: 'Plain', syncedLyrics: '[00:01.00]Plain', source: 'Lyrics service' });
	});

	it('uses sidecar lyrics before external search results', async () => {
		const { matcher, match, release, metadata, trackService } = setup();
		trackService.lyricsSidecars.mockResolvedValue({ entries: [{ name: 'Song.lrc', synced: true, writtenByJam: false }] });
		trackService.lyrics.mockResolvedValue({ entries: [{ syncedLyrics: '[00:01.00]Line', source: 'Song.lrc' }] });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(match.lyrics).toMatchObject({ syncedLyrics: '[00:01.00]Line' });
		expect(metadata.lyricsSearch).not.toHaveBeenCalled();
	});

	it('uses the MusicBrainz duration and omits unavailable album details', async () => {
		const { matcher, match, release, metadata } = setup();
		match.track.duration = 0;
		if (!match.mbTrack) throw new Error('Missing track');
		match.mbTrack.length = 180_500;
		release.mbRelease.title = '';
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Lyrics' }] });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(metadata.lyricsSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', duration: 181 });
	});

	it('skips tracks that already have lyrics', async () => {
		const { matcher, match, release, metadata, trackService } = setup();
		match.lyrics = { syncedLyrics: '[00:01.00]Existing' };

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(trackService.lyricsSidecars).not.toHaveBeenCalled();
		expect(metadata.lyricsSearch).not.toHaveBeenCalled();
	});

	it('retries tracks with empty external search results later', async () => {
		const { matcher, match, release, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValueOnce({ entries: [] }).mockResolvedValueOnce({ entries: [{ lyrics: 'External' }] });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));
		expect(match.lyrics).toBeUndefined();
		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(match.lyrics?.lyrics).toBe('External');
		expect(metadata.lyricsSearch).toHaveBeenCalledTimes(2);
	});

	it('reports external lyrics search failures', async () => {
		const { matcher, release, metadata, notify } = setup();
		const error = new Error('Lyrics search unavailable');
		metadata.lyricsSearch.mockRejectedValue(error);

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(notify.error).toHaveBeenCalledWith(error);
	});

	it('reports malformed external lyrics responses', async () => {
		const { matcher, release, metadata, notify } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 123 }] });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(notify.error).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid lyrics' }));
	});
});
