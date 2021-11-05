import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MiniPlayerComponent, MiniSliderTimeComponent} from '@app/modules/player/components';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {MockComponent} from 'ng-mocks';

describe('MiniPlayerComponent', () => {
	let component: MiniPlayerComponent;
	let fixture: ComponentFixture<MiniPlayerComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
    imports: [...TEST_PLAYER_MODULE_IMPORTS],
    providers: [...TEST_PLAYER_MODULE_PROVIDERS],
    declarations: [
        MiniPlayerComponent, MockComponent(MiniSliderTimeComponent)
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MiniPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
