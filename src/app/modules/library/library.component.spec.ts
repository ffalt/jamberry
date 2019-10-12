import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent, SidebarRightComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {LibraryComponent} from './library.component';

describe('LibraryComponent', () => {
	let component: LibraryComponent;
	let fixture: ComponentFixture<LibraryComponent>;

	beforeEach(async () => {
			return TestBed.configureTestingModule({
				imports: [...TEST_LIBRARY_IMPORTS],
				providers: [...TEST_LIBRARY_PROVIDERS],
				declarations: [
					LibraryComponent,
					MockComponent(SidebarComponent),
					MockComponent(SidebarRightComponent)
				]
			}).compileComponents();
		}
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
