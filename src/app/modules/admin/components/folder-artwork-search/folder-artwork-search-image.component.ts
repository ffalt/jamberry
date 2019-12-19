import {HttpClient} from '@angular/common/http';
import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {hasFileExtension} from '@app/modules/tag-editor/model/utils';
import {AdminFolderService, NotifyService} from '@core/services';
import {ArtworkImageType, CoverArtArchive, CoverArtArchiveLookupType, FolderType, Jam, JamService, MusicBrainzLookupType} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface ArtworkSearch {
	folder: Jam.Folder;
}

export interface ArtworkNode {
	name: string;
	thumbnail: string;
	image: string;
	licence: string;
	checked: boolean;
	storing: boolean;
	stored: boolean;
	types: Array<Jam.ArtworkImageType>;
}

@Component({
	selector: 'app-admin-folder-artwork-search',
	templateUrl: './folder-artwork-search-image.component.html',
	styleUrls: ['./folder-artwork-search-image.component.scss']
})
export class FolderArtworkSearchImageComponent implements OnChanges, OnInit, OnDestroy {
	@Input() data: ArtworkSearch;
	nodes: Array<ArtworkNode>;
	isWorking = false;
	isArtRefreshing = false;
	searchSource: {
		name: string;
		url: string;
	} = {
		name: '',
		url: ''
	};
	protected unsubscribe = new Subject();

	constructor(private jam: JamService, private notify: NotifyService, private folderService: AdminFolderService, private http: HttpClient) {
	}

	trackByFn(index: number, node: ArtworkNode): string {
		return node.image;
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.search();
		if (this.data && this.data.folder && !this.data.folder.artworks) {
			this.refreshArtworks();
		}
	}

	refreshArtworks(): void {
		this.isArtRefreshing = true;
		this.jam.folder.artworks({id: this.data.folder.id})
			.then(art => {
				this.isArtRefreshing = false;
				this.data.folder.artworks = art;
			})
			.catch(e => {
				this.isArtRefreshing = false;
				console.error(e);
			});
	}

