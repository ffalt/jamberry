import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumsComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {SeriesIdPageComponent} from './series-id-page.component';

describe('SeriesIdPageComponent', () => {
	let component: SeriesIdPageComponent;
	let fixture: ComponentFixture<SeriesIdPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [SeriesIdPageComponent, MockComponent(AlbumsComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SeriesIdPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
