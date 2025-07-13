import {InjectionToken} from '@angular/core';
import type {DialogOverlayDialogConfig} from './dialog-overlay.types';

export const DIALOG_OVERLAY_DIALOG_CONFIG = new InjectionToken<DialogOverlayDialogConfig<any>>('DIALOG_OVERLAY_DIALOG_CONFIG');
