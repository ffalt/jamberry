import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarListItemComponent } from './sidebar-list-item.component';
import { TEST_PROVIDERS } from '../../../../app.mock';

describe('SidebarListItemComponent', () => {
	let component: SidebarListItemComponent;
	let fixture: ComponentFixture<SidebarListItemComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [SidebarListItemComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
