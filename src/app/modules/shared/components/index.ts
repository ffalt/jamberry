import {BackgroundTextListComponent} from './background-text-list/background-text-list.component';
import {BackgroundTextComponent} from './background-text/background-text.component';
import {ChaptersComponent} from './chapters/chapters.component';
import {ContextEntryFavComponent} from './context-entry-fav/context-entry-fav.component';
import {ContextEntryRateComponent} from './context-entry-rate/context-entry-rate.component';
import {CoverartImageComponent} from './coverart-image/coverart-image.component';
import {DialogConfirmComponent} from './dialog-confirm/dialog-confirm.component';
import {DialogPasswordComponent} from './dialog-password/dialog-password.component';
import {DialogPlaylistComponent} from './dialog-playlist/dialog-playlist.component';
import {DialogRateComponent} from './dialog-rate/dialog-rate.component';
import {ExpandCollapseIconComponent} from './expand-collapse-icon/expand-collapse-icon.component';
import {FavIconComponent} from './fav-icon/fav-icon.component';
import {IconartImageComponent} from './iconart-image/iconart-image.component';
import {ImageOverlayContentComponent} from './image-overlay-content/image-overlay-content.component';
import {InfoNoteComponent} from './info-note/info-note.component';
import {LoadMoreButtonComponent} from './load-more-button/load-more-button.component';
import {LoadingComponent} from './loading/loading.component';
import {LogoIconComponent} from './logo-icon/logo-icon.component';
import {LyricsComponent} from './lyrics/lyrics.component';
import {MusicbrainzIconComponent} from './musicbrainz-icon/musicbrainz-icon.component';
import {ChildTooltipContentComponent} from './obj-tooltip-content/child-tooltip-content.component';
import {RateComponent} from './rate/rate.component';
import {SplitterComponent} from './splitter/splitter.component';
import {TextOverlayContentComponent} from './text-overlay-content/text-overlay-content.component';

export const entryComponents: Array<any> = [
	ChildTooltipContentComponent,
	DialogPasswordComponent,
	DialogPlaylistComponent,
	DialogRateComponent,
	ImageOverlayContentComponent,
	TextOverlayContentComponent
];

export const components: Array<any> = [
	...entryComponents,
	BackgroundTextComponent,
	BackgroundTextListComponent,
	CoverartImageComponent,
	ContextEntryFavComponent,
	ContextEntryRateComponent,
	DialogConfirmComponent,
	ExpandCollapseIconComponent,
	FavIconComponent,
	IconartImageComponent,
	InfoNoteComponent,
	LoadingComponent,
	LoadMoreButtonComponent,
	LogoIconComponent,
	LyricsComponent,
	MusicbrainzIconComponent,
	RateComponent,
	SplitterComponent,
	ChaptersComponent
];

export * from './background-text-list/background-text-list.component';
export * from './background-text/background-text.component';
export * from './chapters/chapters.component';
export * from './context-entry-fav/context-entry-fav.component';
export * from './context-entry-rate/context-entry-rate.component';
export * from './coverart-image/coverart-image.component';
export * from './dialog-confirm/dialog-confirm.component';
export * from './dialog-password/dialog-password.component';
export * from './dialog-playlist/dialog-playlist.component';
export * from './dialog-rate/dialog-rate.component';
export * from './expand-collapse-icon/expand-collapse-icon.component';
export * from './fav-icon/fav-icon.component';
export * from './iconart-image/iconart-image.component';
export * from './image-overlay-content/image-overlay-content.component';
export * from './info-note/info-note.component';
export * from './load-more-button/load-more-button.component';
export * from './loading/loading.component';
export * from './logo-icon/logo-icon.component';
export * from './lyrics/lyrics.component';
export * from './musicbrainz-icon/musicbrainz-icon.component';
export * from './obj-tooltip-content/child-tooltip-content.component';
export * from './rate/rate.component';
export * from './splitter/splitter.component';
export * from './text-overlay-content/text-overlay-content.component';
