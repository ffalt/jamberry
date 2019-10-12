import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlaylistsComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {PlaylistsPageComponent} from '@library/pages';
import {MockComponent} from 'ng-mocks';

describe('PlaylistsPageComponent', () => {
	let component: PlaylistsPageComponent;
	let fixture: ComponentFixture<PlaylistsPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [PlaylistsPageComponent, MockComponent(PlaylistsComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
