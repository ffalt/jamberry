import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TabInfoComponent } from './tab-info.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';

describe('TabInfoComponent', () => {
	let component: TabInfoComponent;
	let fixture: ComponentFixture<TabInfoComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, TabInfoComponent],
			providers: [TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(TabInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
