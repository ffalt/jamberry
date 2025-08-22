import { Component, inject, input, type OnChanges } from '@angular/core';
import { type Jam, type JamObjectType, JamService } from '@jam';
import { RateComponent } from '../rate/rate.component';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
	selector: 'app-context-entry-rate',
	templateUrl: './context-entry-rate.component.html',
	styleUrls: ['./context-entry-rate.component.scss'],
	imports: [RateComponent]
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
		base.state = base.state ?? {};
		if (base.state.rated !== this.rating) {
			try {
				await this.jam.state.rate({ id: base.id, rating: this.rating });
				base.state.rated = this.rating;
				this.notify.success(`Rated ${this.baseType()} with ${this.rating}`);
			} catch (error: unknown) {
				this.notify.error(error);
				return Promise.reject(error);
			}
		}
	}
}
