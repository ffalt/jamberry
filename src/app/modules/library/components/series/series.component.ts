import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-series',
	templateUrl: './series.component.html',
	styleUrls: ['./series.component.scss']
})
export class SeriesComponent {
	@Input() series: Array<Jam.Series>;
	@Input() viewTypeList: boolean = false;
}
