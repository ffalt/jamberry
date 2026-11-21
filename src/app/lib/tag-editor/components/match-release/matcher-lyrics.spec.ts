import { describe, expect, it, vi } from 'vitest';
import type { JamService } from '@jam';
import type { NotifyService } from '@core/services/notify/notify.service';
import type { Matching, MatchRelease } from '../../model/release-matching.helper';
import { Matcher } from './matcher';

function setup() {
	const metadata = { lcrlibSearch: vi.fn(), lyricsovhSearch: vi.fn() };
	const notify = { error: vi.fn() };
	const matcher = new Matcher({ metadata } as unknown as JamService, notify as unknown as NotifyService);
	const match = {
		track: { id: '1', name: 'Song', duration: 170_360 },
		mbTrack: { title: 'Song', artistCredit: [{ name: 'Artist' }] }
	} as Matching;
	const release = {
		mbRelease: { title: 'Album' },
		media: [{ tracks: [{ mbTrack: match.mbTrack, currentMatch: { match } }] }]
	} as unknown as MatchRelease;
	matcher.prepare([match]);
	return { matcher, match, release, metadata, notify };
}

describe('Matcher lyrics lookup', () => {
	it('loads plain and synced LRCLIB lyrics without querying OVH', async () => {
		const { matcher, match, release, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: { id: 123, plainLyrics: 'Plain', syncedLyrics: '[00:01.00]Plain' } });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(metadata.lcrlibSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', album: 'Album', duration: 170 });
		expect(match.lyrics).toEqual({ lyrics: 'Plain', syncedLyrics: '[00:01.00]Plain', source: 'https://lrclib.net/api/get/123' });
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('keeps synced-only LRCLIB lyrics without querying OVH', async () => {
		const { matcher, match, release, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: { syncedLyrics: '[00:01.00]Line' } });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(match.lyrics).toMatchObject({ syncedLyrics: '[00:01.00]Line' });
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('keeps plain-only LRCLIB lyrics without querying OVH', async () => {
		const { matcher, match, release, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: { plainLyrics: 'Plain only', syncedLyrics: JSON.parse('null') } });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(match.lyrics?.lyrics).toBe('Plain only');
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('uses the MusicBrainz duration and omits unavailable album details', async () => {
		const { matcher, match, release, metadata } = setup();
		match.track.duration = 0;
		if (!match.mbTrack) throw new Error('Missing track');
		match.mbTrack.length = 180_500;
		release.mbRelease.title = '';
		metadata.lcrlibSearch.mockResolvedValue({ data: { plainLyrics: 'Lyrics' } });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(metadata.lcrlibSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', duration: 181 });
	});

	it('skips tracks that already have lyrics', async () => {
		const { matcher, match, release, metadata } = setup();
		match.lyrics = { syncedLyrics: '[00:01.00]Existing' };

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(metadata.lcrlibSearch).not.toHaveBeenCalled();
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('falls back to OVH when LRCLIB has no lyrics and retries empty results later', async () => {
		const { matcher, match, release, metadata } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: {} });
		metadata.lyricsovhSearch.mockResolvedValueOnce({ data: {} }).mockResolvedValueOnce({ data: { lyrics: 'OVH' } });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));
		expect(match.lyrics).toBeUndefined();
		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(match.lyrics?.lyrics).toBe('OVH');
		expect(metadata.lyricsovhSearch).toHaveBeenCalledTimes(2);
	});

	it('reports LRCLIB failures without treating them as missing lyrics', async () => {
		const { matcher, release, metadata, notify } = setup();
		const error = new Error('LRCLIB unavailable');
		metadata.lcrlibSearch.mockRejectedValue(error);

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(notify.error).toHaveBeenCalledWith(error);
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});

	it('reports malformed LRCLIB responses instead of falling back', async () => {
		const { matcher, release, metadata, notify } = setup();
		metadata.lcrlibSearch.mockResolvedValue({ data: { plainLyrics: 123 } });

		matcher.loadLyrics(release);
		await vi.waitFor(() => expect(matcher.isRunning()).toBe(false));

		expect(notify.error).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid LRCLIB lyrics' }));
		expect(metadata.lyricsovhSearch).not.toHaveBeenCalled();
	});
});
