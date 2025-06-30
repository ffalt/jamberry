export class Poller<T extends { id: string }> {
	private readonly currentPolling = new Map<string, boolean>();

	constructor(private readonly pollFn: (o: T, cb: (next: boolean) => void) => void) {

	}

	poll(o: T, pollNow: boolean = false): void {
		if (!this.currentPolling.get(o.id)) {
			this.currentPolling.set(o.id, true);
			if (pollNow) {
				this.pollIt(o, () => {
					this.currentPolling.delete(o.id);
				});
			} else {
				this.doPoll(o, () => {
					this.currentPolling.delete(o.id);
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
