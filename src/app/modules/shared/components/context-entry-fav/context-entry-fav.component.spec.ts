import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {FavIconComponent} from '@shared/components/fav-icon/fav-icon.component';
import {StringTogglePipe} from '@shared/pipes';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent} from 'ng-mocks';
import {ContextEntryFavComponent} from './context-entry-fav.component';

describe('ContextEntryFavComponent', () => {
	let component: ContextEntryFavComponent;
	let fixture: ComponentFixture<ContextEntryFavComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [
        ContextEntryFavComponent,
        MockComponent(FavIconComponent),
        StringTogglePipe
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextEntryFavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
