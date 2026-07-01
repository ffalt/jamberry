import { HttpResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotifyService } from '@core/services/notify/notify.service';
import { ImageFormatType, type Jam, JamService } from '@jam';
import type { DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef } from '@modules/dialog-overlay';
import { randomString } from '@utils/random';

@Component({
	selector: 'app-dialog-avatar',
	templateUrl: './dialog-avatar.component.html',
	styleUrls: ['./dialog-avatar.component.scss']
})
export class DialogAvatarComponent implements DialogOverlay<Jam.User> {
	readonly userAvatar = signal<string | undefined>(undefined);
	user?: Jam.User;
	hasChanged: boolean = false;
	private readonly lifeRef = inject(DestroyRef);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<Jam.User>>): void {
		this.user = options.data;
		this.setImageSource();
	}

	dialogResult(): boolean {
		return this.hasChanged;
	}

	setImageSource(): void {
		this.userAvatar.set(this.user ?
			`${this.jam.image.imageUrl({
				id: this.user.id,
				size: 60,
				format: ImageFormatType.webp
			})}?${randomString()}` :
			undefined);
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
	selectFile(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.uploadFile(input.files ?? undefined);
	}

	uploadFile(files?: FileList): void {
		if (!files || files.length === 0 || !this.user) {
			return;
		}
		const file: File = files[0];
		this.jam.user.uploadUserImage({ id: this.user.id }, file)
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe({
				next: event => {
					if (!(event instanceof HttpResponse)) {
						return;
					}

					this.setImageSource();
					this.hasChanged = true;
				},
				error: (error: unknown) => {
					this.setImageSource();
					this.notify.error(error);
				},
				complete: () => {
					this.notify.success('Upload done');
				}
			});
	}
}
