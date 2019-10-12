import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ArtistsLoaderByTypeComponent, ArtistsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ArtistsLoaderByTypeComponent', () => {
	let component: ArtistsLoaderByTypeComponent;
	let fixture: ComponentFixture<ArtistsLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ArtistsLoaderByTypeComponent, MockComponent(ArtistsLoaderComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistsLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
