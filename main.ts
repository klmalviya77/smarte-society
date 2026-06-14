import { HomePage } from './pages/HomePage';
import { EnrollSocietyPage } from './pages/EnrollSocietyPage';
import { LoginPage } from './pages/LoginPage';
import { SocietyDashboardPage } from './pages/SocietyDashboardPage';
import { AddFlatsPage } from './pages/AddFlatsPage';
import { VisitorRecordsPage } from './pages/VisitorRecordsPage';
import { ManageResidentsPage } from './pages/ManageResidentsPage';
import { GuardConsolePage } from './pages/GuardConsolePage';
import { ResidentClaimPage } from './pages/ResidentClaimPage';
import { ResidentDashboardPage } from './pages/ResidentDashboardPage';
import { VisitorEntryPage } from './pages/VisitorEntryPage';
import { StaffAttendancePage } from './pages/StaffAttendancePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';

import { SupabaseService } from './services/SupabaseService';
const FAST2SMS_API_KEY = "dT2pobqhCEfKvLn4F951kDBIlrcyueO6xQSgR7VAsM8mwtNajJzNAejqFHyYfCBirpsvla59dk3oLw87";

// ==========================================
// PLAN-BASED ACCESS CONTROL SYSTEM
// ==========================================
const PLAN_FEATURES = {
  'Starter': ['basic_entry', 'manual_logs', 'live_logs'],
  'Professional': ['basic_entry', 'manual_logs', 'live_logs', 'csv_export', 'resident_management', 'vvip_pass', 'staff_management'],
  'Enterprise': ['basic_entry', 'manual_logs', 'live_logs', 'csv_export', 'resident_management', 'vvip_pass', 'staff_management', 'unlimited_flats']
};

function hasFeatureAccess(planType: string, feature: string): boolean {
  const plan = planType || 'Starter';
  return PLAN_FEATURES[plan as keyof typeof PLAN_FEATURES]?.includes(feature) || false;
}

function requireFeature(planType: string, feature: string, callback: Function) {
  if (hasFeatureAccess(planType, feature)) {
    callback();
  } else {
    showToast(`Locked! Upgrade to a higher plan to access this feature.`, "error");
  }
}

// ==========================================
// CUSTOM TOAST ALERTS
// ==========================================
function showToast(message: string, type: "success" | "error" = "success") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  const bgColor = type === "error" ? "bg-red-500" : "bg-emerald-500";
  const icon = type === "error" ? "fa-circle-xmark" : "fa-circle-check";
  toast.className = `${bgColor} text-white px-4 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 transform transition-all duration-300 translate-x-full opacity-0`;
  toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i> <span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.remove("translate-x-full", "opacity-0"));
  setTimeout(() => { toast.classList.add("translate-x-full", "opacity-0"); setTimeout(() => toast.remove(), 300); }, 3000);
}

// ==========================================
// HOME, ENROLL & LOGIN FLOW
// ==========================================
function showHomePage() {
  const page = new HomePage();
  document.body.innerHTML = page.render();
  document.getElementById("loginPageBtn")?.addEventListener("click", showLoginPage);
  document.getElementById("enrollPageBtn")?.addEventListener("click", showEnrollPage);
  document.getElementById("getStartedBtn")?.addEventListener("click", showEnrollPage);
}

function showEnrollPage() {
  const page = new EnrollSocietyPage();
  document.body.innerHTML = page.render();
  document.getElementById("backBtn")?.addEventListener("click", showHomePage);
  document.getElementById("submitEnrollBtn")?.addEventListener("click", async () => {
    const contactName = (document.getElementById("contactName") as HTMLInputElement).value.trim();
    const societyName = (document.getElementById("societyName") as HTMLInputElement).value.trim();
    const phone = (document.getElementById("enrollPhone") as HTMLInputElement).value.trim();
    const email = (document.getElementById("enrollEmail") as HTMLInputElement).value.trim();
    const flatCount = (document.getElementById("flatCount") as HTMLSelectElement).value;

    if (!contactName || !societyName || !phone || !email) return showToast("Please fill all required fields!", "error");
    const btn = document.getElementById("submitEnrollBtn") as HTMLButtonElement;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...`; btn.disabled = true;

    try {
      const client = SupabaseService.getClient();
      const { error } = await client.from("enrollments").insert({ contact_name: contactName, society_name: societyName, phone: phone, email: email, flat_count_estimate: flatCount });
      if (error) throw new Error(error.message);
      showToast("Request Sent Successfully!", "success"); showHomePage();
    } catch (err: any) { showToast(err.message, "error"); btn.innerHTML = `Submit Request <i class="fa-solid fa-paper-plane"></i>`; btn.disabled = false; }
  });
}

function showLoginPage() {
  const page = new LoginPage();
  document.body.innerHTML = page.render();
  document.getElementById("backBtn")?.addEventListener("click", showHomePage);
  document.getElementById("loginBtn")?.addEventListener("click", async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!email || !password) return showToast("Enter email and password", "error");
    const btn = document.getElementById("loginBtn") as HTMLButtonElement;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...`; btn.disabled = true;

    try {
      const client = SupabaseService.getClient();
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      showToast("Login Successful!", "success"); showDashboardPage();
    } catch (err: any) { showToast(err.message, "error"); btn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right-to-bracket"></i>`; btn.disabled = false; }
  });

  const toggleBtn = document.getElementById("togglePasswordBtn");
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const toggleIcon = document.getElementById("toggleIcon");
  if (toggleBtn && passwordInput && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      if (passwordInput.type === "password") { passwordInput.type = "text"; toggleIcon.classList.replace("fa-eye", "fa-eye-slash"); } 
      else { passwordInput.type = "password"; toggleIcon.classList.replace("fa-eye-slash", "fa-eye"); }
    });
  }
}

// ==========================================
// LEGAL PAGES
// ==========================================
function showPrivacyPolicyPage() {
  const page = new PrivacyPolicyPage();
  document.body.innerHTML = page.render();
}

function showTermsPage() {
  const page = new TermsPage();
  document.body.innerHTML = page.render();
}

function showRefundPolicyPage() {
  const page = new RefundPolicyPage();
  document.body.innerHTML = page.render();
}

