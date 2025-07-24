import {HttpResponse} from '@angular/common/http';
import {Component, type OnDestroy, inject} from '@angular/core';
import type {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {randomString} from '@app/utils/random';
import {NotifyService} from '@core/services';
import {ImageFormatType, type Jam, JamService} from '@jam';
import {Subject, takeUntil} from 'rxjs';

@Component({
	selector: 'app-dialog-avatar',
	templateUrl: './dialog-avatar.component.html',
	styleUrls: ['./dialog-avatar.component.scss'],
	standalone: false
})
export class DialogAvatarComponent implements DialogOverlay<Jam.User>, OnDestroy {
	user?: Jam.User;
	userAvatar?: string;
	hasChanged: boolean = false;
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

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
		this.userAvatar = this.user ? `${this.jam.image.imageUrl({
			id: this.user.id,
			size: 60,
			format: ImageFormatType.webp
		})}?${randomString()}` : undefined;
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
		if (!files || files.length === 0 || !this.user) {
			return;

		}
		const file: File = files[0];

		this.jam.user.uploadUserImage({id: this.user.id}, file)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: event => {
					if (event instanceof HttpResponse) {
						this.setImageSource();
						this.hasChanged = true;
					}
				},
				error: error => {
					this.setImageSource();
					this.notify.error(error);
				},
				complete: () => this.notify.success('Upload done')
			});
	}
}
