import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {SliderSpeedComponent} from './slider-speed.component';

describe('SliderSpeedComponent', () => {
	let component: SliderSpeedComponent;
	let fixture: ComponentFixture<SliderSpeedComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_PLAYER_MODULE_IMPORTS],
    providers: [...TEST_PLAYER_MODULE_PROVIDERS],
    declarations: [SliderSpeedComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SliderSpeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
