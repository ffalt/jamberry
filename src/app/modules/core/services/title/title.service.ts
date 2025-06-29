import {Injectable, OnDestroy, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Jam} from '@jam';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {AppService} from '../app/app.service';
import {PlayerEvents} from '../player/player.interface';
import {PlayerService} from '../player/player.service';

@Injectable({
	providedIn: 'root'
})
export class TitleService implements OnDestroy {
	title = inject(Title);
	titles: Array<string> = [];
	readonly app = inject(AppService);
	readonly player = inject(PlayerService);
	protected readonly unsubscribe = new Subject<void>();
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	constructor() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				takeUntil(this.unsubscribe)).subscribe(() => {
			this.titles = [];

			const collectRouteData = (currentroute: ActivatedRoute): void => {
				const data = currentroute.snapshot.data;
				if (data.name) {
					this.titles.push(data.name);
				} else if (data.names) {
					const titleinfo = data.names.filter((info: { id: string }) => (info.id === currentroute.snapshot.params.id))[0];
					if (titleinfo) {
						this.titles.push(titleinfo.name);
					}
				} else if (currentroute.snapshot.params.name) {
					this.titles.push(currentroute.snapshot.params.name);
				}
				currentroute.children.forEach(collectRouteData);
			};
			this.route.children.forEach(collectRouteData);

			this.titles.push(this.app.name);
			if (!this.app.settings.playingTrackInTitle) {
				this.refreshTitle();
			}
		});

		this.player.on(PlayerEvents.FINISH, () => {
			this.refreshTitle();
		});

		this.player.on(PlayerEvents.TRACK, (track: Jam.Track) => {
			if (this.app.settings.playingTrackInTitle) {
				if (track) {
					this.refreshTitleSong(track);
				} else {
					this.refreshTitle();
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refreshTitleSong(track: Jam.Track): void {
		const title = `${track.tag?.title || 'Unknown Title'} - ${track.tag?.artist || 'Unknown Artist'} • ${this.app.name}`;
		this.title.setTitle(title);
	}

	refreshTitle(): void {
		this.title.setTitle(this.titles.join(' • '));
	}

}
