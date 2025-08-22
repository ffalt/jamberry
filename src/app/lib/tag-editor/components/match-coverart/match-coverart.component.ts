import { Component, inject, input, type OnChanges } from '@angular/core';
import { base64ArrayBuffer } from '@utils/base64';
import { NotifyService } from '@core/services/notify/notify.service';
import { type CoverArtArchive, CoverArtArchiveLookupType, JamService } from '@jam';
import { type Base64Image, ImageBase64Component } from '../image-base64/image-base64.component';
import { FormsModule } from '@angular/forms';
import { BackgroundTextListComponent } from '@core/components/background-text-list/background-text-list.component';

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
	imports: [FormsModule, ImageBase64Component, BackgroundTextListComponent]
})
export class MatchCoverartComponent implements OnChanges {
	readonly data = input<MatchImageSearch>();
	isImageSearchRunning: boolean = false;
	showFrontImagesOnly: boolean = true;
	images?: Array<MatchImageNode>;
	coverArtArchive?: Array<MatchImageNode>;
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnChanges(): void {
		const data = this.data();
		if (data) {
			this.loadCoverartImages(data).catch((error: unknown) => {
				this.notify.error(error);
			});
		} else {
			this.images = undefined;
			this.coverArtArchive = undefined;
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
			this.images = this.coverArtArchive.filter(i => i.image.front || !this.showFrontImagesOnly);
		}
	}

	getChecked(): Array<MatchImageNode> {
		return this.coverArtArchive ? this.coverArtArchive.filter(i => i.checked && i.base64) : [];
	}

	private async loadImages(result: CoverArtArchive.Response): Promise<void> {
		if (result.images) {
			this.coverArtArchive = result.images.map(image => {
				image.types = image.types ?? [];
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
				const node: MatchImageNode = {
					image,
					checked: false
				};
				return node;
			});
			const fronts = this.coverArtArchive
				.filter(i => i.image.front || i.image.types?.includes('Front'))
				.sort((a, b) => (a.image.types?.length ?? 0) - (b.image.types?.length ?? 0));
			this.images = this.showFrontImagesOnly ? fronts : this.coverArtArchive;
			for (const node of this.images) {
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
			this.images = undefined;
			this.coverArtArchive = [];
		}
	}

	private async loadCoverartImages(query: MatchImageSearch): Promise<void> {
		if (query.mbReleaseID) {
			this.isImageSearchRunning = true;
			let res = await this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.release, mbID: query.mbReleaseID });
			let data = res.data as CoverArtArchive.Response;
			await this.loadImages(data);
			if (this.coverArtArchive && this.coverArtArchive.length === 0 && query.mbReleaseGroupID) {
				this.images = undefined;
				this.coverArtArchive = undefined;
				res = await this.jam.metadata.coverartarchiveLookup({ type: CoverArtArchiveLookupType.releaseGroup, mbID: query.mbReleaseGroupID });
				data = res.data as CoverArtArchive.Response;
				await this.loadImages(data);
				this.isImageSearchRunning = false;
			} else {
				this.isImageSearchRunning = false;
			}
		}
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
