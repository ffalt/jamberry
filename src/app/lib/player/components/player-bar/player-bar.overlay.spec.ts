import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PlayerBarComponent } from './player-bar.component';

const flush = async (): Promise<void> =>
	new Promise(resolve => {
		setTimeout(resolve, 0);
	});

const panes = (): number => document.querySelectorAll('.cdk-overlay-pane').length;

const menuPanels = (): Array<Element> => [...document.querySelectorAll('.cdk-overlay-pane.ngx-contextmenu')];

const menuItemCounts = (): Array<number> => menuPanels().map(panel => panel.querySelectorAll('[role="menuitem"]').length);

describe('PlayerBarComponent overflow menu overlays', () => {
	let fixture: ComponentFixture<PlayerBarComponent>;
	let more: HTMLElement;

	const openMenu = async (): Promise<void> => {
		more.click();
		await flush();
		fixture.detectChanges();
	};

	const clickOutside = async (): Promise<void> => {
		document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
		await flush();
		fixture.detectChanges();
	};

	const pressEscape = async (): Promise<void> => {
		globalThis.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
		await flush();
		await flush();
		fixture.detectChanges();
	};

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, PlayerBarComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerBarComponent);
		fixture.detectChanges();
		more = fixture.nativeElement.querySelector('.ctrl.more') as HTMLElement;
	});

	it('opens the menu with its entries', async () => {
		expect(panes()).toBe(0);
		await openMenu();
		expect(menuItemCounts()).toEqual([3]);
		await clickOutside();
	});

	it('removes every overlay when closed by a click outside', async () => {
		await openMenu();
		await clickOutside();
		expect(panes()).toBe(0);
	});

	it('removes every overlay when closed with escape', async () => {
		await openMenu();
		await pressEscape();
		expect(panes()).toBe(0);
	});

	it('reopens a populated menu from the same button instead of an empty overlay', async () => {
		await openMenu();
		await openMenu();

		expect(menuItemCounts()).toEqual([3]);

		await clickOutside();
		expect(panes()).toBe(0);
	});

	it('does not accumulate overlays over repeated open and close cycles', async () => {
		for (let round = 0; round < 3; round++) {
			await openMenu();
			await clickOutside();
		}
		expect(panes()).toBe(0);
	});
});
