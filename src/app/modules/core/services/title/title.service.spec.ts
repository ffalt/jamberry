
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {TitleService} from './title.service';

describe('TitleService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, ToastModule.forRoot(), TEST_JAM_MODULE],
			providers: []
		});
	});

	it('should be created', inject([TitleService], (service: TitleService) => {
		expect(service).toBeTruthy();
	}));
});
