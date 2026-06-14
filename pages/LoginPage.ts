export class LoginPage {
  render(): string {
    return `
  <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 relative overflow-hidden">
    <div class="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
    <div class="absolute bottom-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

    <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative z-10">
      
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm mx-auto border border-indigo-100 mb-4">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <h2 class="text-3xl font-black text-slate-900 tracking-tight">Admin Login</h2>
        <p class="mt-2 text-sm text-slate-500 font-medium">Access your secure society dashboard.</p>
      </div>
      
      <div class="space-y-5">
        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
          <div class="relative">
            <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-envelope"></i></span>
            <input id="email" type="email" placeholder="admin@society.com" class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 text-slate-800 font-medium">
          </div>
        </div>
        
        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
          <div class="relative">
            <span class="absolute left-4 top-3.5 text-slate-400"><i class="fa-solid fa-lock"></i></span>
            <input id="password" type="password" placeholder="••••••••" class="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-slate-50 text-slate-800 font-medium">
            <button id="togglePasswordBtn" type="button" class="absolute right-4 top-3.5 text-slate-400 hover:text-indigo-600 transition-colors outline-none">
              <i class="fa-regular fa-eye" id="toggleIcon"></i>
            </button>
          </div>
        </div>

        <button id="loginBtn" class="w-full mt-2 py-4 rounded-xl shadow-lg shadow-indigo-200 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 outline-none">
          Sign In <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
        
        <button id="backBtn" class="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2 mx-auto outline-none">
          <i class="fa-solid fa-arrow-left"></i> Back to Home
        </button>
      </div>
    </div>
  </div>
`;
  }
}
