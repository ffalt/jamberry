import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, type Routes} from '@angular/router';
import {AuthCanActivateGuard} from '@app/guards';
import {SharedModule} from '@shared/shared.module';
import {PodcastSearchPageComponent} from './podcast-search-page.component';

const routes: Routes = [
	{
		path: '',
		component: PodcastSearchPageComponent,
		canActivate: [AuthCanActivateGuard],
		data: {name: 'Podcast Search'}
	}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes),
        NgOptimizedImage
    ],
	declarations: [
		PodcastSearchPageComponent
	]
})
export class PodcastSearchPageModule {
}
