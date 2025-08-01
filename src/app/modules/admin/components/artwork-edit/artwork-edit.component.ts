import {HttpEventType} from '@angular/common/http';
import {Component, type OnChanges, type OnDestroy, inject, output, input} from '@angular/core';
import {DomSanitizer, type SafeUrl} from '@angular/platform-browser';
import {base64ArrayBuffer} from '@app/utils/base64';
import {AdminFolderService, NotifyService} from '@core/services';
import {type Jam, JamService} from '@jam';
import type {ImageCroppedEvent, OutputFormat} from 'ngx-image-cropper';
import {Subject, takeUntil} from 'rxjs';

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
	readonly data = input<ImageEdit>();
	readonly imageEdited = output();
	imageBase64: string = '';
	croppedImage?: SafeUrl;
	croppedImageFile?: Blob;
	mimeType: string = 'image/jpeg';
	maintainAspectRatio: boolean = true;
	format: OutputFormat = 'jpeg';
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly folderService = inject(AdminFolderService);
	private readonly notify = inject(NotifyService);
	private readonly sanitizer = inject(DomSanitizer);

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	load(): void {
		const dataValue = this.data();
		if (dataValue) {
			this.jam.image.imageBinary({id: dataValue.artwork.id})
				.then(data => {
					this.imageBase64 = `data:${(data.contentType || 'image/jpeg')};base64,${base64ArrayBuffer(data.buffer)}`;
				})
				.catch(error => this.notify.error(error));
		}
	}

	imageCropped(event: ImageCroppedEvent): void {
		if (event.objectUrl) {
			this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
		}
		if (event.blob) {
			this.croppedImageFile = event.blob;
		}
	}

	ngOnChanges(): void {
		this.load();
	}

	upload(): void {
		const data = this.data();
		if (!this.croppedImageFile || !data) {
			return;
		}
		const folderID = data.folderID;
		const file = new File([this.croppedImageFile], data.artwork.name, {type: this.croppedImageFile.type});
		this.jam.artwork.update({id: data.artwork.id}, file)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: event => {
					if (event.type === HttpEventType.Response) {
						this.folderService.waitForQueueResult('Updating Folder Artwork', event.body, [folderID]);
						this.imageEdited.emit();
					}
				},
				error: error => this.notify.error(error),
				complete: () => this.notify.success('Upload done')
			});
	}
}
