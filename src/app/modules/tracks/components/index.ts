import {ContextMenuTrackComponent} from './context-menu-track/context-menu-track.component';
import {TracksLoaderByTypeComponent} from './tracks-loader-by-type/tracks-loader-by-type.component';
import {TracksLoaderComponent} from './tracks-loader/tracks-loader.component';
import {TracksComponent} from './tracks/tracks.component';

export const components: Array<any> = [
	ContextMenuTrackComponent,
	TracksComponent,
	TracksLoaderComponent,
	TracksLoaderByTypeComponent
];

export * from './tracks-loader-by-type/tracks-loader-by-type.component';
export * from './tracks-loader/tracks-loader.component';
export * from './tracks/tracks.component';
export * from './context-menu-track/context-menu-track.component';
