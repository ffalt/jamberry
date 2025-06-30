import {Theme} from './theme.model';

/*
Catppuccin Macchiato Theme
https://github.com/catppuccin
*/

const macchiato = {
	'rosewater': '#f4dbd6',
	'flamingo': '#f0c6c6',
	'pink': '#f5bde6',
	'mauve': '#c6a0f6',
	'red': '#ed8796',
	'maroon': '#ee99a0',
	'peach': '#f5a97f',
	'yellow': '#eed49f',
	'green': '#a6da95',
	'teal': '#8bd5ca',
	'sky': '#91d7e3',
	'sapphire': '#7dc4e4',
	'blue': '#8aadf4',
	'lavender': '#b7bdf8',
	'text': '#cad3f5',
	'subtext1': '#b8c0e0',
	'subtext0': '#a5adcb',
	'overlay2': '#939ab7',
	'overlay1': '#8087a2',
	'overlay0': '#6e738d',
	'surface2': '#5b6078',
	'surface1': '#494d64',
	'surface0': '#363a4f',
	'base': '#24273a',
	'mantle': '#1e2030',
	'crust': '#181926'
};
export const catppuccinTheme: Theme = {
	name: 'catppuccin',
	properties: {
		'--background': macchiato.mantle,
		'--background-border': macchiato.surface0,
		'--background-hover': macchiato.mantle,
		'--background-active': macchiato.lavender,
		'--background-view-header': macchiato.crust,
		'--background-sidebar': macchiato.base,
		'--background-box': macchiato.base,
		'--background-transparent': 'rgba(0,0,0,0.5)',
		'--on-background': macchiato.text,
		'--on-background-highlight': '#fff',
		'--on-background-active': macchiato.surface0,
		'--on-background-hover': macchiato.green,

		'--control': macchiato.base,
		'--control-box': macchiato.surface2,
		'--control-hover': macchiato.crust,
		'--control-active': macchiato.base,
		'--control-box-shadow': '0 -1px 0 rgba(0, 0, 0, 0.15) inset',
		'--control-box-border': macchiato.surface0,
		'--control-border': macchiato.surface0,
		'--control-border-hover': macchiato.mauve,
		'--on-control': macchiato.text,
		'--on-control-active': macchiato.sky,
		'--on-control-hover': macchiato.blue,
		'--on-control-ambient': macchiato.yellow,
		'--on-control-ambient-hover': macchiato.peach,
		'--on-control-ambient-disabled': macchiato.subtext0,

		'--input': '#fff',
		'--input-border': '#a2a2a2',
		'--on-input': '#000',
		'--on-input-hover': '#C8C8C8',

		'--primary': macchiato.green,
		'--on-primary': macchiato.surface1,
		'--primary-hover': macchiato.teal,
		'--on-primary-hover': macchiato.surface0,

		'--secondary': '#4688d7',

		'--accent': '#FF6347',
		'--on-accent': '#fff',

		'--scrollbar': '#575757',
		'--dialog-backdrop': ' rgba(255, 255, 255, 0.6)'
	}
};
