// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamRootService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get a Root by Id // Rights needed: stream
	 */
	async id(parameters: JamParameters.RootIdParameters): Promise<Jam.Root> {
		return this.base.requestData<Jam.Root>('/root/id', parameters);
	}

	/**
	 * Search Roots // Rights needed: stream
	 */
	async search(parameters: JamParameters.RootSearchParameters): Promise<Jam.RootPage> {
		return this.base.requestData<Jam.RootPage>('/root/search', parameters);
	}

	/**
	 * Get root status by id // Rights needed: stream
	 */
	async status(parameters: JamParameters.ID): Promise<Jam.RootUpdateStatus> {
		return this.base.requestData<Jam.RootUpdateStatus>('/root/status', parameters);
	}

	/**
	 * Create a root // Rights needed: stream
	 */
	async create(parameters: JamParameters.RootMutateParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/root/create', parameters);
	}

	/**
	 * Update a root // Rights needed: stream
	 */
	async update(parameters: JamParameters.RootUpdateParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/root/update', parameters);
	}

	/**
	 * Remove a root // Rights needed: stream
	 */
	async remove(parameters: JamParameters.ID): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/root/remove', parameters);
	}

	/**
	 * Check & update a root folder for file system changes // Rights needed: stream
	 */
	async refresh(parameters: JamParameters.RootRefreshParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/root/refresh', parameters);
	}

	/**
	 * Rebuild all metadata (Artists/Albums/...) for a root folder // Rights needed: stream
	 */
	async refreshMeta(parameters: JamParameters.RootRefreshParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/root/refreshMeta', parameters);
	}
}
