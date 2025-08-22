import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogTagTextlistComponent } from './dialog-tag-textlist.component';

describe('DialogTagTextlistComponent', () => {
	let component: DialogTagTextlistComponent;
	let fixture: ComponentFixture<DialogTagTextlistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, DialogTagTextlistComponent],
			teardown: { destroyAfterEach: false }
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
