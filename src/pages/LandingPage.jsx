import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    title: 'Lost Item Reporting',
    description:
      'Create a structured notice with item details, last seen location, and date so others on campus know what to look for.',
  },
  {
    title: 'Found Item Reporting',
    description:
      'Log belongings you have picked up on campus with clear descriptions to help the rightful owner identify them.',
  },
  {
    title: 'Search and Filtering',
    description:
      'Narrow down reports by keywords, item categories, or status instead of scrolling through long chat histories.',
  },
  {
    title: 'Item Details',
    description:
      'View dedicated report pages containing location notes, descriptions, and relevant context before reaching out.',
  },
  {
    title: 'Student Accounts',
    description:
      'Manage the reports you have submitted, update item statuses, and keep track of your activity from one account.',
  },
  {
    title: 'College-Based Listings',
    description:
      'Browse reports organized by participating colleges so you only see notices relevant to your campus.',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Report an Item',
    description:
      "Share details about something you've lost or found, including its description and campus location.",
  },
  {
    number: '02',
    title: 'Browse Reports',
    description:
      'Explore available reports and search using item details and categories.',
  },
  {
    number: '03',
    title: 'Follow Up',
    description:
      'Review relevant item details and coordinate its return.',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] antialiased selection:bg-[#059669]/15 selection:text-[#047857]">
      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xs border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#111827] focus:outline-none"
            >
              <span className="inline-block w-2.5 h-2.5 rounded-xs bg-[#059669]" aria-hidden="true" />
              <span>FindIt</span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
              <a
                href="#top"
                onClick={(e) => scrollToSection(e, 'top')}
                className="text-sm font-medium text-[#111827] hover:text-[#059669] transition-colors"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={(e) => scrollToSection(e, 'features')}
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                About
              </a>
            </nav>

            {/* Desktop Auth Actions */}
            <div className="hidden md:flex items-center gap-5">
              <Link
                to="/login"
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#FFFFFF] bg-[#059669] hover:bg-[#047857] rounded-md transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] border border-transparent focus:border-[#E5E7EB]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 pt-3 pb-5 space-y-3">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2.5">
              <a
                href="#top"
                onClick={(e) => scrollToSection(e, 'top')}
                className="text-sm font-medium text-[#111827] py-1"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] py-1"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={(e) => scrollToSection(e, 'features')}
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] py-1"
              >
                Features
              </a>
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className="text-sm font-medium text-[#4B5563] hover:text-[#111827] py-1"
              >
                About
              </a>
            </nav>
            <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB] rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-[#FFFFFF] bg-[#059669] hover:bg-[#047857] rounded-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main id="top">
       {/* 2. Hero Section */}
        <section className="py-16 sm:py-24 lg:py-28 border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Core Message */}
              <div className={heroImgError ? 'lg:col-span-8' : 'lg:col-span-7'}>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#111827] leading-[1.12]">
                  Lost something on campus? Start here.
                </h1>
                <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl">
                  FindIt brings lost-and-found reports into one place. Report misplaced
                  belongings, browse found-item notices, and keep track of your reports
                  without searching through scattered class groups.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#FFFFFF] bg-[#059669] hover:bg-[#047857] rounded-md transition-colors"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#how-it-works"
                    onClick={(e) => scrollToSection(e, 'how-it-works')}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#111827] bg-[#FFFFFF] hover:bg-[#F9FAFB] border border-[#E5E7EB] rounded-md transition-colors"
                  >
                    How It Works
                  </a>
                </div>
              </div>

              {/* Right Column: Authentic Campus Belongings Visual */}
              {!heroImgError && (
                <div className="lg:col-span-5">
                  <figure className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-[#F9FAFB]">
                    <img
                      src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80"
                      alt="Everyday student belongings including a notebook, pen, and personal items on a campus study table"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-72 sm:h-80 lg:h-[360px] object-cover object-center block"
                    />
                  </figure>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* 3. How FindIt Works Section (Editorial Index Layout) */}
        <section id="how-it-works" className="py-20 sm:py-24 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827]">
                How FindIt Works
              </h2>
              <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
                Three straightforward steps to help students manage lost and found belongings.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 border-t border-[#E5E7EB]">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className={`pt-8 pb-4 md:py-10 ${
                    index !== 0
                      ? 'border-t md:border-t-0 md:border-l border-[#E5E7EB] md:pl-8 lg:pl-10'
                      : ''
                  } ${index !== STEPS.length - 1 ? 'md:pr-8 lg:pr-10' : ''}`}
                >
                  <span className="block font-mono text-3xl sm:text-4xl font-semibold text-[#059669] tracking-tight">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-[#111827]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Features Section (Asymmetrical Split Layout) */}
        <section id="features" className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Sticky Intro */}
              <div className="lg:col-span-4">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827]">
                  Built for everyday campus use
                </h2>
                <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
                  Core tools designed to keep lost and found notices structured, searchable, and easy to manage across participating colleges.
                </p>
              </div>

              {/* Right 2-Column Editorial Feature Grid */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                  {FEATURES.map((feature) => (
                    <div
                      key={feature.title}
                      className="pt-5 border-t border-[#E5E7EB]"
                    >
                      <h3 className="text-base font-semibold text-[#111827]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. About FindIt Section */}
        <section id="about" className="py-20 sm:py-24 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827]">
                About FindIt
              </h2>
              <div className="mt-6 pl-5 border-l-2 border-[#059669] space-y-4 text-base text-[#4B5563] leading-relaxed">
                <p>
                  Across most campuses, lost-and-found updates are scattered across WhatsApp chats, department class groups, physical notice boards, and word of mouth. Important details get buried quickly, making it hard for students to check whether an item has been turned in or to reach the person who found it.
                </p>
                <p className="text-[#111827] font-medium">
                  FindIt organizes these reports into one dedicated platform for participating colleges—giving students and campus administrators a clear, central place to post and review lost-and-found notices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Final CTA Section */}
        <section className="py-20 sm:py-24 bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-4">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111827]">
                  Make finding lost belongings a little easier.
                </h2>
                <p className="mt-3 text-base text-[#4B5563] leading-relaxed">
                  Join your campus community and keep lost-and-found information organized in one place.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#FFFFFF] bg-[#059669] hover:bg-[#047857] rounded-md transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Brand & Description */}
            <div className="max-w-sm">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#111827]"
              >
                <span className="inline-block w-2 h-2 rounded-xs bg-[#059669]" aria-hidden="true" />
                <span>FindIt</span>
              </Link>
              <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
                A multi-college lost-and-found platform helping students report, browse, and organize misplaced campus belongings.
              </p>
            </div>

            {/* Valid Navigation & Account Links */}
            <div className="flex flex-wrap gap-12 sm:gap-16 text-sm">
              <div>
                <h3 className="font-semibold text-[#111827]">Navigation</h3>
                <ul className="mt-3 space-y-2.5 text-[#4B5563]">
                  <li>
                    <a
                      href="#top"
                      onClick={(e) => scrollToSection(e, 'top')}
                      className="hover:text-[#111827] transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      onClick={(e) => scrollToSection(e, 'how-it-works')}
                      className="hover:text-[#111827] transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      onClick={(e) => scrollToSection(e, 'features')}
                      className="hover:text-[#111827] transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      onClick={(e) => scrollToSection(e, 'about')}
                      className="hover:text-[#111827] transition-colors"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#111827]">Account</h3>
                <ul className="mt-3 space-y-2.5 text-[#4B5563]">
                  <li>
                    <Link to="/login" className="hover:text-[#111827] transition-colors">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-[#111827] transition-colors">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B5563]">
            <p>&copy; {new Date().getFullYear()} FindIt. All rights reserved.</p>
            <p>Campus Lost &amp; Found Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}