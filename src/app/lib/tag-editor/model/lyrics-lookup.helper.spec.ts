import { describe, expect, it, vi } from 'vitest';
import type { JamService } from '@jam';
import { findLyrics } from './lyrics-lookup.helper';

function setup() {
	const track = {
		lyricsSidecars: vi.fn().mockResolvedValue({ entries: [] }),
		lyrics: vi.fn()
	};
	const metadata = { lyricsSearch: vi.fn() };
	return { jam: { track, metadata }, track, metadata };
}

describe('findLyrics', () => {
	it.each([[1000, 1], [170_360, 170], [180_500, 181], [3_600_000, 3600]])('converts %s milliseconds to %s seconds', async (duration, seconds) => {
		const { jam, track, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Lyrics' }] });

		await findLyrics(jam as unknown as JamService, { title: 'Song', artist: 'Artist', album: 'Album', duration });

		expect(track.lyricsSidecars).not.toHaveBeenCalled();
		expect(metadata.lyricsSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', album: 'Album', duration: seconds });
	});

	it('preserves an unavailable duration', async () => {
		const { jam, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'Lyrics' }] });

		await findLyrics(jam as unknown as JamService, { title: 'Song', artist: 'Artist' });

		expect(metadata.lyricsSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', duration: undefined });
	});

	it('uses track sidecar lyrics before searching external services', async () => {
		const { jam, track, metadata } = setup();
		track.lyricsSidecars.mockResolvedValue({ entries: [{ name: 'Song.lrc', synced: true, writtenByJam: false }] });
		track.lyrics.mockResolvedValue({ entries: [
			{ lyrics: 'Unrelated plain lyrics' },
			{ syncedLyrics: '[00:01.00]Lyrics', source: 'Song.lrc' }
		] });

		const result = await findLyrics(jam as unknown as JamService, { trackId: 'track-id', title: 'Song', artist: 'Artist' });

		expect(result).toEqual({ syncedLyrics: '[00:01.00]Lyrics', source: 'Song.lrc' });
		expect(track.lyricsSidecars).toHaveBeenCalledWith({ id: 'track-id' });
		expect(track.lyrics).toHaveBeenCalledWith({ id: 'track-id' });
		expect(metadata.lyricsSearch).not.toHaveBeenCalled();
	});

	it('searches external services when the track has no sidecars', async () => {
		const { jam, track, metadata } = setup();
		metadata.lyricsSearch.mockResolvedValue({ entries: [{ lyrics: 'External lyrics', source: 'External service' }] });

		const result = await findLyrics(jam as unknown as JamService, { trackId: 'track-id', title: 'Song', artist: 'Artist' });

		expect(result).toEqual({ lyrics: 'External lyrics', source: 'External service' });
		expect(track.lyricsSidecars).toHaveBeenCalledWith({ id: 'track-id' });
		expect(track.lyrics).not.toHaveBeenCalled();
		expect(metadata.lyricsSearch).toHaveBeenCalled();
	});

	it('searches external services when sidecars contain no usable lyrics', async () => {
		const { jam, track, metadata } = setup();
		const lookupOrder: Array<string> = [];
		track.lyricsSidecars.mockResolvedValue({ entries: [{ name: 'Song.lrc', synced: true, writtenByJam: false }] });
		track.lyrics.mockImplementation(async () => {
			lookupOrder.push('sidecar lyrics');
			return { entries: [] };
		});
		track.lyricsSidecars.mockImplementation(async () => {
			lookupOrder.push('sidecars');
			return { entries: [{ name: 'Song.lrc', synced: true, writtenByJam: false }] };
		});
		metadata.lyricsSearch.mockImplementation(async () => {
			lookupOrder.push('external search');
			return { entries: [{ lyrics: 'External lyrics' }] };
		});

		const result = await findLyrics(jam as unknown as JamService, { trackId: 'track-id', title: 'Song', artist: 'Artist' });

		expect(result).toEqual({ lyrics: 'External lyrics' });
		expect(lookupOrder).toEqual(['sidecars', 'sidecar lyrics', 'external search']);
		expect(metadata.lyricsSearch).toHaveBeenCalled();
	});
});
