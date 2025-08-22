import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogTagImageComponent } from './dialog-tag-image.component';

describe('DialogTagImageComponent', () => {
	let component: DialogTagImageComponent;
	let fixture: ComponentFixture<DialogTagImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, DialogTagImageComponent],
			teardown: { destroyAfterEach: false }
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
