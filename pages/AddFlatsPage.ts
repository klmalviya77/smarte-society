export class AddFlatsPage {
  render(): string {
    return `
    <nav class="fixed w-full z-50 top-0 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex-shrink-0 flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">
              <i class="fa-solid fa-building"></i>
            </div>
            <span class="font-extrabold text-2xl tracking-tight text-slate-900">
              Gate<span class="text-indigo-600">Guard</span>
            </span>
          </div>
        </div>
      </div>
    </nav>

    <div class="min-h-screen bg-slate-50 py-28 px-4">
      <div class="max-w-2xl mx-auto">
        <button id="backToDashboardBtn" class="mb-6 text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors outline-none">
          <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>

        <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
          <h1 class="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <i class="fa-solid fa-layer-group text-indigo-500"></i> Add New Flats
          </h1>
          
          <div class="flex gap-4 mb-8 bg-slate-100 p-1.5 rounded-xl">
            <label class="flex-1 text-center cursor-pointer">
              <input type="radio" name="flatMode" value="auto" class="peer hidden" checked>
              <div class="py-2.5 rounded-lg text-sm font-bold text-slate-500 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">
                <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Auto Generate
              </div>
            </label>
            <label class="flex-1 text-center cursor-pointer">
              <input type="radio" name="flatMode" value="manual" class="peer hidden">
              <div class="py-2.5 rounded-lg text-sm font-bold text-slate-500 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">
                <i class="fa-solid fa-pen-to-square mr-1"></i> Manual Entry
              </div>
            </label>
          </div>

          <div id="autoSection" class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tower Name / Prefix</label>
              <div class="relative">
                <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-building"></i></span>
                <input id="towerName" type="text" placeholder="e.g., A, B, or Tower1" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 font-medium text-slate-800">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Floors</label>
                <div class="relative">
                  <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-stairs"></i></span>
                  <input id="totalFloors" type="number" placeholder="10" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 font-medium text-slate-800">
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Flats per Floor</label>
                <div class="relative">
                  <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-door-closed"></i></span>
                  <input id="flatsPerFloor" type="number" placeholder="4" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 font-medium text-slate-800">
                </div>
              </div>
            </div>
          </div>

          <div id="manualSection" style="display:none;" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Flat Numbers</label>
              <textarea id="manualFlats" rows="6" placeholder="BUNGALOW-1&#10;BUNGALOW-2&#10;SHOP-12" class="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 font-medium text-slate-800 resize-none"></textarea>
              <p class="text-xs text-slate-400 mt-2 font-medium"><i class="fa-solid fa-circle-info"></i> Enter one flat number per line.</p>
            </div>
          </div>

          <button id="saveFlatsBtn" class="mt-8 w-full py-4 rounded-xl shadow-lg shadow-indigo-200 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all outline-none flex justify-center items-center gap-2">
            Save Flats to Database <i class="fa-solid fa-cloud-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
`;
  }
}
