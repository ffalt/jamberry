import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumTypeUrlNamesKeys, JamAlbumType, JamAlbumTypes, JamLists} from '@app/utils/jam-lists';
import {HeaderTab} from '@shared/components';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-albums-page-by-type',
	templateUrl: './albums-page-by-type.component.html',
	styleUrls: ['./albums-page-by-type.component.scss']
})
export class AlbumsPageByTypeComponent implements OnInit, OnDestroy {
	typeInfo: JamAlbumType;
	tabs: Array<HeaderTab>;
	protected unsubscribe = new Subject();

	constructor(protected route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.url
			.pipe(takeUntil(this.unsubscribe)).subscribe(val => {
			const type = val.length > 0 ? val[0].path : undefined;
			const albumType = AlbumTypeUrlNamesKeys[type];
			this.typeInfo = JamAlbumTypes.find(t => t.id === albumType);
			this.tabs = this.typeInfo ? [
				{label: 'Index', link: {route: '/library/' + this.typeInfo.link, exact: true}},
				...JamLists.map(list => (
					{label: list.text, link: {route: `/library/${this.typeInfo.link}/${list.link}`}}
				))
			] : [];
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
