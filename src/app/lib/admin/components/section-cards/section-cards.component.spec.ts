import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_PROVIDERS } from '../../../../app.mock';
import { SectionCardsComponent } from './section-cards.component';

describe('SectionCardsComponent', () => {
	let component: SectionCardsComponent;
	let fixture: ComponentFixture<SectionCardsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [SectionCardsComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SectionCardsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
