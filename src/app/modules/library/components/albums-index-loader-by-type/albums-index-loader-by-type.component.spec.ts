import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumsIndexLoaderByTypeComponent} from '@library/components/albums-index-loader-by-type/albums-index-loader-by-type.component';
import {AlbumsIndexLoaderComponent} from '@library/components/albums-index-loader/albums-index-loader.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('AlbumsIndexLoaderByTypeComponent', () => {
	let component: AlbumsIndexLoaderByTypeComponent;
	let fixture: ComponentFixture<AlbumsIndexLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				AlbumsIndexLoaderByTypeComponent,
				MockComponent(AlbumsIndexLoaderComponent)
			]
		})
			.compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsIndexLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
