import { type FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { type AfterViewInit, Component, DestroyRef, inject, input, type QueryList, ViewChildren } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { JamLibraryObject } from '../../model/objects';
import { ObjCardComponent } from '@core/components/obj-card/obj-card.component';

interface ObjCardsGroupsView {
	type?: string;
	objs: Array<JamLibraryObject>;
}

@Component({
	selector: 'app-obj-groups-cards',
	templateUrl: './obj-groups-cards.component.html',
	styleUrls: ['./obj-groups-cards.component.scss'],
	host: {
		'[tabindex]': 'tabindex',
		'(keydown.arrowDown)': 'manage($event)',
		'(keydown.arrowUp)': 'manage($event)'
	},
	imports: [ObjCardComponent]
})
export class ObjGroupsCardsComponent implements AfterViewInit {
	readonly groups = input<Array<ObjCardsGroupsView>>();
	readonly showParent = input<boolean>(false);
	tabindex = '0';
	@ViewChildren(ObjCardComponent) cards!: QueryList<ObjCardComponent>;
	private readonly lifeRef = inject(DestroyRef);
	private keyManager: FocusKeyManager<FocusableOption> | undefined;

	manage(event: Event) {
		this.keyManager?.onKeydown(event as KeyboardEvent);
	}

	ngAfterViewInit() {
		this.processKeyList();
		this.cards.changes
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(() => {
				this.processKeyList();
			});
	}

	processKeyList() {
		this.keyManager = new FocusKeyManager<FocusableOption>(this.cards).withWrap();
	}
}
