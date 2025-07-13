import type {ABData} from '@app/modules/tag-editor/model/release-matching.helper';
import type {AcousticBrainz} from '@jam';

interface AcousticBrainzCategories {
	genres: Array<string>;
	moods: Array<string>;
	tonal: Array<string>;
	other: Array<string>;
}

/**
 * Helper class for processing AcousticBrainz data
 */
export class AcousticBrainzHelper {
	private static readonly CONFIDENCE_THRESHOLD = 0.8;
	private static readonly CATEGORY_MAPPINGS = {
		mood: (key: string) => key.startsWith('mood_') || ['timbre', 'danceability'].includes(key),
		genre: (key: string) => key.startsWith('genre_'),
		tonal: (key: string) => key.startsWith('tonal_') || key === 'voice_instrumental'
	};

	/**
	 * Process AcousticBrainz data into categorized lists
	 */
	static processAcousticBrainzData(data: AcousticBrainz.Response): ABData | undefined {
		if (!data.highlevel) {
			return undefined;
		}
		const categories: AcousticBrainzCategories = {
			genres: [],
			moods: [],
			tonal: [],
			other: []
		};

		AcousticBrainzHelper.processHighLevelData(data.highlevel, categories);

		return {
			genres: categories.genres,
			moods: categories.moods,
			tonal: categories.tonal,
			other: categories.other
		};
	}

	private static processHighLevelData(
		highlevel: AcousticBrainz.HighLevel,
		categories: AcousticBrainzCategories
	): void {
		for (const [key, data] of Object.entries(highlevel)) {
			if (!data || !AcousticBrainzHelper.isValidValue(data)) {
				return;
			}
			const category = AcousticBrainzHelper.determineCategory(key);
			AcousticBrainzHelper.addToCategory(data.value, category, categories);
		}
	}

	private static isValidValue(data: AcousticBrainz.HighLevelSection): boolean {
		return data.probability > AcousticBrainzHelper.CONFIDENCE_THRESHOLD && !data.value.includes('not_');
	}

	private static determineCategory(key: string): string {
		if (AcousticBrainzHelper.CATEGORY_MAPPINGS.mood(key)) return 'moods';
		if (AcousticBrainzHelper.CATEGORY_MAPPINGS.genre(key)) return 'genres';
		if (AcousticBrainzHelper.CATEGORY_MAPPINGS.tonal(key)) return 'tonal';
		return 'other';
	}

	private static addToCategory(value: string, category: string, categories: AcousticBrainzCategories): void {
		const categoryArray = categories[category as keyof typeof categories];
		if (!categoryArray.includes(value)) {
			categoryArray.push(value);
		}
	}
}
