import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarIndexComponent} from '@library/components/sidebar-index/sidebar-index.component';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';

describe('SidebarIndexComponent', () => {
	let component: SidebarIndexComponent;
	let fixture: ComponentFixture<SidebarIndexComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [SidebarIndexComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarIndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
