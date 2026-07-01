import { Component, effect, inject, input, signal } from '@angular/core';
import { base64ArrayBuffer } from '@utils/base64';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';
import { NotifyService } from '@core/services/notify/notify.service';
import { type CoverArtArchive, CoverArtArchiveLookupType, JamService } from '@jam';
import { type Base64Image, ImageBase64Component } from '../image-base64/image-base64.component';
import { FormsModule } from '@angular/forms';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';
import { serverErrorMsg } from '@utils/errors';

export interface MatchImageSearch {
	mbReleaseID: string;
	mbReleaseGroupID: string;
}

export interface MatchImageNode {
	image: CoverArtArchive.Image;
	base64?: Base64Image;
	checked: boolean;
	requested?: boolean;
}

@Component({
	selector: 'app-match-coverart',
	templateUrl: './match-coverart.component.html',
	styleUrls: ['./match-coverart.component.scss'],
	imports: [BackgroundTextListComponent, FormsModule, IconSpinComponent, ImageBase64Component]
})
export class MatchCoverartComponent {
	readonly data = input<MatchImageSearch>();
	readonly isImageSearchRunning = signal(false);
	readonly images = signal<Array<MatchImageNode> | undefined>(undefined);
	readonly error = signal<string | undefined>(undefined);
	showFrontImagesOnly: boolean = true;
	private coverArtArchive?: Array<MatchImageNode>;
	private lastQuery?: MatchImageSearch;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		effect(() => {
			const data = this.data();
			if (data) {
				this.runSearch(data);
			} else {
				this.images.set(undefined);
				this.coverArtArchive = undefined;
				this.error.set(undefined);
			}
		});
	}

	retry(): void {
		if (this.lastQuery) {
			this.runSearch(this.lastQuery);
		}
	}

	onToggleShowFrontImagesOnly(): void {
		if (!this.showFrontImagesOnly && this.coverArtArchive) {
			for (const node of this.coverArtArchive) {
				if (!node.base64 && !node.requested) {
					this.getBase64Image(node).catch((error: unknown) => {
						console.error(error);
					});
				}
			}
		}
		if (this.coverArtArchive) {
			this.images.set(this.coverArtArchive.filter(i => i.image.front || !this.showFrontImagesOnly));
		}
	}

	getChecked(): Array<MatchImageNode> {
		return this.coverArtArchive ? this.coverArtArchive.filter(i => i.checked && i.base64) : [];
	}

	private runSearch(query: MatchImageSearch): void {
		this.lastQuery = query;
		this.error.set(undefined);
		this.loadCoverartImages(query).catch((error: unknown) => {
			this.isImageSearchRunning.set(false);
			this.error.set(serverErrorMsg(error));
		});
	}

	private async loadImages(result: CoverArtArchive.Response): Promise<void> {
		if (result.images) {
			this.coverArtArchive = result.images.map(image => {
				image.types ??= [];
				if (image.types.length === 0) {
					image.types.push('Other');
				}
				if (image.image) {
					image.image = image.image.replace('http:', 'https:');
				}
				if (image.thumbnails) {
					const thumbs: { [name: string]: string } = image.thumbnails;
					for (const key of Object.keys(thumbs)) {
						thumbs[key] = thumbs[key].replace('http:', 'https:');
					}
				}
				return { image, checked: false } as MatchImageNode;
			});
			const fronts = this.coverArtArchive
				.filter(i => i.image.front || i.image.types?.includes('Front'))
				.toSorted((a, b) => (a.image.types?.length ?? 0) - (b.image.types?.length ?? 0));
			const imageList = this.showFrontImagesOnly ? fronts : this.coverArtArchive;
			this.images.set(imageList);
			for (const node of imageList) {
				this.getBase64Image(node).catch((error: unknown) => {
					console.error(error);
				});
			}
			let front = fronts.find(i => i.image.types?.length === 1);
			front ??= fronts.at(0);
			if (front) {
				front.checked = true;
			}
		} else {
			this.images.set(undefined);
			this.coverArtArchive = [];
		}
	}

	private async loadCoverartImages(query: MatchImageSearch): Promise<void> {
		if (!query.mbReleaseID) {
			return;
		}
		this.isImageSearchRunning.set(true);
		let res = await this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.release, mbID: query.mbReleaseID });
		let data = res.data as CoverArtArchive.Response;
		await this.loadImages(data);
		if (this.coverArtArchive?.length === 0 && query.mbReleaseGroupID) {
			this.images.set(undefined);
			this.coverArtArchive = undefined;
			res = await this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.releaseGroup, mbID: query.mbReleaseGroupID });
			data = res.data as CoverArtArchive.Response;
			await this.loadImages(data);
		}
		this.isImageSearchRunning.set(false);
	}

	private async getBase64Image(image: MatchImageNode): Promise<void> {
		if (image.requested) {
			return;
		}
		const imageUrl = image.image.thumbnails?.['500'] ?? image.image.thumbnails?.small;
		if (!imageUrl) {
			this.notify.error({ error: 'No image to fetch from https://coverartarchive.org' });
			return;
		}
		image.requested = true;
		let bin: { buffer: ArrayBuffer; contentType: string } | undefined;
		try {
			bin = await this.jam.metadata.coverartarchiveImageBinary({ url: imageUrl });
		} catch (error) {
			console.error(error);
		}
		image.requested = false;
		if (bin) {
			image.base64 = { title: imageUrl, mimeType: bin.contentType, base64: base64ArrayBuffer(bin.buffer) };
		} else {
			this.notify.error({ error: 'Invalid result from https://coverartarchive.org' });
		}
	}
}
