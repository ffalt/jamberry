import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageOverlayContentComponent} from './image-overlay-content.component';

describe('ImageOverlayContentComponent', () => {
	let component: ImageOverlayContentComponent;
	let fixture: ComponentFixture<ImageOverlayContentComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [ImageOverlayContentComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageOverlayContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
