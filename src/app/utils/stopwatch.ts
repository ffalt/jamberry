export class StopWatch {
	private startAt = 0; // Time of last start / resume. (0 if not running)
	private lapTime = 0; // Time on the clock when last stopped in milliseconds

	start(): void {
		this.startAt = this.startAt === 0 ? Date.now() : this.startAt;
	}

	pause(): void {
		this.lapTime = this.startAt ? this.lapTime + Date.now() - this.startAt : this.lapTime;
		this.startAt = 0;
	}

	reset(): void {
		this.lapTime = 0;
		this.startAt = 0;
	}

	time(): number {
		return this.lapTime + (this.startAt ? Date.now() - this.startAt : 0);
	}
}
