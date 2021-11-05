import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChildTooltipContentComponent} from './child-tooltip-content.component';

describe('ChildTooltipContentComponent', () => {
	let component: ChildTooltipContentComponent;
	let fixture: ComponentFixture<ChildTooltipContentComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [ChildTooltipContentComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChildTooltipContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
