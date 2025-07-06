import {Component, OnDestroy, OnInit, inject, viewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentCanDeactivate} from '@app/guards/pending-changes/pending-changes.guard';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TagEditorComponent} from '../../components/tag-editor/tag-editor.component';

@Component({
	selector: 'app-admin-folder-tag-editor',
	templateUrl: './admin-folder-tag-editor-page.component.html',
	styleUrls: ['./admin-folder-tag-editor-page.component.scss'],
	standalone: false
})
export class AdminFolderTagEditorPageComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
	id?: string;
	private readonly child = viewChild(TagEditorComponent);
	private readonly unsubscribe = new Subject<void>();
	private readonly route = inject(ActivatedRoute);

	ngOnInit(): void {
		if (this.route.parent?.parent?.params) {
			this.route.parent.parent.params
				.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
				this.id = params.id;
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
