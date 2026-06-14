export class VisitorEntryPage {
  render(): string {
    return `
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
    <!-- Top Branding -->
    <div class="bg-indigo-600 text-white pt-10 pb-6 px-6 shadow-md rounded-b-[30px] relative z-10">
      <div class="absolute top-[-50%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-lg border border-indigo-100 shrink-0">
          <i class="fa-solid fa-building-shield"></i>
        </div>
        <div>
          <h1 id="entrySocietyName" class="text-xl font-black tracking-tight leading-tight"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading...</h1>
          <p class="text-indigo-200 text-xs font-bold uppercase tracking-widest mt-0.5">Visitor Entry Gate</p>
        </div>
      </div>
    </div>

    <!-- Main Form Area -->
    <div class="flex-1 px-5 pt-6 pb-10 relative z-20">
      <div class="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <div class="mb-5 border-b border-slate-100 pb-4">
          <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
            <i class="fa-solid fa-clipboard-user text-indigo-500"></i> Entry Details
          </h2>
          <p class="text-[11px] text-slate-500 font-medium mt-1">Fill this form to get quick access at the gate.</p>
        </div>

        <div id="entryForm" class="space-y-4">
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Visiting Tower</label>
              <select id="entryTowerSelect" class="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700 cursor-pointer appearance-none">
                <option value="">Select</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Flat Number</label>
              <select id="entryFlatSelect" disabled class="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed outline-none transition-all text-sm font-bold appearance-none">
                <option value="">Select Tower 1st</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Full Name</label>
            <div class="relative">
              <span class="absolute left-3.5 top-3 text-slate-400"><i class="fa-solid fa-user"></i></span>
              <input id="entryVisitorName" type="text" placeholder="E.g. Ramesh" class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mobile Number</label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-slate-400 text-xs"><i class="fa-solid fa-phone"></i></span>
                <input id="entryVisitorMobile" type="tel" placeholder="10-digit" class="w-full pl-8 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700">
              </div>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Purpose</label>
              <select id="entryVisitorPurpose" class="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700 cursor-pointer appearance-none">
                <option value="Delivery">Delivery</option>
                <option value="Cab">Cab/Taxi</option>
                <option value="Guest">Guest</option>
                <option value="Service">Service/Repair</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vehicle Number (Optional)</label>
            <div class="relative">
              <span class="absolute left-3.5 top-3 text-slate-400"><i class="fa-solid fa-car-side"></i></span>
              <input id="entryVehicleNumber" type="text" placeholder="GJ-05-XX-0000" class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700 uppercase">
            </div>
          </div>

          <button id="submitEntryBtn" class="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 outline-none">
            Submit Entry Request <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

      </div>
      
      <!-- Footer Note -->
      <div class="text-center mt-6">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="fa-solid fa-shield-halved"></i> Secured by GateGuard</p>
      </div>
    </div>
  </div>
`;
  }
}