	async loadWikiDataID(artistID: string): Promise<string | undefined> {
		const mb = await this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.artist, id: artistID});
		if (mb && mb.artist && mb.artist.relations) {
			const rel = mb.artist.relations.find(r => r.type === 'wikidata');
			if (rel) {
				return rel.url.resource.split('/').pop();
			}
		}
	}

	async loadWikiCommonImage(artistID: string): Promise<ArtworkNode | undefined> {
		const id = await this.loadWikiDataID(artistID);
		if (id) {
			const wdata = await this.jam.metadata.wikidata_lookup({id});
			const claimsObj = wdata.entity ? wdata.entity.claims : (wdata.data ? wdata.data.claims : undefined);
			if (claimsObj) {
				const keys = Object.keys(claimsObj);
				for (const key of keys) {
					let claims = claimsObj[key];
					claims = claims.filter(c => typeof c.mainsnak.datavalue.value === 'string' && hasFileExtension(c.mainsnak.datavalue.value.toLowerCase(), ['jpg', 'jpeg', 'png']));
					const claim = claims[0];
					if (claim) {
						const filename = claim.mainsnak.datavalue.value;
						const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&titles=File:${filename}&prop=imageinfo&iiprop=extmetadata|url&iiextmetadatafilter=LicenseShortName`;
						const data = await this.http.get<{
							batchcomplete: string;
							query: {
								normalized: Array<{ from: string; to: string; }>;
								pages: {
									[num: string]: {
										ns: number;
										title: string;
										missing: string;
										known: string;
										imagerepository: string;
										imageinfo: Array<{
											url: string;
											descriptionurl: string;
											descriptionshorturl: string;
											extmetadata: {
												LicenseShortName: {
													value: string;
													hidden: string;
													desc: string;
												}
											}
										}>;
									}
								}
							}
						}>(url).toPromise();
						if (data && data.query.pages) {
							const page = data.query.pages[Object.keys(data.query.pages)[0]];
							if (page && page.imageinfo[0]) {
								return {
									name: ArtworkImageType.artist,
									thumbnail: page.imageinfo[0].url,
									image: page.imageinfo[0].url,
									licence: page.imageinfo[0].extmetadata.LicenseShortName.value,
									checked: true,
									storing: false,
									stored: false,
									types: [ArtworkImageType.artist]
								};
							}
						}
					}
				}
			}
		}
	}

	loadWikiCommon(artistID: string): void {
		this.loadWikiCommonImage(artistID)
			.then(node => {
				this.nodes = [];
				if (node) {
					this.nodes.push(node);
				}
			})
			.catch(e => {
				this.nodes = [];
				this.notify.error(e);
			});
	}

	use(): void {
		const node = this.nodes.find(i => i.checked && !i.storing && !i.stored);
		if (node) {
			this.isWorking = true;
			node.storing = true;
			this.jam.folder.artwork_create({
				id: this.data.folder.id,
				url: node.image,
				types: node.types
			})
				.then(info => {
					this.folderService.waitForQueueResult('Creating Artwork', info, [this.data.folder.id])
						.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
						node.storing = false;
						node.stored = true;
					});
					this.use();
				})
				.catch(e => {
					node.storing = false;
					this.notify.error(e);
				});
		} else {
			this.isWorking = false;
		}
	}

	ngOnInit(): void {
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(change => {
			if (change.id === this.data.folder.id) {
				this.refreshArtworks();
			}
		});
	}

	loadReleaseGroupAndRelease(musicBrainzReleaseID: string, musicBrainzReleaseGroupID: string): void {
		this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.releaseGroup, id: musicBrainzReleaseGroupID})
			.then(res => {
				let nodes = FolderArtworkSearchImageComponent.coverArtResponseToNodes(res);
				this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: musicBrainzReleaseID})
					.then(res2 => {
						nodes = nodes.concat(FolderArtworkSearchImageComponent.coverArtResponseToNodes(res2));
						this.nodes = nodes;
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
				this.nodes = FolderArtworkSearchImageComponent.coverArtResponseToNodes(res);
			})
			.catch(e => {
				this.notify.error(e);
			});
	}

	loadRelease(musicBrainzReleaseID: string): void {
		if (musicBrainzReleaseID) {
			this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: musicBrainzReleaseID})
				.then(res => {
					const nodes = FolderArtworkSearchImageComponent.coverArtResponseToNodes(res);
					this.nodes = nodes;
					if (nodes.length === 0 &&
						this.data && this.data.folder && this.data.folder.tag && this.data.folder.tag.mbReleaseGroupID) {
						this.nodes = undefined;
						this.loadReleaseGroup(this.data.folder.tag.mbReleaseGroupID);
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	private static coverArtResponseToNodes(result: CoverArtArchive.Response): Array<ArtworkNode> {
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
					name: (image.types || []).join('/').toLowerCase(),
					thumbnail: image.thumbnails.small,
					licence: '',
					image: image.image,
					types: (image.types || []).map(s => s.toLowerCase() as ArtworkImageType),
					checked: false,
					storing: false,
					stored: false
				};
			});
		}
		return [];
	}

	private search(): void {
		if (this.data && this.data.folder && this.data.folder.tag) {
			if (this.data.folder.type === FolderType.artist) {
				if (this.data.folder.tag.mbArtistID) {
					this.searchSource = {name: 'Wiki Commons', url: 'https://commons.wikimedia.org'};
					this.loadWikiCommon(this.data.folder.tag.mbArtistID);
				}
			} else if (this.data && this.data.folder && this.data.folder.tag) {
				this.searchSource = {name: 'Coverart Archive', url: 'https://coverartarchive.org'};
				if (this.data.folder.tag.mbReleaseID && this.data.folder.tag.mbReleaseGroupID) {
					this.loadReleaseGroupAndRelease(this.data.folder.tag.mbReleaseID, this.data.folder.tag.mbReleaseGroupID);
				} else if (this.data.folder.tag.mbReleaseID) {
					this.loadRelease(this.data.folder.tag.mbReleaseID);
				} else if (this.data.folder.tag.mbReleaseGroupID) {
					this.loadReleaseGroup(this.data.folder.tag.mbReleaseGroupID);
				}
			}
		}
	}

}
