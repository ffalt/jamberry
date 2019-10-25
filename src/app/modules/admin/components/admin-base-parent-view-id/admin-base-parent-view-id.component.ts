import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-base-parent-view-id',
	templateUrl: './admin-base-parent-view-id.component.html',
	styleUrls: ['./admin-base-parent-view-id.component.scss']
})
export class AdminBaseParentViewIdComponent implements OnInit, OnDestroy {
	id: string;
	protected unsubscribe = new Subject();

	constructor(private route: ActivatedRoute) {

	}

	ngOnInit(): void {
		if (this.route && this.route.parent) {
			this.route.parent.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.resolve(params);
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

	protected resolve(params: any): void {
		this.id = params.id;
		this.idChanged();
	}

}
