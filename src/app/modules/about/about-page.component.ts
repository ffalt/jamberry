import {Component, VERSION} from '@angular/core';

import {HotkeysService} from '@app/modules/hotkeys';
import {AppService, PlayerService} from '@core/services';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-page-about',
	templateUrl: './about-page.component.html',
	styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
	keyCmds: Array<{ name: string; desc: string }> = [];
	VERSION = VERSION;

	constructor(private hotkeysService: HotkeysService, public app: AppService, public auth: JamAuthService, public player: PlayerService) {
		this.keyCmds = hotkeysService.hotkeys
			.filter(h => h.combo.toString() !== '?')
			.map(h => ({name: h.combo.toString(), desc: h.description.toString()}));
	}

}
