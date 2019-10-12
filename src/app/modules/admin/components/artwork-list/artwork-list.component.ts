import {ImageEditOverlayContentComponent} from '@admin/components/image-edit-overlay-content/image-edit-overlay-content.component';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ImageOverlayContentComponent} from '@shared/components/image-overlay-content/image-overlay-content.component';
import {FolderService} from '@app/modules/admin-core/services';

export interface ArtworkImageNode {
	artwork: Jam.ArtworkImage;
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
	return sl[sl.length - 1];
}

@Component({
	selector: 'app-admin-artwork-list',
	templateUrl: 'artwork-list.component.html',
	styleUrls: ['artwork-list.component.scss']
})
export class ArtworkListComponent implements OnChanges {
	@Input() artworks: Array<Jam.ArtworkImage>;
	@Input() folderID: string;
	nodes: Array<ArtworkImageNode>;

	constructor(
		private app: AppService,
		private jam: JamService,
		private notify: NotifyService,
		private folderService: FolderService,
		private dialogOverlay: DialogOverlayService) {
	}

	trackByFn(index: number, node: ArtworkImageNode): string {
		return node.artwork.id;
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.displayArtworks();
	}

	editArtworkName(node: ArtworkImageNode): void {
		this.jam.folder.artwork_name_update({id: node.artwork.id, name: node.name})
			.then(item => {
				this.folderService.waitForQueueResult('Renaming Artwork', item, [this.folderID], []);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	editArtwork(artwork: Jam.ArtworkImage): void {
		this.dialogOverlay.open({
			childComponent: ImageEditOverlayContentComponent,
			title: 'Edit Image',
			data: {artwork, folderID: this.folderID},
			panelClass: ''
		});
	}

	showArtwork(artwork: Jam.ArtworkImage): void {
		const name = artwork.types.join(', ');
		this.dialogOverlay.open({
			title: name,
			childComponent: ImageOverlayContentComponent,
			data: {name, url: this.jam.folder.artwork_image_url({id: artwork.id})}
		});
	}

	removeArtwork(node: ArtworkImageNode): void {
		this.jam.folder.artwork_delete({id: node.artwork.id})
			.then(item => {
				this.nodes = this.nodes.filter(n => n !== node);
				this.folderService.waitForQueueResult('Removing Artwork', item, [this.folderID]);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	private displayArtworks(): void {
		this.nodes = [];
		if (this.artworks) {
			this.nodes = this.artworks.map(artwork =>
				({
					name: extractBasename(artwork.name),
					type: extractExt(artwork.name),
					artwork,
					thumbnail: this.jam.folder.artwork_image_url({id: artwork.id, size: 128})
				}));
		}
	}
}
