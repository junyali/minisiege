import "./style.css";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col items-center justify-between p-8">
        <div class="relative">
            <img src="/hacktab.png" alt="" class="w-auto h-screen max-h-screen object-contain" id="device-image"/>
	        <div class="absolute inset-0 flex items-center justify-center"></div>
	        <div class="w-full flex flex-col items-center mt-8 pt-2">
	            <div class="text-gray-950 text-lg tracking-widest text-center">
	                --------------------------------------------------------------------------------
				</div>
	            <footer class="text-gray-950 text-2xl font-black text-center p-4">
	                made with ❤️ by <a href="https://github.com/junyali" class="text-[#7B0907] hover:underline transition-all duration-200">junya</a>!
				</footer>
			</div>
		</div>
    </div>
`
