import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageBase64Component} from '../image-base64/image-base64.component';
import {DialogTagImageComponent} from './dialog-tag-image.component';

describe('DialogPicComponent', () => {
	let component: DialogTagImageComponent;
	let fixture: ComponentFixture<DialogTagImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
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
