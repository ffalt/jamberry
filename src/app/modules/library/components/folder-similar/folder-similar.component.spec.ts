import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderSimilarComponent, ObjGroupsViewComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('FolderSimilarComponent', () => {
	let component: FolderSimilarComponent;
	let fixture: ComponentFixture<FolderSimilarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        FolderSimilarComponent,
        MockComponent(ObjGroupsViewComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderSimilarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
