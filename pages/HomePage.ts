export class HomePage {
  render(): string {
    return `
  <nav class="fixed w-full z-50 top-0 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex-shrink-0 flex items-center gap-2">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <span class="font-extrabold text-2xl tracking-tight text-slate-900">Gate<span class="text-indigo-600">Guard</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <div class="flex items-center gap-4">
          <button id="loginPageBtn" class="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors px-2 md:px-4 py-2 flex items-center gap-2">
            <i class="fa-solid fa-right-to-bracket"></i> Login
          </button>
          <button id="enrollPageBtn" class="text-sm font-bold text-white bg-slate-900 hover:bg-indigo-600 px-6 py-2.5 rounded-full shadow-md transition-all hover:shadow-lg">
            Enroll Society
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-slate-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-semibold text-xs uppercase tracking-widest mb-8">
        <i class="fa-solid fa-bolt text-amber-500"></i> #1 Digital Visitor Register
      </div>
      
      <h1 class="text-5xl sm:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
        Smart security for <br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">modern societies.</span>
      </h1>
      
      <p class="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto mb-10 font-medium">
        Replace your outdated manual register books with a lightning-fast, 100% digital QR-based entry system. We provide an end-to-end security ecosystem that ensures unparalleled safety, tracks daily staff attendance seamlessly, and alerts residents instantly on their smartphones. Experience a flawless flow at your society gates without the hassle of maintaining paperwork.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button id="getStartedBtn" class="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2">
          Enroll Your Society <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>

  <div id="features" class="py-24 bg-white border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-indigo-600 text-2xl group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-qrcode"></i>
          </div>
          <h4 class="text-xl font-bold text-slate-900 mb-3">Instant QR Entry</h4>
          <p class="text-slate-600 font-medium leading-relaxed">Guests simply scan the secure QR code at the main gate using their smartphone camera. No mandatory app downloads or tedious physical forms needed. It streamlines the entire visitor flow, reduces gate congestion during peak hours, and provides a premium experience for your guests while keeping intruders out.</p>
        </div>

        <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-indigo-600 text-2xl group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-bell"></i>
          </div>
          <h4 class="text-xl font-bold text-slate-900 mb-3">Real-time Alerts</h4>
          <p class="text-slate-600 font-medium leading-relaxed">Residents receive instant push notifications and alerts on their devices the exact moment visitors, cabs, or food deliveries arrive. Flat owners have complete visibility to verify visitor details and track live entry and exit logs directly from their personalized, secure resident dashboard.</p>
        </div>

        <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-indigo-600 text-2xl group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-user-shield"></i>
          </div>
          <h4 class="text-xl font-bold text-slate-900 mb-3">Staff Management</h4>
          <p class="text-slate-600 font-medium leading-relaxed">Issue digital ID cards with unique, scannable QR codes to your daily help, drivers, and maintenance staff. Accurately track their in/out timings perfectly synchronized with the cloud. Eliminate attendance disputes, monitor daily activity, and ensure only authorized personnel have access to the premises.</p>
        </div>
      </div>
    </div>
  </div>
  
      <!-- ========================================== -->
      <!-- PRICING SECTION -->
      <!-- ========================================== -->
      <div class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <h2 class="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3">Pricing</h2>
            <h3 class="text-3xl md:text-4xl font-black text-slate-900">Simple, Transparent Plans</h3>
            <p class="mt-4 text-slate-500 font-medium">Choose a plan that scales with your society's security needs.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            
            <!-- Plan 1: Starter Plan -->
            <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center hover:shadow-lg transition-shadow">
              <h4 class="text-xl font-black text-slate-900 mb-2">Starter</h4>
              <p class="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">Up to 50 Flats</p>
              <div class="text-4xl font-black text-slate-900 mb-6">₹599<span class="text-base text-slate-500 font-medium">/month</span></div>
              <ul class="text-sm text-slate-600 font-medium space-y-4 mb-8 text-left">
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> Basic Gate Entry QR</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> Manual Guard Entries</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> Live Visitor Logs</li>
              </ul>
              <button onclick="document.getElementById('enrollPageBtn').click()" class="w-full py-3 bg-white text-indigo-600 border border-indigo-200 font-bold rounded-xl hover:bg-indigo-50 transition-colors outline-none">Enroll Now</button>
            </div>
            <!-- Professional Plan -->
            <div class="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center shadow-2xl transform md:-translate-y-4 relative">
              <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">Most Popular</div>
              <h4 class="text-xl font-black text-white mb-2 mt-2">Professional</h4>
              <p class="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-6">Up to 120 Flats</p>
              <div class="text-4xl font-black text-white mb-6">₹1199<span class="text-base text-slate-400 font-medium">/month</span></div>
              <ul class="text-sm text-slate-300 font-medium space-y-4 mb-8 text-left">
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-400"></i> Everything in Starter</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-400"></i> Resident Magic Links</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-400"></i> VVIP Pass Generation</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-400"></i> Staff ID & Attendance</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-400"></i> CSV Log Exports</li>
              </ul>
              <button onclick="document.getElementById('enrollPageBtn').click()" class="w-full py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 shadow-lg shadow-indigo-500/30 transition-colors outline-none">Enroll Society</button>
            </div>

            <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center hover:shadow-lg transition-shadow">
              <h4 class="text-xl font-black text-slate-900 mb-2">Custom</h4>
              <p class="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">120+ Flats</p>
              <div class="text-4xl font-black text-slate-900 mb-6">₹1999<span class="text-base text-slate-500 font-medium">/month</span></div>
              <ul class="text-sm text-slate-600 font-medium space-y-4 mb-8 text-left">
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> Everything in Professional</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> Unlimited Staff QR IDs</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> Multi-Tower Support</li>
                <li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i> 24/7 Priority Support</li>
              </ul>
              <button onclick="document.getElementById('enrollPageBtn').click()" class="w-full py-3 bg-white text-indigo-600 border border-indigo-200 font-bold rounded-xl hover:bg-indigo-50 transition-colors outline-none">Contact Sales</button>
            </div>

          </div>
        </div>
      </div>


        <!-- ========================================== -->
      <!-- HOW TO ENROLL SECTION -->
      <!-- ========================================== -->
      <div class="py-24 bg-slate-50 relative border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <h2 class="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3">Simple Process</h2>
            <h3 class="text-3xl md:text-4xl font-black text-slate-900">How to Enroll Your Society</h3>
            <p class="mt-4 text-slate-500 font-medium">Get your society digitalized, optimized, and secured in just three simple, hassle-free steps.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div class="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100 z-0"></div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-100/50 border border-slate-100 mb-6 text-3xl text-indigo-500">
                <i class="fa-solid fa-file-signature"></i>
              </div>
              <h4 class="text-xl font-bold text-slate-900 mb-2">1. Submit Details</h4>
              <p class="text-slate-500 text-sm font-medium leading-relaxed px-4">Click on 'Enroll Society' and fill in your basic society infrastructure and admin contact details. Our system immediately creates a secure, isolated database environment specifically for your society.</p>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-100/50 border border-slate-100 mb-6 text-3xl text-indigo-500">
                <i class="fa-solid fa-user-shield"></i>
              </div>
              <h4 class="text-xl font-bold text-slate-900 mb-2">2. Verification</h4>
              <p class="text-slate-500 text-sm font-medium leading-relaxed px-4">Our dedicated onboarding team will contact you shortly to verify your admin status. We ensure absolute data privacy and security by validating the management committee before handing over controls.</p>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-100/50 border border-slate-100 mb-6 text-3xl text-indigo-500">
                <i class="fa-solid fa-rocket"></i>
              </div>
              <h4 class="text-xl font-bold text-slate-900 mb-2">3. Setup & Go Live</h4>
              <p class="text-slate-500 text-sm font-medium leading-relaxed px-4">Once approved, log into your admin panel to print your custom QR posters, lock in the Guard Tablet with a secure PIN, and share magic links with residents. Your society goes live in less than 24 hours!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- FOOTER SECTION -->
      <!-- ========================================== -->
            <footer class="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8 mb-8">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <span class="font-black text-xl tracking-tight text-white">
                Gate<span class="text-indigo-400">Guard</span>
              </span>
            </div>
            
            <div class="flex gap-6 text-sm font-medium text-slate-400">
              <a href="?page=privacy" class="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="?page=terms" class="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="?page=refund" class="hover:text-indigo-400 transition-colors">Refund Policy</a>
            </div>
            
          </div>
          
          <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <p>&copy; 2026 GateGuard System. All rights reserved.</p>
            <p class="flex items-center gap-1">
              Made with <i class="fa-solid fa-heart text-rose-500 mx-1"></i> in India
            </p>
          </div>
        </div>
      </footer>


`;
  }
}
