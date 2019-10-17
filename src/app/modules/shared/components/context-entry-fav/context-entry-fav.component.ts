import {Component, HostListener, Input} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamObjectType, JamService} from '@jam';

@Component({
	selector: 'app-context-entry-fav',
	templateUrl: 'context-entry-fav.component.html',
	styleUrls: ['context-entry-fav.component.scss']
})
export class ContextEntryFavComponent {
	@Input() base: Jam.Base;
	@Input() baseType: string | JamObjectType;

	constructor(private notify: NotifyService, private jam: JamService) {
	}

	@HostListener('click', ['$event'])
	toggle(event: Event): void {
		this.base.state = this.base.state || {};
		const remove = !!this.base.state.faved;
		this.jam.base.fav(this.baseType, {id: this.base.id, remove})
			.then(() => {
				this.base.state.faved = remove ? undefined : Date.now();
				this.notify.success('Favorite ' + (remove ? 'removed' : 'added'));
			}).catch(e => {
			this.notify.error(e);
		});
	}

}
