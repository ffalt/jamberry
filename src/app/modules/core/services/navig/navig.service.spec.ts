import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigService} from './navig.service';

describe('NavigService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [NavigService]
		});
	});

	it('should be created', inject([NavigService], (service: NavigService) => {
		expect(service).toBeTruthy();
	}));
});
