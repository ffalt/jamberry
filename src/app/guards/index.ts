import {AuthCanActivateGuard} from './auth-can-active/auth.can-activate.guard';
import {PendingChangesGuard} from './pending-changes/pending-changes.guard';

export const guards: Array<any> = [
	AuthCanActivateGuard,
	PendingChangesGuard
];

export * from './auth-can-active/auth.can-activate.guard';
export * from './pending-changes/pending-changes.guard';
