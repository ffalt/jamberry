import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarLibraryComponent, SidebarRightComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {LibraryComponent} from './library.component';

describe('LibraryComponent', () => {
	let component: LibraryComponent;
	let fixture: ComponentFixture<LibraryComponent>;

	beforeEach(async () =>
			TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [
        LibraryComponent,
        MockComponent(SidebarLibraryComponent),
        MockComponent(SidebarRightComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LibraryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
