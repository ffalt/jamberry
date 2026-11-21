import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { type Jam, JamService, TrackHealthID } from '@jam';
import { TrackHealthComponent } from './track-health.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TrackHealthComponent', () => {
	let component: TrackHealthComponent;
	let fixture: ComponentFixture<TrackHealthComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, TrackHealthComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TrackHealthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('settles when fixable health hints are displayed and updated', () => {
		const setSolutions = component.solutions.set.bind(component.solutions);
		let updates = 0;
		vi.spyOn(component.solutions, 'set').mockImplementation(value => {
			if (++updates > 3) {
				throw new Error('Health display did not settle');
			}
			setSolutions(value);
		});
		const track = { id: 'track-1', parentID: 'folder-1', name: 'Track' } as Jam.Track;
		fixture.componentRef.setInput('trackHealth', {
			track,
			health: [
				{ id: TrackHealthID.lyricsSyncedExists, name: 'Missing synced lyrics' },
				{ id: TrackHealthID.id3v2Exists, name: 'Missing ID3v2' },
				{ id: TrackHealthID.id3v2Garbage, name: 'Invalid ID3v2' }
			]
		} satisfies Jam.TrackHealth);
		fixture.detectChanges();

		expect(component.solutions().map(solution => solution.name)).toEqual(['Fetch Synced Lyrics', 'Edit Tag']);
		expect(fixture.nativeElement.textContent).toContain('No synced lyrics');

		const jam = TestBed.inject(JamService);
		const pendingFix = Promise.withResolvers<Awaited<ReturnType<typeof jam.track.fix>>>();
		const fix = vi.spyOn(jam.track, 'fix').mockReturnValue(pendingFix.promise);
		component.fixAll();
		fixture.detectChanges();
		expect(fix).toHaveBeenCalledWith({ id: track.id, fixID: TrackHealthID.lyricsSyncedExists });
		expect(component.solutions()[0].running).toBe(true);

		fixture.componentRef.setInput('trackHealth', {
			track,
			health: [{ id: TrackHealthID.id3v2NoId3v1, name: 'ID3v1 tag' }]
		} satisfies Jam.TrackHealth);
		fixture.detectChanges();

		expect(component.solutions().map(solution => solution.name)).toEqual(['Remove ID3v1']);
		expect(fixture.nativeElement.textContent).toContain('ID3v1 tag');
		expect(updates).toBe(2);
	});
});
