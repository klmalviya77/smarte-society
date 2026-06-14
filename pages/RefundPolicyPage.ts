export class RefundPolicyPage {
  render(): string {
    return `
      <div class="min-h-screen bg-white font-sans text-slate-800 pb-20">
        <!-- Boring Standard Header -->
        <header class="bg-slate-50 border-b border-slate-200 py-10 px-6 text-center">
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Refund Policy</h1>
          <p class="text-sm text-slate-500">Last Updated: June 2026</p>
        </header>

        <!-- Document Content -->
        <div class="max-w-3xl mx-auto mt-8 px-6">
          <div class="text-sm md:text-base leading-relaxed text-slate-700">
            
            <p class="mb-6">
              This Refund Policy explains the circumstances under which GateGuard may review
              and process refund requests related to subscription services purchased by societies.
              By purchasing or using GateGuard services, you agree to this Refund Policy.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">1. Scope</h2>
            <p class="mb-6">
              This policy applies only to subscription plans and services directly provided
              by GateGuard. It does not apply to third-party services, payment providers,
              internet service providers or any external services that are not controlled by GateGuard.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">2. Before Purchase</h2>
            <p class="mb-6">
              Societies are encouraged to evaluate the platform through demonstrations,
              presentations or trial discussions before purchasing a subscription plan.
              By proceeding with the purchase, the society acknowledges that it has evaluated
              the platform and finds it suitable for its requirements.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">3. General Refund Policy</h2>
            <p class="mb-3">
              Subscription fees are generally non-refundable once the subscription has been
              activated and onboarding, setup or implementation activities have commenced.
            </p>
            <ul class="list-disc pl-6 mb-6 space-y-1">
              <li>Subscription purchases are considered final after activation.</li>
              <li>Setup, onboarding, training and implementation charges are non-refundable.</li>
              <li>Unused subscription periods are not eligible for full or partial refunds.</li>
              <li>Subscriptions cannot be transferred from one society to another.</li>
            </ul>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">4. Manual Renewal Policy</h2>
            <p class="mb-3">
              GateGuard does not perform automatic renewals or recurring automatic charges.
              Subscription renewals must be completed manually by the society before the
              expiry date of the active plan.
            </p>
            <p class="mb-6">
              If a subscription is not renewed before expiry, certain premium features may
              be restricted, suspended or disabled until renewal is completed.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">5. Situations Not Eligible For Refund</h2>
            <ul class="list-disc pl-6 mb-6 space-y-1">
              <li>Change of mind after purchase.</li>
              <li>Non-usage or limited usage of the platform.</li>
              <li>Change in society management committee or administration.</li>
              <li>Early cancellation by the society.</li>
              <li>Lack of internet connectivity, device issues or third-party service failures.</li>
              <li>Temporary interruptions caused by maintenance, upgrades or circumstances beyond GateGuard's reasonable control.</li>
              <li>Incorrect data entered by administrators, residents or authorized users.</li>
            </ul>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">6. Exceptional Refund Requests</h2>
            <p class="mb-3">
              GateGuard may review refund requests in exceptional circumstances, including:
            </p>
            <ul class="list-disc pl-6 mb-3 space-y-1">
              <li>Verified duplicate payments.</li>
              <li>Verified billing errors.</li>
              <li>Cases where a subscription was charged incorrectly by GateGuard.</li>
            </ul>
            <p class="mb-6">
              Supporting documents, payment receipts and relevant details may be required
              before any refund request can be reviewed.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">7. Processing Time</h2>
            <p class="mb-6">
              If a refund request is approved, processing may take up to 15 business days,
              depending on the payment method and banking channels involved.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">8. Changes To This Policy</h2>
            <p class="mb-6">
              GateGuard reserves the right to modify this Refund Policy at any time.
              Updated versions will be published on the platform and become effective upon publication.
            </p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">9. Contact Us</h2>
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
