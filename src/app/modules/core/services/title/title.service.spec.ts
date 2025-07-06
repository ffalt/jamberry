import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ToastModule} from '@app/modules/toast';
import {TEST_JAM_MODULE} from '@core/jam.module.mock';
import {TitleService} from './title.service';

describe('TitleService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ToastModule.forRoot(), TEST_JAM_MODULE],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {}
				}
			],
			teardown: {destroyAfterEach: false}
		});
	});

	it('should be created', inject([TitleService], (service: TitleService) => {
		expect(service).toBeTruthy();
	}));
});
