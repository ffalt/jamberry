import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentCanDeactivate} from '@app/guards/pending-changes/pending-changes.guard';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TagEditorComponent} from '../../components/tag-editor/tag-editor.component';

@Component({
	selector: 'app-admin-folder-tag-editor',
	templateUrl: 'admin-folder-tag-editor.component.html',
	styleUrls: ['admin-folder-tag-editor.component.scss']
})
export class AdminFolderTagEditorComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
	id: string;
	@ViewChild(TagEditorComponent, {static: true}) child: TagEditorComponent;
	protected unsubscribe = new Subject();

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		if (this.route.parent) {
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
		return (this.child && this.child.canDeactivate());
	}

}
