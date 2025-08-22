import { Component, inject, input, output, viewChild } from '@angular/core';
import { type GenreTag, getLastFMAlbumGenres, getLastFMArtistGenres, getMusicBrainzGenres, getTrackGenres, mergeGenres } from '../../model/genres.helper';
import type { Matching, MatchRelease, MatchReleaseGroup } from '../../model/release-matching.helper';
import { JamService, type LastFM, LastFMLookupType } from '@jam';
import { FormsModule } from '@angular/forms';
import { MatchCoverartComponent, type MatchImageNode, type MatchImageSearch } from '../match-coverart/match-coverart.component';

@Component({
	selector: 'app-match-apply',
	templateUrl: './match-apply.component.html',
	styleUrls: ['./match-apply.component.scss'],
	imports: [FormsModule, MatchCoverartComponent]
})
export class MatchApplyComponent {
	readonly isRunning = input<boolean>(false);
	readonly loadLyricsRequest = output();
	readonly loadMoodsRequest = output();
	isGenreSearchRunning: boolean = false;
	genres?: Array<{ tag: GenreTag; checked: boolean }>;
	customGenre = { text: '', checked: true };
	coverArtSearch?: MatchImageSearch;
	private readonly coverArt = viewChild(MatchCoverartComponent);
	private readonly jam = inject(JamService);

	getGenres(): Array<string> {
		const genres = (this.genres ?? []).filter(genre => genre.checked).map(genre => genre.tag.name);
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
		this.genres = genres.toSorted((a, b) => b.count - a.count).map((tag, index) => ({ tag, checked: index === 0 }));
		this.isGenreSearchRunning = false;
	}

	private async getLastFMGenres(release: MatchRelease, genres: Array<GenreTag>) {
		let result = genres;
		const fm = await this.jam.metadata.lastfmLookup({ type: LastFMLookupType.album, mbID: release.mbRelease.id });
		let data = fm.data as LastFM.Result;
		if (data.album) {
			result = mergeGenres(result, getLastFMAlbumGenres(data.album));
		}
		if (result.length === 0 && release.mbRelease.artistCredit.length > 0) {
			const res = await this.jam.metadata.lastfmLookup({
				type: LastFMLookupType.artist,
				mbID: release.mbRelease.artistCredit[0].artist.id
			});
			data = res.data as LastFM.Result;
			if (data.artist) {
				result = mergeGenres(genres, getLastFMArtistGenres(data.artist));
			}
		}
		return result;
	}

	private getCombinedTags(release: MatchRelease, group: MatchReleaseGroup) {
		let tags: Array<GenreTag> = [];
		if (release.mbRelease.tags) {
			tags = [...tags, ...release.mbRelease.tags];
		}
		if (group.mbGroup.tags) {
			tags = [...tags, ...group.mbGroup.tags];
		}
		return tags;
	}

	private collectTrackGenres(group: MatchReleaseGroup, matchings: Array<Matching>) {
		const tracksGenres: Array<{ count: number; name: string }> = [];
		if (group.mbGroup.secondaryTypes?.some(s => ['audiobook', 'audio drama', 'spokenword'].includes(s))) {
			tracksGenres.push({ count: 1, name: 'Audiobook' });
		}
		for (const match of matchings) {
			if (match.track.tag?.genres && match.track.tag.genres.length > 0) {
				const name = match.track.tag.genres[0];
				const c = tracksGenres.find(t => t.name === name);
				if (c) {
					c.count++;
				} else {
					tracksGenres.push({ count: 1, name });
				}
			}
		}
		return tracksGenres;
	}
}
