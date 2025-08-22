import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogMatchReleaseComponent } from './dialog-match-release.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('DialogMatchReleaseComponent', () => {
	let component: DialogMatchReleaseComponent;
	let fixture: ComponentFixture<DialogMatchReleaseComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, DialogMatchReleaseComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogMatchReleaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
