import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {IndexComponent} from '..';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '../../library.module.mock';
import {ObjsIndexLoaderComponent} from './objs-index-loader.component';

describe('ObjsIndexLoaderComponent', () => {
	let component: ObjsIndexLoaderComponent;
	let fixture: ComponentFixture<ObjsIndexLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ObjsIndexLoaderComponent, MockComponent(IndexComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ObjsIndexLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
