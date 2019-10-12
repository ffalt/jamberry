import {FolderService} from './folder.service';
import {RootService} from './root.service';
import {UiStateService} from './ui-state.service';
import {UserService} from './user.service';

export const services: Array<any> = [
	RootService,
	UserService,
	FolderService,
	UiStateService
];

export * from './root.service';
export * from './user.service';
export * from './folder.service';
export * from './ui-state.service';
