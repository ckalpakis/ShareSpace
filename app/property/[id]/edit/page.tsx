import { Suspense } from "react";
import EditPropertyClient from "./edit-client";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <EditPropertyClient id={params.id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-96 bg-gray-200 rounded"></div>
    </div>
  );
}
