import { describe, expect, it } from 'vitest';
import { cleanUnsyncedLyrics, parseLrcTimestamp, parseSyncedLyrics } from './lyrics';

describe('lyrics utils', () => {
	describe('parseLrcTimestamp', () => {
		it('should parse mm:ss.xx correctly', () => {
			expect(parseLrcTimestamp(undefined, '01', '23', '45')).toBe(83_450);
			expect(parseLrcTimestamp(undefined, '00', '05', '5')).toBe(5500);
			expect(parseLrcTimestamp(undefined, '02', '10', '123')).toBe(130_123);
		});

		it('should parse hh:mm:ss.xx correctly', () => {
			expect(parseLrcTimestamp('01', '02', '03', '45')).toBe(3_723_450);
		});

		it('should parse mm:ss without fraction', () => {
			expect(parseLrcTimestamp(undefined, '01', '00', undefined)).toBe(60_000);
		});
	});

	describe('parseSyncedLyrics', () => {
		it('should parse standard LRC format', () => {
			const lrc = `
[00:12.00]Line 1
[00:15.50]Line 2
[01:05.10]Line 3
`;
			const result = parseSyncedLyrics(lrc);
			expect(result).toEqual([
				{ time: 12_000, text: 'Line 1' },
				{ time: 15_500, text: 'Line 2' },
				{ time: 65_100, text: 'Line 3' }
			]);
		});

		it('should handle metadata tags and ignore them', () => {
			const lrc = `
[ti:Song Title]
[ar:Artist Name]
[al:Album Name]
[00:10.00]First line
[length:03:45]
`;
			const result = parseSyncedLyrics(lrc);
			expect(result).toEqual([
				{ time: 10_000, text: 'First line' }
			]);
		});

		it('should handle offset tag', () => {
			const lrc = `
[offset:500]
[00:10.00]First line
`;
			const result = parseSyncedLyrics(lrc);
			expect(result).toEqual([
				{ time: 10_500, text: 'First line' }
			]);
		});

		it('should handle multiple timestamps on a single line and sort by time', () => {
			const lrc = `
[00:20.00][00:10.00]Chorus line
[00:15.00]Verse line
`;
			const result = parseSyncedLyrics(lrc);
			expect(result).toEqual([
				{ time: 10_000, text: 'Chorus line' },
				{ time: 15_000, text: 'Verse line' },
				{ time: 20_000, text: 'Chorus line' }
			]);
		});

		it('should return empty array for empty or invalid LRC', () => {
			expect(parseSyncedLyrics('')).toEqual([]);
			expect(parseSyncedLyrics('Just plain text\nwith no timestamps')).toEqual([]);
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
