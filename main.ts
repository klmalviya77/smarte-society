import { HomePage } from './pages/HomePage';
import { EnrollSocietyPage } from './pages/EnrollSocietyPage';
import { LoginPage } from './pages/LoginPage';
import { SocietyDashboardPage } from './pages/SocietyDashboardPage';
import { AddFlatsPage } from './pages/AddFlatsPage';
import { VisitorRecordsPage } from './pages/VisitorRecordsPage';
import { ManageResidentsPage } from './pages/ManageResidentsPage';
import { VisitorEntryPage } from './pages/VisitorEntryPage';
import { StaffAttendancePage } from './pages/StaffAttendancePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { ManageStaffPage } from './pages/ManageStaffPage';
import { SupabaseService } from './services/SupabaseService';

// ─── App Config ───────────────────────────────────────────────────────────────
// FIX: URLs ab config.js se aate hain — koi hardcoded placeholder nahi.
// config.js me window.APP_CONFIG = { guardAppUrl: "...", residentAppUrl: "..." } set karo.
declare global {
    interface Window {
        APP_CONFIG?: {
            guardAppUrl: string;
            residentAppUrl: string;
        };
    }
}
const GUARD_APP_URL: string   = window.APP_CONFIG?.guardAppUrl   ?? '';
const RESIDENT_APP_URL: string = window.APP_CONFIG?.residentAppUrl ?? '';

// ─── Plan Flat Limits ─────────────────────────────────────────────────────────
// FIX: Magic numbers ek jagah — change karo sirf yahan
const PLAN_FLAT_LIMITS: Record<string, number> = {
    'Starter':      30,
    'Professional': 120,
    'Enterprise':   999999,
    'Custom':       999999,
};

// ─── Production-safe error logger ─────────────────────────────────────────────
// FIX: console.error production me browser console me nahi dikhega
function logError(context: string, err: unknown): void {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        console.error(`[GateGuard] ${context}`, err);
    }
    // Production me yahan Sentry ya koi monitoring service add kar sakte ho:
    // Sentry.captureException(err);
}

// ─── Global Error Handlers ────────────────────────────────────────────────────
window.addEventListener('error', function (event) {
    logError('Uncaught Error', event.error);
});

window.addEventListener('unhandledrejection', function (event) {
    logError('Unhandled Promise Rejection', event.reason);
    const msg = (event.reason as any)?.message || 'Connection Error. Please check your network.';
    showToast(msg, 'error');
});

// ─── Toast System ─────────────────────────────────────────────────────────────
function showToast(message: string, type: 'success' | 'error' = 'success'): void {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-emerald-500';
    const icon    = type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check';
    toast.className = `${bgColor} text-white px-4 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i> <span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove('translate-x-full', 'opacity-0'));
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ─── XSS Protection ───────────────────────────────────────────────────────────
const escapeHTML = (str: unknown): string => {
    if (!str) return '';
    return str.toString().replace(/[&<>'"]/g, (tag: string) => (
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' } as Record<string, string>)[tag] || tag
    ));
};

// ─── Input Validators ─────────────────────────────────────────────────────────
// FIX: Phone aur email validation — pehle koi nahi tha
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX        = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(phone: string): boolean {
    return INDIAN_PHONE_REGEX.test(phone);
}
function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

// ─── Clipboard Helper ─────────────────────────────────────────────────────────
// FIX: navigator.clipboard sirf HTTPS me kaam karta hai — fallback add kiya
async function copyToClipboard(text: string): Promise<void> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // HTTP / purane browser ke liye fallback
            const el = document.createElement('textarea');
            el.value = text;
            el.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
            document.body.appendChild(el);
            el.focus();
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    } catch (e) {
        logError('Clipboard copy failed', e);
        throw new Error('Copy to clipboard failed.');
    }
}

// ─── Secure Token Generator ───────────────────────────────────────────────────
const generateSecureToken = (prefix: string = ''): string => {
    if (window.crypto?.randomUUID) {
        return prefix + window.crypto.randomUUID();
    }
    // Fallback: crypto.getRandomValues se — Math.random nahi
    const arr = new Uint8Array(16);
    window.crypto.getRandomValues(arr);
    return prefix + Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
};

// ─── Plan-Based Access Control (PBAC) ────────────────────────────────────────
const PLAN_FEATURES: Record<string, string[]> = {
    'Starter':      ['basic_entry', 'manual_logs', 'live_logs'],
    'Professional': ['basic_entry', 'manual_logs', 'live_logs', 'csv_export', 'resident_management', 'vvip_pass', 'staff_management'],
    'Enterprise':   ['basic_entry', 'manual_logs', 'live_logs', 'csv_export', 'resident_management', 'vvip_pass', 'staff_management', 'unlimited_flats'],
};

function hasFeatureAccess(planType: string, feature: string): boolean {
    const plan = planType || 'Starter';
    return PLAN_FEATURES[plan]?.includes(feature) ?? false;
}

function requireFeature(planType: string, feature: string, callback: () => void): void {
    if (hasFeatureAccess(planType, feature)) {
        callback();
    } else {
        showToast('Locked! Upgrade to a higher plan to access this feature.', 'error');
    }
}

// ─── Auth Session Guard ───────────────────────────────────────────────────────
// FIX: Session expire ho toh auto login page pe redirect
function setupAuthListener(): void {
    const client = SupabaseService.getClient();
    client.auth.onAuthStateChange((event: string) => {
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
            if (event === 'SIGNED_OUT') {
                showHomePage();
            }
        }
    });
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGES
// ═════════════════════════════════════════════════════════════════════════════

// ─── Home Page ────────────────────────────────────────────────────────────────
function showHomePage(): void {
    const page = new HomePage();
    document.body.innerHTML = page.render();
    document.getElementById('loginPageBtn')?.addEventListener('click', showLoginPage);
    document.getElementById('enrollPageBtn')?.addEventListener('click', showEnrollPage);
    document.getElementById('getStartedBtn')?.addEventListener('click', showEnrollPage);
}

// ─── Enroll Society Page ──────────────────────────────────────────────────────
function showEnrollPage(): void {
    const page = new EnrollSocietyPage();
    document.body.innerHTML = page.render();
    document.getElementById('backBtn')?.addEventListener('click', showHomePage);

    document.getElementById('submitEnrollBtn')?.addEventListener('click', async () => {
        const contactName = (document.getElementById('contactName') as HTMLInputElement).value.trim();
        const societyName = (document.getElementById('societyName') as HTMLInputElement).value.trim();
        const phone       = (document.getElementById('enrollPhone') as HTMLInputElement).value.trim();
        const email       = (document.getElementById('enrollEmail') as HTMLInputElement).value.trim();
        const flatCount   = (document.getElementById('flatCount') as HTMLSelectElement).value;

        // FIX: Proper validation — sirf "fill karo" nahi, format bhi check
        if (!contactName || !societyName || !phone || !email) {
            return showToast('Please fill all required fields!', 'error');
        }
        if (!isValidPhone(phone)) {
            return showToast('Enter a valid 10-digit Indian mobile number.', 'error');
        }
        if (!isValidEmail(email)) {
            return showToast('Enter a valid email address.', 'error');
        }

        const btn = document.getElementById('submitEnrollBtn') as HTMLButtonElement;
        btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...`;
        btn.disabled  = true;

        try {
            const client = SupabaseService.getClient();
            const { error } = await client.from('enrollments').insert({
                contact_name: contactName, society_name: societyName,
                phone: phone, email: email, flat_count_estimate: flatCount,
            });
            if (error) throw new Error(error.message);
            showToast('Request Sent Successfully!', 'success');
            showHomePage();
        } catch (err: unknown) {
            showToast((err as Error).message, 'error');
            btn.innerHTML = `Submit Request <i class="fa-solid fa-paper-plane"></i>`;
            btn.disabled  = false;
        }
    });
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function showLoginPage(): void {
    const page = new LoginPage();
    document.body.innerHTML = page.render();
    document.getElementById('backBtn')?.addEventListener('click', showHomePage);

    document.getElementById('loginBtn')?.addEventListener('click', async () => {
        const email    = (document.getElementById('email') as HTMLInputElement).value.trim();
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (!email || !password) return showToast('Enter email and password', 'error');
        if (!isValidEmail(email)) return showToast('Enter a valid email address.', 'error');

        const btn = document.getElementById('loginBtn') as HTMLButtonElement;
        btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...`;
        btn.disabled  = true;

        try {
            const client = SupabaseService.getClient();
            const { error } = await client.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);
            showToast('Login Successful!', 'success');
            showDashboardPage();
        } catch (err: unknown) {
            showToast((err as Error).message, 'error');
            btn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right-to-bracket"></i>`;
            btn.disabled  = false;
        }
    });

    const toggleBtn     = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const toggleIcon    = document.getElementById('toggleIcon');
    if (toggleBtn && passwordInput && toggleIcon) {
        toggleBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }
}

