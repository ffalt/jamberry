import {JamConfiguration, JamModule} from '@jam';
import {ConfigurationService} from './services';

export const TEST_JAM_MODULE = JamModule.forRoot(
	[{
		provide: JamConfiguration,
		useClass: ConfigurationService
	}]
);
