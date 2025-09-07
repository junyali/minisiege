import "./style.css";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col items-center justify-between p-8">
        <div class="relative bg-black rounded-3xl shadow-2xl p-6 max-w-5xl w-full h-[60vh]">
            <div class="bg-black rounded-2xl h-full p-4 flex gap-4">
                <div class="flex-[3] flex flex-col">
                    <div class="flex-1 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto text-sm text-white border border-gray-700">
                        <p class="break-all overflow-y-auto">meowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
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
        <div class="w-full flex flex-col items-center mt-8 pt-2">
            <div class="text-gray-950 text-lg tracking-widest text-center">
                --------------------------------------------------------------------------------
			</div>
            <footer class="text-gray-950 text-2xl font-black text-center p-4">
				made with ❤️ by <a href="https://github.com/junyali" class="text-[#7B0907] hover:underline transition-all duration-200">junya</a>!
			</footer>
		</div>
    </div>
`
