import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {AdminFolderService, AdminFolderServiceNotifyMode, NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-dialog-upload-image',
	templateUrl: './dialog-upload-image.component.html',
	styleUrls: ['./dialog-upload-image.component.scss']
})
export class DialogUploadImageComponent implements DialogOverlay<{ folder: Jam.Folder }>, OnDestroy {
	folder?: Jam.Folder;
	reference?: DialogOverlayRef;
	isIdle: boolean = true;
	isUploading: boolean = false;
	protected unsubscribe = new Subject<void>();

	constructor(private jam: JamService, private notify: NotifyService, private folderService: AdminFolderService) {
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<{ folder: Jam.Folder }>>): void {
		this.reference = reference;
		this.folder = options.data?.folder;
	}

	waitForCreationEnd(item: Jam.AdminChangeQueueInfo): void {
		if (!this.folder) {
			return;
		}
		const id = this.folder.id;
		this.folderService.waitForQueueResult('Creating Artwork', item, [])
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				this.isIdle = true;
				this.folderService.notifyFolderChange(id, AdminFolderServiceNotifyMode.fsnRefresh);
				if (!item.error) {
					this.notify.success('Upload done');
					if (this.reference) {
						this.reference.close();
					}
				}
			});
	}

	// At the drag drop area
	onDropFile(event: DragEvent): void {
		event.preventDefault();
		this.uploadFile(event.dataTransfer?.files);
	}

	// At the drag drop area
	onDragOverFile(event: MouseEvent): void {
		event.stopPropagation();
		event.preventDefault();
	}

	// At the file input element
	selectFile(event: any): void {
		this.uploadFile(event.target.files);
	}

	uploadFile(files?: FileList): void {
		if (!files || files.length === 0 || !this.folder) {
			return;
		}
		const file: File = files[0];
		this.isIdle = false;
		this.isUploading = true;
		this.jam.artwork.createByUpload({folderID: this.folder.id, types: []}, file)
			.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					// const percentDone = Math.round(100 * event.loaded / event.total);
					// console.log(`File is ${percentDone}% loaded.`);
				} else if (event instanceof HttpResponse) {
					const result = event.body;
					if (result) {
						this.waitForCreationEnd(result as Jam.AdminChangeQueueInfo);
					}
				}
			}, err => {
				this.isUploading = false;
				this.isIdle = true;
				this.notify.error(err);
			},
			() => {
				this.isUploading = false;
			}
		);
	}

}
