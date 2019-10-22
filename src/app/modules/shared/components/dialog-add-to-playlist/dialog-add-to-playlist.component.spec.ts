import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ContextMenuModule, ContextMenuService} from '@app/modules/context-menu';
import {BackgroundTextListComponent} from '@shared/components/background-text-list/background-text-list.component';
import {BackgroundTextComponent} from '@shared/components/background-text/background-text.component';
import {ContextEntryFavComponent} from '@shared/components/context-entry-fav/context-entry-fav.component';
import {ContextEntryRateComponent} from '@shared/components/context-entry-rate/context-entry-rate.component';
import {ExpandCollapseIconComponent} from '@shared/components/expand-collapse-icon/expand-collapse-icon.component';
import {FavIconComponent} from '@shared/components/fav-icon/fav-icon.component';
import {RateComponent} from '@shared/components/rate/rate.component';
import {AgoPipe} from '@shared/pipes/ago.pipe';
import {DurationPipe} from '@shared/pipes/duration.pipe';
import {DialogPlaylistComponent} from './dialog-playlist.component';

describe('DialogPlaylistComponent', () => {
	let component: DialogPlaylistComponent;
	let fixture: ComponentFixture<DialogPlaylistComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [FormsModule, ContextMenuModule],
			providers: [ContextMenuService],
			declarations: [
				DialogPlaylistComponent, ExpandCollapseIconComponent,
				DurationPipe, BackgroundTextListComponent, BackgroundTextListComponent,
				ContextEntryFavComponent, ContextEntryRateComponent, FavIconComponent, AgoPipe,
				BackgroundTextComponent, RateComponent
			]
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
