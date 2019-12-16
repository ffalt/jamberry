import {Component, HostListener, Input} from '@angular/core';
import {JamObject} from '@shared/model/helpers';

@Component({
	selector: 'app-obj-card',
	templateUrl: './obj-card.component.html',
	styleUrls: ['./obj-card.component.scss']
})
export class ObjCardComponent {
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
