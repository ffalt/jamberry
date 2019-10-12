import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IndexComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {FolderIndexPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('FolderIndexPageComponent', () => {
	let component: FolderIndexPageComponent;
	let fixture: ComponentFixture<FolderIndexPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [FolderIndexPageComponent, MockComponent(IndexComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(FolderIndexPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});