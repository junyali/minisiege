import "./style.css";
import { createFooter } from "./components.ts";

function createDesktopInterface(): string {
	return `
		<div class="hidden lg:block relative bg-black rounded-3xl shadow-2xl p-6 max-w-5xl w-full h-[70vh]">
            <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src="/hacktab.png" alt="" class="h-6 w-auto"/>
			</div>
            <div class="bg-black rounded-2xl h-full p-6 flex gap-4">
                <div class="flex-[3] flex flex-col">
                    <div class="flex-1 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto text-sm text-white border border-gray-700">
                        <p class="break-all overflow-y-auto">meow</p>
                    </div>
                    <input type="text"
                           placeholder="typeity typey type"
                           class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                           id="command-input"/>
                </div>
                <div class="flex-[2] bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center p-4">
                    <img src="/minisiege.png"
                         alt=""
                         class="max-w-full max-h-full object-contain rounded"
                         id="scene-image"/>
                    <!-- to be changed -->
                </div>
            </div>
        </div>
	`;
}

function createMobileInterface(): string {
	return `
		<div class="lg:hidden relative bg-black rounded-3xl shadow-2xl p-4 max-w-sm w-full h-[60vh]">
            <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src="/hacktab.png" alt="" class="h-6 w-auto"/>
			</div>
			<div class="bg-black rounded-2xl h-full p-4 flex flex-col gap-4">
				<div class="flex-1 bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center p-3">
					<img src="/minisiege.png"
					     alt=""
					     class="max-w-full max-h-full object-contain rounded"
					     id="scene-image-mobile"/>
				</div>
				<div class="flex-[3] flex flex-col">
					<div class="flex-1 bg-gray-900 rounded-lg p-3 mb-3 overflow-y-auto text-xs text-white border border-gray-700">
						<p class="break-all overflow-y-auto">meow</p>
					</div>
					<input type="text"
                           placeholder="typeity typey type"
                           class="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 text-sm"
                           id="command-input"/>
				</div>
			</div>
		</div>
	`;
}

function renderApp() {
	const app = document.querySelector<HTMLDivElement>('#app');
	if (!app) {
		return;
	}

	app.innerHTML = `
		<div class="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col items-center justify-between p-8">
			${createDesktopInterface()}
			${createMobileInterface()}
			${createFooter()}
		</div>
	`;

	setupEventListeners();
}

function setupEventListeners() {
	// handle user input logic here idk
}

document.addEventListener("DOMContentLoaded", () => {
	renderApp();
});
