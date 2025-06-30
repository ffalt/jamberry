import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ObjGroupsCardsComponent, ObjGroupsPlatesComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ObjGroupsViewComponent} from './obj-groups-view.component';

describe('ObjGroupsViewComponent', () => {
	let component: ObjGroupsViewComponent;
	let fixture: ComponentFixture<ObjGroupsViewComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        ObjGroupsViewComponent,
        ObjGroupsCardsComponent,
        ObjGroupsPlatesComponent
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjGroupsViewComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
