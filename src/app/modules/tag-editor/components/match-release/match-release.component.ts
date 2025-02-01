import {Component, HostBinding, Input, OnChanges, OnDestroy, ViewChild} from '@angular/core';
import {MatchApplyComponent} from '@app/modules/tag-editor/components/match-apply/match-apply.component';
import {AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ContextMenuComponent, ContextMenuService} from '@app/modules/ngx-contextmenu';
import {MatchRelease, MatchReleaseGroup} from '../../model/release-matching.helper';
import {toID3v24} from '../../model/release-matching.id3.helper';
import {Matcher, RunType} from './matcher';

export interface ReleaseDataMatching {
	track: Jam.Track;
	rawTag?: Jam.MediaTagRaw;
}

export interface ReleaseMatching {
	folder: Jam.Folder;
	matchings: Array<ReleaseDataMatching>;

	apply(): void;

	close?(): void;
}

@Component({
    selector: 'app-match-release',
    templateUrl: './match-release.component.html',
    styleUrls: ['./match-release.component.scss'],
    standalone: false
})
export class MatchReleaseComponent implements OnChanges, OnDestroy {
	@Input() data?: ReleaseMatching;
	@HostBinding('class.right-active') rightActive: boolean = true;
	@ViewChild(MatchApplyComponent) matchApply!: MatchApplyComponent;
	@ViewChild('actionMenu', {static: false}) actionMenu?: ContextMenuComponent;
	matcher: Matcher;

	current?: { group: MatchReleaseGroup; release: MatchRelease };
	RunType = RunType;

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService,
							private contextMenuService: ContextMenuService) {
		this.matcher = new Matcher(jam, notify);
	}

	ngOnChanges(): void {
		if (!this.data) {
			this.matcher.abort();
		} else {
			this.matcher.prepare(
				this.data.matchings.map(m => ({track: m.track})),
				this.data.folder
			);
		}
	}

	ngOnDestroy(): void {
		this.matcher.abort();
	}

	apply(): void {
		const genres = this.matchApply.getGenres();
		for (const match of this.matcher.matchings) {
			match.genres = genres;
		}
		if (this.data) {
			const images = this.matchApply.getCoverArtImages();
			for (const result of this.data.matchings) {
				const match = this.matcher.matchings.find(m => m.track.id === result.track.id);
				result.rawTag = match ? toID3v24(match, genres, images) : undefined;
			}
			if (this.data.apply) {
				this.data.apply();
			}
			if (this.data.close) {
				this.data.close();
			}
		}
	}

	chooseRelease({group, release}: { group: MatchReleaseGroup, release: MatchRelease }): void {
		this.stopApply();
		this.current = {group, release};
		this.matchApply.coverArtSearch = {mbReleaseID: release.mbRelease.id, mbReleaseGroupID: group.mbGroup.id};
		this.matcher.apply(group, release);
		if (!this.data) {
			return;
		}
		this.matchApply.loadGenres(this.data.matchings, group, release)
			.catch(e => {
				this.notify.error(e);
			});
	}

	stopApply(): void {
		this.current = undefined;
		this.matchApply.genres = undefined;
		this.matcher.stopApply();
	}

	loadLyricsRequest(): void {
		if (this.current) {
			this.matcher.loadLyrics(this.current.group.currentRelease);
		}
	}

	loadMoodsRequest(): void {
		if (this.current) {
			this.matcher.loadMoods(this.current.group.currentRelease);
		}
	}

	onContextMenu($event: Event) {
		this.contextMenuService.show.next({
			contextMenu: this.actionMenu,
			event: $event,
			item: undefined
		});
		$event.preventDefault();
		$event.stopPropagation();
	}

}
