import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {randomString} from '@app/utils/random';

import {AppService, NotifyService} from '@core/services';
import {JamAuthService, JamService} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnDestroy {
	refreshRandom: string;
	refreshing: boolean = false;
	protected unsubscribe = new Subject<void>();

	constructor(public app: AppService, public auth: JamAuthService, private jam: JamService, private notify: NotifyService) {
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
	selectFile(event: any): void {
		this.uploadFile(event.target.files);
	}

	uploadFile(files?: FileList): void {
		if (!files || files.length === 0 || !this.auth.user) {
			return;
		}
		const file: File = files[0];

		this.jam.user.uploadUserImage({id: this.auth.user.id}, file)
			.pipe(takeUntil(this.unsubscribe)).subscribe(
			event => {
				if (event.type === HttpEventType.UploadProgress) {
					// const percentDone = Math.round(100 * event.loaded / event.total);
					// console.log(`File is ${percentDone}% loaded.`);
				} else if (event instanceof HttpResponse) {
					// this.setImageSource();
					// this.hasChanged = true;
				}
			}, err => {
				// this.setImageSource();
				this.notify.error(err);
			},
			() => {
				this.refreshRandom = randomString();
				this.notify.success('Upload done');
			}
		);
	}

	randomAvatar(): void {
		if (this.refreshing || !this.auth.user) {
			return;
		}
		this.refreshing = true;
		this.jam.user.generateUserImage({id: this.auth.user.id})
			.then(() => {
				this.refreshing = false;
				this.refreshRandom = randomString();
				this.notify.success('Image randomized');
			})
			.catch(e => {
				this.refreshing = false;
				this.notify.error(e);
			});
	}

}
