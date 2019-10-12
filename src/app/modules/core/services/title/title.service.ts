import {Injectable, OnDestroy} from '@angular/core';
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
	titles: Array<string> = [];
	protected unsubscribe = new Subject();

	constructor(private router: Router, public app: AppService, public player: PlayerService, private route: ActivatedRoute, public title: Title) {
		router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				takeUntil(this.unsubscribe)).subscribe(() => {
				this.titles = [];

				const collectRouteData = (currentroute: ActivatedRoute) => {
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
				route.children.forEach(collectRouteData);

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
		const title = `${track.tag.title} - ${track.tag.artist} • ${this.app.name}`;
		this.title.setTitle(title);
	}

	refreshTitle(): void {
		this.title.setTitle(this.titles.join(' • '));
	}

}
