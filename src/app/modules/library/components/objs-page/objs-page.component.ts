import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getUrlType, JamType, JamUrlType} from '@app/utils/jam-lists';
import {LibraryService} from '@library/services';
import {HeaderTab} from '@shared/components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-page-objs',
	templateUrl: './objs-page.component.html',
	styleUrls: ['./objs-page.component.scss']
})
export class ObjsPageComponent implements OnInit, OnDestroy {
	tabs?: Array<HeaderTab>;
	type?: JamType;
	icon?: string;
	section?: string;
	sectionType?: string;
	hasContextMenu: boolean = false;
	protected unsubscribe = new Subject();

	constructor(private library: LibraryService, protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = getUrlType(val);
			this.type = type;
			this.hasContextMenu = false;
			this.sectionType = type?.category;
			this.icon = type?.icon;
			this.section = type?.text;
			switch (type?.id) {
				case JamUrlType.podcasts:
					this.hasContextMenu = !!this.library.jam.auth.user?.roles.podcast;
					break;
				case JamUrlType.playlists:
					this.hasContextMenu = true;
					break;
				default:
			}
			this.tabs = type?.id ? this.library.buildTabs(type.id) : undefined;
		});
	}

	onContextMenu($event: Event, item?: any): void {
		if (!this.hasContextMenu) {
			return;
		}
		switch (this.type?.id) {
			case JamUrlType.podcasts:
				this.library.openSimpleMenu(
					[
						{
							text: 'New Podcast',
							icon: 'icon-list-add',
							click: (): void => {
								this.library.navig.toPodcastSearch();
							}
						},
						{
							text: 'Refresh Podcast Feeds',
							icon: 'icon-rescan',
							click: (): void => {
								this.library.podcastService.checkPodcasts();
							}
						}
					],
					$event
				);
				break;
			case JamUrlType.playlists:
				this.library.openSimpleMenu(
					[
						{
							text: 'New Playlist',
							icon: 'icon-list-add',
							click: (): void => {
								this.library.playlistDialogsService.newPlaylist();
							}
						}
					], $event);
				break;
			default:
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
