import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {FolderType, FolderTypesAlbum, Jam, JamService} from '@jam';
import {getFolderTypeInfo} from '@library/components';
import {Tab} from '@library/components';
import {ActionsService} from '@shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-folder',
	templateUrl: 'folder-page.component.html',
	styleUrls: ['folder-page.component.scss']
})
export class FolderPageComponent implements OnInit, OnDestroy {
	folder: Jam.Folder;
	tabs: Array<Tab> = [
		{id: 'overview', name: 'Overview'},
		{id: 'similar', name: 'Related Artists'},
		{id: 'musicbrainz', name: 'MusicBrainz'}
	];
	headline: { type?: string; name?: string; year?: string } = {};
	currentTab: Tab = this.tabs[0];
	hasArtistID: boolean;
	isAlbum: boolean;
	isArtist: boolean;
	isCollection: boolean;
	isElse: boolean;
	id: string;
	protected unsubscribe = new Subject();

	constructor(
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		protected jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute
	) {
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

	refresh(): void {
		this.folder = undefined;
		this.hasArtistID = false;
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
					this.folder = folder;
					this.headline = getFolderTypeInfo(this.folder);
					this.isAlbum = FolderTypesAlbum.includes(folder.type as FolderType);
					this.isArtist = folder.type === FolderType.artist;
					this.isCollection = folder.type === FolderType.collection;
					this.isElse = !this.isAlbum && !this.isArtist && !this.isCollection;
					this.hasArtistID = this.isArtist && folder.tag && folder.tag.musicbrainz && !!folder.tag.musicbrainz.artistID;
					if (!this.hasArtistID) {
						this.currentTab = this.tabs[0];
					}
				})
				.catch(e => {
					this.notify.error(e);
				});
		}
	}

	setTab(tab: Tab): void {
		this.currentTab = tab;
	}
}
