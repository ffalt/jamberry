import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageBase64Component} from './image-base64.component';

describe('ImageBase64Component', () => {
	let component: ImageBase64Component;
	let fixture: ComponentFixture<ImageBase64Component>;

	beforeEach(async () =>
		TestBed.configureTestingModule({declarations: [ImageBase64Component]}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageBase64Component);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
