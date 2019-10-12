import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {IndexEntryComponent} from './index-entry.component';

describe('IndexEntryComponent', () => {
	let component: IndexEntryComponent;
	let fixture: ComponentFixture<IndexEntryComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [IndexEntryComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(IndexEntryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
