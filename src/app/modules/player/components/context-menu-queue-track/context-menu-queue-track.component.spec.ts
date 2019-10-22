import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_PLAYER_MODULE_IMPORTS, TEST_PLAYER_MODULE_PROVIDERS} from '@app/modules/player/player.module.mock';
import {ContextMenuQueueTrackComponent} from './context-menu-queue-track.component';

describe('ContextMenuQueueTrackComponent', () => {
	let component: ContextMenuQueueTrackComponent;
	let fixture: ComponentFixture<ContextMenuQueueTrackComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_PLAYER_MODULE_IMPORTS],
			providers: [...TEST_PLAYER_MODULE_PROVIDERS],
			declarations: [ContextMenuQueueTrackComponent]
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuQueueTrackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
