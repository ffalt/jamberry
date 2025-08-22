import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@core/services/notify/notify.service';
import { JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
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
export class ArtistSimilarComponent implements OnInit, OnDestroy {
	id?: string;
	similar?: Array<JamArtistObject>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly route = inject(ActivatedRoute);
	private readonly unsubscribe = new Subject<void>();
	private readonly library = inject(LibraryService);

	ngOnInit(): void {
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
					this.refresh();
				});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	refresh(): void {
		this.similar = undefined;
		if (!this.id) {
			return;
		}
		this.jam.artist.similar({ id: this.id, artistIncState: true })
			.then(data => {
				this.similar = data.items.map(o => new JamArtistObject(o, this.library));
			})
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}
}
