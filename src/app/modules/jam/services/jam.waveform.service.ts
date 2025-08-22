// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamWaveformService {
	private readonly base = inject(JamBaseService);

	/**
	 * Get Peaks Waveform Data as JSON [Episode, Track] // Rights needed: stream
	 */
	async json(parameters: JamParameters.ID): Promise<Jam.WaveFormData> {
		return this.base.requestData<Jam.WaveFormData>('/waveform/json', parameters);
	}

	/**
	 * Get Peaks Waveform Data as SVG [Episode, Track] // Rights needed: stream
	 */
	async svg(parameters: JamParameters.WaveformSVGParameters): Promise<string> {
		return this.base.requestString('/waveform/svg', parameters);
	}

	/**
	 * Get Peaks Waveform Data [Episode, Track] // Rights needed: stream
	 */
	waveformUrl(params: JamParameters.WaveformWaveformParameters): string {
		if (!params.id) {
			return '';
		}
		return this.base.buildRequestUrl(`/waveform/${params.id}${params.width ? `_${params.width}` : ''}${params.format ? `.${params.format}` : ''}`, {});
	}

	/**
	 * Get Peaks Waveform Data [Episode, Track] // Rights needed: stream
	 */
	async waveformBinary(params: JamParameters.WaveformWaveformParameters): Promise<{ buffer: ArrayBuffer; contentType: string }> {
		if (!params.id) {
			throw new Error('Invalid Parameter');
		}
		return this.base.binary(`/waveform/${params.id}${params.width ? `_${params.width}` : ''}${params.format ? `.${params.format}` : ''}`, {});
	}
}
