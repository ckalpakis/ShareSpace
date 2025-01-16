import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ShareSpace</h3>
            <p className="text-sm text-gray-600 mb-4">
              Find or list your space effortlessly. The easiest way to connect
              with trusted renters and spaces in your area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/renting"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Find a Space
                </Link>
              </li>
              <li>
                <Link
                  href="/subletting"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  List Your Space
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: support@sharespace.com
              </li>
              <li className="text-sm text-gray-600">Phone: (555) 123-4567</li>
              <li className="text-sm text-gray-600">
                Hours: Mon-Fri 9am-6pm EST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} ShareSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
