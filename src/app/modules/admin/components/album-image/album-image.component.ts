import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AdminFolderService, AdminFolderServiceNotifyMode, NotifyService} from '@core/services';
import {ArtworkImageType, CoverArtArchive, CoverArtArchiveLookupType, Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface AlbumImageSearch {
	folder: Jam.Folder;
}

export interface ImageNode {
	image: CoverArtArchive.Image;
	checked: boolean;
	storing: boolean;
	stored: boolean;
}

@Component({
	selector: 'app-admin-album-image',
	templateUrl: './album-image.component.html',
	styleUrls: ['./album-image.component.scss']
})
export class AlbumImageComponent implements OnInit, OnDestroy, OnChanges {
	nodes: Array<ImageNode>;
	isWorking = false;
	isArtRefreshing = false;
	@Input() data: AlbumImageSearch;
	protected unsubscribe = new Subject();

	constructor(private jam: JamService, private notify: NotifyService, private folderService: AdminFolderService) {
	}

	ngOnInit(): void {
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(change => {
			if (this.data && change.id === this.data.folder.id) {
				this.refreshArtworks();
			}
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.data && this.data.folder && this.data.folder.tag && this.data.folder.tag.musicbrainz) {
			if (this.data.folder.tag.musicbrainz.releaseID && this.data.folder.tag.musicbrainz.releaseGroupID) {
				this.loadReleaseGroupAndRelease(this.data.folder.tag.musicbrainz.releaseID, this.data.folder.tag.musicbrainz.releaseGroupID);
			} else if (this.data.folder.tag.musicbrainz.releaseID) {
				this.loadRelease(this.data.folder.tag.musicbrainz.releaseID);
			} else if (this.data.folder.tag.musicbrainz.releaseGroupID) {
				this.loadReleaseGroup(this.data.folder.tag.musicbrainz.releaseGroupID);
			}
		}
		if (this.data && this.data.folder && !this.data.folder.artworks) {
			this.refreshArtworks();
		}
	}

	trackByFn(index: number, node: ImageNode): string {
		return node.image.id;
	}

	refreshArtworks(): void {
		this.isArtRefreshing = true;
		this.jam.folder.artworks({id: this.data.folder.id}).then(art => {
			this.isArtRefreshing = false;
			this.data.folder.artworks = art;
		}).catch(e => {
			this.isArtRefreshing = false;
			this.notify.error(e);
		});
	}


	display(nodes: Array<ImageNode>): void {
		this.nodes = nodes;
		const front = this.nodes.find(i => i.image.types.length === 1 && i.image.types[0] === 'Front' && i.image.approved);
		if (front) {
			front.checked = true;
		}
	}

	loadReleaseGroupAndRelease(musicBrainzReleaseID: string, musicBrainzReleaseGroupID: string): void {
		this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.releaseGroup, id: musicBrainzReleaseGroupID})
			.then(res => {
				let nodes = this.imagesToNodes(res);
				this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: musicBrainzReleaseID})
					.then(res2 => {
						nodes = nodes.concat(this.imagesToNodes(res2));
						this.display(nodes);
					})
					.catch(e => {
						this.notify.error(e);
					});
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadReleaseGroup(musicBrainzReleaseGroupID: string): void {
		this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.releaseGroup, id: musicBrainzReleaseGroupID})
			.then(res => {
				this.display(this.imagesToNodes(res));
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadRelease(musicBrainzReleaseID: string): void {
		if (musicBrainzReleaseID) {
			this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: musicBrainzReleaseID})
				.then(res => {
					const nodes = this.imagesToNodes(res);
					this.display(nodes);
					if (nodes.length === 0 &&
						this.data && this.data.folder && this.data.folder.tag && this.data.folder.tag.musicbrainz && this.data.folder.tag.musicbrainz.releaseGroupID) {
						this.nodes = undefined;
						this.loadReleaseGroup(this.data.folder.tag.musicbrainz.releaseGroupID);
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	use(): void {
		const storing = this.nodes.find(i => i.storing);
		if (storing) {
			return;
		}
		const node = this.nodes.find(i => i.checked && !i.storing && !i.stored);
		if (node) {
			this.isWorking = true;
			node.storing = true;
			this.jam.folder.artwork_create({
				id: this.data.folder.id,
				url: node.image.image,
				types: (node.image.types || []).map(s => s.toLowerCase() as ArtworkImageType)
			})
				.then(item => {
					this.folderService.waitForQueueResult('Downloading Artwork', item, [])
						.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
						node.storing = false;
						node.stored = true;
						this.folderService.notifyFolderChange(this.data.folder.id, AdminFolderServiceNotifyMode.fsnRefresh);
						this.use();
					});
				})
				.catch(e => {
					node.storing = false;
					this.notify.error(e);
				});
		} else {
			this.isWorking = false;
		}
	}

	private imagesToNodes(result: CoverArtArchive.Response): Array<ImageNode> {
		if (result.images) {
			return result.images.map(image => {
				if (image.types.length === 0) {
					image.types.push('Other');
				}
				if (image.image) {
					image.image = image.image.replace('http:', 'https:');
				}
				if (image.thumbnails && image.thumbnails.small) {
					image.thumbnails.small = image.thumbnails.small.replace('http:', 'https:');
				}
				return {
					image,
					checked: false,
					storing: false,
					stored: false
				};
			});
		}
		return [];
	}
}
