import {type ComponentFixture, TestBed} from '@angular/core/testing';

import {SplitterComponent} from './splitter.component';

describe('SplitterComponent', () => {
	let component: SplitterComponent;
	let fixture: ComponentFixture<SplitterComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [SplitterComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SplitterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
