import "./style.css";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col items-center justify-between p-8">
        <div class="flex-shrink-0 mt-8">
            <img src="/minisiege.png" alt="Minisiege" class="w-full max-w-[400px] sm:max-w-sm h-auto"/>
        </div>
        <div class="flex-1 flex items-center justify-center">
            <button class="bg-[#7B0907] border-4 border-[#5A0605] text-white px-12 sm:px-24 py-3 sm:py-4 text-2xl font-bold rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-200 cursor-pointer" onclick="window.location.href='/game'">
                Play
            </button>
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
