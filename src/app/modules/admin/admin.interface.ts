import {Jam, JamParameters, RootScanStrategy} from '@jam';

export interface RootEdit {
	root?: Jam.Root;
	name: string;
	path: string;
	strategy: RootScanStrategy;
}

export interface UserEdit {
	user?: Jam.User;
	edit: JamParameters.UserUpdate;
}

export interface FolderEdit {
	folder?: Jam.Folder;
	name: string;
}
