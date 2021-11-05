import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarListComponent} from '@shared/components';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent} from 'ng-mocks';
import {SidebarComponent} from './sidebar.component';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [SidebarComponent, MockComponent(SidebarListComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
