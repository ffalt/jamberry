import {Component, inject, output, viewChild, input} from '@angular/core';
import {MatchCoverartComponent, type MatchImageNode, type MatchImageSearch} from '@app/modules/tag-editor/components';
import {
	type GenreTag,
	getLastFMAlbumGenres, getLastFMArtistGenres,
	getMusicBrainzGenres,
	getTrackGenres,
	mergeGenres
} from '@app/modules/tag-editor/model/genres.helper';
import type {Matching, MatchRelease, MatchReleaseGroup} from '@app/modules/tag-editor/model/release-matching.helper';
import {JamService, LastFMLookupType} from '@jam';

@Component({
	selector: 'app-match-apply',
	templateUrl: './match-apply.component.html',
	styleUrls: ['./match-apply.component.scss'],
	standalone: false
})
export class MatchApplyComponent {
	readonly isRunning = input<boolean>(false);
	isGenreSearchRunning: boolean = false;
	genres?: Array<{ tag: GenreTag; checked: boolean }>;
	customGenre = {text: '', checked: true};
	coverArtSearch?: MatchImageSearch;
	readonly loadLyricsRequest = output();
	readonly loadMoodsRequest = output();
	private readonly coverArt = viewChild(MatchCoverartComponent);
	private readonly jam = inject(JamService);

	getGenres(): Array<string> {
		const genres = (this.genres || []).filter(genre => genre.checked).map(genre => genre.tag.name);
		if (this.customGenre.checked && this.customGenre.text.trim().length > 0) {
			genres.push(this.customGenre.text.trim());
		}
		return genres;
	}

	getCoverArtImages(): Array<MatchImageNode> {
		const coverArt = this.coverArt();
		return coverArt ? coverArt.getChecked() : [];
	}

	async loadGenres(matchings: Array<Matching>, group: MatchReleaseGroup, release: MatchRelease): Promise<void> {
		this.isGenreSearchRunning = true;
		const tags = this.getCombinedTags(release, group);
		const tracksGenres = this.collectTrackGenres(group, matchings);
		let genres = mergeGenres(getTrackGenres(tracksGenres), getMusicBrainzGenres(tags));
		genres = await this.getLastFMGenres(release, genres);
		this.genres = genres.sort((a, b) => b.count - a.count).map((tag, index) => ({tag, checked: index === 0}));
		this.isGenreSearchRunning = false;
	}

	private async getLastFMGenres(release: MatchRelease, genres: Array<GenreTag>) {
		let result = genres;
		const data = (await this.jam.metadata.lastfmLookup({type: LastFMLookupType.album, mbID: release.mbRelease.id})).data;
		if (data?.album) {
			result = mergeGenres(result, getLastFMAlbumGenres(data.album));
		}
		if (result.length === 0 && release.mbRelease.artistCredit.length > 0) {
			const artistData = (await this.jam.metadata.lastfmLookup({
				type: LastFMLookupType.artist,
				mbID: release.mbRelease.artistCredit[0].artist.id
			})).data;
			if (artistData?.artist) {
				result = mergeGenres(genres, getLastFMArtistGenres(artistData.artist));
			}
		}
		return result;
	}

	private getCombinedTags(release: MatchRelease, group: MatchReleaseGroup) {
		let tags: Array<GenreTag> = [];
		if (release.mbRelease.tags) {
			tags = tags.concat(release.mbRelease.tags);
		}
		if (group.mbGroup.tags) {
			tags = tags.concat(group.mbGroup.tags);
		}
		return tags;
	}

	private collectTrackGenres(group: MatchReleaseGroup, matchings: Array<Matching>) {
		const tracksGenres: Array<{ count: number; name: string }> = [];
		if (group.mbGroup.secondaryTypes) {
			if (group.mbGroup.secondaryTypes.find(s => ['audiobook', 'audio drama', 'spokenword'].includes(s))) {
				tracksGenres.push({count: 1, name: 'Audiobook'});
			}
		}
		for (const match of matchings) {
			if (match.track.tag?.genres && match.track.tag.genres.length > 0) {
				const name = match.track.tag.genres[0];
				const c = tracksGenres.find(t => t.name === name);
				if (c) {
					c.count++;
				} else {
					tracksGenres.push({count: 1, name});
				}
			}
		}
		return tracksGenres;
	}
}
