import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextEntryFavComponent } from './context-entry-fav.component';

describe('ContextEntryFavComponent', () => {
	let component: ContextEntryFavComponent;
	let fixture: ComponentFixture<ContextEntryFavComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [ContextEntryFavComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextEntryFavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
