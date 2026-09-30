import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchCoverartComponent } from './match-coverart.component';
import { TEST_IMPORTS } from '../../../../app.mock';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { By } from '@angular/platform-browser';
import { JamService, CoverArtArchiveLookupType } from '@jam';
import { NotifyService } from '@core/services/notify/notify.service';
import { ImageBase64Component } from '../image-base64/image-base64.component';

const jamServiceMock = {
	metadata: {
		coverartarchiveLookup: vi.fn(),
		coverartarchiveImageBinary: vi.fn()
	}
};

const notifyServiceMock = {
	error: vi.fn()
};

describe('MatchCoverartComponent', () => {
	let component: MatchCoverartComponent;
	let fixture: ComponentFixture<MatchCoverartComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, MatchCoverartComponent],
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
		fixture = TestBed.createComponent(MatchCoverartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('renders a fetched image without requiring a front-only toggle', async () => {
		const { promise: binaryResponse, resolve: resolveBinary } = Promise.withResolvers<{ buffer: ArrayBuffer; contentType: string }>();
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
		jamServiceMock.metadata.coverartarchiveImageBinary.mockReturnValue(binaryResponse);

		fixture.componentRef.setInput('data', { mbReleaseID: 'rel-1', mbReleaseGroupID: 'rg-1' });

		expect(fixture.debugElement.query(By.directive(ImageBase64Component))).toBeNull();

		resolveBinary({
			buffer: new TextEncoder().encode('cover-art').buffer,
			contentType: 'image/jpeg'
		});

		await fixture.whenStable();

		expect(component.images()?.[0]?.base64).toBeDefined();
		expect(fixture.debugElement.query(By.directive(ImageBase64Component))).not.toBeNull();
		expect(notifyServiceMock.error).not.toHaveBeenCalled();
	});
});
