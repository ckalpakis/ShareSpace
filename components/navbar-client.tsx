"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function NavbarClient() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ShareSpace
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/subletting"
              className={`text-sm ${
                pathname === "/subletting"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              List Your Space
            </Link>
            <Link
              href="/renting"
              className={`text-sm ${
                pathname === "/renting"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Find a Space
            </Link>

            {!loading && (
              <>
                {user ? (
                  <Button variant="outline" size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" size="sm">
                      Login / Register
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
