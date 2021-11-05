import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DialogTagLyricsComponent} from './dialog-tag-lyrics.component';

describe('DialogTagLyricsComponent', () => {
	let component: DialogTagLyricsComponent;
	let fixture: ComponentFixture<DialogTagLyricsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [DialogTagLyricsComponent],
    teardown: { destroyAfterEach: false }
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
