import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogOverlayModule} from '@app/modules/dialog-overlay';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';

export const TEST_SHARED_MODULE_IMPORTS = [
	CommonModule, FormsModule, OverlayModule, DialogOverlayModule, RouterTestingModule, ToastModule.forRoot(), TEST_JAM_MODULE
];

export const TEST_SHARED_MODULE_PROVIDERS = [];
