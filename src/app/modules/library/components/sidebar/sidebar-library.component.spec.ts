import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CurrentPlayingComponent, SidebarLibraryComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {SidebarComponent} from '@shared/components';
import {MockComponent} from 'ng-mocks';

describe('SidebarComponent', () => {
	let component: SidebarLibraryComponent;
	let fixture: ComponentFixture<SidebarLibraryComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				SidebarLibraryComponent,
				MockComponent(CurrentPlayingComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarLibraryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
