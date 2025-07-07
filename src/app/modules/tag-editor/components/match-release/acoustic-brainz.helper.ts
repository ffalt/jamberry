import {ABData} from '@app/modules/tag-editor/model/release-matching.helper';
import {AcousticBrainz} from '@jam';

/**
 * Helper class for processing AcousticBrainz data
 */
export class AcousticBrainzHelper {
	/**
	 * Process AcousticBrainz data into categorized lists
	 */
	static processAcousticBrainzData(data: AcousticBrainz.Response): ABData | undefined {
		if (!data.highlevel) {
			return undefined;
		}

		const genres: Array<string> = [];
		const moods: Array<string> = [];
		const tonal: Array<string> = [];
		const other: Array<string> = [];

		const keys = Object.keys(data.highlevel);
		for (const key of keys) {
			const section = data.highlevel[key];
			if (!section) {
				continue;
			}
			const value: string = section.value;
			const prop: number = section.probability;

			if (prop <= 0.8 || value.includes('not_')) {
				continue;
			}

			if (key.startsWith('mood_') || key === 'timbre' || key === 'danceability') {
				if (!moods.includes(value)) {
					moods.push(value);
				}
			} else if (key.startsWith('genre_')) {
				if (!genres.includes(value)) {
					genres.push(value);
				}
			} else if (key.startsWith('tonal_') || key === 'voice_instrumental') {
				if (!tonal.includes(value)) {
					tonal.push(value);
				}
			} else if (!other.includes(value)) {
				other.push(value);
			}
		}

		return {genres, moods, tonal, other};
	}
}
