import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IndexComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ArtistIndexPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('ArtistIndexPageComponent', () => {
	let component: ArtistIndexPageComponent;
	let fixture: ComponentFixture<ArtistIndexPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ArtistIndexPageComponent, MockComponent(IndexComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistIndexPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
