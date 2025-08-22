import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionsPageComponent } from './sessions-page.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('SessionsPageComponent', () => {
	let component: SessionsPageComponent;
	let fixture: ComponentFixture<SessionsPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, SessionsPageComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SessionsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
