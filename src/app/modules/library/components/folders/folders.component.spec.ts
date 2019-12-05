import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FolderCardComponent, FolderPlateComponent, FoldersComponent, TracksComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('FoldersComponent', () => {
	let component: FoldersComponent;
	let fixture: ComponentFixture<FoldersComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				FoldersComponent,
				MockComponent(FolderCardComponent),
				MockComponent(FolderPlateComponent),
				MockComponent(TracksComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FoldersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
