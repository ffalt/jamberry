export class Poller<T extends { id: string }> {
	private readonly currentPolling: { [id: string]: boolean } = {};

	constructor(private readonly pollFn: (o: T, cb: (next: boolean) => void) => void) {

	}

	poll(o: T, pollNow: boolean = false): void {
		if (!this.currentPolling[o.id]) {
			this.currentPolling[o.id] = true;
			if (pollNow) {
				this.pollIt(o, () => {
					this.currentPolling[o.id] = undefined;
				});
			} else {
				this.doPoll(o, () => {
					this.currentPolling[o.id] = undefined;
				});
			}
		}
	}

	private pollIt(o: T, cb: () => void): void {
		this.pollFn(o, next => {
			if (next) {
				this.doPoll(o, cb);
			} else {
				cb();
			}
		});
	}

	private doPoll(o: T, cb: () => void): void {
		setTimeout(() => {
			this.pollFn(o, next => {
				if (next) {
					this.doPoll(o, cb);
				} else {
					cb();
				}
			});
		}, 2000);
	}

}
