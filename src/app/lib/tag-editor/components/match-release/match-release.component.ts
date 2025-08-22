import { Component, inject, input, type OnChanges, type OnDestroy, viewChild } from '@angular/core';
import { MatchApplyComponent } from '../match-apply/match-apply.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { type Jam, JamService } from '@jam';
import type { MatchRelease, MatchReleaseGroup } from '../../model/release-matching.helper';
import { toID3v24 } from '../../model/release-matching.id3.helper';
import { Matcher, RunType } from './matcher';
import { TagEditorAutocompleteComponent } from '../autocomplete/tag-editor-autocomplete.component';
import { MatchFileListComponent } from '../match-file-list/match-file-list.component';
import { MatchResultsComponent } from '../match-results/match-results.component';
import { ContextMenuModule } from '@modules/ngx-contextmenu/lib/ngx-contextmenu.module';
import type { ContextMenuComponent } from '@modules/ngx-contextmenu/lib/contextmenu.component';
import { ContextMenuService } from '@modules/ngx-contextmenu/lib/contextmenu.service';

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
	host: {
		'[class.right-active]': 'rightActive'
	},
	imports: [ContextMenuModule, TagEditorAutocompleteComponent, MatchFileListComponent, MatchApplyComponent, MatchResultsComponent]
})
export class MatchReleaseComponent implements OnChanges, OnDestroy {
	readonly data = input<ReleaseMatching>();
	readonly RunType = RunType;
	rightActive: boolean = true;
	matcher: Matcher;
	current?: { group: MatchReleaseGroup; release: MatchRelease };
	private readonly matchApply = viewChild.required(MatchApplyComponent);
	private readonly actionMenu = viewChild<ContextMenuComponent>('actionMenu');
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly contextMenuService = inject(ContextMenuService);

	constructor() {
		const jam = this.jam;
		const notify = this.notify;

		this.matcher = new Matcher(jam, notify);
	}

	ngOnChanges(): void {
		const data = this.data();
		if (data) {
			this.matcher.prepare(
				data.matchings.map(m => ({ track: m.track })),
				data.folder
			);
		} else {
			this.matcher.abort();
		}
	}

	ngOnDestroy(): void {
		this.matcher.abort();
	}

	apply(): void {
		const genres = this.matchApply().getGenres();
		for (const match of this.matcher.matchings) {
			match.genres = genres;
		}
		const data = this.data();
		if (data) {
			const images = this.matchApply().getCoverArtImages();
			for (const result of data.matchings) {
				const match = this.matcher.matchings.find(m => m.track.id === result.track.id);
				result.rawTag = match ? toID3v24(match, genres, images) : undefined;
			}
			data.apply();
			if (data.close) {
				data.close();
			}
		}
	}

	chooseRelease({ group, release }: { group: MatchReleaseGroup; release: MatchRelease }): void {
		this.stopApply();
		this.current = { group, release };
		this.matchApply().coverArtSearch = { mbReleaseID: release.mbRelease.id, mbReleaseGroupID: group.mbGroup.id };
		this.matcher.apply(group, release);
		const data = this.data();
		if (!data) {
			return;
		}
		this.matchApply().loadGenres(data.matchings, group, release)
			.catch((error: unknown) => {
				this.notify.error(error);
			});
	}

	stopApply(): void {
		this.current = undefined;
		this.matchApply().genres = undefined;
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
			contextMenu: this.actionMenu(),
			event: $event,
			item: undefined
		});
		$event.preventDefault();
		$event.stopPropagation();
	}
}
