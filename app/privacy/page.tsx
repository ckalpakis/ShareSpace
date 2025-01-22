export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li>Name and email address when you create an account</li>
          <li>Property listing information when you list a space</li>
          <li>Communications between users regarding properties</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Process your property listings</li>
          <li>Communicate with you about our services</li>
          <li>Improve and develop new features</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your
          information only:
        </p>
        <ul>
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and prevent fraud</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2>6. Contact Us</h2>
        <p>
          For any questions about this Privacy Policy, please contact us through
          our platform.
        </p>
      </div>
    </div>
  );
}
