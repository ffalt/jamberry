import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy } from '@angular/core';
import { JamAuthService, JamService } from '@jam';
import { Subject, takeUntil } from 'rxjs';
import { randomString } from '@utils/random';
import { CoverartImageComponent } from '@core/components/coverart-image/coverart-image.component';
import { AppService } from '@core/services/app/app.service';
import { NotifyService } from '@core/services/notify/notify.service';

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss'],
	imports: [CommonModule, CoverartImageComponent]
})
export class UserAvatarComponent implements OnDestroy {
	readonly auth = inject(JamAuthService);
	readonly app = inject(AppService);
	refreshRandom: string;
	refreshing: boolean = false;
	private readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);

	constructor() {
		this.refreshRandom = randomString();
	}

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
		if (!files || files.length === 0 || !this.auth.user) {
			return;
		}
		const file: File = files[0];

		this.jam.user.uploadUserImage({ id: this.auth.user.id }, file)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe({
				next: () => {
					// nop
				},
				error: (error: unknown) => {
					this.notify.error(error);
				},
				complete: () => {
					this.refreshRandom = randomString();
					this.notify.success('Upload done');
				}
			});
	}

	randomAvatar(): void {
		if (this.refreshing || !this.auth.user) {
			return;
		}
		this.refreshing = true;
		this.jam.user.generateUserImage({ id: this.auth.user.id })
			.then(() => {
				this.refreshing = false;
				this.refreshRandom = randomString();
				this.notify.success('Image randomized');
			})
			.catch((error: unknown) => {
				this.refreshing = false;
				this.notify.error(error);
			});
	}
}
