import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, type ParamMap } from '@angular/router';

@Component({
	selector: 'app-admin-base-view-id',
	templateUrl: './admin-base-view-id.component.html'
})
export class AdminBaseViewIdComponent implements OnInit {
	id?: string;
	private readonly lifeRef = inject(DestroyRef);
	private readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.resolve(paramMap);
				this.refresh();
			});
	}

	idChanged(): void {
		// To be overridden
	}

	refresh(): void {
		// To be overridden
	}

	protected resolve(paramMap: ParamMap): void {
		this.id = paramMap.get('id') ?? undefined;
		this.idChanged();
	}
}
