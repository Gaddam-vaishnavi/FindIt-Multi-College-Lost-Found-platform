import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E5E7EB] font-['Inter',sans-serif]">
      <div className="max-w-[1280px] mx-auto px-[20px] lg:px-[32px] h-[72px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-[10px] text-[#111827] shrink-0 focus:outline-none"
        >
          <span className="w-[36px] h-[36px] rounded-[10px] bg-[#059669] flex items-center justify-center text-[#FFFFFF]">
            <Compass className="w-[20px] h-[20px]" />
          </span>
          <span className="text-[20px] font-bold tracking-[-0.02em] text-[#111827]">
            FindIt
          </span>
        </Link>

        {/* Center: Navigation Links with 32px gap */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-[32px]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Login and Get Started with 16px gap */}
        <div className="hidden md:flex items-center gap-[16px] shrink-0">
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-[42px] px-[16px] rounded-[10px] text-[15px] font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-[10px] bg-[#059669] hover:bg-[#047857] text-[#FFFFFF] text-[15px] font-semibold transition-colors duration-150"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden inline-flex items-center justify-center w-[40px] h-[40px] rounded-[10px] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] border border-[#E5E7EB]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E5E7EB] px-[20px] py-[20px]">
          <nav className="flex flex-col gap-[12px] mb-[20px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-[6px] text-[15px] font-medium text-[#4B5563] hover:text-[#111827]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row gap-[16px] pt-[16px] border-t border-[#E5E7EB]">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center h-[44px] px-[18px] rounded-[10px] border border-[#E5E7EB] text-[15px] font-medium text-[#111827] hover:bg-[#F9FAFB]"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center h-[44px] px-[18px] rounded-[10px] bg-[#059669] hover:bg-[#047857] text-[#FFFFFF] text-[15px] font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;