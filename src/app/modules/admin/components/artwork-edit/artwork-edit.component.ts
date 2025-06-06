import {HttpEventType} from '@angular/common/http';
import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {base64ArrayBuffer} from '@app/utils/base64';
import {AdminFolderService, AppService, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {ImageCroppedEvent, OutputFormat} from 'ngx-image-cropper';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface ImageEdit {
	artwork: Jam.Artwork;
	folderID: string;
}

@Component({
	selector: 'app-admin-artwork-edit',
	templateUrl: './artwork-edit.component.html',
	styleUrls: ['./artwork-edit.component.scss'],
	standalone: false
})
export class ArtworkEditComponent implements OnChanges, OnDestroy {
	@Input() data?: ImageEdit;
	imageBase64: string = '';
	croppedImage?: SafeUrl;
	croppedImageFile?: Blob;
	mimeType: string = 'image/jpeg';
	maintainAspectRatio: boolean = true;
	format: OutputFormat = 'jpeg';
	@Output() readonly imageEdited = new EventEmitter<void>();
	protected unsubscribe = new Subject<void>();

	constructor(
		private app: AppService,
		private jam: JamService,
		private folderService: AdminFolderService,
		private notify: NotifyService,
		private sanitizer: DomSanitizer
	) {
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	load(): void {
		if (this.data) {
			this.jam.image.imageBinary({id: this.data.artwork.id})
				.then(data => {
					this.imageBase64 = `data:${(data.contentType || 'image/jpeg')};base64,${base64ArrayBuffer(data.buffer)}`;
				}).catch(e => {
				this.notify.error(e);
			});
		}
	}

	imageCropped(event: ImageCroppedEvent): void {
		// console.log('cropped', event);
		if (event.objectUrl) {
			this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
		}
		if (event.blob) {
			this.croppedImageFile = event.blob;
		}
	}

	imageLoaded(): void {
		// console.log('imageLoaded');
		// show cropper
	}

	cropperReady(): void {
		// console.log('cropperReady');
		// cropper ready
	}

	loadImageFailed(): void {
		// console.log('loadImageFailed');
		// show message
	}

	ngOnChanges(): void {
		this.load();
	}

	upload(): void {
		if (!this.croppedImageFile || !this.data) {
			return;
		}
		const folderID = this.data.folderID;
		const file = new File([this.croppedImageFile], this.data.artwork.name, {type: this.croppedImageFile.type});
		this.jam.artwork.update({id: this.data.artwork.id}, file)
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			event => {
				if (event.type === HttpEventType.Response) {
					this.folderService.waitForQueueResult('Updating Folder Artwork', event.body, [folderID]);
					this.imageEdited.emit();
				} else if (event.type === HttpEventType.UploadProgress) {
					// const percentDone = Math.round(100 * event.loaded / event.total);
					// console.log(`File is ${percentDone}% loaded.`);
				}
			}, err => {
				// this.setImageSource();
				this.notify.error(err);
			},
			() => {
				this.notify.success('Upload done');
			}
		);
	}
}
