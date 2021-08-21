import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ObjPlateComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {ObjPlatesComponent} from './obj-groups-view.component';

describe('ObjGroupsViewComponent', () => {
	let component: ObjPlatesComponent;
	let fixture: ComponentFixture<ObjPlatesComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				ObjPlatesComponent,
				MockComponent(ObjPlateComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjPlatesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
