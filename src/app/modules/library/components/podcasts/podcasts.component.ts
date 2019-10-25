import {Component, Input} from '@angular/core';
import {Jam, PodcastStatus} from '@jam';

@Component({
	selector: 'app-podcasts',
	templateUrl: './podcasts.component.html',
	styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent {
	PodcastStatus = PodcastStatus;
	@Input() podcasts: Array<Jam.Podcast>;
}
