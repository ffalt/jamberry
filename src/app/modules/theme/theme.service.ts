import {EventEmitter, Injectable, DOCUMENT, inject} from '@angular/core';
import {ACTIVE_THEME, Theme, THEMES} from './theme.model';

@Injectable()
export class ThemeService {
	theme = inject<string>(ACTIVE_THEME);
	readonly themes = inject<Array<Theme>>(THEMES);
	readonly themeChange = new EventEmitter<Theme>();
	private readonly document = inject<Document>(DOCUMENT);

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

	setTheme(name: string): void {
		this.theme = name;
		const theme = this.getActiveTheme();
		this.updateDom(theme);
		this.themeChange.emit(theme);
	}

	private updateDom(theme: Theme): void {
		// project properties onto the element
		for (const key of Object.keys(theme.properties)) {
			this.document.body.style.setProperty(key, theme.properties[key]);
		}
		// remove old theme
		for (const t of this.themes) {
			this.document.body.classList.remove(`${t.name}-theme`);
		}
		// alias element with theme name
		this.document.body.classList.add(`${theme.name}-theme`);
	}
}
