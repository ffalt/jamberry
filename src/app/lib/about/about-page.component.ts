import { Component, inject, VERSION } from '@angular/core';
import { JamAuthService } from '@jam';
import { HotkeysService } from '@modules/hotkeys';
import { HeaderSlimComponent } from '@core/components/header-slim/header-slim.component';
import { PlayerService } from '@core/services/player/player.service';
import { AppService } from '@core/services/app/app.service';

@Component({
	selector: 'app-page-about',
	templateUrl: './about-page.component.html',
	styleUrls: ['./about-page.component.scss'],
	imports: [HeaderSlimComponent]
})
export class AboutPageComponent {
	readonly VERSION = VERSION;
	readonly app = inject(AppService);
	readonly auth = inject(JamAuthService);
	readonly player = inject(PlayerService);
	readonly keyCmds: Array<{ name: string; desc: string }>;

	constructor() {
		this.keyCmds = inject(HotkeysService).hotkeys
			.filter(h => String(h.combo) !== '?')
			.map(h => ({ name: String(h.combo), desc: h.description ?? '' }));
	}
}
