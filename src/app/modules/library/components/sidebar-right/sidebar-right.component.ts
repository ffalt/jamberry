import {Component} from '@angular/core';

@Component({
    selector: 'app-sidebar-right',
    templateUrl: './sidebar-right.component.html',
    styleUrls: ['./sidebar-right.component.scss'],
    standalone: false
})
export class SidebarRightComponent {
	currentTab: string = 'queue';
}
