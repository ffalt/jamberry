import { Component, computed, ElementRef, inject, input } from '@angular/core';
import type { LandscapeArtistRenderNode, LandscapeGenreRenderNode } from './landscape.types';

@Component({
	selector: 'app-landscape-tooltip',
	templateUrl: './landscape-tooltip.component.html',
	styleUrls: ['./landscape-tooltip.component.scss'],
	imports: []
})
export class LandscapeTooltipComponent {
	node = input<LandscapeGenreRenderNode | LandscapeArtistRenderNode>();
	x = input(0);
	y = input(0);

	clampedX = computed(() => {
		const rawX = this.x();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-nullish-coalescing
		const containerWidth = this.hostElement.nativeElement.offsetWidth || window.innerWidth;
		const tooltipWidth = 200;
		const offset = 12;
		return Math.min(rawX + offset, containerWidth - tooltipWidth - 10);
	});

	clampedY = computed(() => {
		const rawY = this.y();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-nullish-coalescing
		const containerHeight = this.hostElement.nativeElement.offsetHeight || window.innerHeight;
		const tooltipHeight = 100;
		return Math.max(10, Math.min(rawY, containerHeight - tooltipHeight - 10));
	});

	private readonly hostElement = inject(ElementRef<HTMLElement>);

	isGenre(node: LandscapeGenreRenderNode | LandscapeArtistRenderNode): node is LandscapeGenreRenderNode {
		return node.kind === 'genre';
	}
}
