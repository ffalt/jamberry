import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {ExpandCollapseIconComponent} from '@shared/components/expand-collapse-icon/expand-collapse-icon.component';
import {DurationPipe} from '@shared/pipes';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent} from 'ng-mocks';
import {DialogPlaylistComponent} from './dialog-playlist.component';

describe('DialogPlaylistComponent', () => {
	let component: DialogPlaylistComponent;
	let fixture: ComponentFixture<DialogPlaylistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_SHARED_MODULE_IMPORTS],
    providers: [...TEST_SHARED_MODULE_PROVIDERS],
    declarations: [
        DialogPlaylistComponent,
        MockComponent(ExpandCollapseIconComponent),
        DurationPipe
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogPlaylistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
