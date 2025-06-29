import { Component, inject } from '@angular/core';
import {JamService} from '@jam';

@Component({
    selector: 'app-page-start',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss'],
    standalone: false
})
export class StartPageComponent {
	readonly jam = inject(JamService);
}
