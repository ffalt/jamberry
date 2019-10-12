import {ConfigurationService} from './services';
import {JamConfiguration, JamModule} from '@jam';

export const TEST_JAM_MODULE = JamModule.forRoot(
	[{
		provide: JamConfiguration,
		useClass: ConfigurationService
	}]
);
