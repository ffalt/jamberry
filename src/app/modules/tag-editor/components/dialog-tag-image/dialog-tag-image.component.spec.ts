import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ImageBase64Component} from '../image-base64/image-base64.component';
import {DialogTagImageComponent} from './dialog-tag-image.component';

describe('DialogTagImageComponent', () => {
	let component: DialogTagImageComponent;
	let fixture: ComponentFixture<DialogTagImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, ImageCropperModule],
			declarations: [DialogTagImageComponent, ImageBase64Component]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogTagImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
