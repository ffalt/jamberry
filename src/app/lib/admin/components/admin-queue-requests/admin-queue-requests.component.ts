import { Component, inject } from '@angular/core';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';

@Component({
	selector: 'app-admin-queue-requests',
	templateUrl: './admin-queue-requests.component.html',
	styleUrls: ['./admin-queue-requests.component.scss']
})
export class AdminQueueRequestsComponent {
	readonly folderService = inject(AdminFolderService);
}
