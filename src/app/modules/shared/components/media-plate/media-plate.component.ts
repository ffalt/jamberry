import {FocusableOption} from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, inject} from '@angular/core';
import {JamObject} from '@shared/model/helpers';

@Component({
	selector: 'app-media-plate',
	templateUrl: './media-plate.component.html',
	styleUrls: ['./media-plate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class MediaPlateComponent implements FocusableOption {
	@Input() obj?: JamObject;
	@Input() showParent: boolean = false;
	@HostBinding() tabindex = -1;
	visible: boolean = false;
	protected element = inject(ElementRef);
	private cdr = inject(ChangeDetectorRef);

	@HostListener('keydown.enter', ['$event'])
	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: Event): void {
		if (this.obj) {
			this.obj.onContextMenu(event);
		}
	}

	focus() {
		this.element.nativeElement.focus();
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
