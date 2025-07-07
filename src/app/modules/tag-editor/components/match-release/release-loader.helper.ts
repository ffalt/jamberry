import {MatchReleaseGroup, MatchTree} from '@app/modules/tag-editor/model/release-matching.helper';
import {MusicBrainz} from '@jam';

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
			let rg = this.matchTree.findReleaseGroup(r.id);
			if (!rg) {
				rg = await this.addReleaseGroupByID(r.id);
			}
			if (rg && !rg.currentRelease) {
				await this.loadBestMatchingCurrentRelease(rg);
			}
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
			let rg = this.matchTree.findReleaseGroup(rel.releaseGroup.id);
			if (!rg) {
				rg = await this.addReleaseGroupByID(rel.releaseGroup.id);
			}
			if (rg && !rg.currentRelease) {
				await this.loadBestMatchingCurrentRelease(rg);
			}
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
			if (rec.releases) {
				for (const rel of rec.releases) {
					if (this.shouldStop()) {
						return;
					}
					let rg = this.matchTree.findReleaseGroup(rel.releaseGroup.id);
					if (!rg) {
						rg = await this.addReleaseGroupByID(rel.releaseGroup.id);
					}
					if (rg && !rg.currentRelease) {
						await this.loadBestMatchingCurrentRelease(rg);
					}
				}
			}
		}
	}
}
