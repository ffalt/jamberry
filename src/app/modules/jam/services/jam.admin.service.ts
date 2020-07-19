// @generated
// This file was automatically generated and should not be edited.

import {Injectable} from '@angular/core';

import {JamBaseService} from '../jam.base.service';
import {Jam} from '../model/jam-rest-data';
import {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamAdminService {

	constructor(private base: JamBaseService) {
	}

	/**
	 * Get the Server Admin Settings // Rights needed: admin
	 */
	async settings(): Promise<Jam.AdminSettings> {
		return this.base.requestData<Jam.AdminSettings>('/admin/settings/get', {});
	}

	/**
	 * Get Queue Information for Admin Change Tasks // Rights needed: admin
	 */
	async queueId(params: JamParameters.ID): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestData<Jam.AdminChangeQueueInfo>('/admin/queue/id', params);
	}

	/**
	 * Update the Server Admin Settings // Rights needed: admin
	 */
	async settingsUpdate(params: JamParameters.AdminSettingsArgs): Promise<void> {
		return this.base.requestPostDataOK('/admin/settings/update', params);
	}

}
