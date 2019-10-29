import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-media-plate',
	templateUrl: './media-plate.component.html',
	styleUrls: ['./media-plate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPlateComponent {
	@Input() base: Jam.Base;
	@Input() mediaYear: string;
	@Input() mediaName: string;
	@Input() mediaType: string;
	@Input() mediaParent: string;
	@Output() readonly contextMenuRequest = new EventEmitter<MouseEvent>();
	@Output() readonly playRequest = new EventEmitter<MouseEvent>();
	@Output() readonly goToRequest = new EventEmitter<void>();
	@Output() readonly goToParentRequest = new EventEmitter<void>();
	@Output() readonly toggleFavRequest = new EventEmitter<void>();

	@HostListener('contextmenu', ['$event'])
	contextmenuEvent(event: MouseEvent): void {
		this.contextMenuRequest.emit(event);
	}

	goTo(): void {
		this.goToRequest.emit();
	}

	goToParent(): void {
		this.goToParentRequest.emit();
	}

	play(): void {
		this.playRequest.emit();
	}

	toggleFav(): void {
		this.toggleFavRequest.emit();
	}
}
