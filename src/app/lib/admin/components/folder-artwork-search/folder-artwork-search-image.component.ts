import { HttpClient } from '@angular/common/http';
import { Component, inject, input, type OnChanges, type OnDestroy, type OnInit } from '@angular/core';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';
import { FormsModule } from '@angular/forms';
import { ArtworkImageType, type CoverArtArchive, CoverArtArchiveLookupType, FolderType, type Jam, JamService, type MusicBrainz, MusicBrainzLookupType, type WikiData } from '@jam';
import type { Discogs } from '@modules/jam/model/discogs-rest-data';
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
	imports: [ArtworkListComponent, BackgroundTextListComponent, ClickKeyEnterDirective, FocusKeyListDirective, FocusKeyListItemDirective, FormsModule, IconSpinComponent, LoadingComponent]
})
export class FolderArtworkSearchImageComponent implements OnChanges, OnInit, OnDestroy {
	readonly data = input<ArtworkSearch>();
	artworks?: Array<Jam.Artwork>;
	nodes?: Array<ArtworkNode>;
	isWorking = false;
	isArtRefreshing = false;
	searchSources: Array<{ name: string; url: string }> = [];
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

	ngOnInit(): void {
		this.folderService.foldersChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(change => {
				if (change.id === this.data()?.folder.id) {
					this.refreshArtworks();
				}
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

	private async loadWikiDataID(mbArtistID: string): Promise<string | undefined> {
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

	private async loadWikiCommonImage(artistID: string): Promise<ArtworkNode | undefined> {
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

	private async fetchCoverArtNodes(tag: Jam.FolderTag): Promise<Array<ArtworkNode>> {
		const promises: Array<Promise<Array<ArtworkNode>>> = [];
		if (tag.mbReleaseGroupID) {
			promises.push(
				this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.releaseGroup, mbID: tag.mbReleaseGroupID })
					.then(res => this.coverArtResponseToNodes(res.data as CoverArtArchive.Response))
			);
		}
		if (tag.mbReleaseID) {
			promises.push(
				this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.release, mbID: tag.mbReleaseID })
					.then(res => this.coverArtResponseToNodes(res.data as CoverArtArchive.Response))
			);
		}
		const results = await Promise.all(promises);
		return results.flat();
	}

	private async fetchDiscogsNodes(artist: string, album: string): Promise<Array<ArtworkNode>> {
		const res = await this.jam.metadata.discogsReleaseSearch({ artist, title: album });
		return this.discogsResponseToNodes(res.data as Discogs.SearchResponse | undefined);
	}

	private async fetchDiscogsArtistNodes(artist: string): Promise<Array<ArtworkNode>> {
		const res = await this.jam.metadata.discogsArtistSearch({ query: artist });
		const data = res.data as Discogs.SearchResponse | undefined;
		if (!data?.results) {
			return [];
		}
		return data.results
			.filter(r => r.cover_image && !r.cover_image.includes('spacer'))
			.map(r => ({
				name: r.title,
				thumbnail: this.jam.metadata.discogsImageUrl({ url: r.thumb }),
				image: r.cover_image,
				licence: '',
				checked: false,
				storing: false,
				types: [ArtworkImageType.artist]
			}));
	}

	private discogsResponseToNodes(result?: Discogs.SearchResponse): Array<ArtworkNode> {
		if (!result?.results) {
			return [];
		}
		return result.results
			.filter(r => r.cover_image && !r.cover_image.includes('spacer'))
			.map(r => ({
				name: r.title,
				thumbnail: this.jam.metadata.discogsImageUrl({ url: r.thumb }),
				image: r.cover_image,
				licence: '',
				checked: false,
				storing: false,
				types: [ArtworkImageType.front]
			}));
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

	private searchArtist(tag: Jam.FolderTag): void {
		const sources: Array<{ name: string; url: string }> = [];
		const promises: Array<Promise<Array<ArtworkNode>>> = [];

		if (tag.mbArtistID) {
			sources.push({ name: 'Wiki Commons', url: 'https://commons.wikimedia.org' });
			promises.push(
				this.loadWikiCommonImage(tag.mbArtistID).then(node => (node ? [node] : []))
			);
		}
		if (tag.artist) {
			sources.push({ name: 'Discogs', url: 'https://www.discogs.com' });
			promises.push(this.fetchDiscogsArtistNodes(tag.artist));
		}

		if (promises.length === 0) {
			return;
		}

		this.searchSources = sources;
		Promise.all(promises)
			.then(results => {
				this.display(results.flat());
			})
			.catch((error: unknown) => {
				this.nodes = [];
				this.notify.error(error);
			});
	}

	private searchAlbum(tag: Jam.FolderTag): void {
		const sources: Array<{ name: string; url: string }> = [];
		const promises: Array<Promise<Array<ArtworkNode>>> = [];

		if (tag.mbReleaseID || tag.mbReleaseGroupID) {
			sources.push({ name: 'Coverart Archive', url: 'https://coverartarchive.org' });
			promises.push(this.fetchCoverArtNodes(tag));
		}
		if (tag.artist && tag.album) {
			sources.push({ name: 'Discogs', url: 'https://www.discogs.com' });
			promises.push(this.fetchDiscogsNodes(tag.artist, tag.album));
		}

		if (promises.length === 0) {
			return;
		}

		this.searchSources = sources;
		Promise.all(promises)
			.then(results => {
				this.display(results.flat());
			})
			.catch((error: unknown) => {
				this.nodes = [];
				this.notify.error(error);
			});
	}

	private search(): void {
		const data = this.data();
		if (!data?.folder.tag) {
			return;
		}
		if (data.folder.type === FolderType.artist) {
			this.searchArtist(data.folder.tag);
		} else {
			this.searchAlbum(data.folder.tag);
		}
	}
}
