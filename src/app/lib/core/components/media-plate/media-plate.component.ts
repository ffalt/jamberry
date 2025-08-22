import type { FocusableOption } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, input } from '@angular/core';
import type { JamObject } from '../../model/helpers';
import { CoverartImageComponent } from '../coverart-image/coverart-image.component';
import { ClickStopDirective } from '../../directives/click-stop.directive';
import { FavIconComponent } from '../fav-icon/fav-icon.component';
import { DeferLoadDirective } from '@modules/defer-load/defer-load.directive';

@Component({
	selector: 'app-media-plate',
	templateUrl: './media-plate.component.html',
	styleUrls: ['./media-plate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[tabindex]': 'tabindex',
		'(keydown.enter)': 'contextmenuEvent($event)',
		'(contextmenu)': 'contextmenuEvent($event)'
	},
	imports: [CoverartImageComponent, ClickStopDirective, FavIconComponent, ClickStopDirective, DeferLoadDirective]
})
export class MediaPlateComponent implements FocusableOption {
	readonly obj = input<JamObject>();
	readonly showParent = input<boolean>(false);
	tabindex = -1;
	visible: boolean = false;
	protected readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
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
			.catch((error: unknown) => {
				console.error(error);
			});
	}
}
