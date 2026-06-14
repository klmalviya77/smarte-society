export class StaffAttendancePage {
  render(): string {
    return `
      <div class="min-h-screen bg-slate-50 font-sans pb-10">
        <header class="bg-slate-900 text-white py-5 px-6 shadow-md sticky top-0 z-40">
          <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-3">
              <button id="backToDashboardBtn" class="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors outline-none">
                <i class="fa-solid fa-arrow-left text-sm text-slate-300"></i>
              </button>
              <div>
                <h1 class="text-xl font-black tracking-tight">Staff Attendance</h1>
                <p class="text-xs text-slate-400 font-medium mt-0.5">Daily IN/OUT logs for maids, drivers & maintenance.</p>
              </div>
            </div>
          </div>
        </header>

        <div class="max-w-6xl mx-auto mt-6 px-6">
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <div class="relative w-full sm:w-48">
                <span class="absolute left-3 top-2.5 text-slate-400 text-sm pointer-events-none"><i class="fa-regular fa-calendar"></i></span>
                <input type="date" id="attendanceDate" class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 text-sm font-medium text-slate-700 cursor-pointer transition-all">
              </div>
            </div>
            <button id="exportAttendanceBtn" class="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 outline-none">
              <i class="fa-solid fa-file-csv"></i> Export Logs
            </button>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div id="attendanceContainer" class="min-h-[400px]">
                <div class="text-center py-12 text-slate-400 text-sm font-medium">
                  <i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i><br>Loading attendance...
                </div>
             </div>
          </div>
        </div>
      </div>
    `;
  }
}
