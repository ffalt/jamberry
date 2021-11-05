import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {MiniSliderTimeComponent} from './mini-slider-time.component';

describe('MiniSliderTimeComponent', () => {
	let component: MiniSliderTimeComponent;
	let fixture: ComponentFixture<MiniSliderTimeComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_PLAYER_MODULE_IMPORTS],
    providers: [...TEST_PLAYER_MODULE_PROVIDERS],
    declarations: [MiniSliderTimeComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MiniSliderTimeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
