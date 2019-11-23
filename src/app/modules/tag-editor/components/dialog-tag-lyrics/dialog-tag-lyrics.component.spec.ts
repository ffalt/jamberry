import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageBase64Component} from '../image-base64/image-base64.component';
import {DialogTagLyricsComponent} from './dialog-tag-lyrics.component';

describe('DialogPicComponent', () => {
	let component: DialogTagLyricsComponent;
	let fixture: ComponentFixture<DialogTagLyricsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [DialogTagLyricsComponent, ImageBase64Component]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogTagLyricsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
