import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {PlayerCurrentInfoComponent} from './player-current-info.component';

describe('PlayerCurrentInfoComponent', () => {
	let component: PlayerCurrentInfoComponent;
	let fixture: ComponentFixture<PlayerCurrentInfoComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_PLAYER_MODULE_IMPORTS],
			providers: [...TEST_PLAYER_MODULE_PROVIDERS],
			declarations: [PlayerCurrentInfoComponent]
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerCurrentInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
