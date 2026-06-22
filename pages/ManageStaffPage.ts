export class ManageStaffPage {
  render(): string {
    return `
      <div class="min-h-screen bg-slate-50 font-sans pb-20">
        <header class="bg-indigo-600 pt-10 pb-6 px-6 text-white rounded-b-[30px] shadow-md">
          <div class="flex items-center justify-between max-w-4xl mx-auto">
            <button id="backToDashboardBtn" class="w-10 h-10 bg-white/20 hover:bg-white/30 transition-colors rounded-xl flex items-center justify-center backdrop-blur-sm outline-none">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <h1 class="text-xl font-black tracking-wide">Manage Staff</h1>
            <div class="w-10 h-10"></div>
          </div>
        </header>

        <div class="max-w-4xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
            <h3 class="font-black text-slate-800 mb-5 flex items-center gap-2 text-lg">
              <div class="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center text-sm">
                <i class="fa-solid fa-user-plus"></i>
              </div>
              Register New Staff
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                <input id="staffName" type="text" placeholder="e.g. Ramesh Kumar" class="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-900">
              </div>
              
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Mobile Number</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</span>
                  <input id="staffMobile" type="tel" maxlength="10" placeholder="9876543210" class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-900">
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Staff Role</label>
                <select id="staffRole" class="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-900 appearance-none cursor-pointer">
                  <option value="Maid">Maid / Housekeeping</option>
                  <option value="Driver">Driver</option>
                  <option value="Cook">Cook / Chef</option>
                  <option value="Milkman">Milkman / Vendor</option>
                  <option value="Security">Security Guard</option>
                  <option value="Maintenance">Maintenance / Plumber</option>
                  <option value="Other">Other Staff</option>
                </select>
              </div>

              <button id="saveStaffBtn" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold shadow-lg transition-all flex justify-center items-center gap-2 outline-none mt-2">
                <i class="fa-solid fa-id-card"></i> Generate Staff ID
              </button>
            </div>
          </div>

          <div>
            <h3 class="font-black text-slate-800 mb-4 ml-1 text-lg">Registered Staff</h3>
            <div id="staffListContainer" class="space-y-3">
              <div class="text-center py-10 bg-white rounded-3xl border border-slate-100 text-slate-400">
                <i class="fa-solid fa-circle-notch fa-spin text-3xl mb-3 text-indigo-500/50"></i><br>
                <span class="text-sm font-bold">Loading staff directory...</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}
