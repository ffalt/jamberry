import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlbumComponent, ViewTypeToggleComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {AlbumsComponent} from './albums.component';

describe('AlbumsComponent', () => {
	let component: AlbumsComponent;
	let fixture: ComponentFixture<AlbumsComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_LIBRARY_IMPORTS],
			providers: [...TEST_LIBRARY_PROVIDERS],
			declarations: [
				AlbumsComponent,
				MockComponent(ViewTypeToggleComponent),
				MockComponent(AlbumComponent)
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AlbumsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
