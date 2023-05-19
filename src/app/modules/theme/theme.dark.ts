/* eslint-disable @typescript-eslint/naming-convention */

import {Theme} from './theme.model';

export const darkTheme: Theme = {
	name: 'dark',
	properties: {

		'--background': '#0f1217',
		'--background-hover': '#151b21',
		'--background-active': '#151b21',
		'--background-view-header': '#0f1217',
		'--background-sidebar': '#151b21',
		'--background-border': '#262b2f',
		'--background-box': '#151b21',
		'--background-transparent': 'rgba(17,22,26,0.8)',
		'--on-background': '#C8C8C8',
		'--on-background-active': '#fff',
		'--on-background-highlight': '#fff',
		'--on-background-hover': '#fff',

		'--control': '#151b21',
		'--control-box': '#1e1e1e',
		'--control-hover': '#575757',
		'--control-active': '#58594f',
		'--control-box-shadow': '0 -1px 0 rgba(0, 0, 0, 0.15) inset',
		'--control-box-border': '#696969',
		'--control-border': '#262626',
		'--control-border-hover': '#383838',
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
		'--primary-hover': '#006400',
		'--on-primary-hover': '#ffeda5',

		'--secondary': '#4688d7',

		'--accent': '#FF6347',
		'--on-accent': '#fff',

		'--scrollbar': '#858585',
		'--dialog-backdrop': 'rgba(0, 0, 0, 0.6)'
	}
};
