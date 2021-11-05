import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BackgroundTextComponent} from '../background-text/background-text.component';
import {BackgroundTextListComponent} from './background-text-list.component';

describe('LoadingListComponent', () => {
	let component: BackgroundTextListComponent;
	let fixture: ComponentFixture<BackgroundTextListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    declarations: [BackgroundTextListComponent, BackgroundTextComponent],
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