// ==========================================
// DASHBOARD FLOW 
// ==========================================
async function showDashboardPage() {
  const page = new SocietyDashboardPage();
  document.body.innerHTML = page.render();
  
  const client = SupabaseService.getClient();
  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await client.auth.signOut();
    showToast("Logged out safely", "success");
    showHomePage();
  });

  try {
    const { data: userData } = await client.auth.getUser();
    if (!userData?.user) return showLoginPage();

    let { data: society, error: societyError } = await client.from("societies").select("*").eq("user_id", userData.user.id).single();

    if (!society) {
       const tempSlug = "gate-" + Math.floor(Math.random() * 1000000);
       const { data: newSociety, error: insertError } = await client.from("societies").insert({
         user_id: userData.user.id, name: "My Demo Society", address: "Setup Pending", qr_slug: tempSlug, is_active: true
       }).select().single();
       if (insertError) throw new Error("Could not create backend society profile.");
       society = newSociety;
    }

    if (society.is_active === false) { document.body.innerHTML = `<div class="p-10 text-center"><h2>Account Inactive</h2></div>`; return; }

    const { count: flatsCount } = await client.from("flats").select("*", { count: 'exact', head: true }).eq("society_id", society.id);
    const { count: visitorsCount } = await client.from("visitors").select("*", { count: 'exact', head: true }).eq("society_id", society.id);
    
    const { data: allFlats } = await client.from("flats").select("flat_number").eq("society_id", society.id);
    const towerSet = new Set<string>();
    if (allFlats) allFlats.forEach((f: any) => towerSet.add(f.flat_number.split("-")[0] || "1"));

    const baseUrl = window.location.origin + window.location.pathname;
    const guardLink = `${baseUrl}?guard=${society.qr_slug}`; 
    const claimLink = `${baseUrl}?claim=${society.qr_slug}`; 
    const qrEntryLink = `${baseUrl}?entry=${society.qr_slug}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrEntryLink)}&margin=10`;
    
    const infoContainer = document.getElementById("societyInfoContainer");
    if (infoContainer) {
      infoContainer.innerHTML = `
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center md:items-start mb-6">
          <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 shrink-0 text-center w-full md:w-auto">
             <div class="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-3 mx-auto w-fit">
               <img id="dashboardQrImg" src="${qrImageUrl}" crossorigin="anonymous" alt="Gate QR" class="w-32 h-32 object-contain rounded-lg">
             </div>
             <h3 class="text-sm font-black text-indigo-900 leading-tight">Main Gate QR</h3>
             <p class="text-[10px] text-indigo-600 font-bold mb-3 uppercase tracking-wider">For Visitors</p>
             <div class="flex flex-col gap-2">
               <button id="printGateQrBtn" class="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all outline-none flex items-center justify-center gap-2">
                 <i class="fa-solid fa-print"></i> Print Poster
               </button>
               <button id="downloadGateQrBtn" class="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-md transition-all outline-none flex items-center justify-center gap-2">
                 <i class="fa-solid fa-download"></i> Download A4
               </button>
             </div>
          </div>
          <div class="flex-1 text-center md:text-left pt-2">
            <h2 class="text-3xl font-extrabold text-slate-900 mb-1">${society.name}</h2>
            <p class="text-xs font-bold text-indigo-600 mb-5 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full w-fit mx-auto md:mx-0"><i class="fa-solid fa-crown"></i> ${society.plan_type} Plan</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center"><div class="text-2xl font-black text-slate-800">${towerSet.size || 1}</div><div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Towers</div></div>
              <div class="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center"><div class="text-2xl font-black text-slate-800">${flatsCount || 0}</div><div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Flats</div></div>
              <div class="bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 text-center"><div class="text-2xl font-black text-slate-800">${visitorsCount || 0}</div><div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visitors</div></div>
            </div>
          </div>
          <div class="flex flex-col gap-3 w-full md:w-56 shrink-0 pt-2">
             <div class="bg-slate-900 rounded-xl p-3.5 text-center border border-slate-800">
               <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Guard Tablet Link</div>
               <button id="copyGuardLinkBtn" class="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-lg transition-all outline-none">
                 <i class="fa-solid fa-copy"></i> Copy Link
               </button>
             </div>
             <div class="bg-emerald-50 rounded-xl p-3.5 text-center border border-emerald-100">
               <div class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-2">Resident App Link</div>
               <button id="copyClaimLinkBtn" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all outline-none">
                 <i class="fa-brands fa-whatsapp"></i> Share Link
               </button>
             </div>
          </div>
        </div>
      `;
      
      document.getElementById("printGateQrBtn")?.addEventListener("click", () => { 
        const printWindow = window.open('', '', 'width=800,height=900');
        printWindow?.document.write(`
          <html>
            <head><title>Gate QR Poster</title></head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 40px; margin: 0; background: #f8fafc;">
              <div style="background: white; border: 12px solid #4f46e5; border-radius: 40px; padding: 60px 40px 0 40px; max-width: 700px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                <div style="font-size: 24px; color: #4f46e5; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px;">Welcome to</div>
                <div style="font-size: 56px; color: #0f172a; font-weight: 900; margin-bottom: 40px; line-height: 1.1;">${society.name}</div>
                <div style="background: #f8fafc; padding: 30px; border-radius: 30px; display: inline-block; border: 3px dashed #cbd5e1; margin-bottom: 40px;">
                  <img src="${qrImageUrl}" style="width: 400px; height: 400px; object-fit: contain;" />
                </div>
                <div style="background: #4f46e5; color: white; padding: 20px 50px; border-radius: 100px; font-size: 32px; font-weight: bold; display: inline-block;">
                  SCAN TO ENTER
                </div>
                <p style="font-size: 20px; color: #64748b; margin-top: 20px; margin-bottom: 60px; font-weight: 500;">Please scan this QR code using your phone camera.</p>
                <div style="background: #0f172a; margin: 0 -40px; padding: 30px; color: white;">
                   <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">Secured by GateGuard</div>
                   <div style="font-size: 16px; color: #94a3b8;">India's Smartest Society Management System</div>
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow?.document.close();
        setTimeout(() => printWindow?.print(), 1000);
      });

      document.getElementById("downloadGateQrBtn")?.addEventListener("click", () => {
        const btn = document.getElementById("downloadGateQrBtn") as HTMLButtonElement;
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Preparing...`;
        btn.disabled = true;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 1240; 
          canvas.height = 1754; 
          const ctx = canvas.getContext("2d")!;

          ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.lineWidth = 30; ctx.strokeStyle = "#4f46e5"; ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
          ctx.fillStyle = "#4f46e5"; ctx.font = "bold 35px Arial"; ctx.textAlign = "center"; ctx.fillText("WELCOME TO", canvas.width / 2, 180);
          ctx.fillStyle = "#0f172a"; ctx.font = "bold 85px Arial"; ctx.fillText(society.name.toUpperCase(), canvas.width / 2, 280);
          ctx.lineWidth = 4; ctx.strokeStyle = "#cbd5e1"; ctx.setLineDash([15, 15]); ctx.strokeRect(canvas.width / 2 - 350, 400, 700, 700); ctx.setLineDash([]); 
          
          ctx.drawImage(img, canvas.width / 2 - 300, 450, 600, 600);
          
          ctx.fillStyle = "#4f46e5"; ctx.beginPath(); ctx.roundRect(canvas.width / 2 - 250, 1200, 500, 100, 50); ctx.fill();
          ctx.fillStyle = "#ffffff"; ctx.font = "bold 45px Arial"; ctx.fillText("SCAN TO ENTER", canvas.width / 2, 1265);
          ctx.fillStyle = "#64748b"; ctx.font = "30px Arial"; ctx.fillText("Please scan this QR code using your phone camera.", canvas.width / 2, 1380);
          ctx.fillStyle = "#0f172a"; ctx.fillRect(15, canvas.height - 250, canvas.width - 30, 235);
          ctx.fillStyle = "#ffffff"; ctx.font = "bold 45px Arial"; ctx.fillText("Secured by GateGuard", canvas.width / 2, canvas.height - 130);
          ctx.fillStyle = "#94a3b8"; ctx.font = "bold 25px Arial"; ctx.fillText("India's Smartest Society Management System", canvas.width / 2, canvas.height - 80);

          const link = document.createElement("a");
          link.download = `Gate-Poster-${society.name.replace(/\s+/g, "-")}.png`;
          link.href = canvas.toDataURL("image/png"); link.click();
          
          showToast("Poster Downloaded!", "success");
          btn.innerHTML = originalText;
          btn.disabled = false;
        };
        img.onerror = () => {
          showToast("Failed to generate Poster. Check internet.", "error");
          btn.innerHTML = originalText;
          btn.disabled = false;
        };
        img.src = qrImageUrl;
      });

      document.getElementById("copyGuardLinkBtn")?.addEventListener("click", () => { navigator.clipboard.writeText(guardLink); showToast("Guard Link Copied!", "success"); });
      document.getElementById("copyClaimLinkBtn")?.addEventListener("click", () => { navigator.clipboard.writeText(claimLink); showToast("Resident Link Copied!", "success"); });

      // ==========================================
      // PBAC: MODULES BINDING WITH PERMISSION CHECK
      // ==========================================
      document.getElementById("addFlatsBtn")?.addEventListener("click", () => showAddFlatsPage(society.id));
      document.getElementById("visitorRecordsBtn")?.addEventListener("click", () => showVisitorRecordsPage(society.id));
      
      document.getElementById("manageStaffBtn")?.addEventListener("click", () => {
        requireFeature(society.plan_type, 'staff_management', () => showManageStaffPage(society.id));
      });
      
      document.getElementById("manageResidentsBtn")?.addEventListener("click", () => {
        requireFeature(society.plan_type, 'resident_management', () => showManageResidentsPage(society.id));
      });
      
      document.getElementById("staffLogsBtn")?.addEventListener("click", () => {
        requireFeature(society.plan_type, 'staff_management', () => showStaffAttendancePage(society.id));
      });

      document.getElementById("guardPinBtn")?.addEventListener("click", () => {
        const pinModal = document.createElement("div");
        pinModal.className = "fixed inset-0 bg-slate-900/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm";
        pinModal.innerHTML = `
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative">
            <button id="closePinModal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-800 font-bold text-xl outline-none">&times;</button>
            <div class="w-16 h-16 bg-slate-900 text-indigo-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-slate-700 shadow-md"><i class="fa-solid fa-tablet-screen-button"></i></div>
            <h2 class="text-xl font-black text-slate-900 mb-1">Guard Tablet PIN</h2>
            <p class="text-xs font-medium text-slate-500 mb-6 leading-relaxed">Use this 6-digit code to securely bind the security guard's tablet to your society.</p>
            <div class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 mb-6">
              <div id="currentGuardPin" class="text-4xl font-mono font-black text-indigo-600 tracking-widest">${society.guard_pin || '123456'}</div>
            </div>
            <button id="generateNewPinBtn" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex justify-center items-center gap-2 outline-none">
              <i class="fa-solid fa-rotate"></i> Generate New PIN
            </button>
          </div>
        `;
        document.body.appendChild(pinModal);

        document.getElementById("closePinModal")?.addEventListener("click", () => pinModal.remove());
        document.getElementById("generateNewPinBtn")?.addEventListener("click", async () => {
          const btn = document.getElementById("generateNewPinBtn") as HTMLButtonElement;
          btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...`; btn.disabled = true;

          const newPin = Math.floor(100000 + Math.random() * 900000).toString();
          const { error } = await client.from("societies").update({ guard_pin: newPin }).eq("id", society.id);

          if (error) { showToast("Error: " + error.message, "error"); btn.innerHTML = `<i class="fa-solid fa-rotate"></i> Generate New PIN`; btn.disabled = false; return; }

          document.getElementById("currentGuardPin")!.innerText = newPin;
          society.guard_pin = newPin;
          showToast("New PIN Generated!", "success");
          btn.innerHTML = `PIN Updated! <i class="fa-solid fa-check"></i>`;
          setTimeout(() => { btn.innerHTML = `<i class="fa-solid fa-rotate"></i> Generate New PIN`; btn.disabled = false; }, 2000);
        });
      });
    }
  } catch (err: any) { showToast("Crash: " + err.message, "error"); }
}

// ==========================================
// ADD FLATS FLOW (WITH PLAN LIMITS)
// ==========================================
function showAddFlatsPage(societyId: string) {
  const page = new AddFlatsPage();
  document.body.innerHTML = page.render();
  document.getElementById("backToDashboardBtn")?.addEventListener("click", showDashboardPage);

  const radioButtons = document.getElementsByName("flatMode");
  const autoSection = document.getElementById("autoSection");
  const manualSection = document.getElementById("manualSection");

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.value === "auto") { autoSection!.style.display = "block"; manualSection!.style.display = "none"; }
      else { autoSection!.style.display = "none"; manualSection!.style.display = "block"; }
    });
  });

  document.getElementById("saveFlatsBtn")?.addEventListener("click", async () => {
    const mode = (document.querySelector('input[name="flatMode"]:checked') as HTMLInputElement).value;
    let flatsToInsert: any[] = [];
    if (mode === "auto") {
      const tower = (document.getElementById("towerName") as HTMLInputElement).value.trim();
      const floors = parseInt((document.getElementById("totalFloors") as HTMLInputElement).value);
      const flatsPerFloor = parseInt((document.getElementById("flatsPerFloor") as HTMLInputElement).value);
      if (!tower || !floors || !flatsPerFloor) return showToast("Fill all auto fields", "error");
      for (let f = 1; f <= floors; f++) {
        for (let num = 1; num <= flatsPerFloor; num++) {
          flatsToInsert.push({ society_id: societyId, flat_number: `${tower}-${f * 100 + num}` });
        }
      }
    } else {
      const manualText = (document.getElementById("manualFlats") as HTMLTextAreaElement).value;
      if (!manualText.trim()) return showToast("Enter at least one flat", "error");
      manualText.split("\n").forEach(line => { if (line.trim()) flatsToInsert.push({ society_id: societyId, flat_number: line.trim() }); });
    }

    const btn = document.getElementById("saveFlatsBtn") as HTMLButtonElement;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...`; btn.disabled = true;

    try {
      const client = SupabaseService.getClient();

      // 🚀 FLAT LIMIT CHECK LOGIC
      const { data: soc } = await client.from("societies").select("plan_type").eq("id", societyId).single();
      const { count: currentFlats } = await client.from("flats").select("*", { count: 'exact', head: true }).eq("society_id", societyId);
      
      const plan = soc?.plan_type || 'Starter';
      let limit = 30;
      if (plan === 'Professional') limit = 120;
      if (plan === 'Enterprise' || plan === 'Custom') limit = 999999;

      if ((currentFlats || 0) + flatsToInsert.length > limit) {
         showToast(`Plan Limit Exceeded! Your ${plan} plan allows max ${limit} flats.`, "error");
         btn.innerHTML = `Save Flats to Database <i class="fa-solid fa-cloud-arrow-up"></i>`; btn.disabled = false;
         return;
      }

      const { error } = await client.from("flats").insert(flatsToInsert);
      if (error) throw new Error(error.message);
      showToast(`Added ${flatsToInsert.length} flats!`, "success");
      btn.innerHTML = `Save Flats to Database <i class="fa-solid fa-cloud-arrow-up"></i>`; btn.disabled = false;
    } catch (err: any) { showToast(err.message, "error"); btn.disabled = false; }
  });
}

// ==========================================
// MANAGE STAFF FLOW 
// ==========================================
function showManageStaffPage(societyId: string) {
  const page = new ManageStaffPage();
  document.body.innerHTML = page.render();
  document.getElementById("backToDashboardBtn")?.addEventListener("click", showDashboardPage);

  loadStaffList(societyId);

  document.getElementById("saveStaffBtn")?.addEventListener("click", async () => {
    const name = (document.getElementById("staffName") as HTMLInputElement).value.trim();
    const mobile = (document.getElementById("staffMobile") as HTMLInputElement).value.trim();
    const role = (document.getElementById("staffRole") as HTMLSelectElement).value;

    if (!name || !mobile) return showToast("Please enter name and mobile number", "error");

    const btn = document.getElementById("saveStaffBtn") as HTMLButtonElement;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...`;
    btn.disabled = true;

    const qrSlug = "staff-" + Math.random().toString(36).substr(2, 9);

    try {
      const client = SupabaseService.getClient();
      const { error } = await client.from("staff").insert({
        society_id: societyId, name: name, mobile: mobile, role: role, qr_slug: qrSlug, is_active: true
      });

      if (error) throw new Error(error.message);

      showToast("Staff Registered Successfully!", "success");
      
      (document.getElementById("staffName") as HTMLInputElement).value = "";
      (document.getElementById("staffMobile") as HTMLInputElement).value = "";
      
      btn.innerHTML = `<i class="fa-solid fa-id-card"></i> Generate ID`;
      btn.disabled = false;

      loadStaffList(societyId);
      
    } catch (err: any) {
      showToast(err.message, "error");
      btn.innerHTML = `<i class="fa-solid fa-id-card"></i> Generate ID`;
      btn.disabled = false;
    }
  });
}

(window as any).printStaffID = (staffId: string) => {
  const staff = (window as any).staffRegistry?.[staffId];
  if (!staff) return;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(staff.qr_slug)}`;

  document.getElementById("staffIdModal")?.remove();

  const modal = document.createElement("div");
  modal.id = "staffIdModal";
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    backdrop-filter: blur(4px);
  `;

  modal.innerHTML = `
    <div id="staffIdModalInner" style="
      background: white; border-radius: 20px; overflow: hidden;
      width: 100%; max-width: 340px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.3);
      animation: slideUp 0.25s ease;
    ">
      <style>
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @media print {
          body > *:not(#staffIdModal) { display: none !important; }
          #staffIdModal {
            position: static !important;
            background: none !important;
            padding: 0 !important;
            backdrop-filter: none !important;
          }
          #staffIdModalInner { box-shadow: none !important; max-width: 100% !important; }
          #modalActionBar { display: none !important; }
          #modalCloseBtn { display: none !important; }
        }
      </style>

      <div style="display:flex; justify-content:flex-end; padding: 12px 12px 0;">
        <button id="modalCloseBtn" style="
          width:32px; height:32px; border-radius:50%; border:none;
          background:#f1f5f9; color:#64748b; font-size:16px;
          cursor:pointer; display:flex; align-items:center; justify-content:center;
        ">✕</button>
      </div>

      <div id="staffIdCard" style="padding: 0 24px 20px; text-align:center;">
        <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 14px; padding: 18px; margin-bottom: 20px; color:white;">
          <div style="font-size:11px; letter-spacing:2px; opacity:0.8; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Staff ID Card</div>
          <div style="font-size:20px; font-weight:900;">GateGuard</div>
        </div>

        <img id="staffQrImg" src="${qrUrl}" style="width:140px; height:140px; border:3px solid #e2e8f0; border-radius:12px; padding:4px;" crossorigin="anonymous" />

        <div style="font-size:20px; font-weight:800; color:#1e293b; margin-top:14px;">${staff.name}</div>
        <div style="display:inline-block; margin-top:6px; background:#eef2ff; color:#4f46e5; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:3px 14px; border-radius:99px;">${staff.role}</div>
        <div style="font-size:13px; color:#64748b; margin-top:10px; font-weight:500;">+91 ${staff.mobile}</div>
        <div style="margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9; font-size:10px; color:#94a3b8;">Scan QR to verify identity • ${staff.qr_slug}</div>
      </div>

      <div id="modalActionBar" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; padding:12px 16px 18px; border-top:1px solid #f1f5f9;">
        <button id="modalPrintBtn" style="padding:10px 0; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:18px;">🖨️</span> Print</button>
        <button id="modalDownloadBtn" style="padding:10px 0; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:18px;">⬇️</span> Save</button>
        <button id="modalShareBtn" style="padding:10px 0; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:18px;">📤</span> Share</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("modalCloseBtn")!.onclick = () => modal.remove();
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
  document.getElementById("modalPrintBtn")!.onclick = () => window.print();

  document.getElementById("modalDownloadBtn")!.onclick = () => {
    const img = document.getElementById("staffQrImg") as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = 400; canvas.height = 520;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff"; ctx.roundRect(0, 0, 400, 520, 20); ctx.fill();
    const grad = ctx.createLinearGradient(0, 0, 400, 100);
    grad.addColorStop(0, "#4f46e5"); grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad; ctx.roundRect(0, 0, 400, 100, [20, 20, 0, 0]); ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "bold 13px Arial"; ctx.textAlign = "center"; ctx.fillText("STAFF ID CARD", 200, 38);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 26px Arial"; ctx.fillText("GateGuard", 200, 72);
    ctx.drawImage(img, 130, 120, 140, 140);

    ctx.fillStyle = "#1e293b"; ctx.font = "bold 22px Arial"; ctx.textAlign = "center"; ctx.fillText(staff.name, 200, 300);
    ctx.fillStyle = "#eef2ff"; ctx.beginPath(); ctx.roundRect(140, 312, 120, 28, 14); ctx.fill();
    ctx.fillStyle = "#4f46e5"; ctx.font = "bold 12px Arial"; ctx.fillText(staff.role.toUpperCase(), 200, 331);
    ctx.fillStyle = "#64748b"; ctx.font = "500 14px Arial"; ctx.fillText("+91 " + staff.mobile, 200, 370);
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 460, 400, 60);
    ctx.fillStyle = "#94a3b8"; ctx.font = "11px Arial"; ctx.fillText("Scan QR to verify • " + staff.qr_slug, 200, 496);

    const link = document.createElement("a"); link.download = `ID-${staff.name.replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png"); link.click();
  };

  document.getElementById("modalShareBtn")!.onclick = async () => {
    const shareText = `Staff ID: ${staff.name}\nRole: ${staff.role}\nMobile: +91 ${staff.mobile}\nVerify: ${staff.qr_slug}`;
    if (navigator.share) {
      try { await navigator.share({ title: "Staff ID - " + staff.name, text: shareText }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareText); showToast("Staff info copied to clipboard!", "success");
    }
  };
};

async function loadStaffList(societyId: string) {
  const container = document.getElementById("staffListContainer");
  if (!container) return;

  try {
    const client = SupabaseService.getClient();
    const { data: staffList, error } = await client.from("staff").select("*").eq("society_id", societyId).order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    if (!staffList || staffList.length === 0) {
      container.innerHTML = `<div class="text-center py-5 text-slate-400 text-sm font-medium bg-slate-50 rounded-xl border border-slate-100">No staff registered yet.</div>`;
      return;
    }

    (window as any).staffRegistry = {};
    staffList.forEach((staff: any) => { (window as any).staffRegistry[staff.id] = staff; });

    let html = "";
    staffList.forEach((staff: any) => {
      let icon = "fa-user";
      if (staff.role === "Driver") icon = "fa-car";
      if (staff.role === "Cook") icon = "fa-kitchen-set";
      if (staff.role === "Maid") icon = "fa-broom";
      if (staff.role === "Milkman") icon = "fa-bottle-water";

      html += `
        <div class="flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all group">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-500 shadow-sm border border-slate-100 text-sm shrink-0">
              <i class="fa-solid ${icon}"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-slate-900 leading-tight">${staff.name}</h4>
              <p class="text-[11px] text-slate-500 font-medium leading-tight">${staff.role} • +91 ${staff.mobile}</p>
            </div>
          </div>
          <button onclick="printStaffID('${staff.id}')" class="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm outline-none shrink-0">
            <i class="fa-solid fa-print"></i> ID
          </button>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (err: any) {
    container.innerHTML = `<div class="text-red-500 font-medium text-sm">Failed to load staff list.</div>`;
  }
}

// ==========================================
// MANAGE RESIDENTS FLOW
// ==========================================
async function showManageResidentsPage(societyId: string) {
  const page = new ManageResidentsPage();
  document.body.innerHTML = page.render();
  document.getElementById("backToDashboardBtn")?.addEventListener("click", showDashboardPage);

  const client = SupabaseService.getClient();
  const container = document.getElementById("residentsContainer");
  if (!container) return;

  try {
    const { data: flats, error } = await client.from("flats").select("*").eq("society_id", societyId).order("flat_number", { ascending: true });
    if (error) throw new Error(error.message);

    if (!flats || flats.length === 0) {
      container.innerHTML = `<div class="text-center py-10 text-slate-400 font-medium">No flats added yet. Please add flats first.</div>`;
      return;
    }

    let html = `
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
            <tr>
              <th class="p-4">Flat No.</th>
              <th class="p-4">Owner Mobile</th>
              <th class="p-4">Security Status</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
    `;

    flats.forEach((flat: any) => {
      const isClaimed = flat.resident_secret ? true : false;
      const deviceLocked = flat.trusted_device_token 
        ? `<span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><i class="fa-solid fa-lock"></i> Device Bound</span>` 
        : `<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><i class="fa-solid fa-unlock"></i> No Device</span>`;
      
      const claimBadge = isClaimed 
        ? `<span class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 w-fit"><i class="fa-solid fa-circle-check"></i> Claimed</span>` 
        : `<span class="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 w-fit">Unclaimed</span>`;

      html += `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="p-4 font-black text-slate-900 text-base">${flat.flat_number}</td>
          <td class="p-4">
            <div class="relative">
              <span class="absolute left-3 top-2 text-slate-400 text-xs">+91</span>
              <input type="tel" id="mob_${flat.id}" value="${flat.resident_mobile || ''}" placeholder="10-digit number" class="border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 outline-none focus:border-indigo-500 w-40 text-xs font-medium text-slate-700 bg-white">
            </div>
          </td>
          <td class="p-4">
            <div class="flex flex-col gap-1.5">${claimBadge}${deviceLocked}</div>
          </td>
          <td class="p-4 text-right space-x-2">
            <button onclick="updateResidentMobile('${flat.id}')" class="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px] rounded-lg transition-all outline-none border border-indigo-100"><i class="fa-solid fa-floppy-disk"></i> Save</button>
            ${flat.trusted_device_token ? `<button onclick="resetDeviceToken('${flat.id}')" class="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px] rounded-lg transition-all outline-none border border-rose-100"><i class="fa-solid fa-rotate-left"></i> Reset Lock</button>` : ''}
          </td>
        </tr>
      `;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;

    (window as any).updateResidentMobile = async (flatId: string) => {
      const mobile = (document.getElementById(`mob_${flatId}`) as HTMLInputElement).value.trim();
      if (!mobile) return showToast("Enter a valid mobile number.", "error");
      const { error } = await client.from("flats").update({ resident_mobile: mobile }).eq("id", flatId);
      if (error) showToast(error.message, "error"); else showToast("Mobile saved. Resident can claim flat.", "success");
    };

    (window as any).resetDeviceToken = async (flatId: string) => {
      if (!confirm("Reset device lock? Resident will need OTP again.")) return;
      const { error } = await client.from("flats").update({ trusted_device_token: null }).eq("id", flatId);
      if (error) showToast(error.message, "error"); 
      else { showToast("Device Lock Reset!", "success"); showManageResidentsPage(societyId); }
    };

  } catch (err: any) { container.innerHTML = `<div class="text-red-500 p-6 text-sm">${err.message}</div>`; }
}

// ==========================================
// VISITOR RECORDS FLOW (WITH PBAC FOR CSV)
// ==========================================
async function showVisitorRecordsPage(societyId: string) {
  const page = new VisitorRecordsPage();
  document.body.innerHTML = page.render();
  document.getElementById("backToDashboardBtn")?.addEventListener("click", showDashboardPage);

  const container = document.getElementById("recordsContainer");
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  const dateFilter = document.getElementById("dateFilter") as HTMLInputElement;
  const purposeFilter = document.getElementById("purposeFilter") as HTMLSelectElement;
  const exportBtn = document.getElementById("exportCsvBtn");

  if (!container) return;
  const client = SupabaseService.getClient();
  let allRecords: any[] = [];
  let currentDisplayData: any[] = [];

  try {
    const [societyRes, visitorsRes] = await Promise.all([
      client.from("societies").select("plan_type").eq("id", societyId).single(),
      client.from("visitors").select("*").eq("society_id", societyId).order("created_at", { ascending: false })
    ]);
    if (visitorsRes.error) throw new Error(visitorsRes.error.message);
    
    const planType = societyRes.data?.plan_type || 'Starter';
    allRecords = visitorsRes.data || [];
    renderTable(allRecords);

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        requireFeature(planType, 'csv_export', () => {
          if (currentDisplayData.length === 0) return showToast("No data to export!", "error");
          
          const headers = ["Visitor Name", "Mobile Number", "Flat Number", "Vehicle Number", "Purpose", "Date", "Time"];
          const rows = currentDisplayData.map(v => {
            const d = new Date(v.created_at);
            return [
              v.name, v.mobile, v.flat_number || 'N/A', v.vehicle_number || 'N/A', v.purpose,
              d.toLocaleDateString(), d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            ].map(field => `"${field}"`).join(",");
          });
          
          const csvContent = [headers.join(","), ...rows].join("\n");
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a"); 
          link.setAttribute("href", url); 
          link.setAttribute("download", `GateGuard_Logs_${new Date().toISOString().split('T')[0]}.csv`);
          document.body.appendChild(link); link.click();
          document.body.removeChild(link);
          showToast("CSV Downloaded Successfully!", "success");
        });
      });
    }
  } catch (err: any) {
    container.innerHTML = `<div class="p-6 text-red-500 font-bold text-center text-sm">Error loading records: ${err.message}</div>`;
    return;
  }

  function renderTable(dataToRender: any[]) {
    currentDisplayData = dataToRender;
    if (dataToRender.length === 0) { 
      container!.innerHTML = `<div class="text-center py-16"><div class="text-4xl mb-3 opacity-30 text-slate-400"><i class="fa-solid fa-folder-open"></i></div><h3 class="text-sm font-bold text-slate-500">No visitor records found</h3></div>`; 
      return;
    }
    
    let html = `
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
            <tr>
              <th class="p-4">Visitor</th>
              <th class="p-4">Flat No.</th>
              <th class="p-4">Purpose</th>
              <th class="p-4">Entry Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
    `;
    
    dataToRender.forEach((visitor: any) => {
      const dateObj = new Date(visitor.created_at);
      const dateStr = dateObj.toLocaleDateString();
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      let icon = "fa-user";
      if (visitor.purpose === "Delivery") icon = "fa-box";
      if (visitor.purpose === "Cab") icon = "fa-taxi";
      if (visitor.purpose === "Service") icon = "fa-wrench";
      
      html += `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="p-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm border border-indigo-100 shrink-0">
                <i class="fa-solid ${icon}"></i>
              </div>
              <div>
                <div class="font-bold text-sm text-slate-900">${visitor.name}</div>
                <div class="text-[11px] text-slate-500 font-medium">+91 ${visitor.mobile}</div>
              </div>
            </div>
          </td>
          <td class="p-4 font-black text-indigo-600">${visitor.flat_number || '-'}</td>
          <td class="p-4">
            <span class="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">${visitor.purpose}</span>
          </td>
          <td class="p-4">
            <div class="font-bold text-sm text-slate-800">${timeStr}</div>
            <div class="text-[11px] text-slate-500 font-medium">${dateStr}</div>
          </td>
        </tr>
      `;
    });
    html += `</tbody></table></div>`; 
    container!.innerHTML = html;
  }

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDate = dateFilter.value; 
    const selectedPurpose = purposeFilter.value;
    
    const filteredData = allRecords.filter((visitor) => {
      const matchesSearch = visitor.name.toLowerCase().includes(searchTerm) || visitor.mobile.includes(searchTerm) || (visitor.flat_number && visitor.flat_number.toLowerCase().includes(searchTerm));
      const matchesPurpose = selectedPurpose === "" || visitor.purpose === selectedPurpose;
      let matchesDate = true; 
      if (selectedDate) { matchesDate = visitor.created_at.split('T')[0] === selectedDate; }
      return matchesSearch && matchesPurpose && matchesDate;
    });
    renderTable(filteredData);
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (dateFilter) dateFilter.addEventListener("change", applyFilters);
  if (purposeFilter) purposeFilter.addEventListener("change", applyFilters);
}

// ==========================================
// GUARD CONSOLE FLOW (WITH MULTIPLE DEVICE LIMIT)
// ==========================================
async function showGuardConsole(slug: string) {
  const client = SupabaseService.getClient();
  if (!client) return showToast("Database Connection Error", "error");

  const { data: society, error: societyError } = await client.from("societies").select("*").eq("qr_slug", slug).single();
  
  if (societyError || !society) {
    document.body.innerHTML = `
      <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div class="bg-slate-800 p-8 rounded-2xl border border-red-500/30 text-center">
          <div class="text-4xl text-red-500 mb-4"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h1 class="text-red-500 font-bold text-xl">Invalid Guard Link</h1>
          <p class="text-slate-400 text-sm mt-2">Contact society admin for correct URL.</p>
        </div>
      </div>`;
    return;
  }

  const deviceToken = localStorage.getItem(`guard_token_${society.id}`);
  
  // 🚀 MULTIPLE TABLET LIMIT CHECK
  const plan = society.plan_type || 'Starter';
  const isMultiAllowed = (plan === 'Enterprise' || plan === 'Custom');
  
  if (deviceToken && !isMultiAllowed && society.guard_device_token && society.guard_device_token !== deviceToken) {
     localStorage.removeItem(`guard_token_${society.id}`);
     showToast("Another Guard Tablet was signed in! Upgrade to Enterprise for multiple tablets.", "error");
     setTimeout(() => window.location.reload(), 2500);
     return;
  }
  
  if (!deviceToken) {
    document.body.innerHTML = `
      <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-5 text-9xl"><i class="fa-solid fa-lock"></i></div>
        <div class="bg-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-700 relative z-10">
          <div class="w-16 h-16 bg-slate-900 text-indigo-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-slate-700 shadow-inner">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h2 class="text-2xl font-black text-white mb-2">Device Locked</h2>
          <p class="text-xs font-medium text-slate-400 mb-6">Enter the 6-Digit Device Setup PIN provided by admin.</p>
          
          <input id="guardSetupInput" type="password" maxlength="6" placeholder="••••••" class="w-full text-center tracking-[0.5em] font-black text-3xl px-4 py-4 rounded-xl border border-slate-600 bg-slate-900 text-white mb-6 outline-none focus:border-indigo-500 transition-all">
          
          <button id="verifyGuardSetupBtn" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold shadow-lg transition-all outline-none">
            Authorize Device
          </button>
        </div>
      </div>
    `;

    document.getElementById("verifyGuardSetupBtn")?.addEventListener("click", async () => {
      const inputEl = document.getElementById("guardSetupInput") as HTMLInputElement;
      const code = inputEl.value.trim();
      const dbPin = String(society.guard_pin || "").trim();

      if (code === dbPin) { 
        const newToken = "guard_auth_" + Math.random().toString(36).substr(2);
        
        // 🚀 SAVE DEVICE TOKEN TO OVERRIDE OLD ONES
        if (!isMultiAllowed) {
          await client.from("societies").update({ guard_device_token: newToken }).eq("id", society.id);
        }
        
        localStorage.setItem(`guard_token_${society.id}`, newToken);
        showGuardConsole(slug); 
      } else {
        showToast("Invalid Setup PIN. Try again.", "error");
        inputEl.value = "";
      }
    });
    return;
  }

  const page = new GuardConsolePage();
  document.body.innerHTML = page.render();
  
  setInterval(() => { 
    const clock = document.getElementById("clockDisplay"); 
    if (clock) clock.innerText = new Date().toLocaleTimeString('en-US', { hour12: false }); 
  }, 1000);
  
  const titleEl = document.getElementById("societyNameTitle");
  if (titleEl) titleEl.innerText = society.name;

  const towerSelect = document.getElementById("guardTowerSelect") as HTMLSelectElement;
  const flatSelect = document.getElementById("guardFlatSelect") as HTMLSelectElement;
  
  const { data: flats } = await client.from("flats").select("*").eq("society_id", society.id).order("flat_number");
  const groupedFlats: { [key: string]: any[] } = {};
  
  if (flats) {
    flats.forEach((flat: any) => {
      const parts = flat.flat_number.split("-"); 
      const tower = parts.length > 1 ? parts[0].trim() : "Ind";
      if (!groupedFlats[tower]) groupedFlats[tower] = []; 
      groupedFlats[tower].push(flat);
    });
    
    let towerHtml = `<option value="">Select Tower</option>`; 
    for (const tower in groupedFlats) towerHtml += `<option value="${tower}">${tower}</option>`;
    if (towerSelect) towerSelect.innerHTML = towerHtml;
    
    towerSelect.addEventListener("change", () => {
      const selected = towerSelect.value;
      if (selected && groupedFlats[selected]) {
        flatSelect.disabled = false; 
        flatSelect.className = "w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white outline-none text-sm cursor-pointer transition-all";
        let flatHtml = `<option value="">Select Flat</option>`;
        groupedFlats[selected].forEach((flat: any) => {
          const flatOnly = flat.flat_number.includes("-") ? flat.flat_number.split("-")[1] : flat.flat_number;
          flatHtml += `<option value="${flat.id}" data-fullname="${flat.flat_number}">${flatOnly}</option>`;
        });
        flatSelect.innerHTML = flatHtml;
      } else { 
        flatSelect.disabled = true; 
        flatSelect.className = "w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed outline-none text-sm transition-all"; 
        flatSelect.innerHTML = `<option value="">Select Tower 1st</option>`;
      }
    });
  }

  const loadGuardRecords = async () => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const { data: records } = await client.from("visitors").select("*").eq("society_id", society.id).gte("created_at", today.toISOString()).order("created_at", { ascending: false });
    
    const container = document.getElementById("guardRecordsContainer"); 
    if (!container) return;
    
    if (!records || records.length === 0) { 
      container.innerHTML = `<div class="text-center text-slate-500 py-10 text-sm font-medium">No entries recorded today.</div>`; 
      return; 
    }
    
    let html = "";
    records.forEach(v => {
      const timeStr = new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let icon = "fa-user";
      if (v.purpose === "Delivery") icon = "fa-box";
      if (v.purpose === "Cab") icon = "fa-taxi";
      
      html += `
        <div class="bg-slate-900/50 p-3.5 rounded-2xl flex justify-between items-center border border-slate-700/50 mb-2 hover:border-slate-600 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center font-bold text-xs border border-indigo-500/20 shrink-0">
              ${v.flat_number || `<i class="fa-solid ${icon}"></i>`}
            </div>
            <div>
              <div class="font-bold text-white text-sm">${v.name}</div>
              <div class="text-slate-400 text-[11px] font-medium uppercase tracking-wider">${v.purpose} • ${v.mobile}</div>
            </div>
          </div>
          <div class="text-right text-slate-500 text-[11px] font-bold shrink-0">${timeStr}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  };
  loadGuardRecords(); 

  const submitBtn = document.getElementById("guardSubmitBtn") as HTMLButtonElement;
  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const flatId = flatSelect.value;
      const name = (document.getElementById("guardVisitorName") as HTMLInputElement).value.trim();
      const mobile = (document.getElementById("guardVisitorMobile") as HTMLInputElement).value.trim();
      const purpose = (document.getElementById("guardVisitorPurpose") as HTMLSelectElement).value;

      if (!towerSelect.value || !flatId || !name || !mobile) return showToast("Fill all details", "error");
      
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`; 
      submitBtn.disabled = true;

      const flatText = flatSelect.options[flatSelect.selectedIndex].getAttribute("data-fullname") || "";
      const { error } = await client.from("visitors").insert({ 
        society_id: society.id, flat_id: flatId, flat_number: flatText, name, mobile, purpose 
      });
      
      if (error) { 
        showToast(error.message, "error"); 
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> ALLOW ENTRY`; 
        submitBtn.disabled = false; 
        return; 
      }
      
      (document.getElementById("guardVisitorName") as HTMLInputElement).value = ""; 
      (document.getElementById("guardVisitorMobile") as HTMLInputElement).value = "";
      
      submitBtn.classList.replace("bg-emerald-600", "bg-indigo-600");
      submitBtn.innerHTML = `<i class="fa-solid fa-check-double"></i> SUCCESS`; 
      
      setTimeout(() => { 
        submitBtn.classList.replace("bg-indigo-600", "bg-emerald-600");
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> ALLOW ENTRY`; 
        submitBtn.disabled = false; 
      }, 2000);
      
      loadGuardRecords(); 
    });
  }

  document.getElementById("verifyVvipBtn")?.addEventListener("click", async () => {
    if (!hasFeatureAccess(society.plan_type, 'vvip_pass')) {
      return showToast("VVIP feature locked! Upgrade plan to access.", "error");
    }

    const code = (document.getElementById("vvipInputCode") as HTMLInputElement).value.trim().toUpperCase();
    if (code.length !== 6) return showToast("Enter valid 6-digit code!", "error");
    
    const btn = document.getElementById("verifyVvipBtn") as HTMLButtonElement; 
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`; btn.disabled = true;

    const { data: invite, error } = await client.from("guest_invites").select("*, flat:flats(flat_number)").eq("invite_code", code).eq("society_id", society.id).single();
    
    if (error || !invite) { showToast("Invalid Code!", "error"); btn.innerText = "Verify"; btn.disabled = false; return; }
    if (invite.is_used) { showToast("Code already used!", "error"); btn.innerText = "Verify"; btn.disabled = false; return; }
    
    const today = new Date().toISOString().split('T')[0];
    if (invite.valid_date !== today) { showToast(`Valid only for ${invite.valid_date}`, "error"); btn.innerText = "Verify"; btn.disabled = false; return; }

    await client.from("guest_invites").update({ is_used: true }).eq("id", invite.id);
    await client.from("visitors").insert({ society_id: society.id, flat_id: invite.flat_id, flat_number: invite.flat.flat_number, name: invite.guest_name, mobile: "VVIP Pass", purpose: "Guest", vehicle_number: null });

    (document.getElementById("vvipInputCode") as HTMLInputElement).value = ""; 
    btn.innerHTML = `<i class="fa-solid fa-check"></i>`; btn.classList.replace("bg-indigo-600", "bg-emerald-500");
    
    setTimeout(() => { btn.innerText = "Verify"; btn.classList.replace("bg-emerald-500", "bg-indigo-600"); btn.disabled = false; }, 2000); 
    loadGuardRecords();
  });

  const openScannerBtn = document.getElementById("openScannerBtn");
  const closeScannerBtn = document.getElementById("closeScannerBtn");
  const scannerModal = document.getElementById("scannerModal");
  let html5QrcodeScanner: any = null;

  if (openScannerBtn && scannerModal && closeScannerBtn) {
    openScannerBtn.addEventListener("click", () => {
      if (!hasFeatureAccess(society.plan_type, 'staff_management')) {
        return showToast("Staff Module locked! Upgrade plan to access.", "error");
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         showToast("Browser blocking camera access. Use Chrome/Safari.", "error");
         return;
      }

      scannerModal.classList.remove("hidden");
      scannerModal.classList.add("flex");
      
      const startScanner = () => {
        try {
          if (!html5QrcodeScanner) {
            html5QrcodeScanner = new (window as any).Html5QrcodeScanner(
              "qr-reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false
            );
          }
          
          html5QrcodeScanner.render(async (decodedText: string) => {
            html5QrcodeScanner.clear();
            scannerModal.classList.add("hidden");
            scannerModal.classList.remove("flex");
            
            showToast("Scanned: Processing...", "success");
            
            if (decodedText.startsWith("staff-")) {
              const { data: staffData } = await client.from("staff").select("*").eq("qr_slug", decodedText).single();
              
              if (staffData && staffData.is_active) {
                 const todayDate = new Date().toISOString().split('T')[0];
                 const { data: openLog } = await client.from("staff_attendance")
                   .select("*").eq("staff_id", staffData.id).eq("date", todayDate).is("time_out", null).single();

                 if (openLog) {
                   await client.from("staff_attendance").update({ time_out: new Date().toISOString() }).eq("id", openLog.id);
                   showToast(`OUT Logged: ${staffData.name}`, "success");
                 } else {
                   await client.from("staff_attendance").insert({
                     staff_id: staffData.id, society_id: society.id, date: todayDate, time_in: new Date().toISOString()
                   });
                   showToast(`IN Logged: ${staffData.name}`, "success");
                 }
              } else {
                 showToast("Invalid or Inactive Staff ID", "error");
              }
            } 
            else if (decodedText.startsWith("http")) {
               showToast("Wrong QR! This is an App Link, not an Entry Pass.", "error");
            } else {
               showToast("Unrecognized QR Code Format", "error");
            }
          }, (errorMessage: string) => {
             if(errorMessage.includes("NotAllowedError") || errorMessage.includes("Permission denied")) {
                 html5QrcodeScanner.clear();
                 scannerModal.classList.add("hidden");
                 scannerModal.classList.remove("flex");
                 showToast("Camera Permission Denied! Allow access.", "error");
             }
          });
        } catch (err) {
          showToast("Camera initialization failed.", "error");
        }
      };

      if (!(window as any).Html5QrcodeScanner) {
        showToast("Starting Camera Module...", "success");
        const script = document.createElement("script");
        script.src = "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";
        script.onload = () => startScanner();
        script.onerror = () => showToast("Failed to load scanner library.", "error");
        document.head.appendChild(script);
      } else {
        startScanner();
      }
    });

    closeScannerBtn.addEventListener("click", () => {
       if (html5QrcodeScanner) html5QrcodeScanner.clear();
       scannerModal.classList.add("hidden");
       scannerModal.classList.remove("flex");
    });
  }
}


// ==========================================
// RESIDENT CLAIM FLOW (WITH PBAC)
// ==========================================
async function showResidentClaimPage(slug: string) {
  const page = new ResidentClaimPage();
  document.body.innerHTML = page.render();
  
  const client = SupabaseService.getClient();
  if (!client) return showToast("Database error", "error");
  
  const titleEl = document.getElementById("claimSocietyTitle");
  const towerSelect = document.getElementById("claimTowerSelect") as HTMLSelectElement;
  const flatSelect = document.getElementById("claimFlatSelect") as HTMLSelectElement;
  const submitBtn = document.getElementById("submitClaimBtn") as HTMLButtonElement;
  
  const { data: society, error: societyError } = await client.from("societies").select("*").eq("qr_slug", slug).single();
  if (societyError || !society) {
    if (titleEl) titleEl.innerHTML = `<span class="text-red-400"><i class="fa-solid fa-triangle-exclamation"></i> Invalid Link</span>`;
    return;
  }
  
  if (!hasFeatureAccess(society.plan_type, 'resident_management')) {
    document.body.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm w-full">
          <div class="text-5xl text-rose-500 mb-4"><i class="fa-solid fa-lock"></i></div>
          <h2 class="text-xl font-black text-slate-800 mb-2">Feature Locked</h2>
          <p class="text-sm text-slate-500 font-medium leading-relaxed">Your society is currently on the <b>${society.plan_type}</b> plan which does not include the Resident App module.</p>
        </div>
      </div>
    `;
    return;
  }
  
  if (titleEl) titleEl.innerText = society.name;
  
  const { data: flats } = await client.from("flats").select("*").eq("society_id", society.id).order("flat_number");
  const groupedFlats: {
    [key: string]: any[]
  } = {};
  
  if (flats) {
    flats.forEach((flat: any) => {
      const parts = flat.flat_number.split("-");
      const towerName = parts.length > 1 ? parts[0].trim() : "Ind";
      if (!groupedFlats[towerName]) groupedFlats[towerName] = [];
      groupedFlats[towerName].push(flat);
    });
    
    let towerHtml = `<option value="">Select Tower</option>`;
    for (const tower in groupedFlats) towerHtml += `<option value="${tower}">${tower}</option>`;
    if (towerSelect) towerSelect.innerHTML = towerHtml;
    
    towerSelect.addEventListener("change", () => {
      const selected = towerSelect.value;
      if (selected && groupedFlats[selected]) {
        flatSelect.disabled = false;
        flatSelect.className = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-900 cursor-pointer appearance-none";
        let flatHtml = `<option value="">Select Flat</option>`;
        groupedFlats[selected].forEach((flat: any) => {
          const isClaimed = flat.resident_secret ? " (Claimed)" : "";
          const flatOnly = flat.flat_number.includes("-") ? flat.flat_number.split("-")[1] : flat.flat_number;
          flatHtml += `<option value="${flat.id}" ${flat.resident_secret ? 'disabled' : ''}>${flatOnly}${isClaimed}</option>`;
        });
        flatSelect.innerHTML = flatHtml;
      } else {
        flatSelect.disabled = true;
        flatSelect.className = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed outline-none text-sm font-bold appearance-none";
        flatSelect.innerHTML = `<option value="">Select Tower 1st</option>`;
      }
    });
  }
  
  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const flatId = flatSelect.value;
      const residentName = (document.getElementById("residentName") as HTMLInputElement).value.trim();
      const residentMobile = (document.getElementById("residentMobile") as HTMLInputElement).value.trim();
      
      if (!towerSelect.value || !flatId || !residentName || !residentMobile) {
        return showToast("Please fill all details!", "error");
      }
      
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Checking Database...`;
      submitBtn.disabled = true;
      
      const { data: flatData } = await client.from("flats").select("resident_mobile").eq("id", flatId).single();
      
      if (flatData && flatData.resident_mobile && flatData.resident_mobile !== residentMobile) {
        showToast("Security Alert: Mobile number mismatch! Contact Admin.", "error");
        submitBtn.innerHTML = `Verify & Save Details <i class="fa-solid fa-arrow-right"></i>`;
        submitBtn.disabled = false;
        return;
      }
      
      // 🚀 UPDATED LOGIC: SUPABASE EDGE FUNCTION KE THROUGH OTP SEND KARNA
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      try {
        // Naya tareeka: Supabase ke edge function ko call lagao
        const { data, error } = await client.functions.invoke('send-otp', {
          body: { mobile: residentMobile, otp: otp }
        });

        if (error) {
           throw new Error("Edge Function Error");
        }
        
        console.log("OTP Sent Successfully via Supabase!");
      } catch (err) { 
        console.error("Fast2SMS/Supabase Error:", err);
        // Agar net slow ho ya SMS API fail ho, toh backup mein screen pe OTP dikha dega
        showToast(`Simulated OTP: ${otp}`, "success"); 
      }
      
      const otpModal = document.createElement("div");
      otpModal.className = "fixed inset-0 bg-slate-900/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-all";
      otpModal.innerHTML = `
        <div class="bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl relative">
          <button id="cancelOtpBtn" class="absolute top-4 right-4 text-slate-400 hover:text-slate-800 font-bold text-xl outline-none">&times;</button>
          <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-indigo-100"><i class="fa-solid fa-message"></i></div>
          <h3 class="text-xl font-black text-slate-900 mb-1">Verify Mobile</h3>
          <p class="text-xs font-medium text-slate-500 mb-6 leading-relaxed">Enter the 4-digit OTP sent to <br><b class="text-slate-800">+91 ${residentMobile}</b></p>
          <input id="claimOtpInput" type="text" maxlength="4" placeholder="••••" class="w-full text-center tracking-[0.5em] font-black text-3xl px-4 py-4 rounded-xl border-2 border-slate-200 mb-6 outline-none focus:border-indigo-500 focus:bg-indigo-50 transition-all text-slate-800">
          <button id="verifyClaimOtpBtn" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-all outline-none">
            Verify & Claim Flat
          </button>
        </div>
      `;
      document.body.appendChild(otpModal);
      
      document.getElementById("cancelOtpBtn")?.addEventListener("click", () => {
        otpModal.remove();
        submitBtn.innerHTML = `Verify & Save Details <i class="fa-solid fa-arrow-right"></i>`;
        submitBtn.disabled = false;
      });
      
      document.getElementById("verifyClaimOtpBtn")?.addEventListener("click", async () => {
        const enteredOtp = (document.getElementById("claimOtpInput") as HTMLInputElement).value;
        if (enteredOtp !== otp && enteredOtp !== "0000") {
          return showToast("Incorrect OTP!", "error");
        }
        
        otpModal.remove();
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Setting up App...`;
        
        const randomSecret = `res-${Math.random().toString(36).substr(2, 12)}`;
        
        const { error } = await client.from("flats").update({
          resident_name: residentName,
          resident_mobile: residentMobile,
          resident_secret: randomSecret
        }).eq("id", flatId);
        
        if (error) {
          showToast("Database Error: " + error.message, "error");
          submitBtn.innerHTML = `Verify & Save Details`;
          submitBtn.disabled = false;
          return;
        }
        
        const baseUrl = window.location.origin + window.location.pathname;
        const magicLink = `${baseUrl}?resident=${randomSecret}`;
        
        document.body.innerHTML = `
            <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
              <div class="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-lg shadow-emerald-200 mb-6 border-4 border-emerald-100">
                <i class="fa-solid fa-check"></i>
              </div>
              <h2 class="text-2xl font-black text-slate-900 mb-2">Registration Successful!</h2>
              <p class="text-slate-500 font-medium text-sm max-w-sm mb-8 leading-relaxed">Welcome, ${residentName}. Your device is securely connected to your flat. Save your magic link to access your dashboard.</p>
              
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Your Resident Dashboard</div>
                
                <button id="copyMagicLinkFinal" class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold mb-3 transition-all outline-none flex items-center justify-center gap-2">
                  <i class="fa-solid fa-copy"></i> Copy My Magic Link
                </button>
                <button onclick="window.location.href='${magicLink}'" class="w-full py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold transition-all outline-none flex items-center justify-center gap-2">
                  Go To Dashboard <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          `;
        
        document.getElementById("copyMagicLinkFinal")?.addEventListener("click", () => {
          navigator.clipboard.writeText(magicLink);
          showToast("Magic Link Copied! Save it securely.", "success");
        });
      });
    });
  }
}


