import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Signal } from '@angular/core';
import { UserStorageService } from '@core/services/userstorage/userstorage.service';
import { Jam, JamAuthService } from '@jam';

export function injectUser(): Signal<Jam.SessionUser | undefined> {
	return toSignal(inject(UserStorageService).userChange, { initialValue: inject(JamAuthService).user });
}
