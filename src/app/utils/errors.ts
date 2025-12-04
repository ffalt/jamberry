import { HttpErrorResponse } from '@angular/common/http';

export function isErrorWithCode(err: unknown): err is { code: number } {
	return typeof err === 'object' && err !== null && 'code' in err && typeof (err as { code: unknown }).code === 'number';
}

export function serverErrorMsg(error: unknown): string {
	let msg = 'Invalid Server Response';
	if (typeof error === 'string') {
		msg = error;
	} else if (
		error !== null && typeof error === 'object' &&
		('error' in error) && error.error !== null &&
		typeof error.error === 'object' &&
		('error' in error.error) &&
		typeof error.error.error === 'string'
	) {
		msg = error.error.error;
	} else if (error instanceof HttpErrorResponse) {
		msg = getHttpErrorMessage(error);
	} else if (error instanceof Error && error.message) {
		msg = error.message;
	}
	if (msg.startsWith('Error:')) {
		msg = msg.slice(6).trim();
	}
	return msg;
}

export function getHttpErrorMessage(error: HttpErrorResponse): string {
	if (
		error.error !== null &&
		typeof error.error === 'object' &&
		'error' in error.error
	) {
		const errorObj = error.error as Record<string, unknown>;
		if (typeof errorObj.error === 'string') {
			return errorObj.error;
		}
	}
	return `HTTP Error ${error.status}`;
}
