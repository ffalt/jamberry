import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { DialogFolderArtworkSearchComponent } from './dialog-folder-artwork-search.component';

describe('DialogFolderArtworkSearchComponent', () => {
	let component: DialogFolderArtworkSearchComponent;
	let fixture: ComponentFixture<DialogFolderArtworkSearchComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, DialogFolderArtworkSearchComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogFolderArtworkSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
