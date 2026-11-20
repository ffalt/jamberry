import { describe, expect, it } from 'vitest';
import { cleanUnsyncedLyrics } from './lyrics';

describe('lyrics utils', () => {
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
