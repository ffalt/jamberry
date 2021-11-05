import {ComponentFixture, TestBed} from '@angular/core/testing';
import { MbRelationsComponent} from '@library/components';
import {TEST_LIBRARY_IMPORTS, TEST_LIBRARY_PROVIDERS} from '@library/library.module.mock';
import {MockComponent} from 'ng-mocks';
import {MbAlbumComponent} from './mb-album.component';

describe('MbAlbumComponent', () => {
	let component: MbAlbumComponent;
	let fixture: ComponentFixture<MbAlbumComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_LIBRARY_IMPORTS],
    providers: [...TEST_LIBRARY_PROVIDERS],
    declarations: [MbAlbumComponent, MockComponent(MbRelationsComponent)],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MbAlbumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
