import type {ModuleWithProviders} from '@angular/core';
import {RouterModule, type Routes} from '@angular/router';
import {AdminFolderTagEditorPageComponent} from './components/tag-editor-page/admin-folder-tag-editor-page.component';

export const routes: Routes = [
	{
		path: '', component: AdminFolderTagEditorPageComponent
	}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
