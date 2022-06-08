/* eslint-disable @typescript-eslint/naming-convention */
import {Theme} from './theme.model';

export const blackTheme: Theme = {
	name: 'black',
	properties: {

		'--background': '#000',
		'--background-hover': '#1c1c1c',
		'--background-active': '#32332e',
		'--background-border': '#242424',
		'--background-box': '#0c0c0c',
		'--background-transparent': 'rgba(18, 18, 18, .7)',
		'--on-background': '#C8C8C8',
		'--on-background-active': '#fff',
		'--on-background-hover': '#fff',

		'--control': '#070707',
		'--control-box': '#1e1e1e',
		'--control-hover': '#575757',
		'--control-active': '#58594f',
		'--control-box-shadow': '0 -1px 0 rgba(0, 0, 0, 0.15) inset',
		'--control-box-border': '#AAAAAA',
		'--control-border': '#1a1a1a',
		'--on-control': '#C8C8C8',
		'--on-control-hover': '#fff',
		'--on-control-active': '#fff',
		'--on-control-ambient': '#AAAAAA',
		'--on-control-ambient-hover': '#fff',
		'--on-control-ambient-disabled': '#575757',

		'--input': '#fff',
		'--input-border': '#fff',
		'--on-input': '#000',
		'--on-input-hover': '#C8C8C8',

		'--primary': '#008300',
		'--on-primary': '#fff',

		'--secondary': '#4688d7',

		'--accent': '#FF6347',
		'--on-accent': '#fff',

		'--scrollbar': '#858585',
		'--dialog-backdrop': 'rgba(0, 0, 0, 0.6)'
	}
};
