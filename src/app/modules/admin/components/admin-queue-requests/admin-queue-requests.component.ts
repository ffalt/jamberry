import {Component} from '@angular/core';
import {AdminFolderService} from '@core/services';

@Component({
	selector: 'app-admin-queue-requests',
	templateUrl: 'admin-queue-requests.component.html',
	styleUrls: ['admin-queue-requests.component.scss']
})
export class AdminQueueRequestsComponent {

	constructor(public folderService: AdminFolderService) {
	}

}
