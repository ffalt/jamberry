import { DurationPipe } from './duration.pipe';
import { describe, it, expect } from 'vitest';

describe('DurationPipe', () => {
	it('create an instance', () => {
		const pipe = new DurationPipe();
		expect(pipe).toBeTruthy();
	});
});
