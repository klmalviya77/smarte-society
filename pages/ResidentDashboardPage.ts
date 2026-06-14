export class ResidentDashboardPage {
  render(): string {
    return `
  <div class="min-h-screen bg-slate-50 font-sans pb-20 md:pb-12">
    <!-- Mobile App Header -->
    <div class="bg-indigo-600 text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-lg relative overflow-hidden">
      <div class="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      
      <div class="flex justify-between items-center relative z-10">
        <div>
          <p class="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Welcome Home</p>
          <h1 id="resNameTitle" class="text-2xl font-black tracking-tight">Loading...</h1>
        </div>
        <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl border border-white/20 shadow-inner">
          <i class="fa-solid fa-house-user"></i>
        </div>
      </div>
      
      <div class="mt-6 flex items-center gap-3 relative z-10">
        <div class="px-4 py-2 bg-indigo-800/50 rounded-xl border border-indigo-500/30 backdrop-blur-sm">
          <p class="text-[10px] text-indigo-300 font-bold uppercase">Flat No.</p>
          <p id="resFlatNumber" class="text-lg font-black text-white">--</p>
        </div>
        <div class="px-4 py-2 bg-indigo-800/50 rounded-xl border border-indigo-500/30 backdrop-blur-sm flex-1">
          <p class="text-[10px] text-indigo-300 font-bold uppercase">Society</p>
          <p id="resSocietyName" class="text-sm font-bold text-white truncate w-32">--</p>
        </div>
      </div>
    </div>

    <div class="max-w-md mx-auto px-5 -mt-8 relative z-20">
      
      <!-- VVIP Pass Generator Card -->
      <div class="bg-white rounded-3xl p-6 shadow-xl shadow-indigo-100/50 border border-slate-100 mb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center text-lg border border-amber-100">
            <i class="fa-solid fa-ticket"></i>
          </div>
          <div>
            <h2 class="text-base font-bold text-slate-800">Generate VVIP Pass</h2>
            <p class="text-[11px] text-slate-500 font-medium">Pre-approve entry for guests.</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <div class="relative">
              <span class="absolute left-3.5 top-3 text-slate-400"><i class="fa-solid fa-user-astronaut"></i></span>
              <input id="guestNameInput" type="text" placeholder="Guest Name" class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700">
            </div>
          </div>
          <button id="generatePassBtn" class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 outline-none">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Create Pass
          </button>
        </div>
        
        <!-- Generated Pass Result (Hidden by default) -->
        <div id="generatedPassResult" class="hidden mt-5 pt-5 border-t border-slate-100 text-center">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Share this code with guest</p>
          <div id="vvipCodeDisplay" class="text-4xl font-mono font-black text-indigo-600 tracking-[0.2em] mb-4 bg-indigo-50 py-3 rounded-xl border-2 border-dashed border-indigo-200">
            ------
          </div>
          <button id="sharePassBtn" class="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 outline-none">
            <i class="fa-brands fa-whatsapp text-lg"></i> Share via WhatsApp
          </button>
        </div>
      </div>

      <!-- Recent Visitors for this Flat -->
      <h3 class="text-sm font-black text-slate-900 mb-3 px-1 flex items-center gap-2">
        <i class="fa-solid fa-clock-rotate-left text-slate-400"></i> My Recent Visitors
      </h3>
      
      <div id="residentVisitorsContainer" class="space-y-3">
        <div class="text-center py-8 text-slate-400 text-sm font-medium bg-white rounded-2xl border border-slate-100">
          <i class="fa-solid fa-circle-notch fa-spin text-xl mb-2"></i><br>Loading logs...
        </div>
      </div>

    </div>
  </div>
`;
  }
}