// ─── Static Pages ─────────────────────────────────────────────────────────────
function showPrivacyPolicyPage(): void { document.body.innerHTML = new PrivacyPolicyPage().render(); }
function showTermsPage(): void        { document.body.innerHTML = new TermsPage().render(); }
function showRefundPolicyPage(): void  { document.body.innerHTML = new RefundPolicyPage().render(); }

// ─── Society Dashboard ────────────────────────────────────────────────────────
async function showDashboardPage(): Promise<void> {
    const page = new SocietyDashboardPage();
    document.body.innerHTML = page.render();
    const client = SupabaseService.getClient();

    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        await client.auth.signOut();
        showToast('Logged out safely', 'success');
        showHomePage();
    });

    try {
        const { data: userData } = await client.auth.getUser();
        if (!userData?.user) return showLoginPage();

        // FIX: Dashboard ke 3 queries parallel chalao — waterfall nahi
        const [societyRes] = await Promise.all([
            client.from('societies').select('*').eq('user_id', userData.user.id).single(),
        ]);
        const society     = societyRes.data;
        const societyError = societyRes.error;

        if (!society || societyError) {
            document.body.innerHTML = `
                <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
                    <div class="bg-white p-8 rounded-[32px] shadow-sm max-w-sm w-full border border-slate-100">
                        <div class="text-4xl text-slate-300 mb-4"><i class="fa-solid fa-building-circle-xmark"></i></div>
                        <h2 class="text-xl font-black text-slate-800 mb-2">No Society Linked</h2>
                        <p class="text-slate-500 font-medium text-sm mb-6 leading-relaxed">Your account is active, but no society profile is currently assigned to you. Please contact administration.</p>
                        <button onclick="location.reload()" class="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md outline-none">Go Back</button>
                    </div>
                </div>`;
            return;
        }

        if (society.is_active === false) {
            document.body.innerHTML = `<div class="p-10 text-center font-bold text-rose-500 mt-20">Account is inactive. Contact support.</div>`;
            return;
        }

        // FIX: Parallel queries — 3 calls ek saath
        const [flatsCountRes, visitorsCountRes, allFlatsRes] = await Promise.all([
            client.from('flats').select('*', { count: 'exact', head: true }).eq('society_id', society.id),
            client.from('visitors').select('*', { count: 'exact', head: true }).eq('society_id', society.id),
            client.from('flats').select('flat_number').eq('society_id', society.id),
        ]);

        const flatsCount   = flatsCountRes.count;
        const visitorsCount = visitorsCountRes.count;
        const allFlats     = allFlatsRes.data;

        const towerSet = new Set<string>();
        if (allFlats) allFlats.forEach((f: any) => towerSet.add(f.flat_number.split('-')[0] || '1'));

        const baseUrl      = window.location.origin + window.location.pathname;
        // FIX: URLs config.js se — hardcoded placeholder nahi
        const guardLink    = GUARD_APP_URL;
        const claimLink    = `${RESIDENT_APP_URL}?claim=${society.claim_token}`;
        const qrEntryLink  = `${baseUrl}?entry=${society.qr_slug}`;
        const qrImageUrl   = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrEntryLink)}&margin=10`;

        // FIX: Guard PIN — agar DB me nahi hai toh blank dikhao, default '123456' nahi
        const displayPin = society.guard_pin ? escapeHTML(society.guard_pin) : '<span class="text-slate-400 text-xl">Not Set</span>';

        const infoContainer = document.getElementById('societyInfoContainer');
        if (infoContainer) {
            infoContainer.innerHTML = `
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center md:items-start mb-6">
                    <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 shrink-0 text-center w-full md:w-auto">
                        <div class="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-3 mx-auto w-fit">
                            <img id="dashboardQrImg" src="${escapeHTML(qrImageUrl)}" crossorigin="anonymous" alt="Gate QR" class="w-32 h-32 object-contain rounded-lg">
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
                        <h2 class="text-3xl font-extrabold text-slate-900 mb-1">${escapeHTML(society.name)}</h2>
                        <p class="text-xs font-bold text-indigo-600 mb-5 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full w-fit mx-auto md:mx-0"><i class="fa-solid fa-crown"></i> ${escapeHTML(society.plan_type)} Plan</p>
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

            // Print Poster
            document.getElementById('printGateQrBtn')?.addEventListener('click', () => {
                const printWindow = window.open('', '', 'width=800,height=900');
                if (!printWindow) return showToast('Popup blocked. Please allow popups.', 'error');
                printWindow.document.write(`
                    <html>
                        <head><title>Gate QR Poster</title></head>
                        <body style="font-family: Arial, sans-serif; text-align: center; padding: 40px; margin: 0; background: #f8fafc;">
                            <div style="background: white; border: 12px solid #4f46e5; border-radius: 40px; padding: 60px 40px 0 40px; max-width: 700px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                                <div style="font-size: 24px; color: #4f46e5; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px;">Welcome to</div>
                                <div style="font-size: 56px; color: #0f172a; font-weight: 900; margin-bottom: 40px; line-height: 1.1;">${escapeHTML(society.name)}</div>
                                <div style="background: #f8fafc; padding: 30px; border-radius: 30px; display: inline-block; border: 3px dashed #cbd5e1; margin-bottom: 40px;">
                                    <img src="${escapeHTML(qrImageUrl)}" style="width: 400px; height: 400px; object-fit: contain;" />
                                </div>
                                <div style="background: #4f46e5; color: white; padding: 20px 50px; border-radius: 100px; font-size: 32px; font-weight: bold; display: inline-block;">SCAN TO ENTER</div>
                                <p style="font-size: 20px; color: #64748b; margin-top: 20px; margin-bottom: 60px; font-weight: 500;">Please scan this QR code using your phone camera.</p>
                                <div style="background: #0f172a; margin: 0 -40px; padding: 30px; color: white;">
                                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">Secured by GateGuard</div>
                                    <div style="font-size: 16px; color: #94a3b8;">India's Smartest Society Management System</div>
                                </div>
                            </div>
                        </body>
                    </html>
                `);
                printWindow.document.close();
                // FIX: setTimeout(1000) ki jagah onload event
                printWindow.onload = () => printWindow.print();
            });

            // Download A4 Poster
            document.getElementById('downloadGateQrBtn')?.addEventListener('click', () => {
                const btn         = document.getElementById('downloadGateQrBtn') as HTMLButtonElement;
                const originalText = btn.innerHTML;
                btn.innerHTML     = `<i class="fa-solid fa-circle-notch fa-spin"></i> Preparing...`;
                btn.disabled      = true;

                const img        = new Image();
                img.crossOrigin  = 'Anonymous';
                img.onload = () => {
                    const canvas   = document.createElement('canvas');
                    canvas.width   = 1240;
                    canvas.height  = 1754;
                    const ctx      = canvas.getContext('2d')!;

                    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.lineWidth = 30; ctx.strokeStyle = '#4f46e5';
                    ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
                    ctx.fillStyle = '#4f46e5'; ctx.font = 'bold 35px Arial'; ctx.textAlign = 'center';
                    ctx.fillText('WELCOME TO', canvas.width / 2, 180);
                    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 85px Arial';
                    ctx.fillText(society.name.toUpperCase(), canvas.width / 2, 280);
                    ctx.lineWidth = 4; ctx.strokeStyle = '#cbd5e1';
                    ctx.setLineDash([15, 15]); ctx.strokeRect(canvas.width / 2 - 350, 400, 700, 700); ctx.setLineDash([]);
                    ctx.drawImage(img, canvas.width / 2 - 300, 450, 600, 600);
                    ctx.fillStyle = '#4f46e5'; ctx.beginPath();
                    ctx.roundRect(canvas.width / 2 - 250, 1200, 500, 100, 50); ctx.fill();
                    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 45px Arial';
                    ctx.fillText('SCAN TO ENTER', canvas.width / 2, 1265);
                    ctx.fillStyle = '#64748b'; ctx.font = '30px Arial';
                    ctx.fillText('Please scan this QR code using your phone camera.', canvas.width / 2, 1380);
                    ctx.fillStyle = '#0f172a';
                    ctx.fillRect(15, canvas.height - 250, canvas.width - 30, 235);
                    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 45px Arial';
                    ctx.fillText('Secured by GateGuard', canvas.width / 2, canvas.height - 130);
                    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 25px Arial';
                    ctx.fillText("India's Smartest Society Management System", canvas.width / 2, canvas.height - 80);

                    const link    = document.createElement('a');
                    link.download = `Gate-Poster-${society.name.replace(/\s+/g, '-')}.png`;
                    link.href     = canvas.toDataURL('image/png');
                    link.click();
                    showToast('Poster Downloaded!', 'success');
                    btn.innerHTML = originalText;
                    btn.disabled  = false;
                };
                img.onerror = () => {
                    showToast('Failed to generate Poster. Check internet.', 'error');
                    btn.innerHTML = originalText;
                    btn.disabled  = false;
                };
                img.src = qrImageUrl;
            });

            // FIX: clipboard copy — secure fallback wala helper use kiya
            document.getElementById('copyGuardLinkBtn')?.addEventListener('click', async () => {
                if (!GUARD_APP_URL) return showToast('Guard App URL not configured in config.js', 'error');
                try {
                    await copyToClipboard(guardLink);
                    showToast('Guard App URL Copied!', 'success');
                } catch { showToast('Copy failed. Please copy manually.', 'error'); }
            });

            document.getElementById('copyClaimLinkBtn')?.addEventListener('click', async () => {
                if (!RESIDENT_APP_URL) return showToast('Resident App URL not configured in config.js', 'error');
                try {
                    await copyToClipboard(claimLink);
                    showToast('Resident Link Copied!', 'success');
                } catch { showToast('Copy failed. Please copy manually.', 'error'); }
            });

            document.getElementById('addFlatsBtn')?.addEventListener('click', () => showAddFlatsPage(society.id));
            document.getElementById('visitorRecordsBtn')?.addEventListener('click', () => showVisitorRecordsPage(society.id));

            document.getElementById('manageStaffBtn')?.addEventListener('click', () => {
                requireFeature(society.plan_type, 'staff_management', () => showManageStaffPage(society.id));
            });
            document.getElementById('manageResidentsBtn')?.addEventListener('click', () => {
                requireFeature(society.plan_type, 'resident_management', () => showManageResidentsPage(society.id));
            });
            document.getElementById('staffLogsBtn')?.addEventListener('click', () => {
                requireFeature(society.plan_type, 'staff_management', () => showStaffAttendancePage(society.id));
            });

            // Guard PIN Modal
            document.getElementById('guardPinBtn')?.addEventListener('click', () => {
                const pinModal       = document.createElement('div');
                pinModal.className   = 'fixed inset-0 bg-slate-900/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm';
                pinModal.innerHTML   = `
                    <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative">
                        <button id="closePinModal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-800 font-bold text-xl outline-none">&times;</button>
                        <div class="w-16 h-16 bg-slate-900 text-indigo-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-slate-700 shadow-md"><i class="fa-solid fa-tablet-screen-button"></i></div>
                        <h2 class="text-xl font-black text-slate-900 mb-1">Guard Tablet PIN</h2>
                        <p class="text-xs font-medium text-slate-500 mb-6 leading-relaxed">Use this 6-digit code to securely bind the security guard's tablet to your society.</p>
                        <div class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 mb-6">
                            <div id="currentGuardPin" class="text-4xl font-mono font-black text-indigo-600 tracking-widest">${displayPin}</div>
                        </div>
                        <button id="generateNewPinBtn" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex justify-center items-center gap-2 outline-none">
                            <i class="fa-solid fa-rotate"></i> Generate New PIN
                        </button>
                    </div>
                `;
                document.body.appendChild(pinModal);

                document.getElementById('closePinModal')?.addEventListener('click', () => pinModal.remove());

                document.getElementById('generateNewPinBtn')?.addEventListener('click', async () => {
                    const btn      = document.getElementById('generateNewPinBtn') as HTMLButtonElement;
                    btn.innerHTML  = `<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...`;
                    btn.disabled   = true;

                    const cryptoArray = new Uint32Array(1);
                    window.crypto.getRandomValues(cryptoArray);
                    const newPin = (cryptoArray[0] % 900000 + 100000).toString();

                    const { error } = await client.from('societies').update({ guard_pin: newPin }).eq('id', society.id);
                    if (error) {
                        showToast('Error: ' + error.message, 'error');
                        btn.innerHTML = `<i class="fa-solid fa-rotate"></i> Generate New PIN`;
                        btn.disabled  = false;
                        return;
                    }
                    document.getElementById('currentGuardPin')!.innerText = newPin;
                    society.guard_pin = newPin;
                    showToast('New PIN Generated!', 'success');
                    btn.innerHTML = `PIN Updated! <i class="fa-solid fa-check"></i>`;
                    setTimeout(() => { btn.innerHTML = `<i class="fa-solid fa-rotate"></i> Generate New PIN`; btn.disabled = false; }, 2000);
                });
            });
        }
    } catch (err: unknown) {
        logError('Dashboard init', err);
        showToast('System initialization failed.', 'error');
    }
}

