import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import type { TabComponent } from '@modules/tab-portal';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { ActionsService } from '@core/services/actions/actions.service';
import { ChaptersComponent } from '@core/components/chapters/chapters.component';
import { FavIconComponent } from '@core/components/fav-icon/fav-icon.component';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { LyricsComponent } from '@core/components/lyrics/lyrics.component';
import { PlayerService } from '@core/services/player/player.service';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-player-current-info',
	templateUrl: './player-current-info.component.html',
	styleUrls: ['./player-current-info.component.scss'],
	imports: [CommonModule, ClickKeyEnterDirective, ChaptersComponent, FavIconComponent, CoverartImageComponent, LyricsComponent]
})
export class PlayerCurrentInfoComponent implements TabComponent {
	readonly player = inject(PlayerService);
	readonly navig = inject(NavigService);
	readonly actions = inject(ActionsService);

	onActivate(): void {
		//
	}

	onContextMenu(/* $event: Event, item: Jam.Track */): void {
		// TODO: context-menu this.contextMenuService.open(ContextMenuQueueTrackComponent, item, $event);
	}
}