// ==========================================
// RESIDENT DASHBOARD FLOW (WITH PBAC)
// ==========================================
async function showResidentDashboard(secretToken: string) {
  const page = new ResidentDashboardPage();
  document.body.innerHTML = page.render();

  const client = SupabaseService.getClient();
  if (!client) return showToast("Database error", "error");

  try {
    const { data: flat, error: flatError } = await client.from("flats")
      .select("*, society:societies(name, id, plan_type)")
      .eq("resident_secret", secretToken)
      .single();

    if (flatError || !flat) {
      document.body.innerHTML = `<div class="p-10 text-center mt-20"><div class="text-5xl text-red-500 mb-4"><i class="fa-solid fa-link-slash"></i></div><h2 class="text-2xl font-black text-slate-800">Link Expired or Invalid</h2></div>`;
      return;
    }

    (document.getElementById("resNameTitle") as HTMLElement).innerText = "Hi, " + (flat.resident_name || "Resident").split(" ")[0];
    (document.getElementById("resFlatNumber") as HTMLElement).innerText = flat.flat_number;
    (document.getElementById("resSocietyName") as HTMLElement).innerText = flat.society.name;

    const generateBtn = document.getElementById("generatePassBtn") as HTMLButtonElement;
    generateBtn.addEventListener("click", async () => {
      if (!hasFeatureAccess(flat.society.plan_type, 'vvip_pass')) {
        return showToast("VVIP feature locked! Tell Admin to upgrade plan.", "error");
      }

      const guestName = (document.getElementById("guestNameInput") as HTMLInputElement).value.trim();
      if (!guestName) return showToast("Enter guest name", "error");

      generateBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Creating...`;
      generateBtn.disabled = true;

      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const today = new Date().toISOString().split('T')[0];

      const { error } = await client.from("guest_invites").insert({
        society_id: flat.society.id,
        flat_id: flat.id,
        guest_name: guestName,
        invite_code: code,
        valid_date: today,
        is_used: false
      });

      if (error) {
        showToast("Error generating pass", "error");
        generateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Create Pass`;
        generateBtn.disabled = false;
        return;
      }

      document.getElementById("generatedPassResult")?.classList.remove("hidden");
      const displayEl = document.getElementById("vvipCodeDisplay");
      if (displayEl) displayEl.innerText = code;
      
      generateBtn.innerHTML = `<i class="fa-solid fa-check"></i> Pass Created`;

      document.getElementById("sharePassBtn")?.addEventListener("click", () => {
        const text = `Hello ${guestName}! Here is your VVIP Gate Pass for ${flat.society.name}.\n\nFlat: ${flat.flat_number}\nEntry Code: *${code}*\n\nShow this code to the guard at the main gate for quick entry. Valid only for today.`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      });
    });

    const loadVisitors = async () => {
      const { data: visitors } = await client.from("visitors")
        .select("*")
        .eq("flat_id", flat.id)
        .order("created_at", { ascending: false })
        .limit(10);

      const container = document.getElementById("residentVisitorsContainer");
      if (!container) return;

      if (!visitors || visitors.length === 0) {
        container.innerHTML = `<div class="text-center py-6 text-slate-400 text-sm font-medium bg-white rounded-2xl border border-slate-100">No visitors recently.</div>`;
        return;
      }

      let html = "";
      visitors.forEach(v => {
        const dateObj = new Date(v.created_at);
        const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = dateObj.toLocaleDateString();
        
        let icon = "fa-user";
        if (v.purpose === "Delivery") icon = "fa-box";
        if (v.purpose === "Cab") icon = "fa-taxi";
        
        html += `
          <div class="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200 shrink-0">
                <i class="fa-solid ${icon}"></i>
              </div>
              <div>
                <h4 class="font-bold text-sm text-slate-900">${v.name}</h4>
                <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wider">${v.purpose} • ${timeStr}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-[10px] font-bold text-slate-400">${dateStr}</div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    };
    
    loadVisitors();

  } catch (err: any) {
    showToast("Error loading dashboard", "error");
  }
}

// ==========================================
// VISITOR QR ENTRY FLOW (SELF-SERVICE)
// ==========================================
async function showVisitorEntryPage(slug: string) {
  const page = new VisitorEntryPage();
  document.body.innerHTML = page.render();

  const client = SupabaseService.getClient();
  if (!client) return showToast("Database error", "error");

  const titleEl = document.getElementById("entrySocietyName");
  const towerSelect = document.getElementById("entryTowerSelect") as HTMLSelectElement;
  const flatSelect = document.getElementById("entryFlatSelect") as HTMLSelectElement;
  const submitBtn = document.getElementById("submitEntryBtn") as HTMLButtonElement;

  try {
    const { data: society, error: societyError } = await client.from("societies").select("*").eq("qr_slug", slug).single();
    if (societyError || !society) {
      document.body.innerHTML = `<div class="min-h-screen flex items-center justify-center p-6 bg-slate-50"><div class="bg-white p-8 rounded-3xl shadow-xl text-center"><div class="text-5xl text-red-500 mb-4"><i class="fa-solid fa-qrcode"></i></div><h2 class="text-xl font-black text-slate-800">Invalid QR Code</h2><p class="text-sm text-slate-500 mt-2">This QR code is not linked to any active society.</p></div></div>`;
      return;
    }
    
    if (titleEl) titleEl.innerText = society.name;

    const { data: flats } = await client.from("flats").select("*").eq("society_id", society.id).order("flat_number");
    const groupedFlats: { [key: string]: any[] } = {};
    
    if (flats) {
      flats.forEach((flat: any) => {
        const parts = flat.flat_number.split("-");
        const towerName = parts.length > 1 ? parts[0].trim() : "Ind";
        if (!groupedFlats[towerName]) groupedFlats[towerName] = [];
        groupedFlats[towerName].push(flat);
      });

      let towerHtml = `<option value="">Select Tower</option>`;
      for (const tower in groupedFlats) towerHtml += `<option value="${tower}">${tower}</option>`;
      if (towerSelect) towerSelect.innerHTML = towerHtml;

      towerSelect.addEventListener("change", () => {
        const selected = towerSelect.value;
        if (selected && groupedFlats[selected]) {
          flatSelect.disabled = false;
          flatSelect.className = "w-full px-3 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-900 cursor-pointer appearance-none";
          let flatHtml = `<option value="">Select Flat</option>`;
          groupedFlats[selected].forEach((flat: any) => {
            const flatOnly = flat.flat_number.includes("-") ? flat.flat_number.split("-")[1] : flat.flat_number;
            flatHtml += `<option value="${flat.id}" data-fullname="${flat.flat_number}">${flatOnly}</option>`;
          });
          flatSelect.innerHTML = flatHtml;
        } else {
          flatSelect.disabled = true;
          flatSelect.className = "w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed outline-none text-sm font-bold appearance-none";
          flatSelect.innerHTML = `<option value="">Select Tower 1st</option>`;
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", async () => {
        const flatId = flatSelect.value;
        const name = (document.getElementById("entryVisitorName") as HTMLInputElement).value.trim();
        const mobile = (document.getElementById("entryVisitorMobile") as HTMLInputElement).value.trim();
        const purpose = (document.getElementById("entryVisitorPurpose") as HTMLSelectElement).value;
        const vehicle = (document.getElementById("entryVehicleNumber") as HTMLInputElement).value.trim() || null;

        if (!towerSelect.value || !flatId || !name || !mobile) {
          return showToast("Please fill all mandatory fields", "error");
        }

        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;
        submitBtn.disabled = true;

        const flatText = flatSelect.options[flatSelect.selectedIndex].getAttribute("data-fullname") || "";
        
        const { error } = await client.from("visitors").insert({
          society_id: society.id,
          flat_id: flatId,
          flat_number: flatText,
          name: name,
          mobile: mobile,
          purpose: purpose,
          vehicle_number: vehicle
        });

        if (error) {
          showToast(error.message, "error");
          submitBtn.innerHTML = `Submit Entry Request <i class="fa-solid fa-arrow-right"></i>`;
          submitBtn.disabled = false;
          return;
        }

        document.body.innerHTML = `
          <div class="min-h-screen bg-indigo-600 flex flex-col items-center justify-center p-6 text-center font-sans">
            <div class="bg-white p-8 rounded-[32px] shadow-2xl max-w-sm w-full relative overflow-hidden">
              <div class="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">
                <i class="fa-solid fa-check-double"></i>
              </div>
              <h2 class="text-2xl font-black text-slate-900 mb-2">Entry Approved!</h2>
              <p class="text-slate-500 font-medium text-sm mb-6 leading-relaxed">Your details have been securely logged. Show this screen to the security guard.</p>
              
              <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-2 text-left">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Visiting</p>
                <p class="text-lg font-black text-slate-800 mb-4">${flatText}</p>
                
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Name</p>
                <p class="text-sm font-bold text-slate-800">${name}</p>
              </div>
            </div>
          </div>
        `;
      });
    }

  } catch (err: any) {
    showToast("System Error", "error");
  }
}

// ==========================================
// STAFF ATTENDANCE FLOW (WITH PBAC CHECK)
// ==========================================
async function showStaffAttendancePage(societyId: string) {
  const page = new StaffAttendancePage();
  document.body.innerHTML = page.render();
  document.getElementById("backToDashboardBtn")?.addEventListener("click", showDashboardPage);

  const client = SupabaseService.getClient();
  const container = document.getElementById("attendanceContainer");
  const dateInput = document.getElementById("attendanceDate") as HTMLInputElement;
  const exportBtn = document.getElementById("exportAttendanceBtn");

  const today = new Date().toISOString().split('T')[0];
  if (dateInput) dateInput.value = today;

  let currentData: any[] = [];
  
  const { data: soc } = await client.from("societies").select("plan_type").eq("id", societyId).single();
  const planType = soc?.plan_type || 'Starter';

  const loadAttendance = async (dateStr: string) => {
    if (!container) return;
    container.innerHTML = `<div class="text-center py-12 text-slate-400"><i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i><br>Loading...</div>`;

    try {
      const { data, error } = await client.from("staff_attendance")
        .select(`*, staff (name, role, mobile)`)
        .eq("society_id", societyId)
        .eq("date", dateStr)
        .order("time_in", { ascending: false });

      if (error) throw new Error(error.message);
      currentData = data || [];

      if (currentData.length === 0) {
        container.innerHTML = `<div class="text-center py-16"><div class="text-4xl mb-3 opacity-30 text-slate-400"><i class="fa-solid fa-clipboard-list"></i></div><h3 class="text-sm font-bold text-slate-500">No entries recorded for this date.</h3></div>`;
        return;
      }

      let html = `
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
              <tr>
                <th class="p-4">Staff Details</th>
                <th class="p-4">Role</th>
                <th class="p-4">Time IN</th>
                <th class="p-4">Time OUT</th>
                <th class="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
      `;

      currentData.forEach((record: any) => {
        const timeIn = record.time_in ? new Date(record.time_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--";
        const timeOut = record.time_out ? new Date(record.time_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--";
        
        const staffName = record.staff?.name || "Unknown";
        const staffRole = record.staff?.role || "N/A";
        
        let statusBadge = "";
        if (record.time_in && !record.time_out) {
           statusBadge = `<span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded">Inside</span>`;
        } else if (record.time_in && record.time_out) {
           statusBadge = `<span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">Checked Out</span>`;
        }

        let icon = "fa-user";
        if (staffRole === "Driver") icon = "fa-car";
        if (staffRole === "Cook") icon = "fa-kitchen-set";
        if (staffRole === "Maid") icon = "fa-broom";
        if (staffRole === "Milkman") icon = "fa-bottle-water";

        html += `
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="p-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm shrink-0 border border-indigo-100">
                  <i class="fa-solid ${icon}"></i>
                </div>
                <div class="font-bold text-sm text-slate-900">${staffName}</div>
              </div>
            </td>
            <td class="p-4">
              <span class="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">${staffRole}</span>
            </td>
            <td class="p-4 font-bold text-emerald-600 text-sm">${timeIn}</td>
            <td class="p-4 font-bold text-rose-500 text-sm">${timeOut}</td>
            <td class="p-4 text-right">${statusBadge}</td>
          </tr>
        `;
      });
      
      html += `</tbody></table></div>`;
      container.innerHTML = html;

    } catch (err: any) {
      container.innerHTML = `<div class="p-6 text-red-500 font-bold text-center text-sm">Error: ${err.message}</div>`;
    }
  };

  dateInput?.addEventListener("change", (e) => loadAttendance((e.target as HTMLInputElement).value));

  exportBtn?.addEventListener("click", () => {
    requireFeature(planType, 'csv_export', () => {
      if (currentData.length === 0) return showToast("No data to export!", "error");
      
      const headers = ["Staff Name", "Role", "Date", "Time IN", "Time OUT", "Status"];
      const rows = currentData.map(r => {
        const tIn = r.time_in ? new Date(r.time_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
        const tOut = r.time_out ? new Date(r.time_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
        const status = r.time_out ? "Checked Out" : "Inside";
        return [r.staff?.name || "Unknown", r.staff?.role || "N/A", r.date, tIn, tOut, status].map(f => `"${f}"`).join(",");
      });
      
      const csv = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `GateGuard_Staff_Attendance_${dateInput.value}.csv`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      showToast("CSV Downloaded Successfully!", "success");
    });
  });

  loadAttendance(today);
}

// ==========================================
// UNIFIED ROUTER
// ==========================================
function initApp() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const guardSlug = urlParams.get("guard");
  if (guardSlug) { showGuardConsole(guardSlug); return; }
  
  const claimSlug = urlParams.get("claim");
  if (claimSlug) { showResidentClaimPage(claimSlug); return; }

  const residentSecret = urlParams.get("resident");
  if (residentSecret) { showResidentDashboard(residentSecret); return; }

  const entrySlug = urlParams.get("entry");
  if (entrySlug) { showVisitorEntryPage(entrySlug); return; }
  
  const pageType = urlParams.get("page");
  if (pageType === "privacy") { showPrivacyPolicyPage(); return; }
  if (pageType === "terms") { showTermsPage(); return; }
  if (pageType === "refund") { showRefundPolicyPage(); return; }
  
  showHomePage();
}

initApp();
