import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {FolderType, FolderTypesAlbum, Jam, JamService} from '@jam';
import {ContextMenuObjComponent} from '@library/components';
import {JamFolderObject} from '@library/model/helper';
import {LibraryService} from '@library/services';
import {HeaderInfo, HeaderTab} from '@shared/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface FolderHeaderTab extends HeaderTab {
	id: string;
}

export interface FolderHeaderTabs {
	overview: FolderHeaderTab;
	similar: FolderHeaderTab;
	musicbrainz: FolderHeaderTab;
}

function getFolderTypeInfo(folder: Jam.Folder): { type?: string; name?: string; year?: string } {
	// TODO: replace with JamFolderObject
	if (folder) {
		switch (folder.type as FolderType) {
			case FolderType.album:
			case FolderType.multialbum:
				return {
					type: 'Album',
					name: folder.tag.album,
					year: folder.tag.year !== undefined ? folder.tag.year.toString() : undefined
				};
			case FolderType.collection:
				return {
					type: 'Collection',
					name: folder.name
				};
			case FolderType.artist:
				return {
					type: 'Artist',
					name: folder.tag.artist
				};
			default:
				return {
					type: folder.type,
					name: folder.name
				};
		}
	}
	return {};
}

@Component({
	selector: 'app-page-folder',
	templateUrl: './folder-page.component.html',
	styleUrls: ['./folder-page.component.scss']
})
export class FolderPageComponent implements OnInit, OnDestroy {
	folder: Jam.Folder;
	headline: { type?: string; name?: string; year?: string } = {};
	tabsObjs: FolderHeaderTabs = {
		overview: {id: 'overview', label: 'Overview'},
		similar: {id: 'similar', label: 'Related Artists'},
		musicbrainz: {id: 'musicbrainz', label: 'MusicBrainz'}
	};
	tabsList: Array<FolderHeaderTab> = Object.keys(this.tabsObjs).map(key => {
		const tab = this.tabsObjs[key];
		tab.click = () => {
			this.setTab(tab);
		};
		return tab;
	});
	childFolders: Array<JamFolderObject>;
	similarFolders: Array<JamFolderObject>;
	tabs: Array<FolderHeaderTab> = [];
	currentTab: FolderHeaderTab;
	infos: Array<HeaderInfo> = [];
	hasArtistID: boolean;
	isAlbum: boolean;
	isArtist: boolean;
	isCollection: boolean;
	isElse: boolean;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		private library: LibraryService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute,
		private contextMenuService: ContextMenuService) {
		this.setTab(this.tabsList[0]);
	}

	ngOnInit(): void {
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.refresh();
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuObjComponent, new JamFolderObject(this.folder, this.library), $event);
	}

	refresh(): void {
		this.folder = undefined;
		this.hasArtistID = false;
		this.tabs = [];
		this.headline = {};
		if (this.id) {
			this.jam.folder.id({
				id: this.id,
				trackState: true,
				trackTag: true,
				folderParents: true,
				folderState: true,
				folderTag: true,
				folderChildren: true,
				folderInfo: true,
				folderSimilar: true
			})
				.then(folder => {
					this.display(folder);
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	setTab(tab: FolderHeaderTab): void {
		this.currentTab = tab;
		this.tabsList.forEach(t => t.active = false);
		tab.active = true;
	}

	display(folder: Jam.Folder): void {
		this.folder = folder;
		this.childFolders = undefined;
		this.similarFolders = undefined;
		this.headline = getFolderTypeInfo(this.folder);
		this.isAlbum = FolderTypesAlbum.includes(folder.type as FolderType);
		this.isArtist = folder.type === FolderType.artist;
		this.isCollection = folder.type === FolderType.collection;
		this.isElse = !this.isAlbum && !this.isArtist && !this.isCollection;
		this.hasArtistID = this.isArtist && folder.tag && folder.tag.musicbrainz && !!folder.tag.musicbrainz.artistID;
		if (this.folder.folders && this.folder.folders.length > 0) {
			this.childFolders = this.folder.folders.map(o => new JamFolderObject(o, this.library));
		}
		if (this.folder.similar && this.folder.similar.length > 0) {
			this.similarFolders = this.folder.similar.map(o => new JamFolderObject(o, this.library));
		}
		if (this.hasArtistID) {
			this.tabs = this.tabsList;
		} else {
			this.setTab(this.tabsList[0]);
		}
		this.infos = [
			...(this.isAlbum ?
					[
						{label: 'Artist', value: folder.tag.artist},
						{label: 'Year', value: folder.tag.year}
					] : []
			),
			{label: 'Played', value: folder.state.played || 0}
		].filter(info => info.value !== undefined);
	}
}
