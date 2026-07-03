import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { TrackSimilarComponent } from './track-similar.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackSimilarComponent', () => {
	let component: TrackSimilarComponent;
	let fixture: ComponentFixture<TrackSimilarComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, TrackSimilarComponent],
			providers: [
				...TEST_PROVIDERS,
				{
					provide: ActivatedRoute,
					useValue: { paramMap: new Subject() }
				}
			],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TrackSimilarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
