import { JsonPipe } from './json.pipe';
import { describe, it, expect } from 'vitest';

describe('JsonPipe', () => {
	it('create an instance', () => {
		const pipe = new JsonPipe();
		expect(pipe).toBeTruthy();
	});
});
