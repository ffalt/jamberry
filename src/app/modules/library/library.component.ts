import {Component, ElementRef, HostListener} from '@angular/core';
import {DeferLoadService} from '@app/modules/defer-load';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss']
})

export class LibraryComponent {
	constructor(private element: ElementRef, private deferLoadService: DeferLoadService) {
	}

	@HostListener('scroll', ['$event'])
	scrollTrack(event: Event): void {
		this.deferLoadService.notifyScroll({name: 'library', element: this.element.nativeElement});
	}

}
