import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumsComponent, AlbumsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('AlbumsLoaderComponent', () => {
	let component: AlbumsLoaderComponent;
	let fixture: ComponentFixture<AlbumsLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				AlbumsLoaderComponent,
				MockComponent(AlbumsComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
