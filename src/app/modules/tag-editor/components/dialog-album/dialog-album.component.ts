import {Component} from '@angular/core';
import {DialogOverlay, DialogOverlayDialogConfig, DialogOverlayRef} from '@app/modules/dialog-overlay';
import {Jam} from '@jam';

export interface AlbumValuesEdit {
	tracks: Array<Jam.Track>;
}

interface AlbumValueEdit {
	value: string;
	title: string;
	enabled: boolean;
	autocomplete: Array<string>;

	getList?(): Array<string>;
}

@Component({
	selector: 'app-dialog-album',
	templateUrl: './dialog-album.component.html',
	styleUrls: ['./dialog-album.component.scss']
})
export class DialogAlbumComponent implements DialogOverlay<AlbumValuesEdit> {
	data?: AlbumValuesEdit;
	edit: {
		[name: string]: AlbumValueEdit;
		title: AlbumValueEdit;
		artist: AlbumValueEdit;
		albumArtist: AlbumValueEdit;
		originalReleaseTime: AlbumValueEdit;
		recordingTime: AlbumValueEdit;
		genre: AlbumValueEdit;
		part: AlbumValueEdit;
		status: AlbumValueEdit;
		type: AlbumValueEdit;
	} = {
		title: {title: 'Album Title', value: '', enabled: true, autocomplete: []},
		artist: {title: 'Artist', value: '', enabled: false, autocomplete: []},
		albumArtist: {title: 'Album Artist', value: '', enabled: true, autocomplete: []},
		originalReleaseTime: {title: 'Original Release Time', value: '', enabled: true, autocomplete: []},
		recordingTime: {title: 'Recording Time', value: '', enabled: true, autocomplete: []},
		genre: {title: 'Genre', value: '', enabled: true, autocomplete: []},
		part: {title: 'Part of Set', value: '', enabled: true, autocomplete: []},
		status: {title: 'Album Status', value: '', enabled: true, autocomplete: []},
		type: {title: 'Album Type', value: '', enabled: true, autocomplete: []}
	};
	edits: Array<AlbumValueEdit> = Object.keys(this.edit).map(key => {
		const o = this.edit[key];
		o.getList = (): Array<string> => this.getAutoCompleteList(o);
		return o;
	});

	getAutoCompleteList(edit: AlbumValueEdit): Array<string> {
		return edit.autocomplete;
	}

	dialogInit(reference: DialogOverlayRef, options: Partial<DialogOverlayDialogConfig<AlbumValuesEdit>>): void {
		this.data = options.data;
	}
}
