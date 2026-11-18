export interface SyncedLyricLine {
	time: number;
	text: string;
}

export function parseLrcTimestamp(
	hoursStr: string | undefined,
	minutesStr: string,
	secondsStr: string,
	fractionStr: string | undefined
): number {
	const hours = hoursStr ? Number(hoursStr) : 0;
	const minutes = Number(minutesStr);
	const seconds = Number(secondsStr);
	let ms = 0;
	if (fractionStr) {
		if (fractionStr.length === 1) {
			ms = Number(fractionStr) * 100;
		} else if (fractionStr.length === 2) {
			ms = Number(fractionStr) * 10;
		} else {
			ms = Number(fractionStr.slice(0, 3));
		}
	}
	return (hours * 3600 + minutes * 60 + seconds) * 1000 + ms;
}

function extractTimestamps(line: string): Array<number> {
	const timestampRegex = /\[(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
	const timestamps: Array<number> = [];
	let match = timestampRegex.exec(line);
	while (match !== null) {
		timestamps.push(parseLrcTimestamp(match[1], match[2], match[3], match[4]));
		match = timestampRegex.exec(line);
	}
	return timestamps;
}

export function parseSyncedLyrics(lrc: string): Array<SyncedLyricLine> {
	if (!lrc) {
		return [];
	}
	const lines = lrc.split(/\r?\n/);
	const result: Array<SyncedLyricLine> = [];
	const timestampRegex = /\[(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
	let offset = 0;

	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line) {
			continue;
		}

		const offsetMatch = /^\[offset:\s*([+-]?\d+)\s*\]$/i.exec(line);
		if (offsetMatch) {
			offset = Number(offsetMatch[1]) || 0;
			continue;
		}

		if (/^\[[a-zA-Z]+:.*\]$/.test(line) && !timestampRegex.test(line)) {
			continue;
		}

		const timestamps = extractTimestamps(line);
		if (timestamps.length === 0) {
			continue;
		}

		const text = line.replaceAll(timestampRegex, '').trim();
		for (const time of timestamps) {
			result.push({
				time: Math.max(0, time + offset),
				text
			});
		}
	}

	result.sort((a, b) => a.time - b.time);
	return result;
}

export function cleanUnsyncedLyrics(lyrics: string): Array<string> {
	if (!lyrics) {
		return [];
	}
	const lines = lyrics.split(/\r?\n/);
	while (lines.length > 0 && lines[0]?.trim() === '') {
		lines.shift();
	}
	while (lines.length > 0 && lines.at(-1)?.trim() === '') {
		lines.pop();
	}
	return lines;
}
