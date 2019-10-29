import {Component, Input} from '@angular/core';
import {Jam} from '@jam';

@Component({
	selector: 'app-podcasts',
	templateUrl: './podcasts.component.html',
	styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent {
	@Input() podcasts: Array<Jam.Podcast>;
}
