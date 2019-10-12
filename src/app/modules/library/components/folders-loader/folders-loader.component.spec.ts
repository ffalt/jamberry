import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FoldersLoaderComponent} from '@library/components/folders-loader/folders-loader.component';
import {FoldersComponent} from '@library/components/folders/folders.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('FoldersLoaderComponent', () => {
	let component: FoldersLoaderComponent;
	let fixture: ComponentFixture<FoldersLoaderComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [FoldersLoaderComponent, MockComponent(FoldersComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FoldersLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
