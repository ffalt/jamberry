import { describe, expect, it } from 'vitest';
import { cleanUnsyncedLyrics, parseSyncedLyrics } from './lyrics';

describe('lyrics utils', () => {
	describe('parseSyncedLyrics', () => {
		it('parses repeated and inline timestamps, word timing, fractions, and sorts events', () => {
			const lyrics = '[ti:Song]\n[00:20.00]Later\n[00:01.5][00:03:05]<00:01.5>Hello <00:02.00>world [00:04.005]End\n[00:30]';

			expect(parseSyncedLyrics(lyrics)).toEqual([
				{ timestamp: 1500, text: 'Hello world' },
				{ timestamp: 3050, text: 'Hello world' },
				{ timestamp: 4005, text: 'End' },
				{ timestamp: 20_000, text: 'Later' },
				{ timestamp: 30_000, text: '' }
			]);
		});
	});

	describe('cleanUnsyncedLyrics', () => {
		it('should strip empty lines at start and end but keep middle empty lines', () => {
			const raw = `

Line 1
Line 2

Line 3


Line 4


`;
			const result = cleanUnsyncedLyrics(raw);
			expect(result).toEqual([
				'Line 1',
				'Line 2',
				'',
				'Line 3',
				'',
				'',
				'Line 4'
			]);
		});

		it('should handle whitespace-only lines at boundaries', () => {
			const raw = `
   \t
Line 1

Line 2
  \t  
`;
			const result = cleanUnsyncedLyrics(raw);
			expect(result).toEqual([
				'Line 1',
				'',
				'Line 2'
			]);
		});

		it('should handle empty input', () => {
			expect(cleanUnsyncedLyrics('')).toEqual([]);
		});
	});
});
