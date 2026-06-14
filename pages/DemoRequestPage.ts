export class DemoRequestPage {
  render(): string {
    return `
  <div class="min-h-screen bg-white py-12 px-6">
    <div class="max-w-4xl mx-auto">
      
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-slate-900 mb-4">Book a Free Live Demo</h1>
        <p class="text-lg text-slate-600">See how GateGuard transforms your society security in just 15 minutes.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Benefits List -->
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">1</div>
            <div>
              <h4 class="font-bold text-slate-900">Virtual Walkthrough</h4>
              <p class="text-sm text-slate-500">We'll show you exactly how the QR system works live.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold">2</div>
            <div>
              <h4 class="font-bold text-slate-900">Customized Pricing</h4>
              <p class="text-sm text-slate-500">Get a plan that perfectly fits your society size.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold">3</div>
            <div>
              <h4 class="font-bold text-slate-900">Instant Setup</h4>
              <p class="text-sm text-slate-500">Get your society live and running the same day.</p>
            </div>
          </div>
        </div>

        <!-- Request Form -->
        <div id="demoForm" class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <div class="space-y-4">
            <input type="text" id="contactName" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl border border-slate-200">
            <input type="text" id="societyName" placeholder="Society Name" class="w-full px-4 py-3 rounded-xl border border-slate-200">
            <input type="tel" id="contactPhone" placeholder="Mobile Number" class="w-full px-4 py-3 rounded-xl border border-slate-200">
            <select id="flatCount" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white">
              <option value="">Select Flat Range</option>
              <option value="0-50">0-50 Flats</option>
              <option value="51-200">51-200 Flats</option>
              <option value="200+">200+ Flats</option>
            </select>
            <button id="submitDemoBtn" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
  }
}
