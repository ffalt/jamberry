import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { DialogChooseFolderComponent } from './dialog-choose-folder.component';

describe('DialogChooseFolderComponent', () => {
	let component: DialogChooseFolderComponent;
	let fixture: ComponentFixture<DialogChooseFolderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, DialogChooseFolderComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogChooseFolderComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
