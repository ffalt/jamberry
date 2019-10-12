import {Component} from '@angular/core';
import {FolderService} from '../../services/folder.service';

@Component({
	selector: 'app-admin-queue-requests',
	templateUrl: 'admin-queue-requests.component.html',
	styleUrls: ['admin-queue-requests.component.scss']
})
export class AdminQueueRequestsComponent {

	constructor(public folderService: FolderService) {
	}

}
