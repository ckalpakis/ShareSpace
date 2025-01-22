import NavbarClient from "./navbar-client";

export default function Navbar() {
  return (
    <header className="h-16">
      <div className="container mx-auto px-4 h-full">
        <nav className="flex items-center justify-between h-full">
          <NavbarClient />
        </nav>
      </div>
    </header>
  );
}
