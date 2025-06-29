import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, inject} from '@angular/core';
import {Router} from '@angular/router';

import {AdminFolderService, NotifyService} from '@core/services';
import {Jam, JamService, TrackHealthID} from '@jam';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface TrackHealthHintSolution {
	name: string;
	running?: boolean;
	fixable?: boolean;

	click(): void;
}

export interface TrackHealthHint {
	hint: Jam.TrackHealthHint;
	description: string;
}

@Component({
	selector: 'app-track-health',
	templateUrl: './track-health.component.html',
	styleUrls: ['./track-health.component.scss'],
	standalone: false
})
export class TrackHealthComponent implements OnChanges, OnInit, OnDestroy {
	hints?: Array<TrackHealthHint>;
	solutions: Array<TrackHealthHintSolution> = [];
	@Input() trackHealth?: Jam.TrackHealth;
	@Output() readonly resolvedEvent = new EventEmitter<void>();
	protected readonly unsubscribe = new Subject<void>();
	private readonly jam = inject(JamService);
	private readonly notify = inject(NotifyService);
	private readonly folderService = inject(AdminFolderService);
	private readonly router = inject(Router);

	ngOnChanges(): void {
		this.display(this.trackHealth);
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	ngOnInit(): void {
		this.folderService.tracksChange
			.pipe(takeUntil(this.unsubscribe)).subscribe(change => {
				const health = this.trackHealth;
				if (health && health.track.id === change.id) {
					health.health = [];
					this.jam.track.health({ids: [health.track.id], healthMedia: true})
						.then(data => {
							const h = data.find(d => d.track.id === health.track.id);
							if (h && h.health) {
								health.track = h.track;
								health.health = h.health;
							} else {
								health.health = [];
							}
							if (health.health.length === 0) {
								this.resolvedEvent.emit();
							}
							this.display(health);
						})
						.catch(e => {
							this.notify.error(e);
						});
				}
			}
		);
	}

	fixAll(): void {
		for (const solution of this.solutions) {
			if (solution.fixable && !solution.running && solution.click) {
				solution.click();
			}
		}
	}

	private display(trackHealth?: Jam.TrackHealth): void {
		this.hints = [];
		this.solutions = [];
		if (trackHealth?.health) {
			this.hints = trackHealth.health.map(hint => {
				const description = this.describeHint(hint, trackHealth.track);
				return {hint, description};
			});
		}
	}

	private describeTagHint(hint: Jam.TrackHealthHint, track: Jam.Track): string {
		let description = '';
		if (hint.id === TrackHealthID.tagValuesExists) {
			description = (hint.details || []).map(d => d.reason.toUpperCase()).join(', ');
		} else if (hint.id === TrackHealthID.id3v2Garbage) {
			description = (hint.details || []).map(d => d.reason).join(', ');
		} else if (hint.id === TrackHealthID.id3v2Valid) {
			description = (hint.details || []).map(d => {
				if (d.expected && d.actual) {
					return `${d.reason}  (${d.actual} instead of ${d.expected})`;
				}
				return d.reason;
			}).join(', ');
		}
		if (!this.solutions.find(sol => sol.name === 'Edit Tag')) {
			const sol: TrackHealthHintSolution = {
				name: 'Edit Tag',
				click: (): void => {
					this.router.navigate([`/admin/folder/${track.parentID}/tags`])
						.catch(e => {
							console.error(e);
						});
				}
			};
			this.solutions.push(sol);
		}
		return description;
	}

	private describeMp3GarbageHint(hint: Jam.TrackHealthHint, track: Jam.Track): string {
		let description = '';
		if (hint.details && hint.details.length > 0) {
			description = `${hint.details[0].reason} (${hint.details[0].actual} bytes)`;
		}
		if (!this.solutions.find(sol => sol.name === 'Fix MP3')) {
			const sol: TrackHealthHintSolution = {
				name: 'Fix MP3',
				fixable: true,
				click: (): void => {
					if (sol.running) {
						return;
					}
					sol.running = true;
					this.jam.track.fix({id: track.id, fixID: hint.id})
						.then(item => {
							this.folderService.waitForQueueResult('Fixing Track MP3', item, [], [], [track.id]);
						})
						.catch(e => {
							this.notify.error(e);
						});
				}
			};
			this.solutions.push(sol);
		}
		return description;
	}

	private describeMp3ErrorHint(hint: Jam.TrackHealthHint, track: Jam.Track): string {
		const description = `Stream Errors: ${(hint.details || []).length}`;

		if (!this.solutions.find(sol => sol.name === 'Fix Stream')) {
			const sol: TrackHealthHintSolution = {
				name: 'Fix Stream',
				fixable: true,
				click: (): void => {
					if (sol.running) {
						return;
					}
					sol.running = true;
					this.jam.track.fix({id: track.id, fixID: hint.id})
						.then(item => {
							this.folderService.waitForQueueResult('Fixing Track Stream', item, [], [], [track.id]);
						})
						.catch(e => {
							this.notify.error(e);
						});
				}
			};
			this.solutions.push(sol);
		}
		return description;
	}

	private describeID3v1Hint(hint: Jam.TrackHealthHint, track: Jam.Track): string {
		if (!this.solutions.find(sol => sol.name === 'Remove ID3v1')) {
			const sol: TrackHealthHintSolution = {
				name: 'Remove ID3v1',
				fixable: true,
				click: (): void => {
					if (sol.running) {
						return;
					}
					sol.running = true;
					this.jam.track.fix({id: track.id, fixID: hint.id})
						.then(item => {
							this.folderService.waitForQueueResult('Remove ID3v1', item, [], [], [track.id]);
						})
						.catch(e => {
							this.notify.error(e);
						});
				}
			};
			this.solutions.push(sol);
		}
		return '';
	}

	private describeMP3HeaderHint(hint: Jam.TrackHealthHint, track: Jam.Track): string {
		let description = '';
		if (hint.id === TrackHealthID.mp3HeaderValid) {
			description = (hint.details || []).map(d => {
				if (d.expected && d.actual) {
					return `${d.reason}  (${d.actual} instead of ${d.expected})`;
				}
				return d.reason;
			}).join(', ');
		}
		if (!this.solutions.find(sol => sol.name === 'Fix Header')) {
			const sol: TrackHealthHintSolution = {
				name: 'Fix Header',
				fixable: true,
				click: (): void => {
					if (sol.running) {
						return;
					}
					sol.running = true;
					this.jam.track.fix({id: track.id, fixID: hint.id})
						.then(item => {
							this.folderService.waitForQueueResult('Fixing Track Header', item, [], [], [track.id]);
						})
						.catch(e => {
							this.notify.error(e);
						});
				}
			};
			this.solutions.push(sol);
		}
		return description;
	}

	private describeHint(hint: Jam.TrackHealthHint, track: Jam.Track): string {
		switch (hint.id) {
			case TrackHealthID.tagValuesExists:
			case TrackHealthID.id3v2Garbage:
			case TrackHealthID.id3v2Exists:
			case TrackHealthID.id3v2Valid:
				return this.describeTagHint(hint, track);
			case TrackHealthID.mp3Garbage:
				return this.describeMp3GarbageHint(hint, track);
			case TrackHealthID.mp3MediaValid:
				return this.describeMp3ErrorHint(hint, track);
			case TrackHealthID.id3v2NoId3v1:
				return this.describeID3v1Hint(hint, track);
			case TrackHealthID.mp3HeaderExists:
			case TrackHealthID.mp3HeaderValid:
				return this.describeMP3HeaderHint(hint, track);
			case TrackHealthID.flacMediaValid:
			default:
				break;
		}
		return '';
	}
}
