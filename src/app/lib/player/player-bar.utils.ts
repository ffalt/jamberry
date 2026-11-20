import type { PlayerService } from '@core/services/player/player.service';
import type { QueueService } from '@core/services/queue/queue.service';

export type RepeatMode = 'off' | 'queue' | 'track';

export const PLAYER_BAR_PHONE_WIDTH = 522;
export const PLAYER_BAR_COMPACT_WIDTH = 768;

export function repeatModeOf(player: PlayerService, queue: QueueService): RepeatMode {
	if (player.repeatTrack) {
		return 'track';
	}
	return queue.repeatQueue ? 'queue' : 'off';
}

export function cycleRepeatMode(player: PlayerService, queue: QueueService): void {
	switch (repeatModeOf(player, queue)) {
		case 'off': {
			queue.repeatQueue = true;
			break;
		}
		case 'queue': {
			queue.repeatQueue = false;
			player.repeatTrack = true;
			break;
		}
		default: {
			player.repeatTrack = false;
		}
	}
}
