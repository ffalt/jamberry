import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamObjectType, JamService} from '@jam';

@Component({
	selector: 'app-context-entry-rate',
	templateUrl: './context-entry-rate.component.html',
	styleUrls: ['./context-entry-rate.component.scss']
})
export class ContextEntryRateComponent implements OnChanges {
	@Input() base: Jam.Base;
	@Input() baseType: string | JamObjectType;
	rating: number = 0;

	constructor(private notify: NotifyService, private jam: JamService) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.rating = (this.base && this.base.state ? this.base.state.rated : 0) || 0;
	}

	async onRating(num: number): Promise<void> {
		this.rating = num;
		this.base.state = this.base.state || {};
		if (this.base.state.rated !== this.rating) {
			try {
				await this.jam.base.rate(this.baseType, {id: this.base.id, rating: this.rating});
				this.base.state.rated = this.rating;
				this.notify.success(`Rated ${this.baseType} with ${this.rating}`);
			} catch (e) {
				this.notify.error(e);
				return Promise.reject(e);
			}
		}
	}

}
