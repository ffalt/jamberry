import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-background-text-list',
    templateUrl: './background-text-list.component.html',
    styleUrls: ['./background-text-list.component.scss'],
    standalone: false
})
export class BackgroundTextListComponent {
	@Input() list?: Array<any> | undefined;
	@Input() name?: string;
}
