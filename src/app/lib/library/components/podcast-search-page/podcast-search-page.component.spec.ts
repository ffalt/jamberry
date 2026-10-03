import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../../app.mock';
import { PodcastSearchPageComponent } from './podcast-search-page.component';
import { type Jam, JamService } from '@jam';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

function podcastResult(title: string, url: string): Jam.PodcastDiscover {
	return {
		title, url, author: 'Author', description: 'Podcast description', subscribers: 0, subscribers_last_week: 0,
		logo_url: '', scaled_logo_url: '', website: '', mygpo_link: ''
	};
}

describe('PodcastSearchPageComponent', () => {
	let component: PodcastSearchPageComponent;
	let fixture: ComponentFixture<PodcastSearchPageComponent>;

	beforeEach(async () =>
		TestBed.configureTestingModule({
			imports: [...TEST_IMPORTS, PodcastSearchPageComponent],
			providers: [...TEST_PROVIDERS],
			teardown: { destroyAfterEach: false }
		}).compileComponents()
	);

	beforeEach(async () => {
		fixture = TestBed.createComponent(PodcastSearchPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders async results from different feed hosts without another interaction', async () => {
		const response = Promise.withResolvers<Array<Jam.PodcastDiscover>>();
		vi.spyOn(TestBed.inject(JamService).podcast, 'discover').mockReturnValue(response.promise);
		component.searchValue = 'Podcasts';
		component.search(component.searchValue);
		await fixture.whenStable();
		expect((fixture.nativeElement as HTMLElement).querySelector('app-loading')).toBeTruthy();

		response.resolve([
			podcastResult('First podcast', 'https://feedburner.com/first'),
			podcastResult('Second podcast', 'https://example.com/feed.xml'),
			podcastResult('Third podcast', 'https://feeds.feedburner.com/third')
		]);
		await response.promise;
		await fixture.whenStable();

		const element = fixture.nativeElement as HTMLElement;
		expect([...element.querySelectorAll(':scope .search-podcast-plate .name')].map(name => name.textContent?.trim())).toEqual(['First podcast', 'Second podcast', 'Third podcast']);
		expect(element.querySelector('app-loading')).toBeNull();
	});

	it('groups duplicate feeds and prefers the MP3 feed', async () => {
		vi.spyOn(TestBed.inject(JamService).podcast, 'discover').mockResolvedValue([
			podcastResult('Podcast', 'https://example.com/feed.aac'),
			podcastResult('Podcast', 'https://example.com/feed.mp3'),
			podcastResult('Podcast', 'https://example.com/feed.mp3')
		]);
		component.searchValue = 'Podcast';
		component.search(component.searchValue);
		await fixture.whenStable();

		const element = fixture.nativeElement as HTMLElement;
		expect(element.querySelectorAll('.search-podcast-plate')).toHaveLength(1);
		expect(element.querySelectorAll('option')).toHaveLength(2);
		expect(element.querySelector('select')?.selectedOptions[0].textContent).toBe('https://example.com/feed.mp3');
	});

	it('shows No Results after an empty search response', async () => {
		vi.spyOn(TestBed.inject(JamService).podcast, 'discover').mockResolvedValue([]);
		component.searchValue = 'Podcast';
		component.search(component.searchValue);
		await fixture.whenStable();

		const element = fixture.nativeElement as HTMLElement;
		expect(element.textContent).toContain('No Results');
		expect(element.querySelector('app-loading')).toBeNull();
	});
});
