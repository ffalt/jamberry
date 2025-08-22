import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageEditOverlayContentComponent } from './image-edit-overlay-content.component';

describe('ImageEditOverlayContentComponent', () => {
	let component: ImageEditOverlayContentComponent;
	let fixture: ComponentFixture<ImageEditOverlayContentComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [ImageEditOverlayContentComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageEditOverlayContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
