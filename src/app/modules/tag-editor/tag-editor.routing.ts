import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminFolderTagEditorComponent} from './pages/tag-editor/admin-folder-tag-editor.component';

export const routes: Routes = [
	{
		path: '', component: AdminFolderTagEditorComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
