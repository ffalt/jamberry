import {InjectionToken} from '@angular/core';

// tslint:disable-next-line:interface-name no-empty-interface
export interface IHotkeyOptions {
}

export const HotkeysOptions = new InjectionToken<IHotkeyOptions>('HotkeyOptions');
