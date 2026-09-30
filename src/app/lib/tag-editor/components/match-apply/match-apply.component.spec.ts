import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchApplyComponent } from './match-apply.component';
import { TEST_IMPORTS } from '../../../../app.mock';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { By } from '@angular/platform-browser';
import { JamService, CoverArtArchiveLookupType } from '@jam';
import { NotifyService } from '@core/services/notify/notify.service';
import { MatchCoverartComponent } from '../match-coverart/match-coverart.component';

const jamServiceMock = {
	metadata: {
		coverartarchiveLookup: vi.fn(),
		coverartarchiveImageBinary: vi.fn()
	}
};

const notifyServiceMock = {
	error: vi.fn()
};

describe('MatchApplyComponent', () => {
	let component: MatchApplyComponent;
	let fixture: ComponentFixture<MatchApplyComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, MatchApplyComponent],
			providers: [
				{ provide: JamService, useValue: jamServiceMock },
				{ provide: NotifyService, useValue: notifyServiceMock }
			],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(() => {
		jamServiceMock.metadata.coverartarchiveLookup.mockReset();
		jamServiceMock.metadata.coverartarchiveImageBinary.mockReset();
		notifyServiceMock.error.mockReset();
		fixture = TestBed.createComponent(MatchApplyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('renders cover art after coverArtSearch is set without needing a manual toggle', async () => {
		jamServiceMock.metadata.coverartarchiveLookup.mockImplementation(async ({ type }: { type: CoverArtArchiveLookupType }) => {
			if (type !== CoverArtArchiveLookupType.release) {
				return { data: { images: [] } };
			}

			return {
				data: {
					images: [{
						id: 'img-1',
						front: true,
						types: ['Front'],
						image: 'https://coverartarchive.org/img-1',
						thumbnails: { '500': 'https://coverartarchive.org/thumb-1' }
					}]
				}
			};
		});
		jamServiceMock.metadata.coverartarchiveImageBinary.mockResolvedValue({
			buffer: new TextEncoder().encode('cover-art').buffer,
			contentType: 'image/jpeg'
		});

		component.coverArtSearch.set({ mbReleaseID: 'rel-1', mbReleaseGroupID: 'rg-1' });

		await fixture.whenStable();

		const coverArtDebugElement = fixture.debugElement.query(By.directive(MatchCoverartComponent));
		expect(coverArtDebugElement).not.toBeNull();

		const coverArtComponent = coverArtDebugElement.componentInstance as MatchCoverartComponent;
		expect(coverArtComponent.images()?.length).toBe(1);
		expect(coverArtComponent.images()?.[0]?.base64).toBeDefined();
		expect(fixture.nativeElement.textContent as string).toContain('Coverart');
		expect(notifyServiceMock.error).not.toHaveBeenCalled();
	});
});
