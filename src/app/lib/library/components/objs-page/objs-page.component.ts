import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { getUrlType, type JamType, JamUrlType } from '@utils/jam-lists';
import { DeferLoadScrollHostDirective } from '@modules/defer-load/defer-load-scroll-host.directive';
import { LibraryService } from '../../services/library/library.service';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';

@Component({
	selector: 'app-page-objs',
	templateUrl: './objs-page.component.html',
	styleUrls: ['./objs-page.component.scss'],
	imports: [RouterModule, DeferLoadScrollHostDirective, HeaderIconSectionComponent]
})
export class ObjsPageComponent implements OnInit, OnDestroy {
	tabs?: Array<HeaderTab>;
	type?: JamType;
	icon?: string;
	section?: string;
	sectionType?: string;
	hasContextMenu: boolean = false;
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(val => {
				const type = getUrlType(val);
				this.type = type;
				this.hasContextMenu = false;
				this.sectionType = type?.category;
				this.icon = type?.icon;
				this.section = type?.text;
				switch (type?.id) {
					case JamUrlType.podcasts: {
						this.hasContextMenu = !!this.library.jam.auth.user?.roles.podcast;
						break;
					}
					case JamUrlType.playlists: {
						this.hasContextMenu = true;
						break;
					}
					default:
				}
				this.tabs = type?.id ? this.library.buildTabs(type.id) : undefined;
			});
	}

	onContextMenu($event: Event): void {
		if (!this.hasContextMenu) {
			return;
		}
		switch (this.type?.id) {
			case JamUrlType.podcasts: {
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
			}
			case JamUrlType.playlists: {
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
			}
			default:
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
