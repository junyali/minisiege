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
	},
	{
		description: "A shift merchant approaches with a glinting smile. What do you do?",
		actions: {
			"buy": { description: "You buy his 'magical' potion. It's just water. At least it's clean water?", coinsChange: -15, healthChange: 5, death: false },
			"ignore": { description: "You walk away. The merchant shouts curses at you but drops a coin!", coinsChange: 3, healthChange: 0, death: false },
			"rob": { description: "You try to rob the merchant but he pulls out a shark gun! Oops!", coinsChange: 0, healthChange: 0, death: true }
		},
		scene: "/events/merchant.png"
	},
	{
		description: "A shift merchant approaches with a glinting smile. What do you do?",
		actions: {
			"buy": { description: "You buy his potion and it actually works! You feel amazing!", coinsChange: -15, healthChange: 50, death: false },
			"ignore": { description: "You walk away. He throws a rock at your back as you leave!", coinsChange: 0, healthChange: -10, death: false },
			"rob": { description: "You successfully rob him! He was carrying a fortune!", coinsChange: 75, healthChange: -5, death: false }
		},
		scene: "/events/merchant.png"
	},
	{
		description: "A goose wearing a tiny business suit waddles up. It honks authoritatively and presents a contract. What do you do?",
		actions: {
			"sign": { description: "You sign the contract. The Enterprise Goose hands you a briefcase of coins and vanishes!", coinsChange: 100, healthChange: 0, death: false },
			"refuse": { description: "You refuse to sign. The goose honks disapprovingly and pecks your ankles!", coinsChange: 0, healthChange: -8, death: false },
			"negotiate": { description: "You try to negotiate. The goose considers, then offers a smaller briefcase.", coinsChange: 35, healthChange: 0, death: false },
			"run": { description: "You run away. The Enterprise Goose deploys its legal team of attack geese!", coinsChange: -25, healthChange: -25, death: false }
		},
		scene: "/events/enterprisegoose.png"
	},
	{
		description: "You stumble into a royal court. The King looks down at you from his throne. What do you do?",
		actions: {
			"bow": { description: "You bow respectfully. The King is pleased and tosses you gold!", coinsChange: 0, healthChange: 0, death: false },
			"challenge": { description: "You challenge the King's authority. His guards aren't amused.", coinsChange: 0, healthChange: 0, death: true },
			"steal": { description: "You try to grab the crown jewels. Security is surprisingly tight!", coinsChange: 0, healthChange: 0, death: true },
			"entertain": { description: "You tell jokes. The King laughs and rewards your wit!", coinsChange: 40, healthChange: 0, death: false },
			"beg": { description: "The King is not happy, and kicks you out of the court.", coinsChange: 0, healthChange: -50, death: false }
		},
		scene: "/events/king.png"
	},
	{
		description: "You arrive at a small village. What do you do?",
		actions: {
			"siege": { description: "You lay siege and wait them out. They eventually surrender their treasures.", coinsChange: 200, healthChange: 0, death: false },
			"burn": { description: "You set fire to their crops. They pay you to stop but you injure yourself in the process", coinsChange: 50, healthChange: -30, death: false },
			"raid": { description: "You break through their defences and loot their supplies. It was unsuccessful and you're severely injured in the process", coinsChange: 0, healthChange: -80, death: false },
			"negotiate": { description: "You offer a ceasefire. They accept and nobody is hurt.", coinsChange: 0, healthChange: 0, death: false }
		},
		scene: "/siege.png"
	},
	{
		description: "You arrive at a small village. What do you do?",
		actions: {
			"siege": { description: "You lay siege and try to wait them out, but they retaliate!", coinsChange: 0, healthChange: -50, death: false },
			"burn": { description: "You set fire to their crops. You don't earn anything in the process but guilt.", coinsChange: 0, healthChange: -1, death: false },
			"raid": { description: "You break through their defences but end up being held ransom and released in poor health!", coinsChange: -500, healthChange: -20, death: false },
			"negotiate": { description: "You offer a ceasefire. They refuse and fight back.", coinsChange: 0, healthChange: -50, death: false }
		},
		scene: "/siege.png"
	},
	{
		description: "You arrive at a small village. What do you do?",
		actions: {
			"siege": { description: "You lay siege and wait them out. Nothing happens...", coinsChange: 0, healthChange: 0, death: false },
			"burn": { description: "You set fire to their crops. It ends up backfiring as you trap yourself in a fiery complex!", coinsChange: 0, healthChange: 0, death: true },
			"raid": { description: "You break through their defences and loot their supplies. They were definitely hiding something!", coinsChange: 300, healthChange: 0, death: false },
			"negotiate": { description: "They offer you a ceasefire. You accept with your riches.", coinsChange: -100, healthChange: 0, death: false }
		},
		scene: "/siege.png"
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
			return this.getEndGame();
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
			return "Can't do that!";
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
		this.currentScene = "/events/death.png"
		return `
			💀 YOU DIED! 💀
			
			You survived ${this.player.week - 1} weeks and collected ${this.player.coins} coins.
			
			Share your result:
			
			"I survived ${this.player.week - 1} weeks in minisiege and collected ${this.player.coins} coins!
			How long can YOU survive? Play at [tba]!"
			
			Refresh to play again!
		`;
	}

	private getEndGame(): string {
		this.currentScene = "/events/yay.gif"
		return `
			🎉 CONGRATULATIONS 🎉
			
			You survived all 10 weeks of the siege and collected ${this.player.coins} coins!
			
			Share your result:
			
			"I survived all 10 weeks in minisiege and collected ${this.player.coins} coins!
			How long can YOU survive? Play at [tba]!"
			
			Refresh to play again!
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
