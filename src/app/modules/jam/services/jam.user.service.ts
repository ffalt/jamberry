// @generated
// This file was automatically generated and should not be edited.

import type {HttpEvent} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import type {Observable} from 'rxjs';

import {JamBaseService} from '../jam.base.service';
import type {Jam} from '../model/jam-rest-data';
import type {JamParameters} from '../model/jam-rest-params';

@Injectable()
export class JamUserService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get an User by Id // Rights needed: admin
	 */
	async id(params: JamParameters.UserIdArgs): Promise<Jam.User> {
		return this.base.requestData<Jam.User>('/user/id', params);
	}

	/**
	 * Search Users // Rights needed: admin
	 */
	async search(params: JamParameters.UserSearchArgs): Promise<Jam.UserPage> {
		return this.base.requestData<Jam.UserPage>('/user/search', params);
	}

	/**
	 * Create an User // Rights needed: admin
	 */
	async create(params: JamParameters.UserMutateArgs): Promise<Jam.User> {
		return this.base.requestPostData<Jam.User>('/user/create', params);
	}

	/**
	 * Update an User // Rights needed: admin
	 */
	async update(params: JamParameters.UserUpdateArgs): Promise<Jam.User> {
		return this.base.requestPostData<Jam.User>('/user/update', params);
	}

	/**
	 * Remove an User // Rights needed: admin
	 */
	async remove(params: JamParameters.ID): Promise<void> {
		return this.base.requestPostDataOK('/user/remove', params);
	}

	/**
	 * Set an User Password // Rights needed: stream
	 */
	async changePassword(params: JamParameters.UserChangePasswordArgs): Promise<void> {
		return this.base.requestPostDataOK('/user/password/update', params);
	}

	/**
	 * Set an User Email Address // Rights needed: stream
	 */
	async changeEmail(params: JamParameters.UserChangeEmailArgs): Promise<void> {
		return this.base.requestPostDataOK('/user/email/update', params);
	}

	/**
	 * Generate a random User Image // Rights needed: stream
	 */
	async generateUserImage(params: JamParameters.UserGenerateUserImageArgs): Promise<void> {
		return this.base.requestPostDataOK('/user/image/random', params);
	}

	/**
	 * Upload an User Image // Rights needed: stream
	 */
	uploadUserImage(params: JamParameters.UserUploadUserImageArgs, file: File): Observable<HttpEvent<any>> {
		return this.base.upload('/user/image/upload', params, 'image', file);
	}

	/**
	 * Generate a subsonic client token // Rights needed: stream
	 */
	async generateSubsonicToken(params: JamParameters.UserGenerateSubsonicTokenArgs): Promise<Jam.SubsonicToken> {
		return this.base.requestPostData<Jam.SubsonicToken>('/user/subsonic/generate', params);
	}
}