// ─── Add Flats Page ───────────────────────────────────────────────────────────
function showAddFlatsPage(societyId: string): void {
    const page = new AddFlatsPage();
    document.body.innerHTML = page.render();
    document.getElementById('backToDashboardBtn')?.addEventListener('click', showDashboardPage);

    const radioButtons  = document.getElementsByName('flatMode');
    const autoSection   = document.getElementById('autoSection');
    const manualSection = document.getElementById('manualSection');
    radioButtons.forEach((radio: EventTarget) => {
        radio.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.value === 'auto') {
                autoSection!.style.display   = 'block';
                manualSection!.style.display = 'none';
            } else {
                autoSection!.style.display   = 'none';
                manualSection!.style.display = 'block';
            }
        });
    });

    document.getElementById('saveFlatsBtn')?.addEventListener('click', async () => {
        const mode         = (document.querySelector('input[name="flatMode"]:checked') as HTMLInputElement).value;
        let flatsToInsert: { society_id: string; flat_number: string }[] = [];

        if (mode === 'auto') {
            const tower         = (document.getElementById('towerName') as HTMLInputElement).value.trim();
            const floors        = parseInt((document.getElementById('totalFloors') as HTMLInputElement).value);
            const flatsPerFloor = parseInt((document.getElementById('flatsPerFloor') as HTMLInputElement).value);
            if (!tower || !floors || !flatsPerFloor) return showToast('Fill all auto fields', 'error');
            for (let f = 1; f <= floors; f++) {
                for (let num = 1; num <= flatsPerFloor; num++) {
                    flatsToInsert.push({ society_id: societyId, flat_number: `${tower}-${f * 100 + num}` });
                }
            }
        } else {
            const manualText = (document.getElementById('manualFlats') as HTMLTextAreaElement).value;
            if (!manualText.trim()) return showToast('Enter at least one flat', 'error');
            manualText.split('\n').forEach((line: string) => {
                if (line.trim()) flatsToInsert.push({ society_id: societyId, flat_number: line.trim() });
            });
        }

        const btn          = document.getElementById('saveFlatsBtn') as HTMLButtonElement;
        const originalText = btn.innerHTML;
        btn.innerHTML      = `<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...`;
        btn.disabled       = true;

        try {
            const client = SupabaseService.getClient();
            const [socRes, flatsCountRes] = await Promise.all([
                client.from('societies').select('plan_type').eq('id', societyId).single(),
                client.from('flats').select('*', { count: 'exact', head: true }).eq('society_id', societyId),
            ]);

            const plan        = socRes.data?.plan_type || 'Starter';
            // FIX: PLAN_FLAT_LIMITS constant se limit — magic number nahi
            const limit       = PLAN_FLAT_LIMITS[plan] ?? 30;
            const currentFlats = flatsCountRes.count ?? 0;

            if (currentFlats + flatsToInsert.length > limit) {
                showToast(`Plan Limit Exceeded! Your ${plan} plan allows max ${limit} flats.`, 'error');
                btn.innerHTML = originalText;
                btn.disabled  = false;
                return;
            }

            const { error } = await client.from('flats').insert(flatsToInsert);
            if (error) throw new Error(error.message);
            showToast(`Added ${flatsToInsert.length} flats!`, 'success');
            btn.innerHTML = originalText;
            btn.disabled  = false;
        } catch (err: unknown) {
            showToast((err as Error).message, 'error');
            // FIX: catch me bhi button reset hoga — pehle nahi hota tha
            btn.innerHTML = originalText;
            btn.disabled  = false;
        }
    });
}

