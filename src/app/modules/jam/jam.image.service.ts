// THIS FILE IS GENERATED, DO NOT EDIT MANUALLY

import {Injectable} from '@angular/core';

import {JamBaseService} from './jam.base.service';
import {JamParameters} from './model/jam-rest-params';

@Injectable()
export class JamImageService {

	constructor(private base: JamBaseService) {
	}

	/**
	 * download image for object as binary by id
	 */
	url(id: string, size?: number, format?: JamParameters.ImageFormatType): string {
		return this.base.buildRequestUrl(`image/${id}${size !== undefined ? `-${size}` : ''}${format !== undefined ? `.${format}` : ''}`);
	}

	/**
	 * download image for object as binary by id
	 */
	async binary(id: string, size?: number, format?: JamParameters.ImageFormatType): Promise<ArrayBuffer> {
		return this.base.binary(`image/${id}${size !== undefined ? `-${size}` : ''}${format !== undefined ? `.${format}` : ''}`);
	}

}
