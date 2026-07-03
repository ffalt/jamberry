import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { ComponentCanDeactivate } from '@core/guards/pending-changes/pending-changes.guard';
import { TagEditorComponent } from '../tag-editor/tag-editor.component';

@Component({
	selector: 'app-admin-folder-tag-editor',
	templateUrl: './admin-folder-tag-editor-page.component.html',
	styleUrls: ['./admin-folder-tag-editor-page.component.scss'],
	imports: [TagEditorComponent]
})
export class AdminFolderTagEditorPageComponent implements ComponentCanDeactivate {
	readonly id = signal<string | undefined>(undefined);
	private readonly child = viewChild(TagEditorComponent);
	private readonly lifeRef = inject(DestroyRef);
	private readonly route = inject(ActivatedRoute);

	constructor() {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.lifeRef))
			.subscribe(paramMap => {
				this.id.set(paramMap.get('id') ?? undefined);
			});
	}

	canDeactivate(): boolean {
		return !!(this.child()?.canDeactivate());
	}
}
