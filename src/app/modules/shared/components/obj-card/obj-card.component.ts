import {ChangeDetectorRef, Component, HostListener, Input} from '@angular/core';
import {JamObject} from '@shared/model/helpers';

@Component({
	selector: 'app-obj-card',
	templateUrl: './obj-card.component.html',
	styleUrls: ['./obj-card.component.scss']
})
export class ObjCardComponent {
	@Input() obj?: JamObject;
	@Input() showParent: boolean = false;
	visible: boolean = false;

	constructor(private cdr: ChangeDetectorRef) {
	}

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: MouseEvent): void {
		if (this.obj) {
			this.obj.onContextMenu(event);
		}
	}

	gotInView(): void {
		this.visible = true;
	}

	toggleFav(): void {
		if (!this.obj) {
			return;
		}
		this.obj.toggleFav()
			.then(() => {
				this.cdr.detectChanges();
			})
			.catch(e => {
				console.error(e);
			});
	}
}
