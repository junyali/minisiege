import type { Config } from "tailwindcss";

export default {
	content: [
		"./index.html",
		"./game/index.html",
		"./src/**/*.{js,ts,jsx,tsc}",
	],
	plugins: [],
} satisfies Config;
