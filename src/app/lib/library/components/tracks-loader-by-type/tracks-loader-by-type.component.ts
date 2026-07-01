import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import type { ListType } from '@jam';
import { ListTypeUrlNamesKeys } from '@utils/jam-lists';
import { TracksLoaderComponent } from '../tracks-loader/tracks-loader.component';

@Component({
	selector: 'app-tracks-loader-page-by-type',
	templateUrl: './tracks-loader-by-type.component.html',
	styleUrls: ['./tracks-loader-by-type.component.scss'],
	imports: [TracksLoaderComponent]
})
export class TracksLoaderByTypeComponent {
	readonly listType = signal<ListType | undefined>(undefined);
	private readonly route = inject(ActivatedRoute);
	private readonly lifeRef = inject(DestroyRef);

	constructor() {
		this.route.url
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(value => {
				const type = value.length > 0 ? value[0].path : undefined;
				this.listType.set(type ? ListTypeUrlNamesKeys[type] : undefined);
			});
	}
}
