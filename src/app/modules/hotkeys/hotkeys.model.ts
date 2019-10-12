export interface ExtendedKeyboardEvent extends KeyboardEvent {
	returnValue: boolean; // IE returnValue
}

export class Hotkey {

	get formatted(): Array<string> {
		if (!this._formatted) {
			const combo: string = this.combo[0];
			const sequence: Array<string> = combo.split(/[\s]/);
			for (let i = 0; i < sequence.length; i++) {
				sequence[i] = Hotkey.symbolize(sequence[i]);
			}
			this._formatted = sequence;
		}
		return this._formatted;
	}

	_formatted: Array<string>;

	/**
	 * Creates a new Hotkey for Mousetrap binding
	 *
	 * @param    combo       mousetrap key binding
	 * @param    description description for the help menu
	 * @param    callback    method to call when key is pressed
	 * @param    action      the type of event to listen for (for mousetrap)
	 * @param    allowIn     an array of tag names to allow this combo in ('INPUT', 'SELECT', and/or 'TEXTAREA')
	 * @param    persistent  if true, the binding is preserved upon route changes
	 */
	constructor(
		public combo: string | Array<string>, public callback: (event: KeyboardEvent, combo: string) => ExtendedKeyboardEvent | boolean,
		public allowIn?: Array<string>, public description?: string, public action?: string,
		public persistent?: boolean
	) {
		this.combo = (Array.isArray(combo) ? combo : [combo]);
		this.allowIn = allowIn || [];
		this.description = description || '';
	}

	static symbolize(combo: string): string {
		const map: any = {
			command: '\u2318',       // ⌘
			shift: '\u21E7',         // ⇧
			left: '\u2190',          // ←
			right: '\u2192',         // →
			up: '\u2191',            // ↑
			down: '\u2193',          // ↓
			return: '\u23CE',      // ⏎
			backspace: '\u232B'      // ⌫
		};
		const comboSplit: Array<string> = combo.split('+');

		for (let i = 0; i < comboSplit.length; i++) {
			// try to resolve command / ctrl based on OS:
			if (comboSplit[i] === 'mod') {
				comboSplit[i] = (window.navigator && window.navigator.platform.includes('Mac')) ? 'command' : 'ctrl';
			}
			comboSplit[i] = map[comboSplit[i]] || comboSplit[i];
		}

		return comboSplit.join(' + ');
	}
}
