import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent} from 'ng-mocks';
import {SidebarListItemComponent} from '../sidebar-list-item/sidebar-list-item.component';
import {SidebarListComponent} from './sidebar-list.component';

describe('SidebarListComponent', () => {
	let component: SidebarListComponent;
	let fixture: ComponentFixture<SidebarListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [SidebarListComponent, MockComponent(SidebarListItemComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
