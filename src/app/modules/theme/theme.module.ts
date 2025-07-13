import {CommonModule} from '@angular/common';
import {type ModuleWithProviders, NgModule} from '@angular/core';
import {ACTIVE_THEME, type Theme, THEMES} from './theme.model';
import {ThemeService} from './theme.service';

export interface ThemeOptions {
	themes: Array<Theme>;
	active?: string;
}

@NgModule({
	imports: [CommonModule],
	providers: [ThemeService],
	declarations: [],
	exports: []
})

export class ThemeModule {
	static forRoot(options: ThemeOptions): ModuleWithProviders<ThemeModule> {
		return {
			ngModule: ThemeModule,
			providers: [
				{
					provide: THEMES,
					useValue: options.themes
				},
				{
					provide: ACTIVE_THEME,
					useValue: options.active
				}
			]
		};
	}
}
