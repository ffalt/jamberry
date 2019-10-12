import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AppService, NotifyService} from '@core/services';
import {JamAuthService, JamService} from '@jam';

@Component({
	selector: 'app-user-page',
	templateUrl: 'user-page.component.html',
	styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnDestroy {
	refreshRandom: string;
	refreshing: boolean = false;
	protected unsubscribe = new Subject();

	constructor(public app: AppService, public auth: JamAuthService, private jam: JamService, private notify: NotifyService) {
		this.refreshRandom = this.randomRefreshString();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
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

		this.jam.user.imageUpload_update({id: this.auth.user.id}, file)
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
				this.refreshRandom = this.randomRefreshString();
				this.notify.success('Upload done');
			}
		);
	}

	randomRefreshString(): string {
		return Math.floor(Math.random() * (9999999)).toString();
	}

	randomAvatar(): void {
		if (this.refreshing) {
			return;
		}
		this.refreshing = true;
		this.jam.user.image_random({})
			.then(() => {
				this.refreshing = false;
				this.refreshRandom = this.randomRefreshString();
				this.notify.success('Image randomized');
			})
			.catch(e => {
				this.refreshing = false;
				this.notify.error(e);
			});
	}

}
