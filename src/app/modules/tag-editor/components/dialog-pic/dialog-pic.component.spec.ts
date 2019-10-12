import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageBase64Component} from '../image-base64/image-base64.component';
import {DialogPicComponent} from './dialog-pic.component';

describe('DialogPicComponent', () => {
	let component: DialogPicComponent;
	let fixture: ComponentFixture<DialogPicComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [DialogPicComponent, ImageBase64Component]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogPicComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
