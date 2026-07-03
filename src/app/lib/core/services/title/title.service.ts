import { DestroyRef, inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import type { Jam } from '@jam';
import { filter } from 'rxjs';
import { AppService } from '../app/app.service';
import { PlayerEvents } from '../player/player.interface';
import { PlayerService } from '../player/player.service';

@Service()
export class TitleService {
	title = inject(Title);
	titles: Array<string> = [];
	private readonly app = inject(AppService);
	private readonly player = inject(PlayerService);
	private readonly lifeRef = inject(DestroyRef);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	constructor() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.titles = [];

				const collectRouteData = (currentroute: ActivatedRoute): void => {
					const data = currentroute.snapshot.data as { name?: string; names?: Array<{ id: string; name: string }> };
					if (data.name) {
						this.titles.push(data.name);
					} else if (data.names) {
						const titleinfo = data.names.find((info: { id: string }) => (info.id === currentroute.snapshot.params.id));
						if (titleinfo) {
							this.titles.push(titleinfo.name);
						}
					} else {
						const title = currentroute.snapshot.paramMap.get('name');
						if (title) {
							this.titles.push(title);
						}
					}
					for (const element of currentroute.children) {
						collectRouteData(element);
					}
				};
				for (const element of this.route.children) {
					collectRouteData(element);
				}

				this.titles.push(this.app.name);
				if (!this.app.settings.playingTrackInTitle) {
					this.refreshTitle();
				}
			});

		this.player.on(PlayerEvents.FINISH, () => {
			this.refreshTitle();
		});

		this.player.on(PlayerEvents.TRACK, (track?: Jam.Track) => {
			if (this.app.settings.playingTrackInTitle) {
				if (track) {
					this.refreshTitleSong(track);
				} else {
					this.refreshTitle();
				}
			}
		});
	}

	refreshTitleSong(track: Jam.Track): void {
		const title = `${track.tag?.title ?? 'Unknown Title'} - ${track.tag?.artist ?? 'Unknown Artist'} • ${this.app.name}`;
		this.title.setTitle(title);
	}

	refreshTitle(): void {
		this.title.setTitle(this.titles.join(' • '));
	}
}
