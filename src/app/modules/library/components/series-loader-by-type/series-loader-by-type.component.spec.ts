import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SeriesLoaderByTypeComponent, SeriesLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('SeriesLoaderByTypeComponent', () => {
	let component: SeriesLoaderByTypeComponent;
	let fixture: ComponentFixture<SeriesLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [SeriesLoaderByTypeComponent, MockComponent(SeriesLoaderComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SeriesLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
