import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {ArtworkImageType, CoverArtArchive, CoverArtArchiveLookupType, Jam, JamService, LastFMLookupType} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FolderService, FolderServiceNotifyMode} from '../../services/folder.service';

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
	templateUrl: 'album-image.component.html',
	styleUrls: ['album-image.component.scss']
})
export class AlbumImageComponent implements OnInit, OnDestroy, OnChanges {
	nodes: Array<ImageNode>;
	isWorking = false;
	isArtRefreshing = false;
	@Input() data: AlbumImageSearch;
	protected unsubscribe = new Subject();

	constructor(private jam: JamService, private notify: NotifyService, private folderService: FolderService) {
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
			if (this.data.folder.tag.musicbrainz.releaseID) {
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

	display(result: CoverArtArchive.Response): void {
		if (result.images) {
			this.nodes = result.images.map(image => {
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

			const front = this.nodes.find(i => i.image.types.length === 1 && i.image.types[0] === 'Front' && i.image.approved);
			if (front) {
				front.checked = true;
			}
		} else {
			this.nodes = [];
		}
	}

	loadReleaseGroup(musicBrainzReleaseGroupID: string): void {
		this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.releaseGroup, id: musicBrainzReleaseGroupID})
			.then(res => {
				this.display(res);
				// if (this.nodes.length === 0 &&
				// 	this.data && this.data.folder && this.data.folder.tag && this.data.folder.tag.musicbrainz && this.data.folder.tag.musicbrainz.releaseID) {
				// 	this.nodes = undefined;
				// 	this.loadLastFM(this.data.folder.tag.musicbrainz.releaseID);
				// }
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadLastFM(musicBrainzReleaseID: string): void {
		this.jam.metadata.lastfm_lookup({type: LastFMLookupType.album, id: musicBrainzReleaseID})
			.then(res => {
				if (!res.album) {
					this.nodes = [];
				} else {
					this.nodes = [];
					// TODO: show last fm image node
					console.error('TODO loadLastFM', res);
				}
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadRelease(musicBrainzReleaseID: string): void {
		if (musicBrainzReleaseID) {
			this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: musicBrainzReleaseID})
				.then(res => {
					this.display(res);
					if (this.nodes.length === 0 &&
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
							this.folderService.notifyFolderChange(this.data.folder.id, FolderServiceNotifyMode.fsnRefresh);
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
}
