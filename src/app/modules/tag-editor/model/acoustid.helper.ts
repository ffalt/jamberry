import {Acoustid, Jam} from '@jam';

export interface AcoustIDEntry {
	releaseGroupID: string;
	releaseGroupName: string;
	releaseID: string;
	releaseName: string;
	mediaNr: number;
	mediaTrackCount: number;
	recordingDuration: number;
	recordingID: string;
	recordingName: string;
	score: number;
	trackID: string;
	trackName: string;
	trackDuration: number;
	acoustID: string;
}

export function acoustidResultToList(data: Array<Acoustid.Result>, track: Jam.Track): Array<AcoustIDEntry> {
	const result = [];
	if (data) {
		for (const acoustid of data) {
			if (acoustid.recordings) {
				for (const recording of acoustid.recordings) {
					if (recording.releasegroups && recording.id) {
						for (const releasegroup of recording.releasegroups) {
							if (releasegroup.id && releasegroup.releases) {
								for (const release of releasegroup.releases) {
									if (release.id && release.mediums) {
										for (const medium of release.mediums) {
											const entry: AcoustIDEntry = {
												releaseGroupID: releasegroup.id,
												releaseGroupName: releasegroup.title,
												releaseID: release.id,
												releaseName: release.title,
												mediaNr: medium.position,
												mediaTrackCount: medium.track_count,
												recordingID: recording.id,
												recordingName: recording.title,
												recordingDuration: recording.duration,
												trackID: track.id,
												trackName: track.name,
												trackDuration: track.duration,
												score: acoustid.score,
												acoustID: acoustid.id
											};
											result.push(entry);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return result;
}

export class AcoustidTree {
	releasegroups: Array<{
		id: string;
		name: string;
		score: number;
		releases: Array<{
			id: string;
			name: string;
			score: number;
			mediums: Array<{
				nr: number;
				score: number;
				trackCount: number;
				recordings: Array<{
					id: string;
					duration: number;
					name: string;
					matches: Array<{
						acoustID: string;
						trackID: string;
						trackName: string;
						trackDuration: number;
						score: number;
					}>
				}>;
			}>;
		}>;
	}> = [];

	add(item: AcoustIDEntry): void {
		let rg = this.releasegroups.find(r => r.id === item.releaseGroupID);
		if (!rg) {
			rg = {
				id: item.releaseGroupID,
				name: item.releaseGroupName,
				releases: [],
				score: 0
			};
			this.releasegroups.push(rg);
		}
		let rel = rg.releases.find(r => r.id === item.releaseID);
		if (!rel) {
			rel = {
				id: item.releaseID,
				name: item.releaseName,
				mediums: [],
				score: 0
			};
			rg.releases.push(rel);
		}
		let med = rel.mediums.find(mn => mn.nr === item.mediaNr);
		if (!med) {
			med = {
				nr: item.mediaNr,
				recordings: [],
				trackCount: item.mediaTrackCount,
				score: 0
			};
			rel.mediums.push(med);
		}
		let rec = med.recordings.find(r => r.id === item.recordingID);
		if (!rec) {
			rec = {
				id: item.recordingID,
				name: item.recordingName,
				duration: item.recordingDuration,
				matches: []
			};
			med.recordings.push(rec);
		}
		const match = rec.matches.find(r => r.trackID === item.trackID);
		if (!match) {
			rec.matches.push({
				trackID: item.trackID,
				trackName: item.trackName,
				trackDuration: item.trackDuration,
				score: item.score,
				acoustID: item.acoustID
			});
		} else if (match.score < item.score) {
			match.score = item.score;
		}

	}
}
