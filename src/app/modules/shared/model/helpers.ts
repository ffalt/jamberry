import type {Jam} from '@jam';

export abstract class JamObject {
	id: string;
	name: string;
	parent?: string;
	year?: string;
	mediaType?: string;
	genre?: string;

	protected constructor(public base: Jam.Base) {
		this.name = base.name;
		this.id = base.id;
	}

	abstract play(): void;

	abstract navigTo(): void;

	abstract navigToParent(): void;

	abstract toggleFav(): Promise<void>;

	abstract onContextMenu($event: Event, hideGoto?: boolean): void;
}
