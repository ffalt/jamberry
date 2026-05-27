import { Jam } from '@jam';

export interface LandscapeGenreRenderNode extends Jam.LandscapeGenreNode {
	kind: 'genre';
	color: string;
	normalizedName: string;
}

export interface LandscapeArtistRenderNode extends Jam.LandscapeArtistNode {
	kind: 'artist';
	color: string;
	normalizedName: string;
}

export interface GenreDatum {
	genre: LandscapeGenreRenderNode;
	gx: number;
	gy: number;
}

export interface LandscapeRenderData {
	genres: Array<LandscapeGenreRenderNode>;
	artists: Array<LandscapeArtistRenderNode>;
}
