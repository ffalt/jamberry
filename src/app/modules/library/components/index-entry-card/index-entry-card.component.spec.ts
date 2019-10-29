import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {IndexEntryCardComponent} from './index-entry-card.component';

describe('IndexEntryComponent', () => {
	let component: IndexEntryCardComponent;
	let fixture: ComponentFixture<IndexEntryCardComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [IndexEntryCardComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(IndexEntryCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
