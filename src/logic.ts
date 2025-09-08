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
		scene: "/events/evil_dino.jpg"
	},
	{
		description: "You walk across a bridge and encounter a troll who orders you to pay a toll. What do you do?",
		actions: {
			"pay": { description: "You pay the troll the toll and it lets you through!", coinsChange: -10, healthChange: 0, death: false },
			"avoid": { description: "You try to avoid paying, but the troll fines you!", coinsChange: -50, healthChange: 0, death: false },
			"attack": { description: "You attack the troll, but it trolls you first!", coinsChange: 0, healthChange: 0, death: true }
		},
		scene: "/events/troll.png"
	}
]

export class Minisiege {
	private player: Player;
	private currentEvent: GameEvent | null = null;
	private currentScene: string = "";

	constructor() {
		this.player = {
			health: 100,
			coins: 10,
			week: 1,
			isAlive: true
		};
	}

	getIntroStory(): string {
		return `
			orpheus points to the bottom corner where you can see just one castle, alone in a sea of fog.
			'Hey! that looks like us! only... why did you draw yourself as a dragon?'
			heidi gives a little smirk as you scan the rest of the map you start to realize what this means...
			'wait... so... there's more out there?'
			as you keep looking over the map you see just how vast the world truly is.
			'there's so much unexplored! so many opportunities for adventure!'
			orpheus and heidi nod exitedly together
			'well then, I guess we should get prepared... it's going to be a long one...'

			Your starting stats:
			- Health: ${this.player.health}
			- Coins: ${this.player.coins}
			- Current Week: ${this.player.week}
			
			Are you ready? Type 'start' to begin your first week!
		`;
	}

	startWeek(): string {
		if (this.player.week > 10) {
			// need to add logic for ending the game or smthn
		}

		this.currentEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
		this.currentScene = this.currentEvent.scene;

		return `
			WEEK ${this.player.week}
			${this.currentEvent.description}
			Available actions: ${Object.keys(this.currentEvent.actions).join(", ")}
		`;
	}

	processAction(action: string): string {
		if (!this.currentEvent) {
			if (action.toLowerCase() === "start") {
				return this.startWeek();
			}
			return "Type 'start' to begin!";
		}

		const normalised = action.toLowerCase().trim();
		const result = this.currentEvent.actions[normalised];

		if (!result) {
			return "Can't do that!";
		}

		if (result.coinsChange) this.player.coins += result.coinsChange;
		if (result.healthChange) this.player.health += result.healthChange;
		if (result.death) this.player.isAlive = !result.death;

		if (this.player.health <= 0 || !this.player.isAlive) {
			this.player.isAlive = false;
			this.player.health = 0;
		}

		this.player.week++;
		this.currentEvent = null;

		let response = `
			${result.description}
			Stats:
			- Health: ${this.player.health}
			- Coins: ${this.player.coins}
		`;

		if (this.player.isAlive) {
			if (this.player.week <= 10) {
				response += `\n\nType 'next' to continue to week ${this.player.week}!`;
			} else {
				response += "\n\n" + this.getEndGame();
			}
		} else {
			response += "\n\n" + this.getDeathGame();
		}

		return response;
	}

	getCurrentScene(): string {
		return this.currentScene;
	}

	private getDeathGame(): string {
		return `
			yeah ur dead buddy
		`;
	}

	private getEndGame(): string {
		return `
			woah u cool!!
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
