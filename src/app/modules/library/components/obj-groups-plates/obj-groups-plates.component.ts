import {FocusableOption, FocusKeyManager} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnDestroy, input, ViewChildren, QueryList} from '@angular/core';
import {JamLibraryObject} from '@library/model/objects';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ObjPlateComponent} from '../obj-plate/obj-plate.component';

interface ObjPlatesGroupsView {
	type?: string;
	objs: Array<JamLibraryObject>;
}

@Component({
	selector: 'app-obj-groups-plates',
	templateUrl: './obj-groups-plates.component.html',
	styleUrls: ['./obj-groups-plates.component.scss'],
	standalone: false,
	host: {
		tabindex: 'tabindex',
		'(keydown.arrowDown)': 'manage($event)',
		'(keydown.arrowUp)': 'manage($event)'
	}
})
export class ObjGroupsPlatesComponent implements AfterViewInit, OnDestroy {
	readonly groups = input<Array<ObjPlatesGroupsView>>();
	readonly showParent = input<boolean>(false);
	tabindex = '0';
	@ViewChildren(ObjPlateComponent) plates!: QueryList<ObjPlateComponent>;
	private readonly unsubscribe = new Subject<void>();
	private keyManager: FocusKeyManager<FocusableOption> | undefined;

	manage(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	ngAfterViewInit() {
		this.processKeyList();
		this.plates.changes
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.processKeyList());
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	processKeyList() {
		this.keyManager = new FocusKeyManager<FocusableOption>(this.plates).withWrap();
	}
}
