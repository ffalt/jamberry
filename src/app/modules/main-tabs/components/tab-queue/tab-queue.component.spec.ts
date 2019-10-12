import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TabQueueComponent} from '@app/modules/main-tabs/components';
import {TEST_MAINTABS_IMPORTS, TEST_MAINTABS_PROVIDERS} from '@app/modules/main-tabs/main-tabs.module.mock';

describe('TabQueueComponent', () => {
	let component: TabQueueComponent;
	let fixture: ComponentFixture<TabQueueComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_MAINTABS_IMPORTS],
			providers: [...TEST_MAINTABS_PROVIDERS],
			declarations: [TabQueueComponent]
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(TabQueueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
