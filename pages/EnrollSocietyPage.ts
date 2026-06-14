export class EnrollSocietyPage {
  render(): string {
    return `
  <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 relative overflow-hidden">
    <div class="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

    <div class="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative z-10">
      
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4 border-indigo-100">
          <i class="fa-solid fa-building-user"></i>
        </div>
        <h2 class="text-3xl font-black text-slate-900">Enroll Your Society</h2>
        <p class="mt-2 text-sm text-slate-500 font-medium">Submit your details for admin setup.</p>
      </div>
      
      <div id="enrollForm" class="space-y-5">
        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Contact Name</label>
          <div class="relative">
            <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-user"></i></span>
            <input id="contactName" type="text" placeholder="Your Name" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Society Name</label>
          <div class="relative">
            <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-building"></i></span>
            <input id="societyName" type="text" placeholder="Society Name" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Mobile</label>
            <div class="relative">
              <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-phone"></i></span>
              <input id="enrollPhone" type="tel" placeholder="10-digit" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Total Flats</label>
            <select id="flatCount" class="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 cursor-pointer">
              <option value="0-50">0 to 50</option>
              <option value="51-200">51 to 200</option>
              <option value="200+">200+</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email</label>
          <div class="relative">
            <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-envelope"></i></span>
            <input id="enrollEmail" type="email" placeholder="admin@society.com" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50">
          </div>
        </div>

        <button id="submitEnrollBtn" class="w-full mt-4 py-4 rounded-xl shadow-lg shadow-indigo-200 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
          Submit Request
        </button>
        
        <button id="backBtn" class="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors">
          <i class="fa-solid fa-arrow-left"></i> Back to Home
        </button>
      </div>
    </div>
  </div>
`;
  }
}
