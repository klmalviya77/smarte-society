export class SocietyDashboardPage {
  render(): string {
    return `
  <div class="min-h-screen bg-slate-50 font-sans pb-12">
    <nav class="bg-slate-900 text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-sm shadow-md">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <span class="font-black text-lg hidden sm:block tracking-tight">Admin Console</span>
      </div>
      <button id="logoutBtn" class="text-xs font-bold text-slate-300 hover:text-white transition-colors outline-none flex items-center gap-2">
        <i class="fa-solid fa-power-off"></i> Log out
      </button>
    </nav>

    <div class="max-w-6xl mx-auto px-6 py-8">
      
      <div id="societyInfoContainer" class="mb-8">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-pulse">
          <div class="h-8 bg-slate-200 rounded w-1/3 mb-4"></div><div class="h-4 bg-slate-100 rounded w-1/2 mb-8"></div>
        </div>
      </div>

      <h3 class="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
        <i class="fa-solid fa-layer-group text-indigo-500"></i> Workspace Modules
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <button id="addFlatsBtn" class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex items-center gap-4 group outline-none">
          <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-building"></i></div>
          <div><h4 class="font-bold text-slate-900 text-sm">Manage Flats</h4><p class="text-[11px] text-slate-500 font-medium">Add/Edit towers & flats</p></div>
        </button>
        
        <button id="visitorRecordsBtn" class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex items-center gap-4 group outline-none">
          <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-address-book"></i></div>
          <div><h4 class="font-bold text-slate-900 text-sm">Visitor Logs</h4><p class="text-[11px] text-slate-500 font-medium">Gate entries & exports</p></div>
        </button>

        <button id="manageStaffBtn" class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex items-center gap-4 group outline-none">
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-users-gear"></i></div>
          <div><h4 class="font-bold text-slate-900 text-sm">Manage Staff</h4><p class="text-[11px] text-slate-500 font-medium">Register daily help</p></div>
        </button>

        <button id="manageResidentsBtn" class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex items-center gap-4 group outline-none">
          <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-house-user"></i></div>
          <div><h4 class="font-bold text-slate-900 text-sm">Manage Residents</h4><p class="text-[11px] text-slate-500 font-medium">Mobiles & device locks</p></div>
        </button>

        <button id="staffLogsBtn" class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex items-center gap-4 group outline-none">
          <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-clipboard-user"></i></div>
          <div><h4 class="font-bold text-slate-900 text-sm">Staff Attendance</h4><p class="text-[11px] text-slate-500 font-medium">Daily IN/OUT tracking</p></div>
        </button>

        <button id="guardPinBtn" class="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all text-left flex items-center gap-4 group outline-none">
          <div class="w-12 h-12 bg-slate-800 text-indigo-400 rounded-xl flex items-center justify-center text-xl shrink-0 border border-slate-700"><i class="fa-solid fa-tablet-screen-button"></i></div>
          <div><h4 class="font-bold text-white text-sm">Guard Tablet Setup</h4><p class="text-[11px] text-slate-400 font-medium">Generate 6-digit access PIN</p></div>
        </button>

      </div>
    </div>
  </div>
`;
  }
}
