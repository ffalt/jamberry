import {FocusableOption, FocusKeyManager} from '@angular/cdk/a11y';
import {AfterViewInit, Component, HostBinding, HostListener, Input, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import {JamLibraryObject} from '@library/model/objects';
import {ObjCardComponent} from '@shared/components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

interface ObjCardsGroupsView {
	type?: string;
	objs: Array<JamLibraryObject>;
}

@Component({
	selector: 'app-obj-groups-cards',
	templateUrl: './obj-groups-cards.component.html',
	styleUrls: ['./obj-groups-cards.component.scss']
})
export class ObjGroupsCardsComponent implements AfterViewInit, OnDestroy {
	@Input() groups?: Array<ObjCardsGroupsView>;
	@Input() showParent: boolean = false;
	@ViewChildren(ObjCardComponent) cards!: QueryList<ObjCardComponent>;
	@HostBinding() tabindex = '0';
	protected unsubscribe = new Subject<void>();
	private keyManager: FocusKeyManager<FocusableOption> | undefined;

	@HostListener('keydown.arrowUp', ['$event'])
	@HostListener('keydown.arrowDown', ['$event'])
	manage(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	ngAfterViewInit() {
		this.processKeyList();
		this.cards.changes.pipe(takeUntil(this.unsubscribe)).subscribe(_ => {
			this.processKeyList();
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	processKeyList() {
		this.keyManager = new FocusKeyManager<FocusableOption>(this.cards).withWrap();
	}

}
