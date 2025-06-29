import {Component, VERSION, inject} from '@angular/core';

import {HotkeysService} from '@app/modules/hotkeys';
import {AppService, PlayerService} from '@core/services';
import {JamAuthService} from '@jam';

@Component({
	selector: 'app-page-about',
	templateUrl: './about-page.component.html',
	styleUrls: ['./about-page.component.scss'],
	standalone: false
})
export class AboutPageComponent {
	keyCmds: Array<{ name: string; desc: string }> = [];
	readonly VERSION = VERSION;
	readonly app = inject(AppService);
	readonly auth = inject(JamAuthService);
	readonly hotkeysService = inject(HotkeysService);
	readonly player = inject(PlayerService);

	constructor() {
		const hotkeysService = this.hotkeysService;

		this.keyCmds = hotkeysService.hotkeys
			.filter(h => h.combo.toString() !== '?')
			.map(h => ({name: h.combo.toString(), desc: (h.description || '').toString()}));
	}
}
