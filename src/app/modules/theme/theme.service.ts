import {DOCUMENT} from '@angular/common';
import {EventEmitter, Inject, Injectable} from '@angular/core';
import {ACTIVE_THEME, Theme, THEMES} from './theme.model';

@Injectable()
export class ThemeService {
	themeChange = new EventEmitter<Theme>();

	constructor(@Inject(THEMES) public themes: Array<Theme>, @Inject(ACTIVE_THEME) public theme: string, @Inject(DOCUMENT) private document: Document) {
	}

	getTheme(name: string): Theme {
		const theme = this.themes.find(t => t.name === name);
		if (!theme) {
			throw new Error(`Theme not found: '${name}'`);
		}
		return theme;
	}

	getActiveTheme(): Theme {
		return this.getTheme(this.theme);
	}

	getProperty(propName: string): string {
		return this.getActiveTheme().properties[propName];
	}

	setTheme(name: string): void {
		this.theme = name;
		const theme = this.getActiveTheme();
		this.updateDom(theme);
		this.themeChange.emit(theme);
	}

	registerTheme(theme: Theme): void {
		this.themes.push(theme);
	}

	private updateDom(theme: Theme): void {
		// project properties onto the element
		for (const key in theme.properties) {
			if (theme.properties.hasOwnProperty(key)) {
				this.document.body.style.setProperty(key, theme.properties[key]);
			}
		}
		// remove old theme
		for (const t of this.themes) {
			this.document.body.classList.remove(`${t.name}-theme`);
		}
		// alias element with theme name
		this.document.body.classList.add(`${theme.name}-theme`);
	}

	// updateTheme(name: string, properties: { [key: string]: string; }) {
	// 	const theme = this.getTheme(name);
	// 	theme.properties = {
	// 		...theme.properties,
	// 		...properties
	// 	};
	//
	// 	if (name === this.theme) {
	// 		this.themeChange.emit(theme);
	// 	}
	// }

}
