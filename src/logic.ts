interface GameEvent {
	description: string;
	actions: { [key: string]: ActionResult };
	scene: string;
}

interface ActionResult {
	description: string;
	coinsChange?: number;
	healthChange?: number;
	death?: boolean;
}

interface Player {
	health: number;
	coins: number;
	week: number;
	isAlive: boolean;
}

const EVENTS: GameEvent[] = [
	// yeah basically funni stuff goes here :3
]

export class Minisiege {
	private player: Player;
	private currentEvent: GameEvent | null = null;

	constructor() {
		this.player = {
			health: 100,
			coins: 10,
			week: 1,
			isAlive: true
		};
	}

	startWeek(): string {
		if (this.player.week > 10) {
			// need to add logic for ending the game or smthn
		}

		this.currentEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];

		return `
			WEEK ${this.player.week}
			${this.currentEvent.description}
			Available actions: ${Object.keys(this.currentEvent.actions).join(", ")}
		`;
	}

	handleSpecialCommand(command: string): string | null {
		switch (command.toLowerCase()) {
			case "next":
				return this.currentEvent ? "I can't do that right now..." : this.startWeek();
			case "stats":
				return `Week: ${this.player.week}/10, Health: ${this.player.health}, Coins: ${this.player.coins}`;
			default:
				return null;
		}
	}
}
