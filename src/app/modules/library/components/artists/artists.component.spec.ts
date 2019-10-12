import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ArtistComponent, ArtistsComponent, ViewTypeToggleComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ArtistsComponent', () => {
	let component: ArtistsComponent;
	let fixture: ComponentFixture<ArtistsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ArtistsComponent, MockComponent(ArtistComponent), MockComponent(ViewTypeToggleComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
