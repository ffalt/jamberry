import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ContextMenuPodcastsComponent} from './context-menu-podcasts.component';

describe('ContextMenuPodcastsComponent', () => {
	let component: ContextMenuPodcastsComponent;
	let fixture: ComponentFixture<ContextMenuPodcastsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ContextMenuPodcastsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuPodcastsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
