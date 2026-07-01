import { Component, inject, signal, type OnDestroy } from '@angular/core';
import { JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
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
export class UserAvatarComponent implements OnDestroy {
	readonly app = inject(AppService);
	readonly user = injectUser();
	readonly refreshRandom = signal(randomString());
	readonly refreshing = signal(false);
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
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
		const target = event.target as HTMLInputElement;
		const files = target.files!;
		this.uploadFile(files);
	}

	uploadFile(files?: FileList): void {
		const user = this.user();
		if (!files || files.length === 0 || !user) {
			return;
		}
		const file: File = files[0];

		this.jam.user.uploadUserImage({ id: user.id }, file)
			.pipe(takeUntil(this.unsubscribe))
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
		if (this.refreshing() || !user) {
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
