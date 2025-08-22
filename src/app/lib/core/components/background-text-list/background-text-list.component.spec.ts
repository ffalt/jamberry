import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundTextListComponent } from './background-text-list.component';

describe('BackgroundTextListComponent', () => {
	let component: BackgroundTextListComponent;
	let fixture: ComponentFixture<BackgroundTextListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [BackgroundTextListComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(BackgroundTextListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
