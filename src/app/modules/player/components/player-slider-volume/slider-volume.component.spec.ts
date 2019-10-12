import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {SliderVolumeComponent} from './slider-volume.component';

describe('SliderVolumeComponent', () => {
	let component: SliderVolumeComponent;
	let fixture: ComponentFixture<SliderVolumeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_PLAYER_MODULE_IMPORTS],
			providers: [...TEST_PLAYER_MODULE_PROVIDERS],
			declarations: [SliderVolumeComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SliderVolumeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