// ─── Manage Staff Page ────────────────────────────────────────────────────────
function showManageStaffPage(societyId: string): void {
    const page = new ManageStaffPage();
    document.body.innerHTML = page.render();
    document.getElementById('backToDashboardBtn')?.addEventListener('click', showDashboardPage);
    loadStaffList(societyId);

    document.getElementById('saveStaffBtn')?.addEventListener('click', async () => {
        const name   = (document.getElementById('staffName') as HTMLInputElement).value.trim();
        const mobile = (document.getElementById('staffMobile') as HTMLInputElement).value.trim();
        const role   = (document.getElementById('staffRole') as HTMLSelectElement).value;

        if (!name || !mobile) return showToast('Please enter name and mobile number', 'error');
        // FIX: Staff mobile validation
        if (!isValidPhone(mobile)) return showToast('Enter a valid 10-digit mobile number.', 'error');

        const btn          = document.getElementById('saveStaffBtn') as HTMLButtonElement;
        const originalText = btn.innerHTML;
        btn.innerHTML      = `<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...`;
        btn.disabled       = true;

        const qrSlug = generateSecureToken('staff-');

        try {
            const client = SupabaseService.getClient();
            const { error } = await client.from('staff').insert({
                society_id: societyId, name: name, mobile: mobile,
                role: role, qr_slug: qrSlug, is_active: true,
            });
            if (error) throw new Error(error.message);
            showToast('Staff Registered Successfully!', 'success');
            (document.getElementById('staffName') as HTMLInputElement).value   = '';
            (document.getElementById('staffMobile') as HTMLInputElement).value = '';
            btn.innerHTML = originalText;
            btn.disabled  = false;
            loadStaffList(societyId);
        } catch (err: unknown) {
            showToast((err as Error).message, 'error');
            btn.innerHTML = originalText;
            btn.disabled  = false;
        }
    });
}

