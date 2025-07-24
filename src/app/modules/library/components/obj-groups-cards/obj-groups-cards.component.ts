import {type FocusableOption, FocusKeyManager} from '@angular/cdk/a11y';
import {type AfterViewInit, Component, type OnDestroy, input, ViewChildren, type QueryList} from '@angular/core';
import type {JamLibraryObject} from '@library/model/objects';
import {ObjCardComponent} from '@shared/components';
import {Subject, takeUntil} from 'rxjs';

interface ObjCardsGroupsView {
	type?: string;
	objs: Array<JamLibraryObject>;
}

@Component({
	selector: 'app-obj-groups-cards',
	templateUrl: './obj-groups-cards.component.html',
	styleUrls: ['./obj-groups-cards.component.scss'],
	standalone: false,
	host: {
		"[tabindex]": 'tabindex',
		'(keydown.arrowDown)': 'manage($event)',
		'(keydown.arrowUp)': 'manage($event)'
	}
})
export class ObjGroupsCardsComponent implements AfterViewInit, OnDestroy {
	readonly groups = input<Array<ObjCardsGroupsView>>();
	readonly showParent = input<boolean>(false);
	tabindex = '0';
	@ViewChildren(ObjCardComponent) cards!: QueryList<ObjCardComponent>;
	private readonly unsubscribe = new Subject<void>();
	private keyManager: FocusKeyManager<FocusableOption> | undefined;

	manage(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	ngAfterViewInit() {
		this.processKeyList();
		this.cards.changes
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.processKeyList());
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	processKeyList() {
		this.keyManager = new FocusKeyManager<FocusableOption>(this.cards).withWrap();
	}
}
