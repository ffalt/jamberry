import {FocusableOption, FocusKeyManager} from '@angular/cdk/a11y';
import {AfterViewInit, Component, HostBinding, HostListener, Input, OnDestroy, viewChildren} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
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
	@HostBinding() tabindex = '0';
	private readonly plates = viewChildren(ObjPlateComponent);
	private readonly unsubscribe = new Subject<void>();
	private keyManager: FocusKeyManager<FocusableOption> | undefined;

	@HostListener('keydown.arrowUp', ['$event'])
	@HostListener('keydown.arrowDown', ['$event'])
	manage(event: KeyboardEvent) {
		this.keyManager?.onKeydown(event);
	}

	ngAfterViewInit() {
		this.processKeyList();
		toObservable(this.plates)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.processKeyList());
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	processKeyList() {
		this.keyManager = new FocusKeyManager<FocusableOption>(this.plates()).withWrap();
	}
}
