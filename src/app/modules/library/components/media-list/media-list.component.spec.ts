import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MediaListComponent} from './media-list.component';

describe('MediaListComponent', () => {
	let component: MediaListComponent;
	let fixture: ComponentFixture<MediaListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [MediaListComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
