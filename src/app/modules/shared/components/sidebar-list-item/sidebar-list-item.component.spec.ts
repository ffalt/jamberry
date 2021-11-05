import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {SidebarListItemComponent} from './sidebar-list-item.component';

describe('SidebarListComponent', () => {
	let component: SidebarListItemComponent;
	let fixture: ComponentFixture<SidebarListItemComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [SidebarListItemComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
