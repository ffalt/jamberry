import {FocusableOption, FocusKeyManager} from '@angular/cdk/a11y';
import {AfterViewInit, Component, HostBinding, HostListener, Input, OnDestroy, QueryList, ViewChildren} from '@angular/core';
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
    standalone: false
})
export class ObjGroupsPlatesComponent implements AfterViewInit, OnDestroy {
	@Input() groups?: Array<ObjPlatesGroupsView>;
	@Input() showParent: boolean = false;
	@ViewChildren(ObjPlateComponent) plates!: QueryList<ObjPlateComponent>;
	@HostBinding() tabindex = '0';
	protected readonly unsubscribe = new Subject<void>();
	private keyManager: FocusKeyManager<FocusableOption> | undefined;

	@HostListener('keydown.arrowUp', ['$event'])
	@HostListener('keydown.arrowDown', ['$event'])
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
