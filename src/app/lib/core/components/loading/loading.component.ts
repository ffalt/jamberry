import { Component, input, type OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
	readonly time = input<number>(2000);
	show: boolean = false;

	ngOnInit(): void {
		setTimeout(() => {
			this.show = true;
		}, this.time());
	}
}
