import { Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { ActivatedRoute, type ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-admin-base-parent-view-id',
	templateUrl: './admin-base-parent-view-id.component.html'
})
export class AdminBaseParentViewIdComponent implements OnInit {
	id?: string;
	protected readonly lifeRef = inject(DestroyRef);
	protected readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntilDestroyed(this.lifeRef))
				.subscribe(paramMap => {
					this.resolve(paramMap);
					this.refresh();
				});
		}
	}

	idChanged(): void {
		// overridden by subclasses
	}

	refresh(): void {
		// overridden by subclasses
	}

	protected resolve(paramMap: ParamMap): void {
		this.id = paramMap.get('id') ?? undefined;
		this.idChanged();
	}
}
