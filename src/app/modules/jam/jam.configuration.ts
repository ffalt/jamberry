// @generated
// This file was automatically generated and should not be edited.

import type {Auth} from './jam.auth.service';
import type {Jam} from './model/jam-rest-data';

export abstract class JamConfiguration {
	abstract clientName: string;
	abstract forceSessionUsage: boolean;
	abstract domain(): string;
	abstract userChangeNotify(user: Jam.SessionUser | undefined): Promise<void>;
	abstract fromStorage(): Promise<{ user: Jam.SessionUser; auth: Auth } | undefined>;
	abstract toStorage(data: { user: Jam.SessionUser; auth: Auth } | undefined): Promise<void>;
}
