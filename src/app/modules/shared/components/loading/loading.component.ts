import {Component, OnInit, input} from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
	standalone: false
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
