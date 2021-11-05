import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TabMainComponent} from '@app/modules/main-tabs/components';
import {TEST_MAINTABS_IMPORTS, TEST_MAINTABS_PROVIDERS} from '@app/modules/main-tabs/main-tabs.module.mock';

describe('TabMainComponent', () => {
	let component: TabMainComponent;
	let fixture: ComponentFixture<TabMainComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_MAINTABS_IMPORTS],
    providers: [...TEST_MAINTABS_PROVIDERS],
    declarations: [TabMainComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(TabMainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
