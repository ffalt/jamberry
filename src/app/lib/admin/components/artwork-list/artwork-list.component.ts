import { Component, inject, input, type OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageFormatType, type Jam, JamService } from '@jam';
import { DialogOverlayService } from '@modules/dialog-overlay';
import type { ImageEdit } from '../artwork-edit/artwork-edit.component';
import { ImageEditOverlayContentComponent } from '../image-edit-overlay-content/image-edit-overlay-content.component';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { FilesizePipe } from '@core/pipes/filesize.pipe';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { DialogsService } from '@core/services/dialogs/dialogs.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { NotifyService } from '@core/services/notify/notify.service';

export interface ArtworkImageNode {
	artwork: Jam.Artwork;
	name: string;
	type: string;
	thumbnail: string;
}

function extractBasename(filename: string): string {
	const sl = filename.split('.');
	sl.pop();
	return sl.join('.');
}

function extractExt(filename: string): string {
	const sl = filename.split('.');
	return sl.at(-1) ?? '';
}

@Component({
	selector: 'app-admin-artwork-list',
	templateUrl: './artwork-list.component.html',
	styleUrls: ['./artwork-list.component.scss'],
	imports: [
		FormsModule, InlineEditComponent, FilesizePipe,
		ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective
	]
})
export class ArtworkListComponent implements OnChanges {
	readonly artworks = input<Array<Jam.Artwork>>();
	readonly folderID = input<string>();
	nodes?: Array<ArtworkImageNode>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly dialogs = inject(DialogsService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	ngOnChanges(): void {
		this.displayArtworks();
	}

	editArtworkName(node: ArtworkImageNode): void {
		this.jam.artwork.rename({ id: node.artwork.id, newName: node.name })
			.then(item => {
				const folderID = this.folderID();
				this.folderService.waitForQueueResult('Renaming Artwork', item,
					folderID ? [folderID] : [], []);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	editArtwork(artwork: Jam.Artwork): void {
		this.dialogOverlay.open<ImageEdit>({
			childComponent: ImageEditOverlayContentComponent,
			title: 'Edit Image',
			data: { artwork, folderID: this.folderID()! },
			panelClass: ''
		});
	}

	removeArtwork(node: ArtworkImageNode): void {
		this.dialogs.confirm('Remove Artworks?', `Do you want to delete "${node.artwork.name}"?`, () => {
			this.jam.artwork.remove({ id: node.artwork.id })
				.then(item => {
					if (this.nodes) {
						this.nodes = this.nodes.filter(n => n !== node);
					}
					const folderID = this.folderID();
					this.folderService.waitForQueueResult('Removing Artwork', item, folderID ? [folderID] : []);
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		});
	}

	private displayArtworks(): void {
		this.nodes = [];
		const artworks = this.artworks();
		if (artworks) {
			this.nodes = artworks.map(artwork =>
				({
					name: extractBasename(artwork.name),
					type: extractExt(artwork.name),
					artwork,
					thumbnail: this.jam.image.imageUrl({ id: artwork.id, size: 128, format: ImageFormatType.webp })
				}));
		}
	}
}
