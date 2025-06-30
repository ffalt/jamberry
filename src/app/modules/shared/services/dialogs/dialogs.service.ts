import {Injectable, inject} from '@angular/core';
import {DialogOverlayService} from '@app/modules/dialog-overlay';
import {TextOverlayContentComponent} from '../../components/text-overlay-content/text-overlay-content.component';

@Injectable({
	providedIn: 'root'
})
export class DialogsService {
	readonly dialogOverlay = inject(DialogOverlayService);

	confirm(title: string, text: string, ok: () => void): void {
		this.dialogOverlay.open({
			title,
			childComponent: TextOverlayContentComponent,
			data: text,
			onOkBtn: async () => {
				ok();
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
