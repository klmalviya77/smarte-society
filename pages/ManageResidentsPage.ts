export class ManageResidentsPage {
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
                <h1 class="text-xl font-black tracking-tight">Manage Residents</h1>
                <p class="text-xs text-slate-400 font-medium mt-0.5">Pre-load mobile numbers & manage device security locks.</p>
              </div>
            </div>
          </div>
        </header>

        <div class="max-w-6xl mx-auto mt-6 px-6">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div id="residentsContainer" class="min-h-[400px]">
                <div class="text-center py-12 text-slate-400 text-sm font-medium">
                  <i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i><br>Loading flats data...
                </div>
             </div>
          </div>
        </div>
      </div>
    `;
  }
}
