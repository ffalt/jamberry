import type { MatchReleaseGroup, MatchTree } from '../../model/release-matching.helper';
import type { MusicBrainz } from '@jam';

/**
 * Helper class for loading release groups and releases
 */
export class ReleaseLoaderHelper {
	constructor(
		private readonly matchTree: MatchTree,
		private readonly shouldStop: () => boolean,
		private readonly addReleaseGroupByID: (id: string) => Promise<MatchReleaseGroup>,
		private readonly loadBestMatchingCurrentRelease: (rg: MatchReleaseGroup) => Promise<void>
	) {
	}

	/**
	 * Load release groups
	 */
	async loadByReleaseGroups(releaseGroups: Array<MusicBrainz.ReleaseGroup>): Promise<void> {
		for (const r of releaseGroups) {
			if (this.shouldStop()) {
				return;
			}
			await this.processRelease(r.id);
		}
	}

	/**
	 * Load releases
	 */
	async loadByReleases(releases: Array<MusicBrainz.Release>): Promise<void> {
		for (const rel of releases) {
			if (this.shouldStop()) {
				return;
			}
			await this.processRelease(rel.releaseGroup.id);
		}
	}

	/**
	 * Load recordings
	 */
	async loadByRecordings(recordings: Array<MusicBrainz.Recording>): Promise<void> {
		for (const rec of recordings) {
			if (this.shouldStop()) {
				return;
			}
			if (!rec.releases) {
				continue;
			}

			for (const rel of rec.releases) {
				if (this.shouldStop()) {
					return;
				}
				await this.processRelease(rel.releaseGroup.id);
			}
		}
	}

	/**
	 * Process a single release to find or create a release group and load the best matching release
	 */
	private async processRelease(releaseGroupId: string): Promise<void> {
		let rg = this.matchTree.findReleaseGroup(releaseGroupId);
		rg ??= await this.addReleaseGroupByID(releaseGroupId);
		if (!rg.currentRelease) {
			await this.loadBestMatchingCurrentRelease(rg);
		}
	}
}
