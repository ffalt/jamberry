import { inject, Service } from '@angular/core';
import { DialogOverlayService } from '@modules/dialog-overlay';
import { TextOverlayContentComponent } from '../../components/text-overlay-content/text-overlay-content.component';

@Service()
export class DialogsService {
	readonly dialogOverlay = inject(DialogOverlayService);

	confirm(title: string, text: string, ok: () => void): void {
		this.dialogOverlay.open<string>({
			childComponent: TextOverlayContentComponent,
			title,
			data: text,
			onOkBtn: async () => {
				ok();
				return Promise.resolve();
			},
			onCancelBtn: async () => Promise.resolve()
		});
	}
}
