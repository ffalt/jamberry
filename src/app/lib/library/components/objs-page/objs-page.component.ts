import { Component, computed, DestroyRef, inject, signal, type Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getUrlType, type JamType, JamUrlType } from '@utils/jam-lists';
import { DeferLoadScrollHostDirective } from '@modules/defer-load/defer-load-scroll-host.directive';
import { LibraryService } from '../../services/library/library.service';
import type { HeaderTab } from '@core/components/header-tabs/header-tabs.component';
import { HeaderIconSectionComponent } from '@core/components/header-icon-section/header-icon-section.component';
import { IconListAddComponent } from '@core/components/icons/icon-list-add.component';
import { IconRescanComponent } from '@core/components/icons/icon-rescan.component';

@Component({
	selector: 'app-page-objs',
	templateUrl: './objs-page.component.html',
	styleUrls: ['./objs-page.component.scss'],
	imports: [RouterModule, DeferLoadScrollHostDirective, HeaderIconSectionComponent]
})
export class ObjsPageComponent {
	readonly type = signal<JamType | undefined>(undefined);
	readonly tabs = computed<Array<HeaderTab> | undefined>(() => {
		const id = this.type()?.id;
		return id ? this.library.buildTabs(id) : undefined;
	});

	readonly icon = computed<Type<unknown> | undefined>(() => this.type()?.icon);
	readonly section = computed(() => this.type()?.text);
	readonly sectionType = computed(() => this.type()?.category);
	readonly hasContextMenu = computed(() => {
		switch (this.type()?.id) {
			case JamUrlType.podcasts: {
				return !!this.library.jam.auth.user?.roles.podcast;
			}
			case JamUrlType.playlists: {
				return true;
			}
			default: {
				return false;
			}
		}
	});

	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);
	private readonly library = inject(LibraryService);

	constructor() {
		this.route.url
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(val => {
				this.type.set(getUrlType(val));
			});
	}

	onContextMenu($event: Event): void {
		if (!this.hasContextMenu()) {
			return;
		}
		switch (this.type()?.id) {
			case JamUrlType.podcasts: {
				this.library.openSimpleMenu(
					[
						{
							text: 'New Podcast',
							icon: IconListAddComponent,
							click: (): void => {
								this.library.navig.toPodcastSearch();
							}
						},
						{
							text: 'Refresh Podcast Feeds',
							icon: IconRescanComponent,
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
							icon: IconListAddComponent,
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
}
