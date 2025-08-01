import {ConnectionPositionPair, Overlay, OverlayConfig, type OverlayRef, type PositionStrategy} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
	Directive,
	ElementRef,
	type OnChanges,
	type OnDestroy,
	type OnInit,
	type SimpleChanges,
	ViewContainerRef,
	inject,
	output,
	input
} from '@angular/core';
import type {AutocompleteControl, AutocompleteDataControl, AutocompleteOption} from '@app/modules/autocomplete/autocomplete.types';
import {isArrowKeys, isDownArrowKey, isEnterKey, isEscapeKey, isLeftArrowKey, isNonCharKey, isRightArrowKey} from '@app/utils/keys';
import {
	concat,
	fromEvent,
	type Observable,
	Subject,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	takeUntil,
	tap
} from 'rxjs';
import type {AutocompleteComponent} from './autocomplete.component';

export function toFormControlValue(e: any): any {
	return e.target.value;
}

export const NO_INDEX = -1;

export interface AutocompleteSettings {
	allowEmpty: boolean;
	debounceTime: number;
}

export function overlayClickOutside(overlayRef: OverlayRef, origin: HTMLElement): Observable<MouseEvent> {
	return fromEvent<MouseEvent>(document, 'click')
		.pipe(
			filter(event => {
				const clickTarget = event.target as HTMLElement;
				const notOrigin = clickTarget !== origin; // the input
				const notOverlay = !!overlayRef && (!overlayRef.overlayElement.contains(clickTarget)); // the autocomplete
				return notOrigin && notOverlay;
			}),
			takeUntil(overlayRef.detachments())
		);
}

