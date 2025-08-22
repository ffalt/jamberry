import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaptersComponent } from './chapters.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('ChaptersComponent', () => {
	let component: ChaptersComponent;
	let fixture: ComponentFixture<ChaptersComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, ChaptersComponent],
			teardown: { destroyAfterEach: false }
		})
			.compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChaptersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
