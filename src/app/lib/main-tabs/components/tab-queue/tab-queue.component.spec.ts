import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TabQueueComponent } from './tab-queue.component';
import { TEST_IMPORTS } from '../../../../app.mock';

describe('TabQueueComponent', () => {
	let component: TabQueueComponent;
	let fixture: ComponentFixture<TabQueueComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, TabQueueComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(TabQueueComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
