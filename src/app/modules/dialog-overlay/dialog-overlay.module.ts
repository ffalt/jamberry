import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogOverlayComponent } from './dialog-overlay.component';
import { DialogOverlayService } from './dialog-overlay.service';

@NgModule({
	imports: [CommonModule, OverlayModule, DialogOverlayComponent],
	exports: [DialogOverlayComponent],
	providers: [DialogOverlayService]
})
export class DialogOverlayModule {
}
