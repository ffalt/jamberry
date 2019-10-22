import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogChoosePlaylistComponent, ExpandCollapseIconComponent, LoadingComponent} from '@shared/components';
import {DurationPipe} from '@shared/pipes';
import {PlaylistService} from '@shared/services';
import {TEST_SHARED_MODULE_IMPORTS, TEST_SHARED_MODULE_PROVIDERS} from '@shared/shared.module.mock';
import {MockComponent} from 'ng-mocks';

describe('DialogChoosePlaylistComponent', () => {
	let component: DialogChoosePlaylistComponent;
	let fixture: ComponentFixture<DialogChoosePlaylistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_SHARED_MODULE_IMPORTS],
			providers: [...TEST_SHARED_MODULE_PROVIDERS, PlaylistService],
			declarations: [
				DialogChoosePlaylistComponent,
				MockComponent(LoadingComponent),
				MockComponent(ExpandCollapseIconComponent),
				DurationPipe
			]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogChoosePlaylistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
