import type {Theme} from './theme.model';

export const lightTheme: Theme = {
	name: 'light',
	properties: {
		'--background': '#f6f7fb',
		'--background-border': '#AAAAAA',
		'--background-hover': '#eaebef',
		'--background-active': '#dfe2d6',
		'--background-view-header': '#eaeaee',
		'--background-sidebar': '#eff0f4',
		'--background-box': '#ecedf1',
		'--background-transparent': 'rgba(255,255,255,0.9)',
		'--on-background': '#1d1d1d',
		'--on-background-active': '#000',
		'--on-background-highlight': '#000',
		'--on-background-hover': '#000',

		'--control': '#eff0f4',
		'--control-box': '#4a4a4a',
		'--control-hover': '#ededed',
		'--control-active': '#a8a8a8',
		'--control-box-shadow': '0 -1px 0 rgba(0, 0, 0, 0.15) inset',
		'--control-box-border': '#AAAAAA',
		'--control-border': '#AAAAAA',
		'--control-border-hover': '#252525',
		'--on-control': '#272727',
		'--on-control-active': '#0e1f2d',
		'--on-control-hover': '#3f3f3f',
		'--on-control-ambient': '#4c4c4c',
		'--on-control-ambient-hover': '#575757',
		'--on-control-ambient-disabled': '#a2a2a2',

		'--input': '#fff',
		'--input-border': '#a2a2a2',
		'--on-input': '#000',
		'--on-input-hover': '#C8C8C8',

		'--primary': '#008300',
		'--on-primary': '#fff',
		'--primary-hover': '#006400',
		'--on-primary-hover': '#ffeda5',

		'--secondary': '#4688d7',

		'--accent': '#FF6347',
		'--on-accent': '#fff',

		'--scrollbar': '#575757',
		'--dialog-backdrop': ' rgba(255, 255, 255, 0.6)'
	}
};
