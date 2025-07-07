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

interface Recording {
	id: string;
	title: string;
	duration: number;
	releasegroups?: Array<ReleaseGroup>;
}

interface ReleaseGroup {
	id: string;
	title: string;
	releases: Array<Release>;
}

interface Release {
	id: string;
	title: string;
	mediums: Array<Medium>;
}

interface Medium {
	position: number;
	track_count: number;
}

interface AcoustidResult {
	id: string;
	score: number;
	recordings: Array<Recording>;
}

function createAcoustIDEntry(
	acoustid: AcoustidResult,
	recording: Recording,
	releasegroup: ReleaseGroup,
	release: Release,
	medium: Medium,
	track: Jam.Track
): AcoustIDEntry {
	return {
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
}

function processRecording(
	acoustid: AcoustidResult,
	recording: Recording,
	track: Jam.Track
): Array<AcoustIDEntry> {
	if (!recording.releasegroups || !recording.id) {
		return [];
	}

	return recording.releasegroups.flatMap(releasegroup => {
		if (!releasegroup.id || !releasegroup.releases) {
			return [];
		}

		return releasegroup.releases.flatMap(release => {
			if (!release.id || !release.mediums) {
				return [];
			}

			return release.mediums.map(medium =>
				createAcoustIDEntry(acoustid, recording, releasegroup, release, medium, track)
			);
		});
	});
}

export function acoustidResultToList(data: Array<Acoustid.Result>, track: Jam.Track): Array<AcoustIDEntry> {
	if (!data) {
		return [];
	}

	return data.flatMap(acoustid => {
		if (!acoustid.recordings) {
			return [];
		}

		return acoustid.recordings.flatMap(recording =>
			processRecording(acoustid, recording, track)
		);
	});
}

export interface AcoustidTreeMatch {
	acoustID: string;
	trackID: string;
	trackName: string;
	trackDuration: number;
	score: number;
}

export interface AcoustidTreeRecording {
	id: string;
	duration: number;
	name: string;
	matches: Array<AcoustidTreeMatch>;
}

export interface AcoustidTreeMedium {
	nr: number;
	score: number;
	trackCount: number;
	recordings: Array<AcoustidTreeRecording>;
}

export interface AcoustidTreeRelease {
	id: string;
	name: string;
	score: number;
	mediums: Array<AcoustidTreeMedium>;
}

export interface AcoustidTreeReleaseGroup {
	id: string;
	name: string;
	score: number;
	releases: Array<AcoustidTreeRelease>;
}

export class AcoustidTree {
	releasegroups: Array<AcoustidTreeReleaseGroup> = [];

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
