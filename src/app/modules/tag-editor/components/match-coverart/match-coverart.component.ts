import {HttpClient} from '@angular/common/http';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {base64ArrayBuffer} from '@app/utils/base64';
import {AppService, NotifyService} from '@core/services';
import {CoverArtArchive, CoverArtArchiveLookupType, JamService} from '@jam';
import {take} from 'rxjs/operators';
import {Base64Image} from '../image-base64/image-base64.component';

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
	styleUrls: ['./match-coverart.component.scss']
})
export class MatchCoverartComponent implements OnChanges {
	@Input() data: MatchImageSearch;
	isImageSearchRunning: boolean = false;
	showFrontImagesOnly: boolean = true;
	images: Array<MatchImageNode>;
	coverArtArchive: Array<MatchImageNode>;

	constructor(private app: AppService, private jam: JamService, private notify: NotifyService, private client: HttpClient) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.data) {
			this.loadCoverartImages(this.data).catch(e => {
				this.notify.error(e);
			});
		} else {
			this.images = undefined;
			this.coverArtArchive = undefined;
		}
	}

	onToggleShowFrontImagesOnly(): void {
		if (!this.showFrontImagesOnly) {
			if (this.coverArtArchive) {
				for (const node of this.coverArtArchive) {
					if (!node.base64 && !node.requested) {
						this.getBase64Image(node)
							.catch(e => {
								console.error(e);
							});
					}
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
				if (image.types.length === 0) {
					image.types.push('Other');
				}
				if (image.image) {
					image.image = image.image.replace('http:', 'https:');
				}
				if (image.thumbnails) {
					Object.keys(image.thumbnails).forEach(key => {
						image.thumbnails[key] = image.thumbnails[key].replace('http:', 'https:');
					});
				}
				const node: MatchImageNode = {
					image,
					checked: false
				};
				return node;
			});
			const fronts = this.coverArtArchive.filter(i => i.image.front || i.image.types.includes('Front')).sort((a, b) => a.image.types.length - b.image.types.length);
			this.images = this.showFrontImagesOnly ? fronts : this.coverArtArchive;
			this.images.forEach(node => {
				this.getBase64Image(node)
					.catch(e => {
						console.error(e);
					});
			});

			let front = fronts.find(i => i.image.types.length === 1);
			if (!front) {
				front = fronts[0];
			}
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
			let res = await this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.release, id: query.mbReleaseID});
			await this.loadImages(res);
			if (this.coverArtArchive.length === 0 && query.mbReleaseGroupID) {
				this.images = undefined;
				this.coverArtArchive = undefined;
				res = await this.jam.metadata.coverartarchive_lookup({type: CoverArtArchiveLookupType.releaseGroup, id: query.mbReleaseGroupID});
				await this.loadImages(res);
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
		const imageUrl = image.image.thumbnails['500'] || image.image.thumbnails.small;
		image.requested = true;
		return new Promise<void>((resolve, reject) => {
			this.client.get(imageUrl, {observe: 'response', responseType: 'arraybuffer' as 'arraybuffer'})
				.pipe(take(1)).subscribe(resp => {
					image.requested = false;
					image.base64 = {
						mimeType: resp.headers.get('Content-Type'),
						base64: base64ArrayBuffer(resp.body)
					};
					resolve();
				},
				err => {
					image.requested = false;
					if (err.status === 0) {
						this.notify.error({error: 'Could not reach server https://coverartarchive.org'});
						return;
					}
					this.notify.error(err);
					resolve();
				});
		});
	}

}
