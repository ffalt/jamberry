import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DialogOverlayService} from '@app/modules/dialog-overlay';

import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {FolderHealthID, Jam, JamService} from '@jam';
import {DialogFolderArtworkSearchComponent} from '../dialog-folder-artwork-search/dialog-folder-artwork-search.component';

export interface FolderHealthHintSolution {
	name: string;
	running?: boolean;
	fixable?: boolean;

	click?(): Promise<void>;
}

export interface FolderHealthHint {
	hint: Jam.FolderHealthHint;
	details: Array<string>;
	running?: boolean;
}

@Component({
	selector: 'app-folder-health',
	templateUrl: './folder-health.component.html',
	styleUrls: ['./folder-health.component.scss']
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
		private folderService: AdminFolderService
	) {
	}

	trackByFn(index: number, hint: FolderHealthHint): string {
		return hint.hint.id;
	}

	searchImages(folder: Jam.Folder): void {
		this.dialogOverlay.open({
			title: 'Search Artwork Images',
			childComponent: DialogFolderArtworkSearchComponent,
			data: {folder},
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	ngOnChanges(/*changes: SimpleChanges*/): void {
		this.display(this.folderHealth);
	}

	private static describeImageInvalidHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		if (!hint.details || hint.details.length === 0) {
			return [];
		}
		const details = [hint.details[0].reason];
		if (hint.details[0].expected) {
			details.push(`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`);
		}
		return details;
	}

	private static describeAlbumTracksMissingHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		if (!hint.details || hint.details.length === 0) {
			return [];
		}
		const details = [];
		if (hint.details[0].expected) {
			details.push(`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`);
		}
		return details;
	}

	private describeImageQualityHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addAlbumImageSearchSolution(folder);
		if (!hint.details || hint.details.length === 0) {
			return [];
		}
		const details = [hint.details[0].reason];
		details.push(`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`);
		return details;
	}

	private addArtistImageSearchSolution(folder: Jam.Folder): void {
		if (folder.tag && folder.tag.mbArtistID) {
			const sol: FolderHealthHintSolution = {
				name: 'Search',
				click: async () => {
					this.searchImages(folder);
				}
			};
			this.solutions.push(sol);
		}
	}

	private addAlbumImageSearchSolution(folder: Jam.Folder): void {
		if (folder.tag && (folder.tag.mbReleaseID || folder.tag.mbReleaseGroupID)) {
			const sol: FolderHealthHintSolution = {
				name: 'Search',
				click: async () => {
					this.searchImages(folder);
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
					const item = await this.jam.folder.rename({id: folder.id, name});
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

	private describeMBIDMissingHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addEditTagSolution(folder);
		return [];
	}

	private describeAlbumTagMissingHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addEditTagSolution(folder);
		return [`Expected: ${hint.details.map(d => d.expected).join(',')}`];
	}

	private describeNameNonConformHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
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

	private describeArtistImageMissingHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addArtistImageSearchSolution(folder);
		return [];
	}

	private describeAlbumImageMissingHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addAlbumImageSearchSolution(folder);
		return [];
	}

	private describeHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
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
			case FolderHealthID.albumImageQuality:
				return this.describeImageQualityHint(hint, folder);
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
