import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS } from '../../../../app.mock';
import { FolderArtworkSearchImageComponent } from './folder-artwork-search-image.component';

describe('FolderArtworkSearchImageComponent', () => {
	let component: FolderArtworkSearchImageComponent;
	let fixture: ComponentFixture<FolderArtworkSearchImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, FolderArtworkSearchImageComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderArtworkSearchImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
