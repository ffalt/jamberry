import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchReleaseComponent } from './match-release.component';
import { TEST_IMPORTS } from '../../../../app.mock';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JamService, MusicBrainzLookupType } from '@jam';
import { NotifyService } from '@core/services/notify/notify.service';

const jamServiceMock = {
	metadata: {
		musicbrainzSearch: vi.fn(),
		musicbrainzLookup: vi.fn()
	}
};

const notifyServiceMock = {
	error: vi.fn()
};

describe('MatchReleaseComponent', () => {
	let component: MatchReleaseComponent;
	let fixture: ComponentFixture<MatchReleaseComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, MatchReleaseComponent],
			providers: [
				{ provide: JamService, useValue: jamServiceMock },
				{ provide: NotifyService, useValue: notifyServiceMock }
			],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		jamServiceMock.metadata.musicbrainzSearch.mockReset();
		jamServiceMock.metadata.musicbrainzLookup.mockReset();
		notifyServiceMock.error.mockReset();
		fixture = TestBed.createComponent(MatchReleaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('renders manual search results and hides the spinner after async completion', async () => {
		const { promise: searchResponse, resolve: resolveSearch } = Promise.withResolvers<{ data: { releaseGroups: Array<{ id: string }> } }>();
		jamServiceMock.metadata.musicbrainzSearch.mockReturnValue(searchResponse);
		jamServiceMock.metadata.musicbrainzLookup.mockImplementation(async ({ type, mbID }: { type: MusicBrainzLookupType; mbID: string }) => {
			if (type === MusicBrainzLookupType.releaseGroup) {
				return {
					data: {
						releaseGroup: {
							id: mbID,
							title: 'Test Album',
							primaryType: 'Album',
							secondaryTypes: [],
							artistCredit: [{ name: 'Test Artist' }],
							releases: [{
								id: 'rel-1',
								date: '2024-01-01',
								country: 'DE',
								media: [{ trackCount: 1 }]
							}]
						}
					}
				};
			}

			return {
				data: {
					release: {
						id: mbID,
						title: 'Test Album',
						date: '2024-01-01',
						country: 'DE',
						artistCredit: [{ name: 'Test Artist' }],
						releaseGroup: {
							id: 'rg-1',
							firstReleaseDate: '2024-01-01',
							primaryType: 'Album',
							secondaryTypes: []
						},
						media: [{
							position: 1,
							trackCount: 1,
							tracks: [{
								position: 1,
								title: 'Test Track',
								length: 180_000,
								artistCredit: [{ name: 'Test Artist' }],
								recording: {
									id: 'rec-1',
									title: 'Test Track',
									aliases: []
								}
							}]
						}]
					}
				}
			};
		});

		fixture.componentRef.setInput('data', {
			folder: { id: 'folder-1', name: 'Folder' },
			matchings: [{
				track: {
					id: 'track-1',
					name: '01 Test Track.mp3',
					duration: 180,
					tag: {
						artist: 'Test Artist',
						album: 'Test Album',
						title: 'Test Track',
						trackNr: 1
					}
				}
			}],
			apply: vi.fn()
		} as never);
		fixture.detectChanges();

		component.matcher.setManualSearch();
		component.matcher.manualSearchData.artist = 'Test Artist';
		component.matcher.manualSearchData.releaseGroup = 'Test Album';
		component.matcher.manualSearch();

		expect(component.matcher.isRunning).toBe(true);
		resolveSearch({
			data: {
				releaseGroups: [{ id: 'rg-1' }]
			}
		});

		await fixture.whenStable();

		const text = fixture.nativeElement.textContent as string;
		expect(component.matcher.isRunning).toBe(false);
		expect(component.matcher.matchTree.groups[0]?.mbGroup.title).toBe('Test Album');
		expect(text).toContain('Test Album');
		expect(fixture.nativeElement.querySelector('.current-log')).toBeNull();
		expect(notifyServiceMock.error).not.toHaveBeenCalled();
	});
});
