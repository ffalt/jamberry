import { Component } from '@angular/core';
import { EpisodesLoaderComponent } from '../episodes-loader/episodes-loader.component';

@Component({
	selector: 'app-podcasts-page-latest',
	templateUrl: './podcasts-latest-episodes.component.html',
	styleUrls: ['./podcasts-latest-episodes.component.scss'],
	imports: [EpisodesLoaderComponent]
})
export class PodcastsLatestEpisodesComponent {
}
