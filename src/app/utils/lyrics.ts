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

export function parseSyncedLyrics(lyrics: string): Array<{ timestamp: number; text: string }> {
	const result: Array<{ timestamp: number; text: string }> = [];
	for (const line of lyrics.split(/\r?\n/)) {
		// Iterator helpers are not included in the application's TypeScript library target.
		// eslint-disable-next-line unicorn/prefer-iterator-to-array
		const stamps = [...line.matchAll(/\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?]/g)];
		let pending: Array<number> = [];
		for (const [index, stamp] of stamps.entries()) {
			const [, minutes, seconds, fraction = ''] = stamp;
			const timestamp = Number(minutes) * 60_000 + Number(seconds) * 1000 + Number(fraction.padEnd(3, '0'));
			pending.push(timestamp);
			const text = line.slice(stamp.index + stamp[0].length, stamps[index + 1]?.index ?? line.length).trim();
			if (text || index === stamps.length - 1) {
				const cleaned = text.replaceAll(/<\d{1,3}:\d{1,2}(?:[.:]\d{1,3})?>/g, '').replaceAll(/ {2,}/g, ' ').trim();
				result.push(...pending.map(time => ({ timestamp: time, text: cleaned })));
				pending = [];
			}
		}
	}
	return result.toSorted((a, b) => a.timestamp - b.timestamp);
}
