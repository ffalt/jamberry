import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { ContextMenuPlayerComponent } from './context-menu-player.component';
import { ActionsService } from '@core/services/actions/actions.service';
import { PlayerService } from '@core/services/player/player.service';
import { QueueService } from '@core/services/queue/queue.service';
import { MainTabsService } from '../../../main-tabs/services/main-tabs.service';
import type { Jam } from '@jam';

describe('ContextMenuPlayerComponent', () => {
	let component: ContextMenuPlayerComponent;
	let fixture: ComponentFixture<ContextMenuPlayerComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, ContextMenuPlayerComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextMenuPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('provides the context menu to the menu service', () => {
		expect(component.contextMenu()).toBeTruthy();
	});

	it('cycles repeat the same way the bar does', () => {
		const player = TestBed.inject(PlayerService);
		const queue = TestBed.inject(QueueService);

		expect(component.repeatMode).toBe('off');
		component.cycleRepeat();
		expect(component.repeatMode).toBe('queue');
		expect(queue.repeatQueue).toBe(true);
		component.cycleRepeat();
		expect(component.repeatMode).toBe('track');
		expect(player.repeatTrack).toBe(true);
		component.cycleRepeat();
		expect(component.repeatMode).toBe('off');
	});

	it('toggles the favorite state of the current media', () => {
		const player = TestBed.inject(PlayerService);
		const actions = TestBed.inject(ActionsService);
		const track = { id: 'track-1', name: 'track-1.mp3', objType: 'track', state: {} } as Jam.Track;
		player.currentMedia = track;
		const toggle = vi.spyOn(actions, 'toggleMediaBaseFav').mockResolvedValue();

		component.toggleFav();

		expect(toggle).toHaveBeenCalledWith(track);
	});

	it('does not toggle the favorite state without current media', () => {
		const actions = TestBed.inject(ActionsService);
		const toggle = vi.spyOn(actions, 'toggleMediaBaseFav');
		component.toggleFav();
		expect(toggle).not.toHaveBeenCalled();
	});

	it('offers the compact controls once the bar is too narrow to show them', () => {
		const matchMediaSpy = vi.spyOn(globalThis, 'matchMedia')
			.mockImplementation((query: string) => ({ matches: Number(/(\d+)px/.exec(query)?.[1]) >= 700 }) as MediaQueryList);

		const narrow = TestBed.createComponent(ContextMenuPlayerComponent).componentInstance;

		expect(narrow.showCompactControls).toBe(true);
		matchMediaSpy.mockRestore();
	});

	it('leaves the compact controls out of the menu while the bar still shows them', () => {
		expect(component.showCompactControls).toBe(false);
		expect(component.showTransportExtras).toBe(false);
	});

	it('toggles the queue tab', () => {
		const tabService = TestBed.inject(MainTabsService);
		const click = vi.spyOn(tabService, 'clickQueue').mockImplementation(() => undefined);

		component.tabService.clickQueue();

		expect(click).toHaveBeenCalled();
	});
});
