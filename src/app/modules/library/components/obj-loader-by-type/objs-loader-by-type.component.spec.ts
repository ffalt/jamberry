import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumsLoaderByTypeComponent, AlbumsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('AlbumsLoaderByTypeComponent', () => {
	let component: AlbumsLoaderByTypeComponent;
	let fixture: ComponentFixture<AlbumsLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [AlbumsLoaderByTypeComponent, MockComponent(AlbumsLoaderComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
