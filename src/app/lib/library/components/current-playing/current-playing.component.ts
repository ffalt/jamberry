import { Component, inject } from '@angular/core';
import { LimitPipe } from '@core/pipes/limit.pipe';
import { StringTogglePipe } from '@core/pipes/string-toggle/string-toggle.pipe';
import { ClickKeyEnterDirective } from '@core/directives/click-enterkey.directive';
import { ActionsService } from '@core/services/actions/actions.service';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { PlayerService } from '@core/services/player/player.service';
import { NavigService } from '@core/services/navig/navig.service';

@Component({
	selector: 'app-current-playing',
	templateUrl: './current-playing.component.html',
	styleUrls: ['./current-playing.component.scss'],
	imports: [LimitPipe, StringTogglePipe, ClickKeyEnterDirective, CoverartImageComponent]
})
export class CurrentPlayingComponent {
	readonly player = inject(PlayerService);
	readonly actions = inject(ActionsService);
	readonly navig = inject(NavigService);
}
