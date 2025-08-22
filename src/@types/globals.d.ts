import { JamConfig } from './jamconfig';

declare global {
	interface Navigator {
		standalone?: boolean;
	}

	interface Document {
		jamberry_config: JamConfig | undefined;
	}
}
