import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogFolderComponent } from './dialog-folder.component';

describe('DialogFolderComponent', () => {
	let component: DialogFolderComponent;
	let fixture: ComponentFixture<DialogFolderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [DialogFolderComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogFolderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
