export class GuardConsolePage {
  render(): string {
    return `
  <div class="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 font-sans">
    
    <!-- Header -->
    <div class="max-w-7xl mx-auto flex justify-between items-center bg-slate-800 p-5 rounded-2xl border border-slate-700 mb-6 shadow-lg">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-md border border-indigo-400">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <div>
          <h1 id="societyNameTitle" class="text-xl font-black text-white tracking-tight">Loading...</h1>
          <p class="text-[11px] text-indigo-300 font-bold tracking-widest uppercase">Security Guard Console</p>
        </div>
      </div>
      <div id="clockDisplay" class="text-2xl font-mono font-bold text-emerald-400 bg-slate-900 px-5 py-2.5 rounded-xl border border-slate-700 shadow-inner">
        00:00:00
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left Panel: VVIP & Manual Entry -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        
        <!-- VVIP Box -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 shadow-xl">
          <h3 class="text-white font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <i class="fa-solid fa-ticket text-amber-400"></i> VVIP / Guest Code
          </h3>
          <div class="flex gap-3">
            <input id="vvipInputCode" type="text" placeholder="6-DIGIT" maxlength="6" class="flex-1 bg-slate-950 border border-slate-600 focus:border-indigo-500 text-indigo-400 font-mono text-xl tracking-[0.2em] font-bold px-4 py-3 rounded-xl outline-none uppercase transition-all">
            <button id="verifyVvipBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-xl shadow-lg transition-all outline-none">
              Verify
            </button>
          </div>
        </div>

        <!-- Manual Entry Form -->
        <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
          <h2 class="text-base font-bold text-white mb-5 border-b border-slate-700 pb-3 flex items-center gap-2">
            <i class="fa-solid fa-pen-to-square text-indigo-400"></i> Manual Gate Entry
          </h2>
          
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tower</label>
                <select id="guardTowerSelect" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-indigo-500 outline-none text-sm cursor-pointer appearance-none transition-all">
                  <option value="">Select</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Flat</label>
                <select id="guardFlatSelect" disabled class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed outline-none text-sm appearance-none transition-all">
                  <option value="">Select Tower 1st</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Visitor Name</label>
              <div class="relative">
                <span class="absolute left-3.5 top-3 text-slate-500"><i class="fa-solid fa-user"></i></span>
                <input id="guardVisitorName" type="text" placeholder="Full name" class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-indigo-500 outline-none text-sm transition-all">
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
              <div class="relative">
                <span class="absolute left-3.5 top-3 text-slate-500"><i class="fa-solid fa-phone"></i></span>
                <input id="guardVisitorMobile" type="tel" placeholder="10-digit number" class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-indigo-500 outline-none text-sm transition-all">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Purpose</label>
                <select id="guardVisitorPurpose" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-indigo-500 outline-none text-sm cursor-pointer appearance-none transition-all">
                  <option value="Guest">Guest</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Cab">Cab</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Vehicle (Opt.)</label>
                <input id="guardVehicleNumber" type="text" placeholder="e.g. GJ05..." class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-indigo-500 outline-none text-sm transition-all">
              </div>
            </div>

            <button id="guardSubmitBtn" class="w-full mt-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-lg transition-all outline-none flex items-center justify-center gap-2">
              <i class="fa-solid fa-check"></i> ALLOW ENTRY
            </button>
          </div>
        </div>
      </div>

      <!-- Right Panel: Logs & Scanner -->
      <div class="lg:col-span-7 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col h-[650px] relative">
        <div class="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-list-ul text-slate-400"></i> Today's Live Log
          </h2>
          <button id="openScannerBtn" class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all outline-none flex items-center gap-2">
            <i class="fa-solid fa-qrcode"></i> Scan Staff
          </button>
        </div>
        
        <div id="guardRecordsContainer" class="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          <div class="text-center text-slate-500 py-10 text-sm font-medium">
            <i class="fa-solid fa-circle-notch fa-spin text-xl mb-2"></i><br>Loading records...
          </div>
        </div>
      </div>

    </div>

    <!-- QR Scanner Modal -->
    <div id="scannerModal" class="fixed inset-0 bg-slate-950/95 z-[60] hidden flex-col items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-slate-900 p-6 rounded-3xl max-w-sm w-full relative shadow-2xl border border-slate-700">
        <button id="closeScannerBtn" class="absolute top-4 right-5 text-slate-400 hover:text-white font-black text-xl outline-none">&times;</button>
        <h3 class="text-lg font-black text-white text-center mb-4">Scan Staff QR Card</h3>
        <div id="qr-reader" class="w-full rounded-xl overflow-hidden bg-black border border-slate-700 min-h-[250px]"></div>
      </div>
    </div>

  </div>
  
  <style>
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
  </style>
`;
  }
}
