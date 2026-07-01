import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { IconSpinComponent } from '@core/components/icons/icon-spin.component';

@Component({
	imports: [IconSpinComponent],
	selector: 'app-admin-queue-requests',
	templateUrl: './admin-queue-requests.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['./admin-queue-requests.component.scss']
})
export class AdminQueueRequestsComponent {
	readonly folderService = inject(AdminFolderService);
}
