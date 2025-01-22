import { Suspense } from "react";
import EditPropertyClient from "./edit-client";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "Edit Property",
  description: "Edit your property listing",
};

export default async function EditPropertyPage({ params }: Props) {
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
