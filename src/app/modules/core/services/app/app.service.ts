import {Injectable} from '@angular/core';
import {Settings} from '@app/app.settings';
import {environment} from '../../../../../environments/environment';

export interface SidebarProvider {
	toggleMobileNavig(): void;
}

@Injectable({
	providedIn: 'root'
})
export class AppService {
	name: string = 'Jam';
	version: string;
	electron: boolean = false;
	standalone: boolean = false;
	smallscreen: boolean = false;
	settings: Settings = new Settings();
	view: {
		currentSidebar?: SidebarProvider,
		showQueue: false
	} = {
		currentSidebar: undefined,
		showQueue: false
	};

	constructor() {
		this.version = environment.version;
	}

}
