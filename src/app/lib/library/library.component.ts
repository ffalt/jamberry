import { Component, ElementRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { SidebarLibraryComponent } from './components/sidebar/sidebar-library.component';
import { DeferLoadService } from '@modules/defer-load/defer-load.service';
import { SplitterComponent } from '@core/components/splitter/splitter.component';
import { LibraryService } from './services/library/library.service';
import { IndexService } from '@core/services/index/index.service';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	host: {
		'(scroll)': 'scrollTrack()'
	},
	imports: [RouterModule, SidebarLibraryComponent, SidebarRightComponent, SplitterComponent],
	providers: [LibraryService, IndexService]
})

export class LibraryComponent {
	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly deferLoadService = inject(DeferLoadService);

	scrollTrack(): void {
		this.deferLoadService.notifyScroll({ name: 'library', element: this.element.nativeElement });
	}
}
