// @generated
// This file was automatically generated and should not be edited.

import { inject, Injectable } from '@angular/core';

import { JamBaseService } from '../jam.base.service';
import type { Jam } from '../model/jam-rest-data';
import type { JamParameters } from '../model/jam-rest-params';

@Injectable()
export class JamTrackService {
	private readonly base = inject(JamBaseService);

	/**
	Get a Track by Id; Rights needed: stream
	*/
	async id(parameters: JamParameters.TrackIdParameters): Promise<Jam.Track> {
		return this.base.requestData<Jam.Track>('/track/id', parameters);
	}

	/**
	Search Tracks; Rights needed: stream
	*/
	async search(parameters: JamParameters.TrackSearchParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/track/search', parameters);
	}

	/**
	Get similar Tracks by Track Id (External Service); Rights needed: stream
	*/
	async similar(parameters: JamParameters.TrackSimilarParameters): Promise<Jam.TrackPage> {
		return this.base.requestData<Jam.TrackPage>('/track/similar', parameters);
	}

	/**
	Get Lyrics for a Track by Id (External Service or Media File); Rights needed: stream
	*/
	async lyrics(parameters: JamParameters.ID): Promise<Jam.TrackLyrics> {
		return this.base.requestData<Jam.TrackLyrics>('/track/lyrics', parameters);
	}

	/**
	Get Raw Tag (eg. id3/vorbis); Rights needed: stream
	*/
	async rawTagGet(parameters: JamParameters.TrackFilterParameters): Promise<Array<Jam.MediaIDTagRaw>> {
		return this.base.requestData<Array<Jam.MediaIDTagRaw>>('/track/rawTag/get', parameters);
	}

	/**
	List of Tracks with Health Issues; Rights needed: admin
	*/
	async health(parameters: JamParameters.TrackHealthParameters): Promise<Array<Jam.TrackHealth>> {
		return this.base.requestData<Array<Jam.TrackHealth>>('/track/health', parameters);
	}

	/**
	Rename a track; Rights needed: admin
	*/
	async rename(parameters: JamParameters.TrackRenameParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/track/rename', parameters);
	}

	/**
	Move Tracks; Rights needed: admin
	*/
	async move(parameters: JamParameters.TrackMoveParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/track/move', parameters);
	}

	/**
	Remove a Track; Rights needed: admin
	*/
	async remove(parameters: JamParameters.ID): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/track/remove', parameters);
	}

	/**
	Fix Track by Health Hint Id; Rights needed: admin
	*/
	async fix(parameters: JamParameters.TrackFixParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/track/fix', parameters);
	}

	/**
	Write a Raw Rag to a Track by Track Id; Rights needed: admin
	*/
	async rawTagSet(parameters: JamParameters.RawTagUpdateParameters): Promise<Jam.AdminChangeQueueInfo> {
		return this.base.requestPostData<Jam.AdminChangeQueueInfo>('/track/rawTag/set', parameters);
	}
}
