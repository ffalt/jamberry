import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ObjPlateComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
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
				MockComponent(ObjPlateComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjGroupsViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
