import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IndexComponent, IndexGroupComponent, ViewTypeToggleComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('IndexComponent', () => {
	let component: IndexComponent;
	let fixture: ComponentFixture<IndexComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [IndexComponent, MockComponent(ViewTypeToggleComponent), MockComponent(IndexGroupComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(IndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
