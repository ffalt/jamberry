import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderMusicbrainzComponent, MbArtistComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('FolderMusicbrainzComponent', () => {
	let component: FolderMusicbrainzComponent;
	let fixture: ComponentFixture<FolderMusicbrainzComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				FolderMusicbrainzComponent,
				MockComponent(MbArtistComponent)
			]
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
