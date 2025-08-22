export const HOTKEYS = {
	playPause: { shortcut: 'space', name: 'Play / Pause' },
	nextTrack: { shortcut: 'alt+right', name: 'Next Track' },
	previousTrack: { shortcut: 'alt+left', name: 'Previous Track' },
	volumeUp: { shortcut: '+', name: 'Volume Up' },
	volumeDown: { shortcut: '-', name: 'Volume Down' },
	rewind: { shortcut: 'shift+left', name: 'Rewind 10 seconds' },
	forward: { shortcut: 'shift+right', name: 'Forward 10 seconds' }
};

export function isNonCharKey(event: KeyboardEvent): boolean {
	return [
		'Enter',
		'NumpadEnter',
		'Tab',
		'ShiftLeft',
		'ShiftRight',
		'ArrowLeft',
		'ArrowUp',
		'ArrowRight',
		'ArrowDown',
		'MetaLeft',
		'MetaRight'
	].includes(event.code);
}

export function isUpDownArrowKeys(event: KeyboardEvent): boolean {
	return ['ArrowDown', 'ArrowUp'].includes(event.code);
}

export function isArrowKeys(event: KeyboardEvent): boolean {
	return ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(event.code);
}

export function isLeftRightArrowKeys(event: KeyboardEvent): boolean {
	return ['ArrowLeft', 'ArrowRight'].includes(event.code);
}

export function isRightArrowKey(event: KeyboardEvent): boolean {
	return event.code === 'ArrowRight';
}

export function isLeftArrowKey(event: KeyboardEvent): boolean {
	return event.code === 'ArrowLeft';
}

export function isUpArrowKey(event: KeyboardEvent): boolean {
	return event.code === 'ArrowUp';
}

export function isDownArrowKey(event: KeyboardEvent): boolean {
	return event.code === 'ArrowDown';
}

export function isEnterKey(event: KeyboardEvent): boolean {
	return ['Enter', 'NumpadEnter'].includes(event.code);
}

export function isEscapeKey(event: KeyboardEvent): boolean {
	return event.code === 'Escape';
}
