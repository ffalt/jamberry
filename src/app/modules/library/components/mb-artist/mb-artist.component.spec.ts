import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MbArtistComponent} from './mb-artist.component';

describe('MbArtistComponent', () => {
	let component: MbArtistComponent;
	let fixture: ComponentFixture<MbArtistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [MbArtistComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MbArtistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
