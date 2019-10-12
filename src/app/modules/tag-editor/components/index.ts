import {TagEditorAutocompleteComponent} from './autocomplete/tag-editor-autocomplete.component';
import {CellEditorBinComponent} from './cell-editor-bin/cell-editor-bin.component';
import {CellEditorBoolComponent} from './cell-editor-bool/cell-editor-bool.component';
import {CellEditorPicComponent} from './cell-editor-pic/cell-editor-pic.component';
import {CellEditorPopmComponent} from './cell-editor-popm/cell-editor-popm.component';
import {CellEditorTxtListComponent} from './cell-editor-txt-list/cell-editor-txt-list.component';
import {CellEditorTxtComponent} from './cell-editor-txt/cell-editor-txt.component';
import {CellEditorUnknownComponent} from './cell-editor-unknown/cell-editor-unknown.component';
import {CellEditorComponent} from './cell-editor/cell-editor.component';
import {DialogAlbumComponent} from './dialog-album/dialog-album.component';
import {DialogChooseColumnsComponent} from './dialog-choose-columns/dialog-choose-columns.component';
import {DialogMatchReleaseComponent} from './dialog-match-release/dialog-match-release.component';
import {DialogPicComponent} from './dialog-pic/dialog-pic.component';
import {ImageBase64Component} from './image-base64/image-base64.component';
import {TagEditorInlineAutocompleteComponent} from './inline-autocomplete/tag-editor-inline-autocomplete.component';
import {MatchReleaseComponent} from './match-release/match-release.component';
import {ScoreBoxComponent} from './score-box/score-box.component';
import {TagEditorComponent} from './tag-editor/tag-editor.component';

export const entryComponents: Array<any> = [
	DialogPicComponent,
	DialogAlbumComponent,
	DialogChooseColumnsComponent,
	DialogMatchReleaseComponent,
	CellEditorBoolComponent,
	CellEditorBinComponent,
	CellEditorPicComponent,
	CellEditorPopmComponent,
	CellEditorTxtComponent,
	CellEditorUnknownComponent,
	CellEditorTxtListComponent
];

export const components: Array<any> = [
	...entryComponents,
	CellEditorComponent,
	TagEditorInlineAutocompleteComponent,
	MatchReleaseComponent,
	TagEditorAutocompleteComponent,
	ImageBase64Component,
	ScoreBoxComponent,
	TagEditorComponent
];

export * from './autocomplete/tag-editor-autocomplete.component';
export * from './cell-editor-bin/cell-editor-bin.component';
export * from './cell-editor-bool/cell-editor-bool.component';
export * from './cell-editor-pic/cell-editor-pic.component';
export * from './cell-editor-popm/cell-editor-popm.component';
export * from './cell-editor-txt-list/cell-editor-txt-list.component';
export * from './cell-editor-txt/cell-editor-txt.component';
export * from './cell-editor-unknown/cell-editor-unknown.component';
export * from './cell-editor/cell-editor.component';
export * from './dialog-album/dialog-album.component';
export * from './dialog-choose-columns/dialog-choose-columns.component';
export * from './dialog-match-release/dialog-match-release.component';
export * from './dialog-pic/dialog-pic.component';
export * from './image-base64/image-base64.component';
export * from './inline-autocomplete/tag-editor-inline-autocomplete.component';
export * from './match-release/match-release.component';
export * from './score-box/score-box.component';
export * from './tag-editor/tag-editor.component';
