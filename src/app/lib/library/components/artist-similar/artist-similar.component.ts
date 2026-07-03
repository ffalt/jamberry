import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService } from '@jam';
import { JamArtistObject } from '../../model/objects';
import { ObjGroupsViewComponent } from '../obj-groups-view/obj-groups-view.component';
import { LibraryService } from '../../services/library/library.service';
import { LoadingComponent } from '@core/components/loading/loading.component';

@Component({
	selector: 'app-artist-similar',
	templateUrl: './artist-similar.component.html',
	styleUrls: ['./artist-similar.component.scss'],
	imports: [ObjGroupsViewComponent, LoadingComponent]
})
export class ArtistSimilarComponent {
	readonly similar = signal<Array<JamArtistObject> | undefined>(undefined);
	private id?: string;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);
	private readonly library = inject(LibraryService);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id = paramMap.get('id') ?? undefined;
				this.refresh();
			});
	}

	refresh(): void {
		this.similar.set(undefined);
		if (!this.id) {
			return;
		}
		this.jam.artist.similar({ id: this.id, artistIncState: true })
			.then(data => {
				this.similar.set(data.items.map(o => new JamArtistObject(o, this.library)));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
