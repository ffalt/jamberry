import {Component, type OnChanges, inject, input} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AdminFolderService, NotifyService} from '@core/services';
import {ImageFormatType, type Jam, JamService} from '@jam';
import {DialogsService} from '@shared/services';
import {ImageEditOverlayContentComponent} from '../image-edit-overlay-content/image-edit-overlay-content.component';

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
	standalone: false
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
		this.jam.artwork.rename({id: node.artwork.id, newName: node.name})
			.then(item => {
				const folderID = this.folderID();
				this.folderService.waitForQueueResult('Renaming Artwork', item,
					folderID ? [folderID] : [], []);
			})
			.catch(error => this.notify.error(error));
	}

	editArtwork(artwork: Jam.Artwork): void {
		this.dialogOverlay.open({
			childComponent: ImageEditOverlayContentComponent,
			title: 'Edit Image',
			data: {artwork, folderID: this.folderID()},
			panelClass: ''
		});
	}

	removeArtwork(node: ArtworkImageNode): void {
		this.dialogs.confirm('Remove Artworks?', `Do you want to delete "${node.artwork.name}"?`, () => {
			this.jam.artwork.remove({id: node.artwork.id})
				.then(item => {
					if (this.nodes) {
						this.nodes = this.nodes.filter(n => n !== node);
					}
					const folderID = this.folderID();
					this.folderService.waitForQueueResult('Removing Artwork', item, folderID ? [folderID] : []);
				})
				.catch(error => this.notify.error(error));
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
					thumbnail: this.jam.image.imageUrl({id: artwork.id, size: 128, format: ImageFormatType.webp})
				}));
		}
	}
}
