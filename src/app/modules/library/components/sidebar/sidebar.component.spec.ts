import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CurrentPlayingComponent, SidebarComponent, SidebarIndexComponent, SidebarListComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				SidebarComponent,
				MockComponent(SidebarListComponent),
				MockComponent(SidebarIndexComponent),
				MockComponent(CurrentPlayingComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
