import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { NowPlayingComponent } from './now-playing.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('NowPlayingComponent', () => {
	let component: NowPlayingComponent;
	let fixture: ComponentFixture<NowPlayingComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, NowPlayingComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents());

	beforeEach(() => {
		fixture = TestBed.createComponent(NowPlayingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should offer the up next panel when nothing is playing', () => {
		expect(component.panels().map(panel => panel.id)).toEqual(['upnext']);
		expect(component.activePanel()).toBe('upnext');
	});

	it('should toggle full view and leave it on escape', () => {
		expect(component.fullView).toBe(false);
		component.toggleFullView();
		expect(component.fullView).toBe(true);
		component.onEscape();
		expect(component.fullView).toBe(false);
	});
});
