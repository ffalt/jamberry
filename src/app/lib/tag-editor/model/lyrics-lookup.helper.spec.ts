import { describe, expect, it, vi } from 'vitest';
import type { JamService } from '@jam';
import { findLyrics } from './lyrics-lookup.helper';

describe('findLyrics duration', () => {
	it.each([[1000, 1], [170_360, 170], [180_500, 181], [3_600_000, 3600]])('converts %s milliseconds to %s seconds', async (duration, seconds) => {
		const metadata = { lcrlibSearch: vi.fn().mockResolvedValue({ data: { plainLyrics: 'Lyrics' } }), lyricsovhSearch: vi.fn() };

		await findLyrics({ metadata } as unknown as JamService, { title: 'Song', artist: 'Artist', album: 'Album', duration });

		expect(metadata.lcrlibSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', album: 'Album', duration: seconds });
	});

	it('preserves an unavailable duration', async () => {
		const metadata = { lcrlibSearch: vi.fn().mockResolvedValue({ data: { plainLyrics: 'Lyrics' } }), lyricsovhSearch: vi.fn() };

		await findLyrics({ metadata } as unknown as JamService, { title: 'Song', artist: 'Artist' });

		expect(metadata.lcrlibSearch).toHaveBeenCalledWith({ title: 'Song', artist: 'Artist', duration: undefined });
	});
});
