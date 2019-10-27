import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ContextMenuQueueComponent} from './context-menu-queue.component';

describe('ContextMenuAlbumComponent', () => {
	let component: ContextMenuQueueComponent;
	let fixture: ComponentFixture<ContextMenuQueueComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ContextMenuQueueComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuQueueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
