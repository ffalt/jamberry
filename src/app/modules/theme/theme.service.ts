import {EventEmitter, Injectable, DOCUMENT, inject} from '@angular/core';
import {ACTIVE_THEME, Theme, THEMES} from './theme.model';

@Injectable()
export class ThemeService {
	themes = inject<Array<Theme>>(THEMES);
	theme = inject<string>(ACTIVE_THEME);
	readonly themeChange = new EventEmitter<Theme>();
	private document = inject<Document>(DOCUMENT);

	getTheme(name?: string): Theme {
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
		for (const key of Object.keys(theme.properties)) {
			// if (theme.properties.hasOwnProperty(key)) {
			this.document.body.style.setProperty(key, theme.properties[key]);
			// }
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
