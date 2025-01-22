export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-blue max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device when you visit our
          website.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Keep you signed in</li>
          <li>Remember your preferences</li>
          <li>Understand how you use our site</li>
          <li>Improve our services</li>
        </ul>

        <h2>3. Types of Cookies We Use</h2>
        <h3>Essential Cookies</h3>
        <p>Required for basic site functionality and security.</p>

        <h3>Functional Cookies</h3>
        <p>Remember your preferences and enhance your experience.</p>

        <h3>Analytics Cookies</h3>
        <p>Help us understand how visitors interact with our site.</p>

        <h2>4. Managing Cookies</h2>
        <p>
          You can control cookies through your browser settings. Note that
          disabling certain cookies may limit site functionality.
        </p>

        <h2>5. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy to reflect changes in our practices.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          For questions about our Cookie Policy, please contact us through our
          platform.
        </p>
      </div>
    </div>
  );
}
