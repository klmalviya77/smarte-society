export class ResidentClaimPage {
  render(): string {
    return `
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
    <!-- Decorative Background -->
    <div class="absolute top-[-10%] right-[-5%] w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative z-10">
      
      <!-- Header -->
      <div class="bg-slate-900 p-8 text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-5 text-7xl transform rotate-12"><i class="fa-solid fa-house-chimney-user"></i></div>
        <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl mx-auto mb-4 shadow-inner border border-white/10 backdrop-blur-sm">
          <i class="fa-solid fa-mobile-screen-button"></i>
        </div>
        <h2 id="claimSocietyTitle" class="text-xl font-black text-white mb-1 tracking-tight"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading...</h2>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Resident Registration</p>
      </div>

      <!-- Form Body -->
      <div class="p-7 space-y-4">
        <div class="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl mb-2 flex items-start gap-3">
          <i class="fa-brands fa-whatsapp text-emerald-500 text-xl mt-0.5"></i>
          <p class="text-[11px] text-emerald-800 font-semibold leading-relaxed">
            Register your WhatsApp number to receive instant visitor alerts from the main gate.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tower / Block</label>
            <select id="claimTowerSelect" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer text-sm font-bold text-slate-700 appearance-none">
              <option value="">Select</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Flat Number</label>
            <select id="claimFlatSelect" disabled class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed outline-none transition-all text-sm font-bold appearance-none">
              <option value="">Select Tower 1st</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Resident Full Name</label>
          <div class="relative">
            <span class="absolute left-3.5 top-3 text-slate-400"><i class="fa-solid fa-user"></i></span>
            <input id="residentName" type="text" placeholder="E.g. Rahul Sharma" class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700">
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
          <div class="relative">
            <span class="absolute left-4 top-3 text-slate-400 text-sm font-bold">+91</span>
            <input id="residentMobile" type="tel" placeholder="9876543210" class="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700">
          </div>
        </div>

        <button id="submitClaimBtn" class="w-full mt-2 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 outline-none">
          Verify & Save Details <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  </div>
`;
  }
}
