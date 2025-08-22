import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { FolderMusicbrainzComponent } from './folder-musicbrainz.component';

describe('FolderMusicbrainzComponent', () => {
	let component: FolderMusicbrainzComponent;
	let fixture: ComponentFixture<FolderMusicbrainzComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, FolderMusicbrainzComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderMusicbrainzComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
