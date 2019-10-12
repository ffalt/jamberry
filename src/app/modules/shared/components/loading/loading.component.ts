import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: 'loading.component.html',
	styleUrls: ['loading.component.scss']
})
export class LoadingComponent implements OnInit {
	@Input() time: number = 2000;
	show: boolean = false;

	ngOnInit(): void {
		setTimeout(() => {
			this.show = true;
		}, this.time);
	}

}
