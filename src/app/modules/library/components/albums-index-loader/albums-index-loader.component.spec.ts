import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumsIndexLoaderComponent, IndexComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('AlbumsIndexLoaderComponent', () => {
	let component: AlbumsIndexLoaderComponent;
	let fixture: ComponentFixture<AlbumsIndexLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				AlbumsIndexLoaderComponent,
				MockComponent(IndexComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsIndexLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
