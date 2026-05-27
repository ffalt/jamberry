import { Component, computed, inject, input, output, signal } from '@angular/core';
import { JamService, ImageFormatType } from '@jam';
import { NavigService } from '@core/services/navig/navig.service';
import type { LandscapeArtistRenderNode, LandscapeGenreRenderNode } from './landscape.types';

export type PanelNode = LandscapeArtistRenderNode | LandscapeGenreRenderNode;

@Component({
	selector: 'app-landscape-panel',
	templateUrl: './landscape-panel.component.html',
	styleUrls: ['./landscape-panel.component.scss'],
	imports: []
})
export class LandscapePanelComponent {
	node = input<PanelNode>();
	genreMap = input(new Map<string, LandscapeGenreRenderNode>());
	readonly dismiss = output();
	readonly genreClick = output<string>();

	artistGenres = computed(() => {
		const node = this.node();
		const map = this.genreMap();
		return node?.kind === 'artist' ?
			node.genreIDs
				.map(id => map.get(id))
				.filter((g): g is LandscapeGenreRenderNode => g !== undefined) :
			[];
	});

	imageError = signal(false);

	private readonly jam = inject(JamService);
	private readonly navig = inject(NavigService);

	isArtist(n: PanelNode): n is LandscapeArtistRenderNode {
		return n.kind === 'artist';
	}

	getImageUrl(id: string): string {
		return this.jam.image.imageUrl({ id, size: 160, format: ImageFormatType.webp });
	}

	goToArtist(artist: LandscapeArtistRenderNode): void {
		this.navig.toArtistID(artist.id, artist.name);
	}

	goToGenre(genre: LandscapeGenreRenderNode): void {
		this.navig.toGenreID(genre.id, genre.name);
	}

	onImgError(): void {
		this.imageError.set(true);
	}
}
