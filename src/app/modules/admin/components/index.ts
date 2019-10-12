import {AdminBaseParentViewIdComponent} from './admin-base-parent-view-id/admin-base-parent-view-id.component';
import {AdminBaseViewIdComponent} from './admin-base-view-id/admin-base-view-id.component';
import {AdminQueueRequestsComponent} from './admin-queue-requests/admin-queue-requests.component';
import {AdminSidebarComponent} from './admin-sidebar/admin-sidebar.component';
import {AlbumImageComponent} from './album-image/album-image.component';
import {AlbumListComponent} from './album-list/album-list.component';
import {ArtistImageComponent} from './artist-image/artist-image.component';
import {AdminArtistListComponent} from './artist-list/artist-list.component';
import {ArtworkEditComponent} from './artwork-edit/artwork-edit.component';
import {ArtworkListComponent} from './artwork-list/artwork-list.component';
import {DialogAlbumImageComponent} from './dialog-album-image/dialog-album-image-component';
import {DialogArtistImageComponent} from './dialog-artist-image/dialog-artist-image-component';
import {DialogAvatarComponent} from './dialog-avatar/dialog-avatar.component';
import {DialogChooseFolderComponent} from './dialog-choose-folder/dialog-choose-folder.component';
import {DialogFolderComponent} from './dialog-folder/dialog-folder.component';
import {DialogRootComponent} from './dialog-root/dialog-root.component';
import {DialogUserPassComponent} from './dialog-user-pass/dialog-user-pass.component';
import {DialogUserComponent} from './dialog-user/dialog-user.component';
import {FolderHealthComponent} from './folder-health/folder-health.component';
import {FolderListComponent} from './folder-list/folder-list.component';
import {FolderTreeComponent} from './folder-tree/folder-tree.component';
import {ImageEditOverlayContentComponent} from './image-edit-overlay-content/image-edit-overlay-content.component';
import {InlineEditComponent} from './inline-edit/inline-edit.component';
import {SectionCardsComponent} from './section-cards/section-cards.component';
import {TrackHealthComponent} from './track-health/track-health.component';
import {TrackListComponent} from './track-list/track-list.component';

export const entryComponents: Array<any> = [
	DialogAlbumImageComponent,
	DialogArtistImageComponent,
	DialogAvatarComponent,
	DialogChooseFolderComponent,
	DialogFolderComponent,
	DialogRootComponent,
	DialogUserComponent,
	DialogUserPassComponent,
	ImageEditOverlayContentComponent
];

export const components: Array<any> = [
	...entryComponents,
	AdminBaseViewIdComponent,
	AdminBaseParentViewIdComponent,
	AdminArtistListComponent,
	AdminQueueRequestsComponent,
	AdminSidebarComponent,
	ArtworkEditComponent,
	AlbumImageComponent,
	AlbumListComponent,
	ArtistImageComponent,
	ArtworkListComponent,
	FolderHealthComponent,
	FolderListComponent,
	FolderTreeComponent,
	InlineEditComponent,
	SectionCardsComponent,
	TrackHealthComponent,
	TrackListComponent
];

export * from './admin-base-parent-view-id/admin-base-parent-view-id.component';
export * from './admin-base-view-id/admin-base-view-id.component';
export * from './admin-queue-requests/admin-queue-requests.component';
export * from './admin-sidebar/admin-sidebar.component';
export * from './album-image/album-image.component';
export * from './album-list/album-list.component';
export * from './artist-image/artist-image.component';
export * from './artist-list/artist-list.component';
export * from './artwork-edit/artwork-edit.component';
export * from './artwork-list/artwork-list.component';
export * from './dialog-album-image/dialog-album-image-component';
export * from './dialog-artist-image/dialog-artist-image-component';
export * from './dialog-avatar/dialog-avatar.component';
export * from './dialog-choose-folder/dialog-choose-folder.component';
export * from './dialog-folder/dialog-folder.component';
export * from './dialog-root/dialog-root.component';
export * from './dialog-user-pass/dialog-user-pass.component';
export * from './dialog-user/dialog-user.component';
export * from './folder-health/folder-health.component';
export * from './folder-list/folder-list.component';
export * from './folder-tree/folder-tree.component';
export * from './image-edit-overlay-content/image-edit-overlay-content.component';
export * from './inline-edit/inline-edit.component';
export * from './section-cards/section-cards.component';
export * from './track-health/track-health.component';
export * from './track-list/track-list.component';