// Staff ID Modal (global — inline onclick se call hota hai)
(window as any).printStaffID = (staffId: string): void => {
    const staff = (window as any).staffRegistry?.[staffId];
    if (!staff) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(staff.qr_slug)}`;
    document.getElementById('staffIdModal')?.remove();

    const modal     = document.createElement('div');
    modal.id        = 'staffIdModal';
    modal.style.cssText = `position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px);`;
    modal.innerHTML = `
        <div id="staffIdModalInner" style="background: white; border-radius: 20px; overflow: hidden; width: 100%; max-width: 340px; box-shadow: 0 24px 60px rgba(0,0,0,0.3); animation: slideUp 0.25s ease;">
            <style>
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @media print { body > *:not(#staffIdModal) { display: none !important; } #staffIdModal { position: static !important; background: none !important; padding: 0 !important; backdrop-filter: none !important; } #staffIdModalInner { box-shadow: none !important; max-width: 100% !important; } #modalActionBar, #modalCloseBtn { display: none !important; } }
            </style>
            <div style="display:flex; justify-content:flex-end; padding: 12px 12px 0;">
                <button id="modalCloseBtn" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f5f9; color:#64748b; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
            </div>
            <div id="staffIdCard" style="padding: 0 24px 20px; text-align:center;">
                <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 14px; padding: 18px; margin-bottom: 20px; color:white;">
                    <div style="font-size:11px; letter-spacing:2px; opacity:0.8; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Staff ID Card</div>
                    <div style="font-size:20px; font-weight:900;">GateGuard</div>
                </div>
                <img id="staffQrImg" src="${escapeHTML(qrUrl)}" style="width:140px; height:140px; border:3px solid #e2e8f0; border-radius:12px; padding:4px;" crossorigin="anonymous" />
                <div style="font-size:20px; font-weight:800; color:#1e293b; margin-top:14px;">${escapeHTML(staff.name)}</div>
                <div style="display:inline-block; margin-top:6px; background:#eef2ff; color:#4f46e5; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:3px 14px; border-radius:99px;">${escapeHTML(staff.role)}</div>
                <div style="font-size:13px; color:#64748b; margin-top:10px; font-weight:500;">+91 ${escapeHTML(staff.mobile)}</div>
                <div style="margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9; font-size:10px; color:#94a3b8;">Scan QR to verify identity</div>
            </div>
            <div id="modalActionBar" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; padding:12px 16px 18px; border-top:1px solid #f1f5f9;">
                <button id="modalPrintBtn" style="padding:10px 0; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:18px;">🖨️</span> Print</button>
                <button id="modalDownloadBtn" style="padding:10px 0; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:18px;">⬇️</span> Save</button>
                <button id="modalShareBtn" style="padding:10px 0; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:18px;">📤</span> Share</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('modalCloseBtn')!.onclick = () => modal.remove();
    modal.addEventListener('click', (e: Event) => { if (e.target === modal) modal.remove(); });
    document.getElementById('modalPrintBtn')!.onclick = () => window.print();

    document.getElementById('modalDownloadBtn')!.onclick = () => {
        const img    = document.getElementById('staffQrImg') as HTMLImageElement;
        const canvas = document.createElement('canvas');
        canvas.width = 400; canvas.height = 520;
        const ctx    = canvas.getContext('2d')!;

        ctx.fillStyle = '#ffffff'; ctx.roundRect(0, 0, 400, 520, 20); ctx.fill();
        const grad = ctx.createLinearGradient(0, 0, 400, 100);
        grad.addColorStop(0, '#4f46e5'); grad.addColorStop(1, '#7c3aed');
        ctx.fillStyle = grad; ctx.roundRect(0, 0, 400, 100, [20, 20, 0, 0]); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = 'bold 13px Arial'; ctx.textAlign = 'center';
        ctx.fillText('STAFF ID CARD', 200, 38);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px Arial'; ctx.fillText('GateGuard', 200, 72);
        ctx.drawImage(img, 130, 120, 140, 140);
        ctx.fillStyle = '#1e293b'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center';
        ctx.fillText(staff.name, 200, 300);
        ctx.fillStyle = '#eef2ff'; ctx.beginPath(); ctx.roundRect(140, 312, 120, 28, 14); ctx.fill();
        ctx.fillStyle = '#4f46e5'; ctx.font = 'bold 12px Arial'; ctx.fillText(staff.role.toUpperCase(), 200, 331);
        ctx.fillStyle = '#64748b'; ctx.font = '500 14px Arial'; ctx.fillText('+91 ' + staff.mobile, 200, 370);
        ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 460, 400, 60);
        ctx.fillStyle = '#94a3b8'; ctx.font = '11px Arial'; ctx.fillText('Scan QR to verify', 200, 496);

        const link    = document.createElement('a');
        link.download = `ID-${staff.name.replace(/\s+/g, '-')}.png`;
        link.href     = canvas.toDataURL('image/png');
        link.click();
    };

    document.getElementById('modalShareBtn')!.onclick = async () => {
        const shareText = `Staff ID: ${staff.name}\nRole: ${staff.role}\nMobile: +91 ${staff.mobile}\nVerify: ${staff.qr_slug}`;
        if (navigator.share) {
            try { await navigator.share({ title: 'Staff ID - ' + staff.name, text: shareText }); } catch { /* user cancelled */ }
        } else {
            try {
                await copyToClipboard(shareText);
                showToast('Staff info copied to clipboard!', 'success');
            } catch { showToast('Could not copy. Please copy manually.', 'error'); }
        }
    };
};

