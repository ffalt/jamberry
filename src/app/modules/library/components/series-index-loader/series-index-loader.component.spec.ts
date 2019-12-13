import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ArtistsIndexLoaderComponent} from '@library/components/artists-index-loader/artists-index-loader.component';
import {IndexComponent} from '@library/components/index/index.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ArtistsIndexLoaderComponent', () => {
	let component: ArtistsIndexLoaderComponent;
	let fixture: ComponentFixture<ArtistsIndexLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ArtistsIndexLoaderComponent, MockComponent(IndexComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistsIndexLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
