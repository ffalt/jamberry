import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UiStateService {
	data: { [name: string]: any } = {};
}
