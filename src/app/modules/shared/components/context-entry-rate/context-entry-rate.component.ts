import {Component, type OnChanges, inject, input} from '@angular/core';
import {NotifyService} from '@core/services';
import {type Jam, type JamObjectType, JamService} from '@jam';

@Component({
	selector: 'app-context-entry-rate',
	templateUrl: './context-entry-rate.component.html',
	styleUrls: ['./context-entry-rate.component.scss'],
	standalone: false
})
export class ContextEntryRateComponent implements OnChanges {
	readonly base = input<Jam.Base>();
	readonly baseType = input<string | JamObjectType>();
	rating: number = 0;
	private readonly notify = inject(NotifyService);
	private readonly jam = inject(JamService);

	ngOnChanges(): void {
		const base = this.base();
		this.rating = base?.state?.rated ?? 0;
	}

	async onRating(num: number): Promise<void> {
		const base = this.base();
		if (!base) {
			return;
		}
		this.rating = num;
		base.state = base.state || {};
		if (base.state.rated !== this.rating) {
			try {
				await this.jam.state.rate({id: base.id, rating: this.rating});
				base.state.rated = this.rating;
				this.notify.success(`Rated ${this.baseType()} with ${this.rating}`);
			} catch (e: any) {
				this.notify.error(e);
				return Promise.reject(e as Error);
			}
		}
	}
}
