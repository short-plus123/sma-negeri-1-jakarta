import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSchoolSettings } from '../hooks/useSchoolSettings';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, loading } = useSchoolSettings();

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-white text-xl font-bold">
              {!loading && (
                <>
                  <img
                    src={settings.logoUrl}
                    alt={`Logo ${settings.schoolShortName}`}
                    className="h-8 w-8 mr-3 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span>{settings.schoolShortName}</span>
                </>
              )}
              {loading && (
                <span>Loading...</span>
              )}
            </Link>
          </div>

          {/* Desktop Menu - Horizontal text links next to logo (visible on large screens 1024px+) */}
          <div className="hidden lg:flex items-center space-x-8 ml-10">
            <Link
              to="/"
              className="text-white hover:text-blue-200 text-sm font-medium transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-200 text-sm font-medium transition duration-300"
            >
              About
            </Link>
            <Link
              to="/news"
              className="text-white hover:text-blue-200 text-sm font-medium transition duration-300"
            >
              Berita
            </Link>
            <Link
              to="/gallery"
              className="text-white hover:text-blue-200 text-sm font-medium transition duration-300"
            >
              Galeri
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-blue-200 text-sm font-medium transition duration-300"
            >
              Kontak
            </Link>
            <Link
              to="/students"
              className="text-white hover:text-blue-200 text-sm font-medium transition duration-300"
            >
              Students
            </Link>
          </div>

          {/* Tablet Menu - Compact horizontal links (visible on tablet 768px-1023px) */}
          <div className="hidden md:flex lg:hidden items-center space-x-4 ml-6">
            <Link
              to="/"
              className="text-white hover:text-blue-200 text-xs font-medium transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-200 text-xs font-medium transition duration-300"
            >
              About
            </Link>
            <Link
              to="/news"
              className="text-white hover:text-blue-200 text-xs font-medium transition duration-300"
            >
              Berita
            </Link>
            <Link
              to="/gallery"
              className="text-white hover:text-blue-200 text-xs font-medium transition duration-300"
            >
              Galeri
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-blue-200 text-xs font-medium transition duration-300"
            >
              Kontak
            </Link>
            <Link
              to="/students"
              className="text-white hover:text-blue-200 text-xs font-medium transition duration-300"
            >
              Students
            </Link>
          </div>

          {/* Spacer to push mobile button to the right */}
          <div className="flex-grow"></div>

          {/* Mobile menu button (visible on mobile and small tablet only) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (visible on mobile and small screens only when opened) */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-600 border-t border-blue-500">
              <Link
                to="/"
                className="text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/news"
                className="text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Berita
              </Link>
              <Link
                to="/gallery"
                className="text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Galeri
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Kontak
              </Link>
              <Link
                to="/students"
                className="text-white hover:text-blue-200 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Students
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