// Staff List Loader
async function loadStaffList(societyId: string): Promise<void> {
    const container = document.getElementById('staffListContainer');
    if (!container) return;

    try {
        const client = SupabaseService.getClient();
        const { data: staffList, error } = await client
            .from('staff')
            .select('id, name, mobile, role, qr_slug, is_active, created_at')
            .eq('society_id', societyId)
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        if (!staffList || staffList.length === 0) {
            container.innerHTML = `<div class="text-center py-5 text-slate-400 text-sm font-medium bg-slate-50 rounded-xl border border-slate-100">No staff registered yet.</div>`;
            return;
        }

        (window as any).staffRegistry = {};
        staffList.forEach((s: any) => { (window as any).staffRegistry[s.id] = s; });

        let html = '';
        staffList.forEach((staff: any) => {
            let icon = 'fa-user';
            if (staff.role === 'Driver')   icon = 'fa-car';
            if (staff.role === 'Cook')     icon = 'fa-kitchen-set';
            if (staff.role === 'Maid')     icon = 'fa-broom';
            if (staff.role === 'Milkman')  icon = 'fa-bottle-water';

            html += `
                <div class="flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all group">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-500 shadow-sm border border-slate-100 text-sm shrink-0">
                            <i class="fa-solid ${icon}"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-900 leading-tight">${escapeHTML(staff.name)}</h4>
                            <p class="text-[11px] text-slate-500 font-medium leading-tight">${escapeHTML(staff.role)} • +91 ${escapeHTML(staff.mobile)}</p>
                        </div>
                    </div>
                    <button onclick="printStaffID('${staff.id}')" class="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm outline-none shrink-0">
                        <i class="fa-solid fa-print"></i> ID
                    </button>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (err: unknown) {
        logError('loadStaffList', err);
        container.innerHTML = `<div class="text-red-500 font-medium text-sm">Failed to load staff list.</div>`;
    }
}

// ─── Manage Residents Page ────────────────────────────────────────────────────
async function showManageResidentsPage(societyId: string): Promise<void> {
    const page = new ManageResidentsPage();
    document.body.innerHTML = page.render();
    document.getElementById('backToDashboardBtn')?.addEventListener('click', showDashboardPage);

    const client    = SupabaseService.getClient();
    const container = document.getElementById('residentsContainer');
    if (!container) return;

    try {
        let { data: society } = await client.from('societies').select('*').eq('id', societyId).single();
        if (!society.claim_token) {
            const newToken = generateSecureToken('claim-');
            await client.from('societies').update({ claim_token: newToken }).eq('id', societyId);
            society.claim_token = newToken;
        }

        const baseUrl     = window.location.origin + window.location.pathname;
        const claimLink   = `${baseUrl}?claim=${society.claim_token}`;
        const qrImageUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(claimLink)}`;
        const waShareLink = `https://wa.me/?text=${encodeURIComponent('Hello Residents, please use this link to register your flat in GateGuard: ' + claimLink)}`;

        const { data: flats, error } = await client
            .from('flats')
            .select('id, flat_number, resident_name, resident_mobile, resident_secret')
            .eq('society_id', societyId)
            .order('flat_number', { ascending: true });
        if (error) throw new Error(error.message);

        let html = `
            <div class="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 shrink-0">
                    <img src="${escapeHTML(qrImageUrl)}" crossorigin="anonymous" class="w-28 h-28 object-contain rounded-xl">
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h3 class="text-xl font-black text-indigo-900 mb-1">Resident Registration QR</h3>
                    <p class="text-xs text-indigo-700 font-medium mb-4 leading-relaxed max-w-lg">Share this QR code in your Society WhatsApp group. Residents can scan this to self-register their flats.</p>
                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <button id="waShareBtn" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-md transition-all outline-none">
                            <i class="fa-brands fa-whatsapp"></i> Share Link
                        </button>
                        <button id="rotateTokenBtn" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-md transition-all outline-none">
                            <i class="fa-solid fa-rotate"></i> Change QR Link
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (!flats || flats.length === 0) {
            html += `<div class="text-center py-10 text-slate-400 font-medium">No flats added yet. Please add flats first.</div>`;
        } else {
            html += `
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
                            <tr><th class="p-4">Flat No.</th><th class="p-4">Resident Info</th><th class="p-4">Status</th><th class="p-4 text-right">Actions</th></tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100" id="residentsTableBody">
            `;
            flats.forEach((flat: any) => {
                const isClaimed    = !!flat.resident_secret;
                const claimBadge   = isClaimed
                    ? `<span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 w-fit"><i class="fa-solid fa-circle-check"></i> Registered</span>`
                    : `<span class="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 w-fit">Unclaimed</span>`;
                const residentInfo = isClaimed
                    ? `<div class="font-bold text-sm text-slate-800">${escapeHTML(flat.resident_name)}</div><div class="text-[11px] text-slate-500 font-medium">+91 ${escapeHTML(flat.resident_mobile)}</div>`
                    : `<div class="text-xs text-slate-400 italic">Not registered yet</div>`;
                const actionBtn    = isClaimed
                    ? `<button data-action="reset-flat" data-flat-id="${flat.id}" class="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px] rounded-lg transition-all outline-none border border-rose-100"><i class="fa-solid fa-trash-can"></i> Reset Flat</button>`
                    : `<span class="text-xs text-slate-300">-</span>`;
                html += `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-4 font-black text-slate-900 text-base">${escapeHTML(flat.flat_number)}</td>
                        <td class="p-4">${residentInfo}</td>
                        <td class="p-4">${claimBadge}</td>
                        <td class="p-4 text-right">${actionBtn}</td>
                    </tr>
                `;
            });
            html += `</tbody></table></div>`;
        }

        container.innerHTML = html;

        // FIX: window.fn global se hataya — event delegation use kar raha hai
        document.getElementById('waShareBtn')?.addEventListener('click', () => {
            window.open(waShareLink, '_blank');
        });

        document.getElementById('rotateTokenBtn')?.addEventListener('click', async () => {
            if (!confirm('Generate a new QR Code? The old QR will immediately stop working.')) return;
            const newToken = generateSecureToken('claim-');
            const { error } = await client.from('societies').update({ claim_token: newToken }).eq('id', societyId);
            if (error) showToast('Failed to generate', 'error');
            else { showToast('New Secure QR Generated!', 'success'); showManageResidentsPage(societyId); }
        });

        // FIX: Event delegation — window.resetFlatRegistration global nahi
        document.getElementById('residentsTableBody')?.addEventListener('click', async (e: Event) => {
            const btn = (e.target as Element).closest('[data-action="reset-flat"]') as HTMLElement | null;
            if (!btn) return;
            const flatId = btn.getAttribute('data-flat-id');
            if (!flatId) return;
            if (!confirm("Are you sure? This will remove the resident's access.")) return;
            const { error } = await client.from('flats')
                .update({ resident_name: null, resident_mobile: null, resident_secret: null, trusted_device_token: null })
                .eq('id', flatId);
            if (error) showToast('Reset failed', 'error');
            else { showToast('Flat Registration Reset!', 'success'); showManageResidentsPage(societyId); }
        });

    } catch (err: unknown) {
        logError('showManageResidentsPage', err);
        showToast('Error loading resident list.', 'error');
    }
}

