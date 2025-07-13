import type {FocusableOption} from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, input} from '@angular/core';
import type {JamObject} from '@shared/model/helpers';

@Component({
	selector: 'app-media-plate',
	templateUrl: './media-plate.component.html',
	styleUrls: ['./media-plate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false,
	host: {
		tabindex: 'tabindex',
		'(keydown.enter)': 'contextmenuEvent($event)',
		'(contextmenu)': 'contextmenuEvent($event)'
	}
})
export class MediaPlateComponent implements FocusableOption {
	readonly obj = input<JamObject>();
	readonly showParent = input<boolean>(false);
	tabindex = -1;
	visible: boolean = false;
	protected readonly element = inject(ElementRef);
	private readonly cdr = inject(ChangeDetectorRef);

	contextmenuEvent(event: Event): void {
		const obj = this.obj();
		if (obj) {
			obj.onContextMenu(event);
		}
	}

	focus() {
		this.element.nativeElement.focus();
	}

	gotInView(): void {
		this.visible = true;
	}

	toggleFav(): void {
		const obj = this.obj();
		if (!obj) {
			return;
		}
		obj.toggleFav()
			.then(() => {
				this.cdr.detectChanges();
			})
			.catch(e => {
				console.error(e);
			});
	}
}
