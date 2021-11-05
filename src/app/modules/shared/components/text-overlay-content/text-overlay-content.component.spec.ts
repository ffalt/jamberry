import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TextOverlayContentComponent} from './text-overlay-content.component';

describe('TextOverlayContentComponent', () => {
	let component: TextOverlayContentComponent;
	let fixture: ComponentFixture<TextOverlayContentComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [TextOverlayContentComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TextOverlayContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
