import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchApplyComponent } from './match-apply.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('MatchApplyComponent', () => {
	let component: MatchApplyComponent;
	let fixture: ComponentFixture<MatchApplyComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, MatchApplyComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchApplyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
