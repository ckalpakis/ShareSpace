import { Footer } from "./footer";
import Navbar from "./navbar";

interface PageContainerProps {
  children: React.ReactNode;
  variant?: "default" | "property";
}

export function PageContainer({
  children,
  variant = "default",
}: PageContainerProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <Navbar />
      </div>
      {variant === "property" && <div className="h-14 sm:h-16" />}
      <main className="flex-grow container mx-auto px-3 sm:px-4 pb-4 sm:pb-6 pt-6 sm:pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
