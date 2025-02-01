import {Component, Input, OnChanges} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamObjectType, JamService} from '@jam';

@Component({
    selector: 'app-context-entry-rate',
    templateUrl: './context-entry-rate.component.html',
    styleUrls: ['./context-entry-rate.component.scss'],
    standalone: false
})
export class ContextEntryRateComponent implements OnChanges {
	@Input() base?: Jam.Base;
	@Input() baseType?: string | JamObjectType;
	rating: number = 0;

	constructor(private notify: NotifyService, private jam: JamService) {
	}

	ngOnChanges(): void {
		this.rating = (this.base && this.base.state ? this.base.state.rated : 0) || 0;
	}

	async onRating(num: number): Promise<void> {
		if (!this.base) {
			return;
		}
		this.rating = num;
		this.base.state = this.base.state || {};
		if (this.base.state.rated !== this.rating) {
			try {
				await this.jam.state.rate({id: this.base.id, rating: this.rating});
				this.base.state.rated = this.rating;
				this.notify.success(`Rated ${this.baseType} with ${this.rating}`);
			} catch (e: any) {
				this.notify.error(e);
				return Promise.reject(e);
			}
		}
	}

}
