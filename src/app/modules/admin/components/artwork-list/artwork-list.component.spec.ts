import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {InlineEditComponent} from '@admin/components/inline-edit/inline-edit.component';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {ArtworkListComponent} from './artwork-list.component';

describe('ArtworkListComponent', () => {
	let component: ArtworkListComponent;
	let fixture: ComponentFixture<ArtworkListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_ADMIN_MODULE_IMPORTS],
    providers: [...TEST_ADMIN_MODULE_PROVIDERS],
    declarations: [ArtworkListComponent, MockComponent(InlineEditComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtworkListComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
