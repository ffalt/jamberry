import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageBase64Component} from '../image-base64/image-base64.component';
import {DialogTagTextlistComponent} from './dialog-tag-textlist.component';

describe('DialogPicComponent', () => {
	let component: DialogTagTextlistComponent;
	let fixture: ComponentFixture<DialogTagTextlistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			declarations: [DialogTagTextlistComponent, ImageBase64Component]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogTagTextlistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
