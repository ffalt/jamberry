import { ClickStopDirective } from './click-stop.directive';
import { describe, it, expect } from 'vitest';

describe('ClickStopDirective', () => {
	it('should create an instance', () => {
		const directive = new ClickStopDirective();
		expect(directive).toBeTruthy();
	});
});
