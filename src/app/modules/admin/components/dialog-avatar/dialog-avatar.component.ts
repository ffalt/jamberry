import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {NotifyService} from '@core/services';
import {Jam, JamService} from '@jam';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-dialog-avatar',
	templateUrl: 'dialog-avatar.component.html',
	styleUrls: ['dialog-avatar.component.scss']
})
export class DialogAvatarComponent implements DialogOverlay<Jam.User>, OnDestroy {
	user: Jam.User;
	userAvatar: string;
	hasChanged: boolean = false;
	protected unsubscribe = new Subject();

	constructor(private jam: JamService, private notify: NotifyService) {
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<Jam.User>>): void {
		this.user = options.data;
		this.setImageSource();
	}

	dialogResult(): boolean {
		return this.hasChanged;
	}

	setImageSource(): void {
		this.userAvatar = [this.jam.base.image_url(this.user.id, 60), '?', this.randomRefreshString()].join('');
	}

	randomRefreshString(): string {
		return Math.floor(Math.random() * (9999999)).toString();
	}

	// At the drag drop area
	onDropFile(event: DragEvent): void {
		event.preventDefault();
		this.uploadFile(event.dataTransfer.files);
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

	uploadFile(files: FileList): void {
		if (files.length === 0) {
			return;

		}
		const file: File = files[0];

		this.jam.user.imageUpload_update({id: this.user.id}, file)
			.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					// const percentDone = Math.round(100 * event.loaded / event.total);
					// console.log(`File is ${percentDone}% loaded.`);
				} else if (event instanceof HttpResponse) {
					this.setImageSource();
					this.hasChanged = true;
				}
			}, err => {
				this.setImageSource();
				this.notify.error(err);
			},
			() => {
				this.notify.success('Upload done');
			}
		);
	}

}
