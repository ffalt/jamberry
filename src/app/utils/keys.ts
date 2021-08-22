import {
	DOWN_ARROW,
	ENTER,
	ESCAPE,
	LEFT_ARROW,
	MAC_ENTER,
	MAC_META,
	MAC_WK_CMD_LEFT,
	MAC_WK_CMD_RIGHT,
	RIGHT_ARROW,
	SHIFT,
	TAB,
	UP_ARROW
} from '@angular/cdk/keycodes';

export const HOTKEYS = {
	playPause: {shortcut: 'space', name: 'Play / Pause'},
	nextTrack: {shortcut: 'alt+right', name: 'Next Track'},
	previousTrack: {shortcut: 'alt+left', name: 'Previous Track'},
	volumeUp: {shortcut: '+', name: 'Volume Up'},
	volumeDown: {shortcut: '-', name: 'Volume Down'},
	rewind: {shortcut: 'shift+left', name: 'Rewind 10 seconds'},
	forward: {shortcut: 'shift+right', name: 'Forward 10 seconds'}
};

export function isNonCharKey(event: KeyboardEvent): boolean {
	return [
		ENTER,
		TAB,
		SHIFT,
		LEFT_ARROW,
		UP_ARROW,
		RIGHT_ARROW,
		DOWN_ARROW,
		MAC_ENTER,
		MAC_WK_CMD_LEFT,
		MAC_WK_CMD_RIGHT,
		MAC_META
	].includes(event.keyCode);
}

export function isUpDownArrowKeys(event: KeyboardEvent): boolean {
	return [DOWN_ARROW, UP_ARROW].includes(event.keyCode);
}

export function isArrowKeys(event: KeyboardEvent): boolean {
	return [LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, UP_ARROW].includes(event.keyCode);
}

export function isLeftRightArrowKeys(event: KeyboardEvent): boolean {
	return [LEFT_ARROW, RIGHT_ARROW].includes(event.keyCode);
}

export function isRightArrowKey(event: KeyboardEvent): boolean {
	return RIGHT_ARROW === event.keyCode;
}

export function isLeftArrowKey(event: KeyboardEvent): boolean {
	return LEFT_ARROW === event.keyCode;
}

export function isUpArrowKey(event: KeyboardEvent): boolean {
	return UP_ARROW === event.keyCode;
}

export function isDownArrowKey(event: KeyboardEvent): boolean {
	return DOWN_ARROW === event.keyCode;
}

export function isEnterKey(event: KeyboardEvent): boolean {
	return [ENTER, MAC_ENTER].includes(event.keyCode);
}

export function isEscapeKey(event: KeyboardEvent): boolean {
	return event.keyCode === ESCAPE;
}
