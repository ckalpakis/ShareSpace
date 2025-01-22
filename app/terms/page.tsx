export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Penn State Housing, you agree to these Terms of
          Service.
        </p>

        <h2>2. User Accounts</h2>
        <p>You must:</p>
        <ul>
          <li>Be a Penn State student to use our services</li>
          <li>Provide accurate information when creating an account</li>
          <li>Maintain the security of your account</li>
          <li>Notify us of any unauthorized use</li>
        </ul>

        <h2>3. Property Listings</h2>
        <p>When listing a property, you must:</p>
        <ul>
          <li>Provide accurate information</li>
          <li>Have the right to list the property</li>
          <li>Maintain current availability status</li>
          <li>Comply with all applicable laws</li>
        </ul>

        <h2>4. Prohibited Activities</h2>
        <p>You may not:</p>
        <ul>
          <li>Provide false information</li>
          <li>Violate any laws or regulations</li>
          <li>Harass other users</li>
          <li>Manipulate platform features</li>
        </ul>

        <h2>5. Termination</h2>
        <p>
          We reserve the right to terminate accounts that violate these terms.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>We may modify these terms at any time with notice to users.</p>

        <h2>7. Contact</h2>
        <p>
          For questions about these Terms, please contact us through our
          platform.
        </p>
      </div>
    </div>
  );
}