// ─── Visitor Records Page ─────────────────────────────────────────────────────
async function showVisitorRecordsPage(societyId: string): Promise<void> {
    const page = new VisitorRecordsPage();
    document.body.innerHTML = page.render();
    document.getElementById('backToDashboardBtn')?.addEventListener('click', showDashboardPage);

    const container    = document.getElementById('recordsContainer');
    const searchInput  = document.getElementById('searchInput')  as HTMLInputElement;
    const dateFilter   = document.getElementById('dateFilter')   as HTMLInputElement;
    const purposeFilter = document.getElementById('purposeFilter') as HTMLSelectElement;
    const exportBtn    = document.getElementById('exportCsvBtn');

    if (!container) return;
    const client = SupabaseService.getClient();
    let allRecords: any[]          = [];
    let currentDisplayData: any[]  = [];

    try {
        const [societyRes, visitorsRes] = await Promise.all([
            client.from('societies').select('plan_type').eq('id', societyId).single(),
            client.from('visitors').select('*').eq('society_id', societyId).order('created_at', { ascending: false }),
        ]);
        if (visitorsRes.error) throw new Error(visitorsRes.error.message);

        const planType = societyRes.data?.plan_type || 'Starter';
        allRecords     = visitorsRes.data || [];
        renderTable(allRecords);

        exportBtn?.addEventListener('click', () => {
            requireFeature(planType, 'csv_export', () => {
                if (currentDisplayData.length === 0) return showToast('No data to export!', 'error');
                const headers = ['Visitor Name', 'Mobile Number', 'Flat Number', 'Vehicle Number', 'Purpose', 'Date', 'Time'];
                const rows    = currentDisplayData.map(v => {
                    const d = new Date(v.created_at);
                    return [
                        v.name, v.mobile, v.flat_number || 'N/A', v.vehicle_number || 'N/A', v.purpose,
                        d.toLocaleDateString(), d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    ].map(field => `"${field}"`).join(',');
                });
                const csvContent = [headers.join(','), ...rows].join('\n');
                const blob       = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url        = URL.createObjectURL(blob);
                const link       = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `GateGuard_Logs_${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(link); link.click(); document.body.removeChild(link);
                showToast('CSV Downloaded Successfully!', 'success');
            });
        });
    } catch (err: unknown) {
        logError('showVisitorRecordsPage', err);
        showToast('Error loading records.', 'error');
        return;
    }

    function renderTable(dataToRender: any[]): void {
        currentDisplayData = dataToRender;
        if (dataToRender.length === 0) {
            container!.innerHTML = `<div class="text-center py-16"><div class="text-4xl mb-3 opacity-30 text-slate-400"><i class="fa-solid fa-folder-open"></i></div><h3 class="text-sm font-bold text-slate-500">No visitor records found</h3></div>`;
            return;
        }
        let html = `<div class="overflow-x-auto"><table class="w-full text-left border-collapse whitespace-nowrap"><thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold"><tr><th class="p-4">Visitor</th><th class="p-4">Flat No.</th><th class="p-4">Purpose</th><th class="p-4">Entry Time</th></tr></thead><tbody class="divide-y divide-slate-100">`;
        dataToRender.forEach((visitor: any) => {
            const dateObj = new Date(visitor.created_at);
            const dateStr = dateObj.toLocaleDateString();
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let icon = 'fa-user';
            if (visitor.purpose === 'Delivery') icon = 'fa-box';
            if (visitor.purpose === 'Cab')      icon = 'fa-taxi';
            if (visitor.purpose === 'Service')  icon = 'fa-wrench';
            html += `
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm border border-indigo-100 shrink-0"><i class="fa-solid ${icon}"></i></div>
                            <div>
                                <div class="font-bold text-sm text-slate-900">${escapeHTML(visitor.name)}</div>
                                <div class="text-[11px] text-slate-500 font-medium">+91 ${escapeHTML(visitor.mobile)}</div>
                            </div>
                        </div>
                    </td>
                    <td class="p-4 font-black text-indigo-600">${escapeHTML(visitor.flat_number || '-')}</td>
                    <td class="p-4"><span class="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">${escapeHTML(visitor.purpose)}</span></td>
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

    function applyFilters(): void {
        const searchTerm      = searchInput?.value.toLowerCase() ?? '';
        const selectedDate    = dateFilter?.value ?? '';
        const selectedPurpose = purposeFilter?.value ?? '';
        const filteredData    = allRecords.filter((visitor) => {
            const matchesSearch   = visitor.name.toLowerCase().includes(searchTerm)
                || visitor.mobile.includes(searchTerm)
                || (visitor.flat_number && visitor.flat_number.toLowerCase().includes(searchTerm));
            const matchesPurpose  = !selectedPurpose || visitor.purpose === selectedPurpose;
            const matchesDate     = !selectedDate || visitor.created_at.split('T')[0] === selectedDate;
            return matchesSearch && matchesPurpose && matchesDate;
        });
        renderTable(filteredData);
    }

    searchInput?.addEventListener('input', applyFilters);
    dateFilter?.addEventListener('change', applyFilters);
    purposeFilter?.addEventListener('change', applyFilters);
}

// ─── Visitor QR Entry Page ────────────────────────────────────────────────────
async function showVisitorEntryPage(slug: string): Promise<void> {
    const page = new VisitorEntryPage();
    document.body.innerHTML = page.render();

    const client = SupabaseService.getClient();
    if (!client) return showToast('Database error', 'error');

    const titleEl   = document.getElementById('entrySocietyName');
    const towerSelect = document.getElementById('entryTowerSelect') as HTMLSelectElement;
    const flatSelect  = document.getElementById('entryFlatSelect')  as HTMLSelectElement;
    const submitBtn   = document.getElementById('submitEntryBtn')    as HTMLButtonElement;

    try {
        const { data: society, error: societyError } = await client
            .from('societies')
            .select('id, name, qr_slug')
            .eq('qr_slug', slug)
            .single();

        if (societyError || !society) {
            document.body.innerHTML = `<div class="min-h-screen flex items-center justify-center p-6 bg-slate-50"><div class="bg-white p-8 rounded-3xl shadow-xl text-center"><div class="text-5xl text-red-500 mb-4"><i class="fa-solid fa-qrcode"></i></div><h2 class="text-xl font-black text-slate-800">Invalid QR Code</h2><p class="text-sm text-slate-500 mt-2">This QR code is not linked to any active society.</p></div></div>`;
            return;
        }

        if (titleEl) titleEl.innerText = society.name;

        const { data: flats } = await client
            .from('flats')
            .select('id, flat_number')
            .eq('society_id', society.id)
            .order('flat_number');

        const groupedFlats: Record<string, any[]> = {};
        if (flats) {
            flats.forEach((flat: any) => {
                const parts     = flat.flat_number.split('-');
                const towerName = parts.length > 1 ? parts[0].trim() : 'Ind';
                if (!groupedFlats[towerName]) groupedFlats[towerName] = [];
                groupedFlats[towerName].push(flat);
            });
            let towerHtml = `<option value="">Select Tower</option>`;
            for (const tower in groupedFlats) towerHtml += `<option value="${tower}">${tower}</option>`;
            if (towerSelect) towerSelect.innerHTML = towerHtml;

            towerSelect.addEventListener('change', () => {
                const selected = towerSelect.value;
                if (selected && groupedFlats[selected]) {
                    flatSelect.disabled = false;
                    flatSelect.className = 'w-full px-3 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-900 cursor-pointer appearance-none';
                    let flatHtml = `<option value="">Select Flat</option>`;
                    groupedFlats[selected].forEach((flat: any) => {
                        const flatOnly = flat.flat_number.includes('-') ? flat.flat_number.split('-')[1] : flat.flat_number;
                        flatHtml += `<option value="${flat.id}" data-fullname="${flat.flat_number}">${escapeHTML(flatOnly)}</option>`;
                    });
                    flatSelect.innerHTML = flatHtml;
                } else {
                    flatSelect.disabled = true;
                    flatSelect.className = 'w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed outline-none text-sm font-bold appearance-none';
                    flatSelect.innerHTML = `<option value="">Select Tower 1st</option>`;
                }
            });
        }

        submitBtn?.addEventListener('click', async () => {
            const flatId  = flatSelect.value;
            const name    = (document.getElementById('entryVisitorName')    as HTMLInputElement).value.trim();
            const mobile  = (document.getElementById('entryVisitorMobile')  as HTMLInputElement).value.trim();
            const purpose = (document.getElementById('entryVisitorPurpose') as HTMLSelectElement).value;
            const vehicle = (document.getElementById('entryVehicleNumber')  as HTMLInputElement).value.trim() || null;

            if (!towerSelect.value || !flatId || !name || !mobile) {
                return showToast('Please fill all mandatory fields', 'error');
            }
            // FIX: Visitor mobile bhi validate karo
            if (!isValidPhone(mobile)) return showToast('Enter a valid 10-digit mobile number.', 'error');

            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;
            submitBtn.disabled  = true;

            const flatText = flatSelect.options[flatSelect.selectedIndex].getAttribute('data-fullname') || '';
            const { error } = await client.from('visitors').insert({
                society_id: society.id, flat_id: flatId, flat_number: flatText,
                name: name, mobile: mobile, purpose: purpose, vehicle_number: vehicle,
            });

            if (error) {
                showToast('Failed to log entry', 'error');
                submitBtn.innerHTML = `Submit Entry Request <i class="fa-solid fa-arrow-right"></i>`;
                submitBtn.disabled  = false;
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
                            <p class="text-lg font-black text-slate-800 mb-4">${escapeHTML(flatText)}</p>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Name</p>
                            <p class="text-sm font-bold text-slate-800">${escapeHTML(name)}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (err: unknown) {
        logError('showVisitorEntryPage', err);
        showToast('System Error. Try Again.', 'error');
    }
}

// ─── Staff Attendance Page ────────────────────────────────────────────────────
async function showStaffAttendancePage(societyId: string): Promise<void> {
    const page = new StaffAttendancePage();
    document.body.innerHTML = page.render();
    document.getElementById('backToDashboardBtn')?.addEventListener('click', showDashboardPage);

    const client    = SupabaseService.getClient();
    const container = document.getElementById('attendanceContainer');
    const dateInput = document.getElementById('attendanceDate') as HTMLInputElement;
    const exportBtn = document.getElementById('exportAttendanceBtn');
    const today     = new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.value = today;

    let currentData: any[] = [];
    const { data: soc } = await client.from('societies').select('plan_type').eq('id', societyId).single();
    const planType = soc?.plan_type || 'Starter';

    const loadAttendance = async (dateStr: string): Promise<void> => {
        if (!container) return;
        container.innerHTML = `<div class="text-center py-12 text-slate-400"><i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i><br>Loading...</div>`;
        try {
            const { data, error } = await client
                .from('staff_attendance')
                .select('*, staff (name, role, mobile)')
                .eq('society_id', societyId)
                .eq('date', dateStr)
                .order('time_in', { ascending: false });
            if (error) throw new Error(error.message);
            currentData = data || [];

            if (currentData.length === 0) {
                container.innerHTML = `<div class="text-center py-16"><div class="text-4xl mb-3 opacity-30 text-slate-400"><i class="fa-solid fa-clipboard-list"></i></div><h3 class="text-sm font-bold text-slate-500">No entries recorded for this date.</h3></div>`;
                return;
            }

            let html = `<div class="overflow-x-auto"><table class="w-full text-left border-collapse whitespace-nowrap"><thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold"><tr><th class="p-4">Staff Details</th><th class="p-4">Role</th><th class="p-4">Time IN</th><th class="p-4">Time OUT</th><th class="p-4 text-right">Status</th></tr></thead><tbody class="divide-y divide-slate-100">`;
            currentData.forEach((record: any) => {
                const timeIn  = record.time_in  ? new Date(record.time_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
                const timeOut = record.time_out ? new Date(record.time_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
                const staffName = record.staff?.name || 'Unknown';
                const staffRole = record.staff?.role || 'N/A';
                let statusBadge = '';
                if (record.time_in && !record.time_out) {
                    statusBadge = `<span class="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded">Inside</span>`;
                } else if (record.time_in && record.time_out) {
                    statusBadge = `<span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">Checked Out</span>`;
                }
                let icon = 'fa-user';
                if (staffRole === 'Driver')  icon = 'fa-car';
                if (staffRole === 'Cook')    icon = 'fa-kitchen-set';
                if (staffRole === 'Maid')    icon = 'fa-broom';
                if (staffRole === 'Milkman') icon = 'fa-bottle-water';
                html += `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm shrink-0 border border-indigo-100"><i class="fa-solid ${icon}"></i></div>
                                <div class="font-bold text-sm text-slate-900">${escapeHTML(staffName)}</div>
                            </div>
                        </td>
                        <td class="p-4"><span class="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">${escapeHTML(staffRole)}</span></td>
                        <td class="p-4 font-bold text-emerald-600 text-sm">${timeIn}</td>
                        <td class="p-4 font-bold text-rose-500 text-sm">${timeOut}</td>
                        <td class="p-4 text-right">${statusBadge}</td>
                    </tr>
                `;
            });
            html += `</tbody></table></div>`;
            container.innerHTML = html;
        } catch (err: unknown) {
            logError('loadAttendance', err);
            showToast('Failed to load attendance', 'error');
        }
    };

    dateInput?.addEventListener('change', (e: Event) => loadAttendance((e.target as HTMLInputElement).value));

    exportBtn?.addEventListener('click', () => {
        requireFeature(planType, 'csv_export', () => {
            if (currentData.length === 0) return showToast('No data to export!', 'error');
            const headers = ['Staff Name', 'Role', 'Date', 'Time IN', 'Time OUT', 'Status'];
            const rows    = currentData.map(r => {
                const tIn   = r.time_in  ? new Date(r.time_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const tOut  = r.time_out ? new Date(r.time_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                const status = r.time_out ? 'Checked Out' : 'Inside';
                return [r.staff?.name || 'Unknown', r.staff?.role || 'N/A', r.date, tIn, tOut, status]
                    .map(f => `"${f}"`).join(',');
            });
            const csv  = [headers.join(','), ...rows].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href  = URL.createObjectURL(blob);
            link.download = `GateGuard_Staff_Attendance_${dateInput.value}.csv`;
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
            showToast('CSV Downloaded Successfully!', 'success');
        });
    });

    loadAttendance(today);
}

// ═════════════════════════════════════════════════════════════════════════════
// ROUTER
// ═════════════════════════════════════════════════════════════════════════════
function initApp(): void {
    setupAuthListener();
    const urlParams = new URLSearchParams(window.location.search);

    const entrySlug = urlParams.get('entry');
    if (entrySlug) { showVisitorEntryPage(entrySlug); return; }

    const pageType = urlParams.get('page');
    if (pageType === 'privacy') { showPrivacyPolicyPage(); return; }
    if (pageType === 'terms')   { showTermsPage(); return; }
    if (pageType === 'refund')  { showRefundPolicyPage(); return; }

    showHomePage();
}

initApp();
