import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {TabPlayerComponent} from '@app/modules/main-tabs/components';
import {TEST_MAINTABS_IMPORTS, TEST_MAINTABS_PROVIDERS} from '@app/modules/main-tabs/main-tabs.module.mock';

describe('TabPlayerComponent', () => {
	let component: TabPlayerComponent;
	let fixture: ComponentFixture<TabPlayerComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_MAINTABS_IMPORTS],
    providers: [...TEST_MAINTABS_PROVIDERS],
    declarations: [TabPlayerComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(TabPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
