import {ChangeDetectionStrategy, Component, HostListener, Input} from '@angular/core';
import {JamObject} from '@shared/model/helpers';

@Component({
	selector: 'app-media-plate',
	templateUrl: './media-plate.component.html',
	styleUrls: ['./media-plate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPlateComponent {
	@Input() obj: JamObject;
	@Input() showParent: boolean;
	visible: boolean = false;

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: MouseEvent): void {
		this.obj.onContextMenu(event);
	}

	gotInView(): void {
		this.visible = true;
	}
}
