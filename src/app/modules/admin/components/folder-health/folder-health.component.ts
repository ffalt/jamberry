import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';

import {AppService, NotifyService} from '@core/services';
import {FolderHealthID, Jam, JamService} from '@jam';
import {FolderService} from '@app/modules/admin-core/services';
import {DialogAlbumImageComponent} from '../dialog-album-image/dialog-album-image-component';
import {DialogArtistImageComponent} from '../dialog-artist-image/dialog-artist-image-component';

export interface FolderHealthHintSolution {
	name: string;
	running?: boolean;
	fixable?: boolean;

	click?(): Promise<void>;
}

export interface FolderHealthHint {
	hint: Jam.HealthHint;
	details: Array<string>;
	running?: boolean;
}

@Component({
	selector: 'app-folder-health',
	templateUrl: 'folder-health.component.html',
	styleUrls: ['folder-health.component.scss']
})
export class FolderHealthComponent implements OnChanges {
	hints: Array<FolderHealthHint>;
	solutions: Array<FolderHealthHintSolution> = [];
	@Input() folderHealth: Jam.FolderHealth;

	constructor(
		private app: AppService,
		private router: Router,
		private jam: JamService,
		private notify: NotifyService,
		private dialogOverlay: DialogOverlayService,
		private folderService: FolderService
	) {
	}

	trackByFn(index: number, hint: FolderHealthHint): string {
		return hint.hint.id;
	}

	searchAlbumImages(folder: Jam.Folder): void {
		this.dialogOverlay.open({
			title: 'Search Album Images',
			childComponent: DialogAlbumImageComponent,
			data: {folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	searchArtistImages(folder: Jam.Folder): void {
		this.dialogOverlay.open({
			title: 'Search Artist Images',
			childComponent: DialogArtistImageComponent,
			data: {folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.display(this.folderHealth);
	}

	private static describeImageInvalidHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		if (!hint.details || hint.details.length === 0) {
			return [];
		}
		const details = [hint.details[0].reason];
		if (hint.details[0].expected) {
			details.push(`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`);
		}
		return details;
	}

	private static describeAlbumTracksMissingHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		if (!hint.details || hint.details.length === 0) {
			return [];
		}
		const details = [];
		if (hint.details[0].expected) {
			details.push(`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`);
		}
		return details;
	}

	private addArtistImageSearchSolution(folder: Jam.Folder): void {
		if (folder.tag && folder.tag.musicbrainz && folder.tag.musicbrainz.artistID) {
			const sol: FolderHealthHintSolution = {
				name: 'Search',
				click: async () => {
					this.searchArtistImages(folder);
				}
			};
			this.solutions.push(sol);
		}
	}

	private addAlbumImageSearchSolution(folder: Jam.Folder): void {
		if (folder.tag && folder.tag.musicbrainz && (folder.tag.musicbrainz.releaseID || folder.tag.musicbrainz.releaseGroupID)) {
			const sol: FolderHealthHintSolution = {
				name: 'Search',
				click: async () => {
					this.searchAlbumImages(folder);
				}
			};
			this.solutions.push(sol);
		}
	}

	private addRenameSolution(folder: Jam.Folder, name: string): void {
		if (!this.solutions.find(sol => sol.name === 'Rename')) {
			const sol: FolderHealthHintSolution = {
				name: 'Rename',
				click: async () => {
					if (sol.running) {
						return;
					}
					sol.running = true;
					const item = await this.jam.folder.name_update({
						id: folder.id, name
					});
					sol.running = false;
					this.folderService.waitForQueueResult('Renaming Folder', item, [folder.id]);
				}
			};
			this.solutions.push(sol);
		}
	}

	private addEditTagSolution(folder: Jam.Folder): void {
		if (!this.solutions.find(sol => sol.name === 'Edit Tags')) {
			const sol: FolderHealthHintSolution = {
				name: 'Edit Tags',
				click: async () => {
					this.router.navigate([`/admin/folder/${folder.id}/tags`])
						.catch(e => {
							console.error(e);
						});
				}
			};
			this.solutions.push(sol);
		}
	}

	private describeMBIDMissingHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		this.addEditTagSolution(folder);
		return [];
	}

	private describeAlbumTagMissingHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		this.addEditTagSolution(folder);
		return [`Expected: ${hint.details.map(d => d.expected).join(',')}`];
	}

	private describeNameNonConformHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		const suggested = hint.details && hint.details.length > 0 ? hint.details[0].expected : '';
		if (!suggested) {
			return [];
		}
		this.addRenameSolution(folder, suggested);
		return [
			'Current: ' + folder.name,
			'Suggested Name: ' + suggested
		];

	}

	private describeArtistImageMissingHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		this.addArtistImageSearchSolution(folder);
		return [];
	}

	private describeAlbumImageMissingHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		this.addAlbumImageSearchSolution(folder);
		return [];
	}

	private describeHint(hint: Jam.HealthHint, folder: Jam.Folder): Array<string> {
		switch (hint.id) {
			case FolderHealthID.albumMBIDExists:
				return this.describeMBIDMissingHint(hint, folder);
			case FolderHealthID.albumTagsExists:
				return this.describeAlbumTagMissingHint(hint, folder);
			case FolderHealthID.albumNameConform:
			case FolderHealthID.artistNameConform:
				return this.describeNameNonConformHint(hint, folder);
			case FolderHealthID.albumImageExists:
				return this.describeAlbumImageMissingHint(hint, folder);
			case FolderHealthID.albumTracksComplete:
				return FolderHealthComponent.describeAlbumTracksMissingHint(hint, folder);
			case FolderHealthID.artistImageExists:
				return this.describeArtistImageMissingHint(hint, folder);
			case FolderHealthID.artistImageValid:
			case FolderHealthID.albumImageValid:
				return FolderHealthComponent.describeImageInvalidHint(hint, folder);
			default:
				break;
		}
		return [];
	}

	private display(folderHealth: Jam.FolderHealth): void {
		this.hints = [];
		this.solutions = [];
		if (folderHealth.health) {
			this.hints = folderHealth.health.map(hint => {
				const details = this.describeHint(hint, folderHealth.folder);
				return {hint, details};
			});
		}
	}
}
