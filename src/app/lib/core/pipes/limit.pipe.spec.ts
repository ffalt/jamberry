import { LimitPipe } from './limit.pipe';
import { describe, it, expect } from 'vitest';

describe('LimitPipe', () => {
	it('create an instance', () => {
		const pipe = new LimitPipe();
		expect(pipe).toBeTruthy();
	});
});
