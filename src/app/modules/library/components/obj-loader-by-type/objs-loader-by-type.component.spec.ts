import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {ObjsLoaderByTypeComponent, ObjsLoaderComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('ObjsLoaderByTypeComponent', () => {
	let component: ObjsLoaderByTypeComponent;
	let fixture: ComponentFixture<ObjsLoaderByTypeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [ObjsLoaderByTypeComponent, MockComponent(ObjsLoaderComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjsLoaderByTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
