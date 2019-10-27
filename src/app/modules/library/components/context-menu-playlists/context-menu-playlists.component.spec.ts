import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {ContextMenuPlaylistsComponent} from './context-menu-playlists.component';

describe('ContextMenuPlaylistsComponent', () => {
	let component: ContextMenuPlaylistsComponent;
	let fixture: ComponentFixture<ContextMenuPlaylistsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [ContextMenuPlaylistsComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuPlaylistsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
