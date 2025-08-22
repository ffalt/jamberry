import { HttpClient } from '@angular/common/http';
import { Component, inject, input, type OnChanges, type OnDestroy, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtworkImageType, type CoverArtArchive, CoverArtArchiveLookupType, FolderType, type Jam, JamService, type MusicBrainz, MusicBrainzLookupType, type WikiData } from '@jam';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { hasFileExtension } from '../../../tag-editor/model/utils';
import { ArtworkListComponent } from '../artwork-list/artwork-list.component';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { FocusKeyListItemDirective } from '@core/directives/focus-key-list-item.directive';
import { FocusKeyListDirective } from '@core/directives/focus-key-list.directive';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { LoadingComponent } from '@core/components/loading/loading.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';

export interface ArtworkSearch {
	folder: Jam.Folder;
	artworks: Array<Jam.Artwork>;
}

export interface ArtworkNode {
	name: string;
	thumbnail: string;
	image: string;
	licence: string;
	checked: boolean;
	storing: boolean;
	types: Array<ArtworkImageType>;
}

@Component({
	selector: 'app-admin-folder-artwork-search',
	templateUrl: './folder-artwork-search-image.component.html',
	styleUrls: ['./folder-artwork-search-image.component.scss'],
	imports: [
		FormsModule,
		ArtworkListComponent, ClickKeyEnterDirective, FocusKeyListItemDirective, FocusKeyListDirective,
		BackgroundTextListComponent, LoadingComponent
	]
})
export class FolderArtworkSearchImageComponent implements OnChanges, OnInit, OnDestroy {
	readonly data = input<ArtworkSearch>();
	artworks?: Array<Jam.Artwork>;
	nodes?: Array<ArtworkNode>;
	isWorking = false;
	isArtRefreshing = false;
	searchSource: { name: string; url: string } = { name: '', url: '' };
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly http = inject(HttpClient);

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	ngOnChanges(): void {
		this.search();
		const data = this.data();
		if (data?.folder) {
			if (data.folder.artworks) {
				this.artworks = data.folder.artworks;
			} else {
				this.refreshArtworks();
			}
		}
	}

	refreshArtworks(): void {
		const data = this.data();
		if (!data) {
			return;
		}
		this.isArtRefreshing = true;
		this.jam.artwork.search({ folderIDs: [data.folder.id] })
			.then(art => {
				this.isArtRefreshing = false;
				this.artworks = art.items;
			})
			.catch((error: unknown) => {
				this.isArtRefreshing = false;
				console.error(error);
			});
	}

	async loadWikiDataID(mbArtistID: string): Promise<string | undefined> {
		const res = await this.jam.metadata.musicbrainzLookup({
			type: MusicBrainzLookupType.artist,
			mbID: mbArtistID
		});
		const data = res.data as MusicBrainz.Response | undefined;
		if (data?.artist?.relations) {
			const rel = data.artist.relations.find(r => r.type === 'wikidata');
			if (rel?.url) {
				return rel.url.resource.split('/').pop();
			}
		}
		return;
	}

