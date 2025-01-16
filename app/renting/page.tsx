import Navbar from "@/components/navbar";
import { Footer } from "../../components/footer";
import { SearchForm } from "@/components/search-form";
import { PropertyListings } from "@/components/property-listings";

export default function RentingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Space</h1>
        <SearchForm />
        <PropertyListings />
      </main>
      <Footer />
    </div>
  );
}
