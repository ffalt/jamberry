import type { Jam, JamParameters, JamService } from '@jam';

interface LrclibResult {
	id?: number;
	plainLyrics?: string | null;
	syncedLyrics?: string | null;
}

function isOptionalString(value: unknown): value is string | null | undefined {
	return typeof value === 'string' || value === undefined || (typeof value === 'object' && !value);
}

function lrclibLyrics(data: unknown): Jam.TrackLyrics | undefined {
	if (data === undefined || (typeof data === 'object' && !data)) {
		return;
	}
	if (typeof data !== 'object' || Array.isArray(data)) {
		throw new TypeError('Invalid LRCLIB response');
	}
	const lyrics = data as LrclibResult;
	if (!isOptionalString(lyrics.plainLyrics) || !isOptionalString(lyrics.syncedLyrics)) {
		throw new Error('Invalid LRCLIB lyrics');
	}
	if (lyrics.plainLyrics || lyrics.syncedLyrics) {
		return {
			lyrics: lyrics.plainLyrics ?? undefined,
			syncedLyrics: lyrics.syncedLyrics ?? undefined,
			source: typeof lyrics.id === 'number' ? `https://lrclib.net/api/get/${lyrics.id}` : undefined
		};
	}
	return;
}

export async function findLyrics(
	jam: JamService,
	{ title, artist, album, duration: durationMs }: { title: string; artist: string; album?: string; duration?: number }
): Promise<Jam.TrackLyrics | undefined> {
	const durationSeconds = durationMs === undefined ? undefined : Math.round(durationMs / 1000);
	const parameters = {
		title,
		artist,
		...(album && { album }),
		duration: durationSeconds
	};
	const result = await jam.metadata.lcrlibSearch(parameters as JamParameters.LrclibSearchParameters);
	const lyrics = lrclibLyrics(result.data);
	if (lyrics) {
		return lyrics;
	}
	const fallback = await jam.metadata.lyricsovhSearch({ title, artist });
	return fallback.data?.lyrics || fallback.data?.syncedLyrics ? fallback.data : undefined;
}
