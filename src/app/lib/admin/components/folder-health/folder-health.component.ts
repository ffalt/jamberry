import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FolderHealthID, type Jam, JamService } from '@jam';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { DialogFolderArtworkSearchComponent } from '../dialog-folder-artwork-search/dialog-folder-artwork-search.component';
import type { ArtworkSearch } from '../folder-artwork-search/folder-artwork-search-image.component';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';
import { IconWarningComponent } from '@core/components/icons/icon-warning.component';

export interface FolderHealthHintSolution {
	name: string;
	running?: boolean;
	fixable?: boolean;

	click(): Promise<void>;
}

export interface FolderHealthHint {
	hint: Jam.FolderHealthHint;
	details: Array<string>;
	running?: boolean;
}

@Component({
	imports: [IconSpinComponent, IconWarningComponent],
	selector: 'app-folder-health',
	templateUrl: './folder-health.component.html',
	styleUrls: ['./folder-health.component.scss']
})
export class FolderHealthComponent {
	readonly folderHealth = input<Jam.FolderHealth>();
	readonly hints = signal<Array<FolderHealthHint> | undefined>(undefined);
	readonly solutions = signal<Array<FolderHealthHintSolution>>([]);
	private readonly lifeRef = inject(DestroyRef);
	private readonly router = inject(Router);
	private readonly jam = inject(JamService);
	private readonly dialogOverlay = inject(DialogOverlayService);
	private readonly folderService = inject(AdminFolderService);

	constructor() {
		effect(() => {
			this.display(this.folderHealth());
		});
	}

	searchImages(folder: Jam.Folder): void {
		this.dialogOverlay.open<ArtworkSearch>({
			childComponent: DialogFolderArtworkSearchComponent,
			title: 'Search Artwork Images',
			data: { folder, artworks: [] },
			panelClass: 'overlay-panel-large-buttons'
		});
	}

	private static describeImageInvalidHint(hint: Jam.FolderHealthHint): Array<string> {
		if (!hint.details || hint.details.length === 0) {
			return [];
		}
		const details = [hint.details[0].reason];
		if (hint.details[0].expected) {
			details.push(`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`);
		}
		return details;
	}

	private static describeAlbumTracksMissingHint(hint: Jam.FolderHealthHint): Array<string> {
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
		return [
			hint.details[0].reason,
			`Expected: ${hint.details[0].expected} Actual: ${hint.details[0].actual}`
		];
	}

	private addArtistImageSearchSolution(folder: Jam.Folder): void {
		if (!folder.tag?.mbArtistID) {
			return;
		}
		this.solutions.update(s => [...s, {
			name: 'Search',
			click: async () => {
				this.searchImages(folder);
			}
		}]);
	}

	private addAlbumImageSearchSolution(folder: Jam.Folder): void {
		if (!(folder.tag && (folder.tag.mbReleaseID || folder.tag.mbReleaseGroupID))) {
			return;
		}
		this.solutions.update(s => [...s, {
			name: 'Search',
			click: async () => {
				this.searchImages(folder);
			}
		}]);
	}

	private addRenameSolution(folder: Jam.Folder, name: string): void {
		if (this.solutions().some(sol => sol.name === 'Rename')) {
			return;
		}
		const sol: FolderHealthHintSolution = {
			name: 'Rename',
			click: async () => {
				if (sol.running) {
					return;
				}
				sol.running = true;
				this.solutions.update(s => [...s]);
				const item = await this.jam.folder.rename({ id: folder.id, name });
				this.folderService.waitForQueueResult('Renaming Folder', item, [folder.id])
					.pipe(takeUntilDestroyed(this.lifeRef))
					.subscribe(() => {
						sol.running = false;
						this.solutions.update(s => [...s]);
					});
			}
		};
		this.solutions.update(s => [...s, sol]);
	}

	private addEditTagSolution(folder: Jam.Folder): void {
		if (this.solutions().some(sol => sol.name === 'Edit Tags')) {
			return;
		}
		const sol: FolderHealthHintSolution = {
			name: 'Edit Tags',
			click: async () => {
				this.router.navigate([`/admin/folder/${folder.id}/tags`]).catch((error: unknown) => {
					console.error(error);
				});
			}
		};
		this.solutions.update(s => [...s, sol]);
	}

	private describeMBIDMissingHint(_hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addEditTagSolution(folder);
		return [];
	}

	private describeAlbumTagMissingHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addEditTagSolution(folder);
		return hint.details ? [`Expected: ${hint.details.map(d => d.expected).join(',')}`] : [];
	}

	private describeNameNonConformHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		const suggested = hint.details && hint.details.length > 0 ? hint.details[0].expected : '';
		if (!suggested) {
			return [];
		}
		this.addRenameSolution(folder, suggested);
		return [
			`Current: ${folder.name}`,
			`Suggested Name: ${suggested}`
		];
	}

	private describeArtistImageMissingHint(_hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addArtistImageSearchSolution(folder);
		return [];
	}

	private describeAlbumImageMissingHint(_hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		this.addAlbumImageSearchSolution(folder);
		return [];
	}

	private describeHint(hint: Jam.FolderHealthHint, folder: Jam.Folder): Array<string> {
		switch (hint.id) {
			case FolderHealthID.albumMBIDExists: {
				return this.describeMBIDMissingHint(hint, folder);
			}
			case FolderHealthID.albumTagsExists: {
				return this.describeAlbumTagMissingHint(hint, folder);
			}
			case FolderHealthID.albumNameConform:
			case FolderHealthID.artistNameConform: {
				return this.describeNameNonConformHint(hint, folder);
			}
			case FolderHealthID.albumImageExists: {
				return this.describeAlbumImageMissingHint(hint, folder);
			}
			case FolderHealthID.albumTracksComplete: {
				return FolderHealthComponent.describeAlbumTracksMissingHint(hint);
			}
			case FolderHealthID.artistImageExists: {
				return this.describeArtistImageMissingHint(hint, folder);
			}
			case FolderHealthID.artistImageValid:
			case FolderHealthID.albumImageValid: {
				return FolderHealthComponent.describeImageInvalidHint(hint);
			}
			case FolderHealthID.albumImageQuality: {
				return this.describeImageQualityHint(hint, folder);
			}
			default: {
				break;
			}
		}
		return [];
	}

	private display(folderHealth?: Jam.FolderHealth): void {
		this.solutions.set([]);
		if (!folderHealth?.health) {
			this.hints.set([]);
			return;
		}
		this.hints.set(folderHealth.health.map(hint => ({
			hint,
			details: this.describeHint(hint, folderHealth.folder)
		})));
	}
}
