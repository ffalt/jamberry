import {TagEditorAutocompleteComponent} from './autocomplete/tag-editor-autocomplete.component';
import {CellEditorDisplayComponent} from './cell-editor-display/cell-editor-display.component';
import {CellEditorTxtComponent} from './cell-editor-txt/cell-editor-txt.component';
import {CellEditorComponent} from './cell-editor/cell-editor.component';
import {ColumnToolComponent} from './column-tool/column-tool.component';
import {DialogAlbumComponent} from './dialog-album/dialog-album.component';
import {DialogChooseColumnsComponent} from './dialog-choose-columns/dialog-choose-columns.component';
import {DialogMatchReleaseComponent} from './dialog-match-release/dialog-match-release.component';
import {DialogTagImageComponent} from './dialog-tag-image/dialog-tag-image.component';
import {DialogTagLyricsComponent} from './dialog-tag-lyrics/dialog-tag-lyrics.component';
import {DialogTagTextlistComponent} from './dialog-tag-textlist/dialog-tag-textlist.component';
import {ImageBase64Component} from './image-base64/image-base64.component';
import {TagEditorInlineAutocompleteComponent} from './inline-autocomplete/tag-editor-inline-autocomplete.component';
import {MatchReleaseComponent} from './match-release/match-release.component';
import {ScoreBoxComponent} from './score-box/score-box.component';
import {TagEditorComponent} from './tag-editor/tag-editor.component';

export const entryComponents: Array<any> = [
	DialogTagImageComponent,
	DialogAlbumComponent,
	DialogChooseColumnsComponent,
	DialogMatchReleaseComponent,
	DialogTagLyricsComponent,
	DialogTagTextlistComponent,
	CellEditorTxtComponent
];

export const components: Array<any> = [
	...entryComponents,
	CellEditorComponent,
	CellEditorDisplayComponent,
	ColumnToolComponent,
	TagEditorInlineAutocompleteComponent,
	MatchReleaseComponent,
	TagEditorAutocompleteComponent,
	ImageBase64Component,
	ScoreBoxComponent,
	TagEditorComponent
];

export * from './cell-editor-display/cell-editor-display.component';
export * from './dialog-tag-textlist/dialog-tag-textlist.component';
export * from './autocomplete/tag-editor-autocomplete.component';
export * from './cell-editor-txt/cell-editor-txt.component';
export * from './cell-editor/cell-editor.component';
export * from './dialog-album/dialog-album.component';
export * from './dialog-choose-columns/dialog-choose-columns.component';
export * from './dialog-match-release/dialog-match-release.component';
export * from './dialog-tag-image/dialog-tag-image.component';
export * from './image-base64/image-base64.component';
export * from './inline-autocomplete/tag-editor-inline-autocomplete.component';
export * from './match-release/match-release.component';
export * from './score-box/score-box.component';
export * from './tag-editor/tag-editor.component';
export * from './column-tool/column-tool.component';
export * from './dialog-tag-lyrics/dialog-tag-lyrics.component';
