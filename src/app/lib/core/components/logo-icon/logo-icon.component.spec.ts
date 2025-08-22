import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoIconComponent } from './logo-icon.component';

describe('LogoIconComponent', () => {
	let component: LogoIconComponent;
	let fixture: ComponentFixture<LogoIconComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [LogoIconComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LogoIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
