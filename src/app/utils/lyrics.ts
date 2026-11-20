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
