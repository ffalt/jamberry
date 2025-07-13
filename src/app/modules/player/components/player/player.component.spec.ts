import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {SliderSpeedComponent, SliderTimeComponent, SliderVolumeComponent} from '@app/modules/player/components';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {MockComponent} from 'ng-mocks';
import {PlayerComponent} from './player.component';

describe('PlayerComponent', () => {
	let component: PlayerComponent;
	let fixture: ComponentFixture<PlayerComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_PLAYER_MODULE_IMPORTS],
    providers: [...TEST_PLAYER_MODULE_PROVIDERS],
    declarations: [
        PlayerComponent,
        MockComponent(SliderTimeComponent),
        MockComponent(SliderVolumeComponent),
        MockComponent(SliderSpeedComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
