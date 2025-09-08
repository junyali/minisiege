import "./style.css";
import { createFooter } from "./components.ts";

function renderApp() {
	const app = document.querySelector<HTMLDivElement>('#app');
	if (!app) {
		return;
	}

	app.innerHTML = `
		<div class="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col items-center justify-between p-8">
	        <div class="flex-shrink-0 mt-8">
	            <img src="/minisiege.png" alt="Minisiege" class="w-full max-w-[400px] sm:max-w-sm h-auto"/>
	        </div>
	        <div class="flex-1 flex items-center justify-center">
	            <button class="bg-[#7B0907] border-4 border-[#5A0605] text-white px-12 sm:px-24 py-3 sm:py-4 text-2xl font-bold rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-200 cursor-pointer" id="play-button">
	                Play
	            </button>
	        </div>
	        ${createFooter()}
	    </div>
	`;

	setupEventListeners();
}

function setupEventListeners() {
	const playButton = document.getElementById("play-button");
	if (playButton) {
		playButton.addEventListener("click", () => {
			window.location.href = "/game/index.html";
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	renderApp();
})
