import {FocusableOption} from '@angular/cdk/a11y';
import {ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, inject} from '@angular/core';
import {JamObject} from '@shared/model/helpers';

@Component({
	selector: 'app-obj-card',
	templateUrl: './obj-card.component.html',
	styleUrls: ['./obj-card.component.scss'],
	standalone: false
})
export class ObjCardComponent implements FocusableOption {
	@Input() obj?: JamObject;
	@Input() showParent: boolean = false;
	@HostBinding() tabindex = -1;
	visible: boolean = false;
	protected element = inject(ElementRef);
	private cdr = inject(ChangeDetectorRef);

	focus() {
		this.element.nativeElement.focus();
	}

	@HostListener('keydown.enter', ['$event'])
	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: Event): void {
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
