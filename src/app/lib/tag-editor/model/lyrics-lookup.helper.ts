import type { Jam, JamParameters, JamService } from '@jam';

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isOptionalString(value: unknown): value is string | null | undefined {
	return typeof value === 'string' || value === undefined || value === null;
}

function lyricsEntries(response: unknown): Array<Jam.TrackLyrics> {
	if (!isRecord(response) || !Array.isArray(response.entries)) {
		throw new TypeError('Invalid lyrics response');
	}
	return response.entries.map((entry: unknown) => {
		if (!isRecord(entry)) {
			throw new TypeError('Invalid lyrics response');
		}
		if (!isOptionalString(entry.lyrics) || !isOptionalString(entry.syncedLyrics)) {
			throw new Error('Invalid lyrics');
		}
		return entry as Jam.TrackLyrics;
	});
}

function hasLyrics(lyrics: Jam.TrackLyrics): boolean {
	return !!lyrics.lyrics || !!lyrics.syncedLyrics || (lyrics.syncedLines?.length ?? 0) > 0;
}

function hasSyncedLyrics(lyrics: Jam.TrackLyrics): boolean {
	return !!lyrics.syncedLyrics || (lyrics.syncedLines?.length ?? 0) > 0;
}

function sidecarLyrics(sidecars: Array<Jam.TrackLyricsSidecar>, lyrics: Array<Jam.TrackLyrics>): Jam.TrackLyrics | undefined {
	for (const sidecar of sidecars) {
		const matchingSource = lyrics.find(entry => hasLyrics(entry) &&
			((sidecar.source !== undefined && entry.source === sidecar.source) || entry.source === sidecar.name));
		if (matchingSource) {
			return matchingSource;
		}
		const matchingType = lyrics.find(entry => hasLyrics(entry) && (sidecar.synced ? hasSyncedLyrics(entry) : !!entry.lyrics));
		if (matchingType) {
			return matchingType;
		}
	}
	return undefined;
}

function lyricsWithContent(lyrics: Array<Jam.TrackLyrics>): Jam.TrackLyrics | undefined {
	return lyrics.find(entry => hasLyrics(entry));
}

export async function findLyrics(
	jam: JamService,
	{ trackId, title, artist, album, duration: durationMs }: { trackId?: string; title: string; artist: string; album?: string; duration?: number }
): Promise<Jam.TrackLyrics | undefined> {
	if (trackId) {
		const sidecars = await jam.track.lyricsSidecars({ id: trackId });
		if (sidecars.entries.length > 0) {
			const trackLyrics = await jam.track.lyrics({ id: trackId });
			const lyrics = sidecarLyrics(sidecars.entries, lyricsEntries(trackLyrics));
			if (lyrics) {
				return lyrics;
			}
		}
	}

	const parameters: JamParameters.MetadataLyricsSearchParameters = {
		title,
		artist,
		...(album && { album }),
		duration: durationMs === undefined ? undefined : Math.round(durationMs / 1000)
	};
	const externalLyrics = await jam.metadata.lyricsSearch(parameters);
	return lyricsWithContent(lyricsEntries(externalLyrics));
}
