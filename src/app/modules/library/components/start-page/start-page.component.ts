import {Component} from '@angular/core';
import {JamService} from '@jam';

@Component({
    selector: 'app-page-start',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss'],
    standalone: false
})
export class StartPageComponent {

	constructor(public jam: JamService) {
	}

}
