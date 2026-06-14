export class PrivacyPolicyPage {
  render(): string {
    return `
      <div class="min-h-screen bg-white font-sans text-slate-800 pb-20">
        <header class="bg-slate-50 border-b border-slate-200 py-10 px-6 text-center">
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p class="text-sm text-slate-500">Last Updated: June 2026</p>
        </header>

        <div class="max-w-3xl mx-auto mt-8 px-6">
          <div class="text-sm md:text-base leading-relaxed text-slate-700">
            
            <p class="mb-6">GateGuard ("we", "our", "us") is committed to protecting the privacy and security of residents, visitors, staff members, society administrators, and all users of our platform. This Privacy Policy explains how we collect, use, store, and protect information when using GateGuard services.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">1. Information We Collect</h2>
            <p class="mb-3">We may collect the following categories of information:</p>

            <h3 class="font-bold text-slate-800 mt-4 mb-2">A. Society Administrators</h3>
            <ul class="list-disc pl-6 mb-4 space-y-1">
              <li>Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>Society Details</li>
            </ul>

            <h3 class="font-bold text-slate-800 mt-4 mb-2">B. Residents</h3>
            <ul class="list-disc pl-6 mb-4 space-y-1">
              <li>Name</li>
              <li>Mobile Number</li>
              <li>Flat Number</li>
              <li>Emergency Contact Information (if provided)</li>
            </ul>

            <h3 class="font-bold text-slate-800 mt-4 mb-2">C. Visitors & Guests</h3>
            <ul class="list-disc pl-6 mb-4 space-y-1">
              <li>Name</li>
              <li>Mobile Number</li>
              <li>Vehicle Number</li>
              <li>Visit Purpose</li>
              <li>Entry and Exit Records</li>
            </ul>

            <h3 class="font-bold text-slate-800 mt-4 mb-2">D. Staff Members</h3>
            <ul class="list-disc pl-6 mb-4 space-y-1">
              <li>Name</li>
              <li>Mobile Number</li>
              <li>Staff Category (Maid, Driver, Cook, Security, etc.)</li>
              <li>Attendance Records</li>
              <li>QR Code Identification Data</li>
            </ul>

            <h3 class="font-bold text-slate-800 mt-4 mb-2">E. Device & Technical Information</h3>
            <ul class="list-disc pl-6 mb-6 space-y-1">
              <li>Device Information</li>
              <li>Browser Information</li>
              <li>IP Address</li>
              <li>Login Activity</li>
              <li>Application Usage Logs</li>
            </ul>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">2. How We Use Information</h2>
            <p class="mb-3">We use collected information for:</p>
            <ul class="list-disc pl-6 mb-6 space-y-1">
              <li>Managing visitor entries and exits</li>
              <li>Providing security and access control services</li>
              <li>Sending OTPs, alerts, notifications, and communication messages</li>
              <li>Staff attendance management</li>
              <li>Generating QR codes and identity verification</li>
              <li>Society administration and reporting</li>
              <li>Improving platform functionality and user experience</li>
              <li>Preventing fraud, misuse, or unauthorized access</li>
              <li>Compliance with legal obligations</li>
            </ul>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">3. Data Sharing</h2>
            <p class="mb-3">GateGuard does not sell personal information.</p>
            <p class="mb-3">Information may be shared only with:</p>
            <ul class="list-disc pl-6 mb-3 space-y-1">
              <li>Society administrators authorized to manage their society</li>
              <li>SMS, notification, cloud hosting, and communication service providers</li>
              <li>Government or law enforcement authorities when legally required</li>
              <li>Technology partners necessary for platform operation</li>
            </ul>
            <p class="mb-6">All service providers are required to maintain appropriate security standards.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">4. Data Storage & Security</h2>
            <p class="mb-3">We implement industry-standard security measures including:</p>
            <ul class="list-disc pl-6 mb-3 space-y-1">
              <li>Secure cloud infrastructure</li>
              <li>Encrypted data transmission</li>
              <li>Role-based access control</li>
              <li>Authentication and authorization controls</li>
              <li>Regular security monitoring</li>
            </ul>
            <p class="mb-6">Each society's data is logically isolated to prevent unauthorized access by other societies.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">5. Data Retention</h2>
            <p class="mb-3">We retain information only for as long as necessary to:</p>
            <ul class="list-disc pl-6 mb-3 space-y-1">
              <li>Provide services</li>
              <li>Maintain security records</li>
              <li>Meet legal and regulatory requirements</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p class="mb-6">After the retention period, information may be securely deleted or anonymized.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">6. User Rights</h2>
            <p class="mb-3">Users may request:</p>
            <ul class="list-disc pl-6 mb-3 space-y-1">
              <li>Access to their information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of information where legally permissible</li>
              <li>Withdrawal of consent where applicable</li>
            </ul>
            <p class="mb-6">Requests can be submitted through the society administrator or GateGuard support.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">7. Cookies and Analytics</h2>
            <p class="mb-6">GateGuard may use cookies, analytics tools, and similar technologies to improve performance, monitor usage, and enhance user experience.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">8. Children's Privacy</h2>
            <p class="mb-6">GateGuard services are not intended for children under 18 years of age without the involvement of parents, guardians, or society administrators.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">9. Third-Party Services</h2>
            <p class="mb-3">Our platform may use third-party services for:</p>
            <ul class="list-disc pl-6 mb-3 space-y-1">
              <li>Cloud hosting</li>
              <li>SMS delivery</li>
              <li>Push notifications</li>
              <li>Authentication services</li>
              <li>Analytics</li>
            </ul>
            <p class="mb-6">These providers process information only as necessary to provide their services.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">10. Changes to this Privacy Policy</h2>
            <p class="mb-6">We may update this Privacy Policy from time to time. Any updates will be reflected on this page along with the revised "Last Updated" date.</p>

            <h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">11. Contact Us</h2>
            <p class="mb-3">For privacy-related questions, concerns, or requests, please contact:</p>
            <p class="mb-6">Email: <a href="mailto:support@gateguard.in" class="text-blue-600 hover:underline">support@gateguard.in</a></p>

            <p class="mt-10 pt-6 border-t border-slate-200 font-medium text-slate-900">
              By using GateGuard services, you agree to the collection and use of information as described in this Privacy Policy.
            </p>

          </div>

          <div class="mt-8 mb-12">
            <button onclick="window.history.back()" class="px-6 py-2 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded transition-colors">
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
