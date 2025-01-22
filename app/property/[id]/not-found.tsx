import Link from "next/link";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-4">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/renting" className="text-blue-600 hover:underline">
            View all properties
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
