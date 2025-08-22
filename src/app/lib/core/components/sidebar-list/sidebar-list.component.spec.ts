import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarListComponent } from './sidebar-list.component';

describe('SidebarListComponent', () => {
	let component: SidebarListComponent;
	let fixture: ComponentFixture<SidebarListComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [SidebarListComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarListComponent);
		fixture.componentRef.setInput('list', { name: 'test', entries: [] });
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
