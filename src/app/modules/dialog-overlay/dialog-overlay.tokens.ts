import {InjectionToken} from '@angular/core';
import {DialogOverlayDialogConfig} from './dialog-overlay.types';

export const DIALOG_OVERLAY_DIALOG_CONFIG = new InjectionToken<DialogOverlayDialogConfig<any>>('DIALOG_OVERLAY_DIALOG_CONFIG');
