import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {TracksComponent} from './tracks.component';

describe('TracksComponent', () => {
	let component: TracksComponent;
	let fixture: ComponentFixture<TracksComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [TracksComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TracksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
