import {AfterContentInit, Component, ElementRef, HostBinding, Input, OnChanges, SimpleChange} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {JamService} from '@jam';
import {ImageOverlayContentComponent} from '../image-overlay-content/image-overlay-content.component';

@Component({
	selector: 'app-coverart-image',
	templateUrl: './coverart-image.component.html',
	styleUrls: ['./coverart-image.component.scss']
})
export class CoverartImageComponent implements OnChanges, AfterContentInit {
	@Input() coverArtObj: { id: string; name: string };
	@Input() alt: string = '';
	@Input() refreshRandom: string = '';
	@Input() size: number;
	@Input() allowEnlarge: boolean = false;
	@Input() @HostBinding('class.fill') fill: boolean = false;
	@Input() @HostBinding('class.round') round: boolean = false;
	@Input() @HostBinding('class.border') border: boolean = true;
	@HostBinding('style.minWidth.px') @HostBinding('style.minHeight.px') minSize: number;
	@HostBinding('style.height.px') @HostBinding('style.width.px') hostSize: number;
	isLoaded: boolean = false;
	imageSrc: string = '';
	altSrc: string = '';

	constructor(
		private elementRef: ElementRef,
		private jam: JamService,
		private dialogOverlay: DialogOverlayService
	) {
	}

	ngAfterContentInit(): void {
		this.updateSize();
		this.buildUrl();
	}

	updateSize(): void {
		if (this.fill) {
			this.minSize = undefined;
			this.hostSize = undefined;
		} else {
			this.minSize = this.size - (this.border ? 2 : 0);
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
		this.altSrc = this.alt;
	}

	showImageOverlay(event): void {
		if (this.allowEnlarge) {
			event.stopPropagation();
			this.dialogOverlay.open({
				title: this.coverArtObj.name,
				childComponent: ImageOverlayContentComponent,
				data: {name: this.coverArtObj.name, url: this.jam.image.url(this.coverArtObj.id)}
			});
		}
	}

	private buildUrl(): void {
		if (this.coverArtObj) {
			let url = this.jam.base.image_url(this.coverArtObj.id, this.size);
			if (this.refreshRandom) {
				url += `${url.includes('?') ? '&' : '?'}refresh=${this.refreshRandom}`;
			}
			this.imageSrc = url;
		}
	}

}
