import {ArtworkEditComponent} from '@admin/components/artwork-edit/artwork-edit.component';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ImageCropperComponent} from 'ngx-image-cropper';
import {ImageEditOverlayContentComponent} from './image-edit-overlay-content.component';

describe('ImageEditOverlayContentComponent', () => {
	let component: ImageEditOverlayContentComponent;
	let fixture: ComponentFixture<ImageEditOverlayContentComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule, ImageCropperComponent],
    declarations: [ImageEditOverlayContentComponent, ArtworkEditComponent],
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
