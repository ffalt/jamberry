import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlateComponent } from './media-plate.component';

describe('MediaPlateComponent', () => {
	let component: MediaPlateComponent;
	let fixture: ComponentFixture<MediaPlateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [MediaPlateComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaPlateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
