import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input} from '@angular/core';
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

	constructor(private cdr: ChangeDetectorRef) {
	}

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: MouseEvent): void {
		this.obj.onContextMenu(event);
	}

	gotInView(): void {
		this.visible = true;
	}

	toggleFav(): void {
		this.obj.toggleFav()
			.then(() => {
				this.cdr.detectChanges();
			})
			.catch(e => {
				console.error(e);
			});
	}
}
