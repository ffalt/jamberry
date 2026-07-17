import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JamService } from '@jam';
import { randomString } from '@utils/random';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { AppService } from '@core/services/app/app.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';
import { injectUser } from '@core/services/user/user.service';

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss'],
	imports: [CoverartImageComponent, IconSpinComponent]
})
export class UserAvatarComponent {
	readonly app = inject(AppService);
	readonly user = injectUser();
	readonly refreshRandom = signal(randomString());
	readonly refreshing = signal(false);
	private readonly lifeRef = inject(DestroyRef);
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

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
		const target = event.target as HTMLInputElement;
		const files = target.files!;
		this.uploadFile(files);
	}

	uploadFile(files?: FileList): void {
		const user = this.user();
		if (!files || !user || files.length === 0) {
			return;
		}
		const file: File = files[0];

		this.jam.user.uploadUserImage({ id: user.id }, file)
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe({
				next: () => {
					// nop
				},
				error: (error: unknown) => {
					this.notify.error(error);
				},
				complete: () => {
					this.refreshRandom.set(randomString());
					this.notify.success('Upload done');
				}
			});
	}

	randomAvatar(): void {
		const user = this.user();
		if (!user || this.refreshing()) {
			return;
		}
		this.refreshing.set(true);
		this.jam.user.generateUserImage({ id: user.id })
			.then(() => {
				this.refreshing.set(false);
				this.refreshRandom.set(randomString());
				this.notify.success('Image randomized');
			})
			.catch((error: unknown) => {
				this.refreshing.set(false);
				this.notify.error(error);
			});
	}
}
