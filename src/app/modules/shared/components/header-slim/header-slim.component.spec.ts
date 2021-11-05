import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderSlimComponent} from './header-slim.component';

describe('BackgroundTextComponent', () => {
	let component: HeaderSlimComponent;
	let fixture: ComponentFixture<HeaderSlimComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [HeaderSlimComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderSlimComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
