import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService, PodcastService} from '@shared/services';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ContextMenuPodcastComponent} from '../../components/context-menu-podcast/context-menu-podcast.component';

@Component({
	selector: 'app-page-podcast',
	templateUrl: 'podcast-page.component.html',
	styleUrls: ['podcast-page.component.scss']
})
export class PodcastPageComponent implements OnInit, OnDestroy {
	podcast: Jam.Podcast;
	id: string;
	protected unsubscribe = new Subject();
	private subList: Subscription;
	private podcastID: string;

	constructor(
		public podcastService: PodcastService,
		public navig: NavigService, public player: PlayerService, public actions: ActionsService,
		public jam: JamService, protected notify: NotifyService, protected route: ActivatedRoute,
		private contextMenuService: ContextMenuService
	) {
	}

	ngOnInit(): void {
		if (this.route) {
			this.route.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
				this.recheck();
			});
		}
	}

	ngOnDestroy(): void {
		if (this.subList) {
			this.subList.unsubscribe();
			this.subList = undefined;
		}
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	onContextMenu($event: MouseEvent, item: Jam.Podcast): void {
		this.contextMenuService.open(ContextMenuPodcastComponent, item, $event);
	}

	recheck(): void {
		if (this.subList) {
			this.subList.unsubscribe();
			this.subList = undefined;
		}
		if (this.id) {
			this.podcastID = this.id;
			this.subList = this.podcastService.podcastChange
				.notifier(this.podcastID)
				.pipe(takeUntil(this.unsubscribe)).subscribe(podcast => {
					if (!podcast) {
						this.navig.toPodcasts();
						return;
					}
					this.podcast = podcast;
				});
		}
	}

	refresh(): void {
		if (this.podcastID) {
			this.podcastService.refreshPodcast(this.podcastID);
		}
	}

}
