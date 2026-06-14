export class VisitorRecordsPage {
  render(): string {
    return `
  <div class="min-h-screen bg-slate-50 pb-12 font-sans">
    <header class="bg-slate-900 text-white py-5 px-6 shadow-md sticky top-0 z-40">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-3">
          <button id="backToDashboardBtn" class="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors outline-none">
            <i class="fa-solid fa-arrow-left text-sm text-slate-300"></i>
          </button>
          <div>
            <h1 class="text-xl font-black tracking-tight">Visitor Logs</h1>
            <p class="text-xs text-slate-400 font-medium mt-0.5">Monitor gate entries & download CSV reports.</p>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-6 py-6">
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-5 flex flex-col md:flex-row gap-3 items-center">
        <div class="flex-1 relative w-full">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input type="text" id="searchInput" placeholder="Search by Name, Mobile or Flat..." class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 text-sm font-medium text-slate-700 transition-all">
        </div>
        
        <div class="w-full md:w-40 relative">
          <span class="absolute left-3 top-2.5 text-slate-400 text-sm pointer-events-none"><i class="fa-regular fa-calendar"></i></span>
          <input type="date" id="dateFilter" class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 text-sm font-medium text-slate-700 cursor-pointer transition-all">
        </div>

        <div class="w-full md:w-40 relative">
          <span class="absolute left-3 top-2.5 text-slate-400 text-sm pointer-events-none z-10"><i class="fa-solid fa-filter"></i></span>
          <select id="purposeFilter" class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 text-sm font-medium text-slate-700 cursor-pointer appearance-none transition-all">
            <option value="">All Purposes</option>
            <option value="Guest">Guest</option>
            <option value="Delivery">Delivery</option>
            <option value="Cab">Cab</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <button id="exportCsvBtn" class="w-full md:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 outline-none">
          <i class="fa-solid fa-file-csv"></i> Export CSV
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div id="recordsContainer" class="min-h-[400px] w-full">
          <div class="text-center py-12 text-slate-400 text-sm font-medium">
            <i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i><br>
            Loading records...
          </div>
        </div>
      </div>
    </div>
  </div>
`;
  }
}
