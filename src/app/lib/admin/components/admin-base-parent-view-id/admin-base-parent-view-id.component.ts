import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, type ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-admin-base-parent-view-id',
	templateUrl: './admin-base-parent-view-id.component.html',
	styleUrls: ['./admin-base-parent-view-id.component.scss']
})
export class AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	id?: string;
	protected readonly unsubscribe = new Subject<void>();
	protected readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		if (this.route.parent) {
			this.route.parent.paramMap
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(paramMap => {
					this.resolve(paramMap);
					this.refresh();
				});
		}
	}

	idChanged(): void {
		// To be overridden
	}

	refresh(): void {
		// To be overridden
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	protected resolve(paramMap: ParamMap): void {
		this.id = paramMap.get('id') ?? undefined;
		this.idChanged();
	}
}