@Directive({
	selector: '[appAutocomplete]',
	standalone: false,
	host: {
		'(keydown)': 'handleEsc($event)',
		'(keyup)': 'onkeyup($event)'
	}
})
export class AutocompleteDirective implements OnInit, OnDestroy, OnChanges, AutocompleteControl {
	readonly appAutocomplete = input<AutocompleteComponent>();
	readonly appAutocompleteControl = input<AutocompleteDataControl>();
	readonly appAutocompleteSettings = input<Partial<AutocompleteSettings>>();
	readonly appAutocompleteNavigKeyDown = output<KeyboardEvent>();
	isVisible: boolean = false;
	activeIndex: number = NO_INDEX;
	query: string = '';
	options: Array<AutocompleteOption> = [];
	private readonly unsubscribe = new Subject<void>();
	private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);
	private readonly vcr = inject(ViewContainerRef);
	private readonly overlay = inject(Overlay);
	private readonly keydown$ = new Subject<KeyboardEvent>();
	private readonly keyup$ = new Subject<KeyboardEvent>();
	private overlayRef?: OverlayRef;
	private settings: AutocompleteSettings = {allowEmpty: false, debounceTime: 300};
	private isCreated: boolean = false;

	ngOnInit(): void {
		this.filterEnterEvent(this.keydown$);
		this.listenAndSuggest(this.keyup$);
		this.navigateSuggestionsWithArrows(this.keydown$);
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.appAutocompleteSettings) {
			this.settings = {...this.settings, ...this.appAutocompleteSettings()};
		}
	}

	selectOption(option: AutocompleteOption): void {
		this.hide();
		const appAutocompleteControl = this.appAutocompleteControl();
		if (appAutocompleteControl) {
			this.query = appAutocompleteControl.autocompleteSelectResult(option);
		}
	}

	handleEsc(event: KeyboardEvent): void {
		if (isEscapeKey(event)) {
			this.hide();
			event.preventDefault();
		}
		this.keydown$.next(event);
	}

	onkeyup(event: KeyboardEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.keyup$.next(event);
	}

	run(): void {
		if (!this.query || this.query.length === 0) {
			return;
		}
		this.request(this.query)
			.then((results: Array<AutocompleteOption>) => {
				this.activeIndex = NO_INDEX;
				this.options = results;
				this.display();
			})
			.catch(console.error);
	}

	private static resolveNextIndex(currentIndex: number, stepUp: boolean, list: Array<AutocompleteOption>): number {
		const step = stepUp ? 1 : -1;
		const topLimit = list.length - 1;
		const bottomLimit = NO_INDEX;
		const currentResultIndex = currentIndex + step;
		let resultIndex = currentResultIndex;
		if (currentResultIndex === topLimit + 1) {
			resultIndex = bottomLimit;
		}
		if (currentResultIndex === bottomLimit - 1) {
			resultIndex = topLimit;
		}
		return resultIndex;
	}

	private updateIndex(event: KeyboardEvent): void {
		this.activeIndex = AutocompleteDirective.resolveNextIndex(this.activeIndex, isDownArrowKey(event), this.options);
	}

	private listenAndSuggest(obs: Subject<KeyboardEvent>): void {
		obs
			.pipe(
				filter(event => !isNonCharKey(event)),
				map(toFormControlValue),
				debounceTime(this.settings.debounceTime),
				concat,
				distinctUntilChanged<string>(),
				tap((query: string) => {
					this.query = query;
					return query;
				}),
				filter((query: string) => this.settings.allowEmpty || query.length > 0),
				switchMap(async (query: string) => this.request(query)),
				takeUntil(this.unsubscribe)
			)
			.subscribe((results: Array<AutocompleteOption>) => {
				this.activeIndex = NO_INDEX;
				this.options = results;
				this.display();
			});
	}

	private display(): void {
		if (!this.options || this.options.length === 0) {
			this.isVisible = false;
			return;
		}
		if (!this.isCreated) {
			this.openDropdown();
		}
		this.isVisible = this.options && this.options.length > 0;
	}

	private async request(query: string): Promise<Array<AutocompleteOption>> {
		const appAutocompleteControl = this.appAutocompleteControl();
		if (appAutocompleteControl) {
			return appAutocompleteControl.autocompleteGetData(query);
		}
		return [];
	}

	private filterEnterEvent(elementObs: Subject<KeyboardEvent>): void {
		elementObs
			.pipe(
				filter(isEnterKey),
				takeUntil(this.unsubscribe)
			)
			.subscribe(() => {
				if (!this.isVisible) {
					this.query = this.host.nativeElement.value;
					const appAutocompleteControl = this.appAutocompleteControl();
					if (appAutocompleteControl) {
						appAutocompleteControl.autocompleteEnter(this.query);
					}
					return;
				}
				const result = this.options[this.activeIndex];
				this.hide();
				const appAutocompleteControl = this.appAutocompleteControl();
				if (result) {
					this.selectOption(result);
				} else if (appAutocompleteControl) {
					appAutocompleteControl.autocompleteEnter(this.query);
				}
			});
	}

	private navigateSuggestionsWithArrows(elementObs: Subject<KeyboardEvent>): void {
		elementObs
			.pipe(
				filter(isArrowKeys),
				takeUntil(this.unsubscribe)
			)
			.subscribe((e: KeyboardEvent) => {
				if (isRightArrowKey(e)) {
					this.hide();
					if (this.host.nativeElement.selectionStart === this.host.nativeElement.value.length) {
						this.appAutocompleteNavigKeyDown.emit(e);
					}
				} else if (isLeftArrowKey(e)) {
					this.hide();
					if (this.host.nativeElement.selectionEnd === 0) {
						this.appAutocompleteNavigKeyDown.emit(e);
					}
				} else if (this.isVisible) {
					this.updateIndex(e);
					this.display();
				} else {
					this.appAutocompleteNavigKeyDown.emit(e);
				}
			});
	}

	private openDropdown(): void {
		const rootTemplate = this.appAutocomplete()?.rootTemplate();
		if (!rootTemplate) {
			return;
		}
		this.overlayRef = this.createOverlay();
		const template = new TemplatePortal(rootTemplate, this.vcr, {control: this});
		this.overlayRef.attach(template);
		overlayClickOutside(this.overlayRef, this.host.nativeElement)
			.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
			this.close();
		});
		this.isCreated = true;
		this.isVisible = true;
	}

	private hide(): void {
		this.isVisible = false;
		this.activeIndex = NO_INDEX;
	}

	private close(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
			this.overlayRef = undefined;
		}
		this.isCreated = false;
	}

	private createOverlay(): OverlayRef {
		return this.overlay.create(this.getOverlayConfig());
	}

	private getOverlayConfig(): OverlayConfig {
		return new OverlayConfig({
			hasBackdrop: false,
			backdropClass: '',
			panelClass: 'ngx-autocomplete',
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy: this.getOverlayPosition()
		});
	}

	private getOverlayPosition(): PositionStrategy {
		const positions = [
			new ConnectionPositionPair(
				{originX: 'start', originY: 'bottom'},
				{overlayX: 'start', overlayY: 'top'}
			),
			new ConnectionPositionPair(
				{originX: 'start', originY: 'top'},
				{overlayX: 'start', overlayY: 'bottom'}
			)
		];
		return this.overlay.position()
			.flexibleConnectedTo(this.host)
			.withFlexibleDimensions(false)
			.withPositions(positions)
			.withPush(false);
	}
}
