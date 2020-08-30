import {FocusDirective} from './focus.directive';

export class MockElementRef {
	nativeElement = {};
}

describe('FocusDirective', () => {
	it('should create an instance', () => {
		const directive = new FocusDirective(new MockElementRef());
		expect(directive).toBeTruthy();
	});
});
