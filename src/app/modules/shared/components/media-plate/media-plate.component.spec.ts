import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {CoverartImageComponent, FavIconComponent} from '@shared/components';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent} from 'ng-mocks';
import {MediaPlateComponent} from './media-plate.component';

describe('MediaPlateComponent', () => {
	let component: MediaPlateComponent;
	let fixture: ComponentFixture<MediaPlateComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [
        MediaPlateComponent,
        MockComponent(FavIconComponent),
        MockComponent(CoverartImageComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaPlateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
