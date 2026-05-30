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
	if (error.status === 429) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const retryAfter = error.headers?.get('retry-after');
		if (retryAfter) {
			const seconds = Number.parseInt(retryAfter, 10);
			if (!Number.isNaN(seconds) && seconds > 0) {
				return `Rate limit exceeded. Try again in ${formatRetryDuration(seconds)}.`;
			}
		}
		return 'Rate limit exceeded. Please try again later.';
	}
	return `HTTP Error ${error.status}`;
}

function formatRetryDuration(seconds: number): string {
	if (seconds < 60) {
		return `${seconds}s`;
	}
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}
