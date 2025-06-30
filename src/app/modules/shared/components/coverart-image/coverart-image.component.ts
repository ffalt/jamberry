import {AfterContentInit, Component, OnChanges, SimpleChange, inject, input} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {ImageFormatType, JamService} from '@jam';
import {ImageOverlayContentComponent} from '../image-overlay-content/image-overlay-content.component';

@Component({
	selector: 'app-coverart-image',
	templateUrl: './coverart-image.component.html',
	styleUrls: ['./coverart-image.component.scss'],
	standalone: false,
	host: {
		'[class.fill]': 'fill',
		'[class.round]': 'round',
		'[class.border]': 'border',
		'[class.border-hover]': 'hoverBorder',
		'[style.minWidth.px]': 'minSize',
		'[style.minHeight.px]': 'minSize',
		'[style.width.px]': 'hostSize',
		'[style.height.px]': 'hostSize'
	}
})
export class CoverartImageComponent implements OnChanges, AfterContentInit {
	readonly coverArtObj = input<{
		id: string;
		name: string;
	}>();
	readonly size = input<number>();
	readonly alt = input<string>('');
	readonly refreshRandom = input<string>('');
	readonly allowEnlarge = input<boolean>(false);
	readonly fill = input<boolean>(false);
	readonly round = input<boolean>(false);
	readonly border = input<boolean>(true);
	readonly hoverBorder = input<boolean>(false);
	minSize?: number;
	hostSize?: number;
	isLoaded: boolean = false;
	imageSrc: string = '';
	altSrc: string = '';
	private readonly jam = inject(JamService);
	private readonly dialogOverlay = inject(DialogOverlayService);

	ngAfterContentInit(): void {
		this.updateSize();
		this.buildUrl();
	}

	updateSize(): void {
		const size = this.size();
		if (this.fill()) {
			this.minSize = undefined;
			this.hostSize = undefined;
		} else if (size) {
			this.minSize = size - (this.border() ? 2 : 0);
			this.hostSize = this.minSize;
		}
	}

	ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
		if (changes.coverArtObj && changes.coverArtObj.currentValue) {
			if (this.isLoaded) {
				this.buildUrl();
			} else {
				this.imageSrc = '';
				this.buildUrl();
			}
		}
		if (this.isLoaded && changes.refreshRandom) {
			this.buildUrl();
		}
		if (this.imageSrc.length > 0) {
			return;
		}
		if (changes.size || changes.border || changes.fill) {
			this.updateSize();
		}
	}

	onImgLoad(): void {
		this.isLoaded = true;
		this.altSrc = this.alt();
	}

	showImageOverlay(event: MouseEvent): void {
		const coverArtObj = this.coverArtObj();
		if (this.allowEnlarge() && coverArtObj) {
			event.stopPropagation();
			this.dialogOverlay.open({
				title: coverArtObj.name,
				childComponent: ImageOverlayContentComponent,
				data: {
					name: coverArtObj.name,
					url: this.jam.image.imageUrl({id: coverArtObj.id})
				}
			});
		}
	}

	private buildUrl(): void {
		const coverArtObj = this.coverArtObj();
		if (coverArtObj) {
			let url = this.jam.image.imageUrl({id: coverArtObj.id, size: this.size(), format: ImageFormatType.webp});
			const refreshRandom = this.refreshRandom();
			if (refreshRandom) {
				url += `${url.includes('?') ? '&' : '?'}refresh=${refreshRandom}`;
			}
			this.imageSrc = url;
		}
	}
}
