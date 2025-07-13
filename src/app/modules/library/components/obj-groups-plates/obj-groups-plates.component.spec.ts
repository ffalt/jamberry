import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {ObjPlateComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {ObjGroupsPlatesComponent} from './obj-groups-plates.component';

describe('ObjGroupsPlatesComponent', () => {
	let component: ObjGroupsPlatesComponent;
	let fixture: ComponentFixture<ObjGroupsPlatesComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        ObjGroupsPlatesComponent,
        MockComponent(ObjPlateComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjGroupsPlatesComponent);
		component = fixture.componentInstance;
		TestBed.runInInjectionContext(() => {
			fixture.detectChanges();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
