import type { Route } from '@angular/router';
import type { Type } from '@angular/core';

export interface LinkRoute extends Route {
	data?: {
		link?: string;
		name?: string;
		icon?: Type<unknown>;
	};
	children?: Array<LinkRoute>;
}