	async loadWikiCommonImage(artistID: string): Promise<ArtworkNode | undefined> {
		const wikiDataID = await this.loadWikiDataID(artistID);
		if (!wikiDataID) {
			return;
		}
		const res = await this.jam.metadata.wikidataLookup({ wikiDataID });
		const wdata = res.data as { entity?: WikiData.Entity } | undefined;
		const claimsObj = wdata?.entity?.claims;
		if (!claimsObj) {
			return;
		}
		const keys = Object.keys(claimsObj);
		for (const key of keys) {
			let claims = claimsObj[key];
			claims = claims.filter(c => typeof c.mainsnak.datavalue.value === 'string' && hasFileExtension(c.mainsnak.datavalue.value.toLowerCase(), ['jpg', 'jpeg', 'png']));
			const claim = claims.at(0);
			if (claim) {
				const filename = claim.mainsnak.datavalue.value;
				if (typeof filename !== 'string') {
					return;
				}
				const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&titles=File:${filename}&prop=imageinfo&iiprop=extmetadata|url&iiextmetadatafilter=LicenseShortName`;
				const data = await firstValueFrom(this.http.get<{
					batchcomplete: string;
					query?: {
						normalized: Array<{ from: string; to: string }>;
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
										};
									};
								}>;
							} | undefined;
						};
					};
				} | undefined>(url));
				if (data?.query?.pages) {
					const page = data.query.pages[Object.keys(data.query.pages)[0]];
					const imageinfo = page?.imageinfo[0];
					if (imageinfo) {
						return {
							name: ArtworkImageType.artist,
							thumbnail: imageinfo.url,
							image: imageinfo.url,
							licence: imageinfo.extmetadata.LicenseShortName.value,
							checked: true,
							storing: false,
							types: [ArtworkImageType.artist]
						};
					}
				}
			}
		}
		return;
	}

	loadWikiCommon(artistID: string): void {
		this.loadWikiCommonImage(artistID)
			.then(node => {
				this.nodes = [];
				if (node) {
					node.checked = true;
					this.nodes.push(node);
				}
			})
			.catch((error: unknown) => {
				this.nodes = [];
				this.notify.error(error);
			});
	}

	use(): void {
		const node = (this.nodes ?? []).find(i => i.checked && !i.storing);
		const folder = this.data()?.folder;
		if (node && folder) {
			this.isWorking = true;
			node.storing = true;
			this.jam.artwork.createByUrl({
				folderID: folder.id,
				url: node.image,
				types: node.types
			})
				.then(info => {
					this.folderService.waitForQueueResult('Creating Artwork', info, [folder.id])
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(() => {
							node.storing = false;
							node.checked = false;
						});
					this.use();
				})
				.catch((error: unknown) => {
					node.storing = false;
					this.notify.error(error);
				});
		} else {
			this.isWorking = false;
		}
	}

	ngOnInit(): void {
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(change => {
				if (change.id === this.data()?.folder.id) {
					this.refreshArtworks();
				}
			});
	}

	loadReleaseGroupAndRelease(musicBrainzReleaseID: string, musicBrainzReleaseGroupID: string): void {
		this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.releaseGroup, mbID: musicBrainzReleaseGroupID })
			.then(res => {
				const response = res.data as CoverArtArchive.Response;
				let nodes = this.coverArtResponseToNodes(response);
				this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.release, mbID: musicBrainzReleaseID })
					.then(res2 => {
						const response2 = res2.data as CoverArtArchive.Response;
						nodes = [...nodes, ...this.coverArtResponseToNodes(response2)];
						this.display(nodes);
					})
					.catch((error: unknown) => {
						this.notify.error(error);
					});
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	loadReleaseGroup(musicBrainzReleaseGroupID: string): void {
		this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.releaseGroup, mbID: musicBrainzReleaseGroupID })
			.then(res => {
				const response = res.data as CoverArtArchive.Response;
				const nodes = this.coverArtResponseToNodes(response);
				this.display(nodes);
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	loadRelease(musicBrainzReleaseID: string): void {
		if (musicBrainzReleaseID) {
			this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.release, mbID: musicBrainzReleaseID })
				.then(res => {
					const response = res.data as CoverArtArchive.Response;
					const nodes = this.coverArtResponseToNodes(response);
					this.display(nodes);
					const data = this.data();
					if (nodes.length === 0 && data?.folder.tag?.mbReleaseGroupID) {
						this.nodes = undefined;
						this.loadReleaseGroup(data.folder.tag.mbReleaseGroupID);
					}
				})
				.catch((error: unknown) => {
					this.notify.error(error);
				});
		}
	}

	private coverArtResponseToNodes(result?: CoverArtArchive.Response): Array<ArtworkNode> {
		if (result?.images) {
			return result.images.map(image => {
				const types = image.types ?? [];
				if (types.length === 0) {
					types.push('Other');
				}
				return {
					name: types.join('/').toLowerCase(),
					thumbnail: image.thumbnails?.small ? this.jam.metadata.coverartarchiveImageUrl({ url: image.thumbnails.small }) : '',
					licence: '',
					image: image.image,
					types: types.map(s => s.toLowerCase() as ArtworkImageType),
					checked: false,
					storing: false,
					stored: false
				};
			});
		}
		return [];
	}

	private search(): void {
		const data = this.data();
		if (data?.folder.tag) {
			if (data.folder.type === FolderType.artist) {
				if (data.folder.tag.mbArtistID) {
					this.searchSource = { name: 'Wiki Commons', url: 'https://commons.wikimedia.org' };
					this.loadWikiCommon(data.folder.tag.mbArtistID);
				}
			} else {
				this.searchSource = { name: 'Coverart Archive', url: 'https://coverartarchive.org' };
				if (data.folder.tag.mbReleaseID && data.folder.tag.mbReleaseGroupID) {
					this.loadReleaseGroupAndRelease(data.folder.tag.mbReleaseID, data.folder.tag.mbReleaseGroupID);
				} else if (data.folder.tag.mbReleaseID) {
					this.loadRelease(data.folder.tag.mbReleaseID);
				} else if (data.folder.tag.mbReleaseGroupID) {
					this.loadReleaseGroup(data.folder.tag.mbReleaseGroupID);
				}
			}
		}
	}

	private display(nodes: Array<ArtworkNode>): void {
		this.nodes = nodes;
		let node = nodes.find(n => n.types.length === 1 && n.types[0] === ArtworkImageType.front);
		node ??= nodes.find(n => n.types.includes(ArtworkImageType.front));
		if (node) {
			for (const n of this.nodes) {
				n.checked = n === node;
			}
		}
	}
}
