import {HttpClient} from '@angular/common/http';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {hasFileExtension} from '@app/modules/tag-editor/model/utils';
import {NotifyService} from '@core/services';
import {ArtworkImageType, Jam, JamService, MusicBrainzLookupType} from '@jam';
import {FolderService, FolderServiceNotifyMode} from '@app/modules/admin-core/services';

export interface ArtistImageSearch {
	folder: Jam.Folder;
}

export interface ArtistImageNode {
	name: string;
	image: string;
	checked: boolean;
	storing: boolean;
	stored: boolean;
}

@Component({
	selector: 'app-admin-artist-image',
	templateUrl: 'artist-image.component.html',
	styleUrls: ['artist-image.component.scss']
})
export class ArtistImageComponent implements OnChanges {
	@Input() data: ArtistImageSearch;
	nodes: Array<ArtistImageNode>;
	isWorking = false;
	isArtRefreshing = false;

	constructor(private jam: JamService, private notify: NotifyService, private folderService: FolderService, private http: HttpClient) {
	}

	trackByFn(index: number, node: ArtistImageNode): string {
		return node.image;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.data && this.data.folder && this.data.folder.tag && this.data.folder.tag.musicbrainz) {
			if (this.data.folder.tag.musicbrainz.artistID) {
				this.loadWikiCommon(this.data.folder.tag.musicbrainz.artistID);
			}
		}
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

	async loadWikiCommonImage(artistID: string): Promise<ArtistImageNode | undefined> {
		const mb = await this.jam.metadata.musicbrainz_lookup({type: MusicBrainzLookupType.artist, id: artistID});
		if (mb && mb.artist && mb.artist.relations) {
			const rel = mb.artist.relations.find(r => r.type === 'wikidata');
			if (rel) {
				const id = rel.url.resource.split('/').pop();
				if (id) {
					const wdata = await this.jam.metadata.wikidata_lookup({id});
					if (wdata.entity) {
						const keys = Object.keys(wdata.entity.claims);
						for (const key of keys) {
							let claims = wdata.entity.claims[key];
							claims = claims.filter(c => c.mainsnak.datatype === 'commonsMedia' && typeof c.mainsnak.datavalue.value === 'string' && hasFileExtension(c.mainsnak.datavalue.value, ['jpg', 'jpeg', 'png']));
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
											name: page.imageinfo[0].extmetadata.LicenseShortName.value,
											image: page.imageinfo[0].url,
											checked: true,
											storing: false,
											stored: false
										};
									}
								}
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
		const storing = this.nodes.find(i => i.storing);
		if (storing) {
			return;
		}
		const item = this.nodes.find(i => i.checked && !i.storing && !i.stored);
		if (item) {
			this.isWorking = true;
			item.storing = true;
			this.jam.folder.artwork_create({
				id: this.data.folder.id,
				url: item.image,
				types: [ArtworkImageType.artist]
			})
				.then(() => {
					item.storing = false;
					item.stored = true;
					this.use();
				})
				.catch(e => {
					item.storing = false;
					this.notify.error(e);
				});
		} else {
			this.isWorking = false;
			this.folderService.notifyFolderChange(this.data.folder.id, FolderServiceNotifyMode.fsnRefresh);
			this.refreshArtworks();
		}
	}
}
