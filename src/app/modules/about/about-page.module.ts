import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AuthCanActivateGuard} from '@app/guards';
import {SharedModule} from '@shared/shared.module';
import {AboutPageComponent} from './about-page.component';

const routes: Routes = [
	{
		path: '',
		component: AboutPageComponent,
		canActivate: [AuthCanActivateGuard],
		data: {name: 'About'}
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AboutPageComponent
	]
})
export class AboutPageModule {
}
