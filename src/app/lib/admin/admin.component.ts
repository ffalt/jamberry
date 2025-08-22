import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminQueueRequestsComponent } from './components/admin-queue-requests/admin-queue-requests.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { SplitterComponent } from '@core/components/splitter/splitter.component';
import { AdminFolderService } from '@core/services/admin-folder/admin-folder.service';
import { AdminRootService } from '@core/services/admin-root/admin-root.service';
import { AdminUserService } from '@core/services/admin-user/admin-user.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	imports: [CommonModule, RouterModule, AdminQueueRequestsComponent, AdminSidebarComponent, SplitterComponent],
	providers: [AdminFolderService, AdminRootService, AdminUserService]
})

export class AdminComponent {
}
