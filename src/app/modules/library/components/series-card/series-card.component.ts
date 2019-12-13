import {Component, Input} from '@angular/core';
import {ContextMenuService} from '@app/modules/context-menu';
import {NavigService, NotifyService, PlayerService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ActionsService} from '@shared/services';
import {ContextMenuSeriesComponent} from '../context-menu-series/context-menu-series.component';

@Component({
	selector: 'app-series-card',
	templateUrl: './series-card.component.html',
	styleUrls: ['./series-card.component.scss']
})
export class SeriesCardComponent {
	@Input() series: Jam.Series;
	visible: boolean = false;

	constructor(
		public navig: NavigService,
		public player: PlayerService,
		public actions: ActionsService,
		protected notify: NotifyService,
		protected jam: JamService,
		private contextMenuService: ContextMenuService
	) {
	}

	onContextMenu($event: MouseEvent): void {
		this.contextMenuService.open(ContextMenuSeriesComponent, this.series, $event);
	}

	gotInView(): void {
		this.visible = true;
	}
}
