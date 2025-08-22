import type { Provider } from '@angular/core';
import { ACTIVE_THEME, type ThemeOptions, THEMES } from './theme.model';

export function provideTheme(options: ThemeOptions): Array<Provider> {
	return [
		{ provide: THEMES, useValue: options.themes },
		{ provide: ACTIVE_THEME, useValue: options.active }
	];
}
