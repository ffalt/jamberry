import { Component, inject, type OnDestroy, type OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import type { ComponentCanDeactivate } from '@core/guards/pending-changes/pending-changes.guard';
import { Subject, takeUntil } from 'rxjs';
import { TagEditorComponent } from '../tag-editor/tag-editor.component';

@Component({
	selector: 'app-admin-folder-tag-editor',
	templateUrl: './admin-folder-tag-editor-page.component.html',
	styleUrls: ['./admin-folder-tag-editor-page.component.scss'],
	imports: [CommonModule, TagEditorComponent]
})
export class AdminFolderTagEditorPageComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
	id?: string;
	private readonly child = viewChild(TagEditorComponent);
	private readonly unsubscribe = new Subject<void>();
	private readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		if (this.route.parent?.params) {
			this.route.parent.paramMap
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(paramMap => {
					this.id = paramMap.get('id') ?? undefined;
				});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	canDeactivate(): boolean {
		const child = this.child();
		return !!(child?.canDeactivate());
	}
}
