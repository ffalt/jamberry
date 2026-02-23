export function padTime(val: number): string {
	return (val <= 9) ? `0${val.toString()}` : val.toString();
}

export function splitTime(value: number): { days: number; hours: number; minutes: number; seconds: number } {
	const duration = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	let delta = value;
	duration.days = Math.floor(delta / 86_400);
	delta -= duration.days * 86_400;
	// calculate (and subtract) whole hours
	duration.hours = Math.floor(delta / 3600) % 24;
	delta -= duration.hours * 3600;
	// calculate (and subtract) whole minutes
	duration.minutes = Math.floor(delta / 60) % 60;
	delta -= duration.minutes * 60;
	// what's left is seconds
	duration.seconds = Math.round(delta % 60);
	return duration;
}

export function formatDuration(val: number): string {
	const time = splitTime(val / 1000);
	const duration: Array<string> = [];
	if (time.days > 0) {
		duration.push(`${time.days.toString()}d `);
	}
	if (time.hours > 0) {
		if (duration.length > 0) {
			duration.push(`${padTime(time.hours)}:`);
		} else {
			duration.push(`${time.hours.toString()}:`);
		}
	}
	duration.push(padTime(time.minutes), `:${padTime(time.seconds)}`);
	return duration.join('');
}

export function formatFileSize(value?: number | string): string {
	if (value === undefined) {
		return '';
	}
	let val = Number(value);
	let i = -1;
	const byteUnits = [' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
	do {
		val = val / 1024;
		i++;
	} while (val > 1024);

	return Math.max(val, 0.1).toFixed(1) + byteUnits[i];
}
