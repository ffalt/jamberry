import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-admin-base-view-id',
	templateUrl: './admin-base-view-id.component.html',
	styleUrls: ['./admin-base-view-id.component.scss'],
	standalone: false
})
export class AdminBaseViewIdComponent implements OnInit, OnDestroy {
	id?: string;
	protected readonly unsubscribe = new Subject<void>();
	private readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		if (this.route) {
			this.route.params
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
