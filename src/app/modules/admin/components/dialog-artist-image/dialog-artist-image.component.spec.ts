import {TEST_ADMIN_MODULE_IMPORTS, TEST_ADMIN_MODULE_PROVIDERS} from '@admin/admin.module.mock';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {ArtistImageComponent} from '../artist-image/artist-image.component';
import {DialogArtistImageComponent} from './dialog-artist-image-component';

describe('DialogArtistImageComponent', () => {
	let component: DialogArtistImageComponent;
	let fixture: ComponentFixture<DialogArtistImageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_ADMIN_MODULE_IMPORTS],
			providers: [...TEST_ADMIN_MODULE_PROVIDERS],
			declarations: [DialogArtistImageComponent, MockComponent(ArtistImageComponent)]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogArtistImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
