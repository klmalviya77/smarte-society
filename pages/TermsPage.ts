export class TermsPage {
  render(): string {
    return `
      <div class="min-h-screen bg-white font-sans text-slate-800 pb-20">
        <!-- Boring Standard Header -->
        <header class="bg-slate-50 border-b border-slate-200 py-10 px-6 text-center">
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Terms & Conditions</h1>
          <p class="text-sm text-slate-500">Last Updated: June 2026</p>
        </header>

        <!-- Document Content -->
        <div class="max-w-3xl mx-auto mt-8 px-6">
          <div class="text-sm md:text-base leading-relaxed text-slate-700">
            
            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">1. Acceptance of Terms</h2>
            <p class="mb-6">
              By accessing or using GateGuard, you agree to be bound by these Terms & Conditions.
              If you do not agree with any part of these terms, you should discontinue use of the platform.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">2. Eligibility</h2>
            <p class="mb-6">
              GateGuard is intended for use by authorized society administrators, management
              committee members, security personnel and residents. Users must provide accurate
              and up-to-date information while using the platform.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">3. Account Responsibilities</h2>
            <p class="mb-6">
              Administrators are responsible for maintaining the confidentiality of account
              credentials, guard PINs and other access information. Any activity performed
              through an account will be considered the responsibility of the account owner.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">4. Society Data Management</h2>
            <p class="mb-6">
              Society administrators are responsible for ensuring that resident, visitor,
              staff and flat information entered into GateGuard is accurate and lawful.
              GateGuard is not responsible for errors resulting from incorrect information
              provided by society representatives.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">5. Subscription Plans & Limits</h2>
            <p class="mb-6">
              Certain features may be available only under specific subscription plans.
              Flat limits, visitor limits, staff limits and premium functionality may vary
              depending on the selected plan. Access may be restricted if plan limits are exceeded.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">6. Payments & Billing</h2>
            <p class="mb-6">
              Subscription fees, renewal charges and other applicable payments must be paid
              according to the selected plan. Failure to make payments may result in feature
              restrictions, suspension or termination of services.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">7. Acceptable Use Policy</h2>
            <p class="mb-6">
              Users shall not misuse the platform, attempt unauthorized access, interfere
              with system operations, distribute malicious software, perform security attacks,
              scrape data or use GateGuard for unlawful activities.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">8. Security & Guard Devices</h2>
            <p class="mb-6">
              Guard devices, PINs, QR credentials and other security mechanisms must be
              protected from unauthorized access. Administrators should immediately update
              credentials if they suspect compromise.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">9. Intellectual Property</h2>
            <p class="mb-6">
              All software, designs, logos, branding, source code, interfaces and content
              associated with GateGuard remain the exclusive property of GateGuard and its licensors.
              Users may not copy, modify, reverse engineer or redistribute any part of the platform.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">10. Service Availability</h2>
            <p class="mb-6">
              While we strive to maintain uninterrupted service, GateGuard does not guarantee
              continuous availability. Maintenance, upgrades, technical issues or third-party
              service disruptions may temporarily affect platform access.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">11. Limitation of Liability</h2>
            <p class="mb-6">
              GateGuard provides a technology platform to assist society management and security.
              We are not responsible for physical security incidents, human errors, unauthorized
              actions by third parties, incorrect data entered by users or losses arising from
              circumstances beyond our reasonable control.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">12. Suspension & Termination</h2>
            <p class="mb-6">
              GateGuard reserves the right to suspend or terminate accounts that violate
              these terms, engage in fraudulent activity, attempt unauthorized access or
              misuse the platform in any manner.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">13. Changes to Terms</h2>
            <p class="mb-6">
              We may update these Terms & Conditions from time to time. Continued use of
              the platform after changes are published constitutes acceptance of the revised terms.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">14. Governing Law</h2>
            <p class="mb-6">
              These Terms & Conditions shall be governed and interpreted in accordance with
              the laws of India. Any disputes shall be subject to the jurisdiction of the
              appropriate courts in India.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">15. Contact Us</h2>
            <div class="mt-4 mb-6 p-5 bg-slate-50 rounded-lg border border-slate-200">
              <p class="text-slate-800 font-bold mb-1">GateGuard Support</p>
              <p class="text-slate-600">Email: <a href="mailto:support@gateguard.in" class="text-blue-600 hover:underline">support@gateguard.in</a></p>
            </div>

          </div>

          <!-- Simple Boring Go Back Button -->
          <div class="mt-12 mb-12 border-t border-slate-200 pt-8">
            <button onclick="window.history.back()" class="px-6 py-2 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded transition-colors outline-none">
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
