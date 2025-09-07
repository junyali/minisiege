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
	{
		description: "You encounter an evil dino! What do you do?",
		actions: {
			"attack": { description: "You fight and win, finding some loose change!", coinsChange: 5, healthChange: -10, death: false },
			"defend": { description: "You block the dino's attack and scare it away!", coinsChange: 0, healthChange: -5, death: false },
			"flee": { description: "You run away safely but drop your loot!", coinsChange: -30, healthChange: 0, death: false }
		},
		scene: "/evil_dino.jpg"
	},
	{
		description: "You walk across a bridge and encounter a troll who orders you to pay a toll. What do you do?",
		actions: {
			"pay": { description: "You pay the troll the toll and it lets you through!", coinsChange: -10, healthChange: 0, death: false },
			"avoid": { description: "You try to avoid paying, but the troll fines you!", coinsChange: -50, healthChange: 0, death: false },
			"attack": { description: "You attack the troll, but it trolls you first!", coinsChange: 0, healthChange: 0, death: true }
		},
		scene: "/troll.png"
	}
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
