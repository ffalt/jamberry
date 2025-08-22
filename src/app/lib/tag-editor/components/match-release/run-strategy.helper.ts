import { RunType } from './matcher';

/**
 * Helper class for run strategies
 */
export const RunStrategyHelper = {
	/**
	 * Execute the appropriate strategy based on the run type
	 */
	executeStrategy: async (
		type: RunType,
		acoustId: () => Promise<void>,
		musicBrainzRefresh: () => Promise<void>,
		musicBrainzByQuickTags: () => Promise<void>,
		musicBrainzByTags: () => Promise<void>,
		shouldStop: () => boolean
	): Promise<void> => {
		switch (type) {
			case RunType.acoustID: {
				await acoustId();
				break;
			}
			case RunType.musicbrainzByTags: {
				await musicBrainzByQuickTags();
				if (shouldStop()) {
					return;
				}
				await musicBrainzByTags();
				break;
			}
			case RunType.musicbrainzRefresh: {
				await musicBrainzRefresh();
				break;
			}
			case RunType.auto: {
				await musicBrainzRefresh();
				if (shouldStop()) {
					return;
				}
				await musicBrainzByQuickTags();
				if (shouldStop()) {
					return;
				}
				await acoustId();
				if (shouldStop()) {
					return;
				}
				await musicBrainzByTags();
				break;
			}
			default: {
				break;
			}
		}
	}
};
