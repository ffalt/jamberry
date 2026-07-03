import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TagEditorComponent } from './tag-editor.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TagEditorComponent', () => {
	let component: TagEditorComponent;
	let fixture: ComponentFixture<TagEditorComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule(
			{
				imports: [...TEST_IMPORTS, TagEditorComponent],
				providers: [...TEST_PROVIDERS],
				teardown: { destroyAfterEach: false }
			}
		).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TagEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
