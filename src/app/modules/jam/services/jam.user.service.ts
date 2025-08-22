// @generated
// This file was automatically generated and should not be edited.

import type { HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamUserService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get an User by Id // Rights needed: admin
	 */
	async id(parameters: JamParameters.UserIdParameters): Promise<Jam.User> {
		return this.base.requestData<Jam.User>('/user/id', parameters);
	}

	/**
	 * Search Users // Rights needed: admin
	 */
	async search(parameters: JamParameters.UserSearchParameters): Promise<Jam.UserPage> {
		return this.base.requestData<Jam.UserPage>('/user/search', parameters);
	}

	/**
	 * Create an User // Rights needed: admin
	 */
	async create(parameters: JamParameters.UserMutateParameters): Promise<Jam.User> {
		return this.base.requestPostData<Jam.User>('/user/create', parameters);
	}

	/**
	 * Update an User // Rights needed: admin
	 */
	async update(parameters: JamParameters.UserUpdateParameters): Promise<Jam.User> {
		return this.base.requestPostData<Jam.User>('/user/update', parameters);
	}

	/**
	 * Remove an User // Rights needed: admin
	 */
	async remove(parameters: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/user/remove', parameters);
	}

	/**
	 * Set an User Password // Rights needed: stream
	 */
	async changePassword(parameters: JamParameters.UserChangePasswordParameters): Promise<void> {
		return this.base.requestPostDataOK('/user/password/update', parameters);
	}

	/**
	 * Set an User Email Address // Rights needed: stream
	 */
	async changeEmail(parameters: JamParameters.UserChangeEmailParameters): Promise<void> {
		return this.base.requestPostDataOK('/user/email/update', parameters);
	}

	/**
	 * Generate a random User Image // Rights needed: stream
	 */
	async generateUserImage(parameters: JamParameters.UserGenerateUserImageParameters): Promise<void> {
		return this.base.requestPostDataOK('/user/image/random', parameters);
	}

	/**
	 * Upload an User Image // Rights needed: stream
	 */
	uploadUserImage(params: JamParameters.UserUploadUserImageParameters, file: File): Observable<HttpEvent<any>> {
		return this.base.upload('/user/image/upload', params, 'image', file);
	}

	/**
	 * Generate a subsonic client token // Rights needed: stream
	 */
	async generateSubsonicToken(parameters: JamParameters.UserGenerateSubsonicTokenParameters): Promise<Jam.SubsonicToken> {
		return this.base.requestPostData<Jam.SubsonicToken>('/user/subsonic/generate', parameters);
	}
}
