import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {InfoNoteComponent} from './info-note.component';

describe('InfoNoteComponent', () => {
	let component: InfoNoteComponent;
	let fixture: ComponentFixture<InfoNoteComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [InfoNoteComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(InfoNoteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
