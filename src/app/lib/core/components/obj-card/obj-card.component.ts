import type { FocusableOption } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ElementRef, inject, input } from '@angular/core';
import type { JamObject } from '../../model/helpers';
import { CoverartImageComponent } from '../coverart-image/coverart-image.component';
import { IconFavComponent } from '../icons/icon-fav.component';
import { LimitPipe } from '../../pipes/limit.pipe';
import { DeferLoadDirective } from '@modules/defer-load/defer-load.directive';
import { IconPlayComponent } from '@core/components/icons/icon-play.component';

@Component({
	selector: 'app-obj-card',
	templateUrl: './obj-card.component.html',
	styleUrls: ['./obj-card.component.scss'],
	host: {
		'[tabindex]': 'tabindex',
		'(contextmenu)': 'contextmenuEvent($event)',
		'(keydown.enter)': 'contextmenuEvent($event)'
	},
	imports: [CoverartImageComponent, DeferLoadDirective, IconFavComponent, IconPlayComponent, LimitPipe]
})
export class ObjCardComponent implements FocusableOption {
	readonly obj = input<JamObject>();
	readonly showParent = input<boolean>(false);
	tabindex = -1;
	visible: boolean = false;
	protected readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly cdr = inject(ChangeDetectorRef);

	focus() {
		this.element.nativeElement.focus();
	}

	contextmenuEvent(event: Event): void {
		const obj = this.obj();
		if (obj) {
			obj.onContextMenu(event);
		}
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
			.catch((error: unknown) => {
				console.error(error);
			});
	}
}
