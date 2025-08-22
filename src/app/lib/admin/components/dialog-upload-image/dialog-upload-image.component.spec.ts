import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { DialogUploadImageComponent } from './dialog-upload-image.component';

describe('DialogUploadImageComponent', () => {
	let component: DialogUploadImageComponent;
	let fixture: ComponentFixture<DialogUploadImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, DialogUploadImageComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogUploadImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
