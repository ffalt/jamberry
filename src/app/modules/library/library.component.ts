import {Component, ElementRef, inject} from '@angular/core';
import {DeferLoadService} from '@app/modules/defer-load';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	standalone: false,
	host: {
		'(scroll)': 'scrollTrack()'
	}
})

export class LibraryComponent {
	private readonly element = inject(ElementRef);
	private deferLoadService = inject(DeferLoadService);

	scrollTrack(): void {
		this.deferLoadService.notifyScroll({name: 'library', element: this.element.nativeElement});
	}
}
