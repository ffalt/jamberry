import { MediadurationPipe } from './mediaduration.pipe';
import { describe, it, expect } from 'vitest';

describe('MediadurationPipe', () => {
	it('create an instance', () => {
		const pipe = new MediadurationPipe();
		expect(pipe).toBeTruthy();
	});
});
