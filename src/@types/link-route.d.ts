import { Route } from '@angular/router';

export interface LinkRoute extends Route {
	data?: {
		link?: string;
		name?: string;
		icon?: string;
	};
	children?: Array<LinkRoute>;
}
