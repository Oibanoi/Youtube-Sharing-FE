import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; // Define the type for the children prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Funny Movies</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-gray-300">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 p-4 bg-gray-100">
        {children} {/* This will render the page content */}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4">
        <p>&copy; 2025 Funny Movies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
