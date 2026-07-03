import { type AfterViewInit, Component, type ElementRef, DestroyRef, effect, HostListener, inject, type OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { debounceTime, Subject } from 'rxjs';
import { LandscapeTooltipComponent } from './landscape-tooltip.component';
import { LandscapePanelComponent, type PanelNode } from './landscape-panel.component';
import type { Jam, JamParameters } from '@jam';
import { JamLandscapeService } from '@modules/jam/services/jam.landscape.service';
import { GenreDatum, LandscapeArtistRenderNode, LandscapeGenreRenderNode, LandscapeRenderData } from './landscape.types';
import { ThemeService } from '@modules/theme';
import { LoadingComponent } from '@core/components/loading/loading.component';

const PADDING = 40;
const GRID_SCALE = 1.5;
const ARTIST_NODE_SIZE = 2;
const GENRE_FONT_SIZE = 11;
const UNMAPPED_REGION_X = 0.92;
const UNMAPPED_REGION_Y = 0.92;
const UNMAPPED_CELL_W = 60;
const UNMAPPED_CELL_H = 16;
const SEARCH_DEBOUNCE_MS = 150;

function noiseColor(x: number, y: number, lightness: number): string {
	const angle = Math.atan2(y - 0.5, x - 0.5);
	const hue = Math.round(((angle + Math.PI) / (2 * Math.PI)) * 360);
	return `oklch(${lightness}% 0.15 ${hue})`;
}

function buildColorMap(
	genres: Array<{ id: string; noiseX?: number; noiseY?: number }>,
	lightness: number,
	greyLightness: number
): Map<string, string> {
	const map = new Map<string, string>();
	for (const g of genres) {
		map.set(g.id, g.noiseX !== undefined && g.noiseY !== undefined ?
			noiseColor(g.noiseX, g.noiseY, lightness) :
			`oklch(${greyLightness}% 0 0)`);
	}
	return map;
}

@Component({
	selector: 'app-landscape',
	templateUrl: './landscape.component.html',
	styleUrls: ['./landscape.component.scss'],
	imports: [FormsModule, LandscapeTooltipComponent, LandscapePanelComponent, LoadingComponent]
})
export class LandscapeComponent implements OnInit, AfterViewInit {
	@ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;
	@ViewChild('zoomLayer', { static: true }) zoomLayerRef!: ElementRef<SVGGElement>;
	@ViewChild('wrap', { static: true }) wrapRef!: ElementRef<HTMLDivElement>;
	searchTerm = signal('');
	hoveredNode = signal<LandscapeGenreRenderNode | LandscapeArtistRenderNode | undefined>(undefined);
	tooltipX = signal(0);
	tooltipY = signal(0);
	selectedNode = signal<PanelNode | undefined>(undefined);
	genreMap = signal(new Map<string, LandscapeGenreRenderNode>());
	focusedGenreIds = signal(new Set<string>());
	loading = signal(true);
	errorMessage = signal<string | undefined>(undefined);
	showFilters = signal(false);
	filterIgnoreUnknownGenres = signal(true);
	filterArtistsWithAlbumsOnly = signal(true);
	filterIgnoreUnpositionedArtists = signal(true);
	filterMinGenreTrackCount = signal(2);
	filterMinGenreArtistCount = signal(1);
	filterMinArtistTrackCount = signal(1);
	private readonly landscapeService = inject(JamLandscapeService);
	private readonly themeService = inject(ThemeService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly resizeSubject = new Subject<void>();
	private readonly searchSubject = new Subject<string>();
	private data?: LandscapeRenderData;
	private width = 0;
	private height = 0;
	private x!: d3.ScaleLinear<number, number>;
	private y!: d3.ScaleLinear<number, number>;
	private zoomBehavior?: d3.ZoomBehavior<SVGSVGElement, unknown>;
	private loadSeq = 0;

	constructor() {
		effect(() => {
			this.focusedGenreIds();
			this.searchTerm();
			this.updateVisuals();
		});
	}

	ngOnInit(): void {
		this.resizeSubject
			.pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.onResizeDebounced();
			});

		this.searchSubject
			.pipe(debounceTime(SEARCH_DEBOUNCE_MS), takeUntilDestroyed(this.destroyRef))
			.subscribe(term => {
				this.searchTerm.set(term);
				this.updateVisuals();
			});

		this.themeService.themeChange
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.recolorData();
				this.buildChart();
			});
	}

	ngAfterViewInit(): void {
		const resizeObserver = new ResizeObserver(() => {
			this.resizeSubject.next();
		});
		resizeObserver.observe(this.wrapRef.nativeElement);
		this.destroyRef.onDestroy(() => {
			resizeObserver.disconnect();
		});
		this.loadData().catch((error: unknown) => {
			console.error('Failed to load landscape data', error);
		});
	}

	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent): void {
		if ((event.target as Element).matches('input, textarea')) {
			return;
		}
		if (event.key === 'Escape') {
			this.clearAll();
			return;
		}
		if (!this.zoomBehavior) {
			return;
		}
		switch (event.key) {
			case '+':
			case '=': {
				event.preventDefault();
				this.zoomBehavior.scaleBy(this.svgTransition(200), 1.3);
				break;
			}
			case '-': {
				event.preventDefault();
				this.zoomBehavior.scaleBy(this.svgTransition(200), 0.7);
				break;
			}
			case 'ArrowLeft': {
				event.preventDefault();
				this.zoomBehavior.translateBy(this.svgTransition(100), 50, 0);
				break;
			}
			case 'ArrowRight': {
				event.preventDefault();
				this.zoomBehavior.translateBy(this.svgTransition(100), -50, 0);
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				this.zoomBehavior.translateBy(this.svgTransition(100), 0, 50);
				break;
			}
			case 'ArrowDown': {
				event.preventDefault();
				this.zoomBehavior.translateBy(this.svgTransition(100), 0, -50);
				break;
			}
			default: {
				break;
			}
		}
	}

	resetView(): void {
		if (!this.zoomBehavior) {
			return;
		}
		const fitScale = Math.min(this.width / (this.x(1) + PADDING), this.height / (this.y(1) + PADDING));
		const tx = (this.width - (this.x(1) + PADDING) * fitScale) / 2;
		const ty = (this.height - (this.y(1) + PADDING) * fitScale) / 2;
		this.svgTransition(300).call(this.zoomBehavior.transform.bind(this.zoomBehavior), d3.zoomIdentity.translate(tx, ty).scale(fitScale));
	}

	clearAll(): void {
		this.searchTerm.set('');
		this.selectedNode.set(undefined);
		this.hoveredNode.set(undefined);
		this.focusedGenreIds.set(new Set<string>());
		this.updateVisuals();
	}

	clearSelection(): void {
		this.selectedNode.set(undefined);
	}

	onSearch(term: string): void {
		this.searchSubject.next(term);
	}

	onGenreFocus(genreId: string): void {
		const current = this.focusedGenreIds();
		if (current.has(genreId)) {
			this.focusedGenreIds.set(new Set<string>());
		} else {
			this.focusedGenreIds.set(new Set([genreId]));
		}
	}

	onFiltersChange(): void {
		this.loading.set(true);
		this.errorMessage.set(undefined);
		this.data = undefined;
		this.loadData().catch((error: unknown) => {
			console.error('Failed to reload landscape data', error);
		});
	}

	private getThemeColors(): { lightness: number; greyLightness: number } {
		const isLight = this.themeService.theme === 'light';
		return { lightness: isLight ? 40 : 72, greyLightness: isLight ? 50 : 55 };
	}

	private recolorData(): void {
		if (!this.data) {
			return;
		}
		const { lightness, greyLightness } = this.getThemeColors();
		const colorMap = buildColorMap(this.data.genres, lightness, greyLightness);
		for (const g of this.data.genres) {
			g.color = colorMap.get(g.id)!;
			g.normalizedName = g.name.toLowerCase();
		}
		for (const a of this.data.artists) {
			const primaryGenreId = a.genreIDs.find(id => colorMap.has(id));
			a.color = primaryGenreId ? colorMap.get(primaryGenreId)! : `oklch(${greyLightness}% 0 0)`;
			a.normalizedName = a.name.toLowerCase();
		}
	}

	private buildFilterParams(): JamParameters.LandscapeParameters {
		return {
			ignoreUnknownGenres: this.filterIgnoreUnknownGenres() ? true : undefined,
			artistsWithAlbumsOnly: this.filterArtistsWithAlbumsOnly() ? true : undefined,
			ignoreUnpositionedArtists: this.filterIgnoreUnpositionedArtists() ? true : undefined,
			minGenreTrackCount: this.filterMinGenreTrackCount() > 0 ? this.filterMinGenreTrackCount() : undefined,
			minGenreArtistCount: this.filterMinGenreArtistCount() > 0 ? this.filterMinGenreArtistCount() : undefined,
			minArtistTrackCount: this.filterMinArtistTrackCount() > 0 ? this.filterMinArtistTrackCount() : undefined
		};
	}

	private transform(data: Jam.LandscapeData): LandscapeRenderData {
		const { lightness, greyLightness } = this.getThemeColors();
		const colorMap = buildColorMap(data.genres, lightness, greyLightness);
		const genres = data.genres.map(g => ({
			...g,
			kind: 'genre' as const,
			color: colorMap.get(g.id)!,
			normalizedName: g.name.toLowerCase()
		}));
		const artists = data.artists.map(a => {
			const primaryGenreId = a.genreIDs.find(id => colorMap.has(id));
			return {
				...a,
				kind: 'artist' as const,
				color: primaryGenreId ? colorMap.get(primaryGenreId)! : `oklch(${greyLightness}% 0 0)`,
				normalizedName: a.name.toLowerCase()
			};
		});
		return { genres, artists };
	}

	private async loadData(): Promise<void> {
		const seq = ++this.loadSeq;
		try {
			const result = this.transform(await this.landscapeService.get(this.buildFilterParams()));
			if (seq !== this.loadSeq) {
				return;
			}
			this.data = result;
			const newMap = new Map<string, LandscapeGenreRenderNode>();
			for (const g of this.data.genres) {
				newMap.set(g.id, g);
			}
			this.genreMap.set(newMap);
			this.loading.set(false);
			this.errorMessage.set(undefined);
			this.buildChart();
		} catch (error) {
			if (seq !== this.loadSeq) {
				return;
			}
			console.error('Failed to load landscape data', error);
			this.errorMessage.set(error instanceof Error ? error.message : 'Failed to load landscape data');
			this.loading.set(false);
		}
	}

	private onResizeDebounced(): void {
		if (!this.data) {
			return;
		}

		const previousTransform = this.zoomBehavior ?
			d3.zoomTransform(this.svgRef.nativeElement) :
			undefined;
		this.buildChart();
		if (previousTransform && this.zoomBehavior) {
			d3.select(this.svgRef.nativeElement).call(this.zoomBehavior.transform.bind(this.zoomBehavior), previousTransform);
		}
	}

	private svgTransition(duration: number): d3.Selection<SVGSVGElement, unknown, null, undefined> {
		// D3 transitions have API compatible with selections for chaining; cast required for type system
		return d3.select(this.svgRef.nativeElement).transition().duration(duration) as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>;
	}

	private appendAxisLabel(
		parent: d3.Selection<SVGGElement, unknown, null, undefined>,
		px: number, py: number, label: string, anchor?: string
	): void {
		const el = parent.append('text')
			.attr('x', px).attr('y', py).text(label)
			.style('fill', 'var(--on-control-ambient-disabled)')
			.attr('font-size', '11px')
			.attr('font-style', 'italic');
		if (anchor) {
			el.attr('text-anchor', anchor);
		}
	}

	private buildAxes(g: d3.Selection<SVGGElement, unknown, null, undefined>): void {
		const axisLabels = g.append('g').attr('class', 'axis-labels');
		const x0 = this.x(0), x1 = this.x(1), y0 = this.y(0), y1 = this.y(1);
		this.appendAxisLabel(axisLabels, x0, y0 - 10, 'atmospheric');
		this.appendAxisLabel(axisLabels, x1, y0 - 10, 'electronic', 'end');
		this.appendAxisLabel(axisLabels, x0, y1 + 20, 'acoustic');
		this.appendAxisLabel(axisLabels, x1, y1 + 20, 'energetic', 'end');
		const cx = this.x(0.5);
		const cy = this.y(0.5);
		g.append('line')
			.attr('x1', x0).attr('y1', cy)
			.attr('x2', x1).attr('y2', cy)
			.style('stroke', 'var(--background-border)').attr('stroke-width', 0.5);
		g.append('line')
			.attr('x1', cx).attr('y1', y0)
			.attr('x2', cx).attr('y2', y1)
			.style('stroke', 'var(--background-border)').attr('stroke-width', 0.5);
	}

	private nudgeGenreLabels(labels: Array<GenreDatum>): void {
		const lineH = GENRE_FONT_SIZE + 3;
		const charW = GENRE_FONT_SIZE * 0.55;
		const placed: Array<{ gx: number; gy: number; hw: number }> = [];
		const sorted = [...labels].toSorted((a, b) => b.genre.artistCount - a.genre.artistCount);
		for (const d of sorted) {
			const hw = (d.genre.name.length * charW) / 2;
			let nudgedY = d.gy;
			outer: for (let step = 0; step <= 12; step++) {
				const offsets = step === 0 ? [0] : [step * lineH, -step * lineH];
				for (const offset of offsets) {
					const testY = d.gy + offset;
					const overlaps = placed.some(p => Math.abs(p.gx - d.gx) < p.hw + hw && Math.abs(p.gy - testY) < lineH);
					if (!overlaps) {
						nudgedY = testY;
						break outer;
					}
				}
			}
			d.gy = nudgedY;
			placed.push({ gx: d.gx, gy: nudgedY, hw });
		}
	}

	private buildGenreLayer(g: d3.Selection<SVGGElement, unknown, null, undefined>): void {
		const genres = this.data!.genres;
		const mappedGenres = genres.filter(genre => genre.noiseX !== undefined);
		const unmappedGenres = genres.filter(genre => genre.noiseX === undefined);
		const maxArtistCount = Math.max(1, ...genres.map(genre => genre.artistCount));
		const unmappedCols = Math.max(1, Math.ceil(Math.sqrt(unmappedGenres.length)));
		const allGenreData: Array<GenreDatum> = [
			...mappedGenres.map(genre => ({
				genre,
				gx: this.x(genre.noiseX!),
				gy: this.y(genre.noiseY!)
			})),
			...unmappedGenres.map((genre, i) => {
				const col = i % unmappedCols;
				const row = Math.floor(i / unmappedCols);
				return {
					genre,
					gx: this.x(UNMAPPED_REGION_X) + col * UNMAPPED_CELL_W,
					gy: this.y(UNMAPPED_REGION_Y) + row * UNMAPPED_CELL_H
				};
			})
		];
		this.nudgeGenreLabels(allGenreData);
		const wrap = this.wrapRef.nativeElement;
		g.append('g').attr('class', 'genre-labels')
			.selectAll<SVGTextElement, GenreDatum>('text')
			.data(allGenreData)
			.join('text')
			.attr('x', d => d.gx)
			.attr('y', d => d.gy)
			.text(d => d.genre.name)
			.attr('fill', d => d.genre.color)
			.attr('font-size', `${GENRE_FONT_SIZE}px`)
			.attr('opacity', d => Math.min(1, Math.max(0.4, 0.3 + d.genre.artistCount / maxArtistCount)))
			.attr('text-anchor', 'middle')
			.style('text-transform', 'uppercase')
			.attr('letter-spacing', '0.05em')
			.attr('cursor', 'pointer')
			.attr('data-id', d => d.genre.id)
			.on('mouseover', (event: MouseEvent, d: GenreDatum) => {
				const rect = wrap.getBoundingClientRect();
				this.hoveredNode.set(d.genre);
				this.tooltipX.set(event.clientX - rect.left);
				this.tooltipY.set(event.clientY - rect.top);
			})
			.on('mouseleave', () => {
				this.hoveredNode.set(undefined);
			})
			.on('click', (_event: MouseEvent, d: GenreDatum) => {
				this.selectedNode.set(d.genre);
				this.onGenreFocus(d.genre.id);
			});
	}

	private buildArtistLayer(g: d3.Selection<SVGGElement, unknown, null, undefined>): void {
		const artistsWithCoords = this.data!.artists.filter(a => a.noiseX !== undefined);
		const wrap = this.wrapRef.nativeElement;
		const artistGroup = g.append('g').attr('class', 'artist-dots');
		artistGroup.selectAll<SVGCircleElement, LandscapeArtistRenderNode>('circle')
			.data(artistsWithCoords)
			.join('circle')
			.attr('cx', d => this.x(d.noiseX!))
			.attr('cy', d => this.y(d.noiseY!))
			.attr('r', ARTIST_NODE_SIZE)
			.attr('fill', d => d.color)
			.attr('opacity', 0.7)
			.attr('cursor', 'pointer')
			.attr('data-id', d => d.id)
			.on('mouseover', (event: MouseEvent, d: LandscapeArtistRenderNode) => {
				const rect = wrap.getBoundingClientRect();
				this.hoveredNode.set(d);
				this.tooltipX.set(event.clientX - rect.left);
				this.tooltipY.set(event.clientY - rect.top);
			})
			.on('mouseleave', () => {
				this.hoveredNode.set(undefined);
			})
			.on('click', (_event: MouseEvent, d: LandscapeArtistRenderNode) => {
				this.selectedNode.set(d);
			});
	}

	private buildZoomBehavior(
		svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
		g: d3.Selection<SVGGElement, unknown, null, undefined>
	): void {
		const fitScale = Math.min(this.width / (this.x(1) + PADDING), this.height / (this.y(1) + PADDING));
		this.zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
			.scaleExtent([fitScale * 0.8, 12])
			.on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
				g.attr('transform', event.transform.toString());
				// this.currentZoom = event.transform.k;
			});
		svg.call(this.zoomBehavior);
		const initTx = (this.width - (this.x(1) + PADDING) * fitScale) / 2;
		const initTy = (this.height - (this.y(1) + PADDING) * fitScale) / 2;
		svg.call(this.zoomBehavior.transform.bind(this.zoomBehavior), d3.zoomIdentity.translate(initTx, initTy).scale(fitScale));
		svg.on('click', (event: MouseEvent) => {
			if ((event.target as Element).tagName !== 'svg') {
				return;
			}

			this.focusedGenreIds.set(new Set<string>());
			this.updateVisuals();
		});
	}

	private buildChart(): void {
		if (!this.data) {
			return;
		}
		this.width = this.wrapRef.nativeElement.clientWidth;
		this.height = this.wrapRef.nativeElement.clientHeight;
		if (this.width === 0 || this.height === 0) {
			return;
		}
		const svg = d3.select(this.svgRef.nativeElement);
		svg.attr('width', this.width).attr('height', this.height);
		const gridW = (this.width - 2 * PADDING) * GRID_SCALE;
		const gridH = (this.height - 2 * PADDING) * GRID_SCALE;
		this.x = d3.scaleLinear().domain([0, 1]).range([PADDING, PADDING + gridW]);
		this.y = d3.scaleLinear().domain([0, 1]).range([PADDING, PADDING + gridH]);
		const g = d3.select(this.zoomLayerRef.nativeElement);
		g.selectAll('*').remove();
		this.buildAxes(g);
		this.buildGenreLayer(g);
		this.buildArtistLayer(g);
		this.buildZoomBehavior(svg, g);
		this.updateVisuals();
	}

	private updateVisuals(): void {
		const g = d3.select(this.zoomLayerRef.nativeElement);
		const term = this.searchTerm().toLowerCase().trim();
		const hasSearch = term.length > 0;
		const focusedIds = this.focusedGenreIds();
		const hasFocus = focusedIds.size > 0;
		const maxArtistCount = Math.max(1, ...(this.data?.genres.map(gg => gg.artistCount) ?? [1]));

		g.selectAll<SVGTextElement, GenreDatum>('.genre-labels text')
			.attr('opacity', d => {
				if (hasSearch) {
					return d.genre.normalizedName.includes(term) ? 1 : 0.1;
				}
				if (hasFocus) {
					return focusedIds.has(d.genre.id) ? 1 : 0.08;
				}
				return Math.min(1, Math.max(0.4, 0.3 + d.genre.artistCount / maxArtistCount));
			})
			.attr('font-weight', d => hasSearch && d.genre.normalizedName.includes(term) ? 'bold' : 'normal');

		g.selectAll<SVGCircleElement, LandscapeArtistRenderNode>('.artist-dots circle')
			.attr('opacity', d => {
				if (hasSearch) {
					return d.normalizedName.includes(term) ? 1 : 0.06;
				}
				if (hasFocus) {
					return d.genreIDs.some(id => focusedIds.has(id)) ? 0.7 : 0.06;
				}
				return 0.7;
			})
			.attr('r', d => hasSearch && d.normalizedName.includes(term) ? 8 : ARTIST_NODE_SIZE)
			.attr('stroke', d => hasSearch && d.normalizedName.includes(term) ? 'var(--on-background-highlight)' : 'none')
			.attr('stroke-width', d => hasSearch && d.normalizedName.includes(term) ? 1.5 : 0);
	}
}
