import { Link } from "react-router-dom";
import {
  FilePlus2,
  Search,
  Handshake,
  SlidersHorizontal,
  Building2,
  ShieldCheck,
  MessageSquareHeart,
  Headphones,
  BatteryCharging,
  CupSoda,
  Wallet,
  MapPin,
  Clock,
  ArrowRight,
  Layers,
  Network,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

const PREVIEW_ITEMS = [
  {
    id: 1,
    status: "Lost",
    title: "Sony WH-1000XM5 Headphones",
    campus: "North Engineering Campus",
    location: "Central Library, 2nd Floor",
    timeAgo: "25 mins ago",
  },
  {
    id: 2,
    status: "Found",
    title: "Silver MacBook Pro Charger (96W)",
    campus: "Arts & Sciences College",
    location: "Student Union Café",
    timeAgo: "1 hour ago",
  },
  {
    id: 3,
    status: "Found",
    title: "Blue Hydro Flask & Student ID",
    campus: "Main University Quad",
    location: "Science Lecture Hall B",
    timeAgo: "3 hours ago",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Report",
    description:
      "Report a lost or found item with its details, description and campus location.",
    icon: FilePlus2,
  },
  {
    step: "02",
    title: "Discover",
    description:
      "Explore listings and search across participating college campuses.",
    icon: Search,
  },
  {
    step: "03",
    title: "Reconnect",
    description:
      "Connect with the person who reported the item and coordinate its safe return.",
    icon: Handshake,
  },
];

const PLATFORM_FEATURES = [
  {
    id: "smart-search",
    title: "Smart Search",
    description:
      "Quickly search lost and found listings using item names, categories and keywords.",
    icon: SlidersHorizontal,
  },
  {
    id: "multi-college-access",
    title: "Multi-College Access",
    description:
      "Explore lost and found reports across participating college campuses.",
    icon: Building2,
  },
  {
    id: "verified-listings",
    title: "Verified Listings",
    description:
      "Help students identify trustworthy listings and relevant item details.",
    icon: ShieldCheck,
  },
  {
    id: "safe-reconnection",
    title: "Safe Reconnection",
    description:
      "Coordinate with the person who found or lost an item for a safe return.",
    icon: MessageSquareHeart,
  },
];

const SAMPLE_FEATURED_ITEMS = [
  {
    id: "sample-1",
    name: "Black Wireless Headphones",
    status: "Lost",
    location: "Central Library",
    reportedTime: "Sample · 2 hours ago",
    category: "Electronics",
    icon: Headphones,
  },
  {
    id: "sample-2",
    name: "Silver Laptop Charger",
    status: "Found",
    location: "Student Union",
    reportedTime: "Sample · 4 hours ago",
    category: "Accessories",
    icon: BatteryCharging,
  },
  {
    id: "sample-3",
    name: "Blue Water Bottle",
    status: "Lost",
    location: "Science Block",
    reportedTime: "Sample · Yesterday",
    category: "Everyday Gear",
    icon: CupSoda,
  },
  {
    id: "sample-4",
    name: "Black Wallet",
    status: "Found",
    location: "College Canteen",
    reportedTime: "Sample · 2 days ago",
    category: "Personal Items",
    icon: Wallet,
  },
];

const ABOUT_HIGHLIGHTS = [
  {
    id: "centralized-platform",
    title: "One Centralized Platform",
    description: "Manage lost and found reports in one place.",
    icon: Layers,
  },
  {
    id: "connected-campuses",
    title: "Connected Campuses",
    description: "Discover relevant reports across participating colleges.",
    icon: Network,
  },
  {
    id: "student-focused",
    title: "Student-Focused Experience",
    description: "Simple and accessible reporting and discovery.",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Existing Navbar kept completely unchanged */}
      <Navbar />

      <main>
        {/* Hero Section (Unchanged) */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-gray-200/80 bg-[#F9FAFB] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Value Proposition & CTAs */}
              <div className="text-center lg:col-span-6 lg:text-left">
                {/* Multi-Campus Eyebrow Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#047857] sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-[#059669]" />
                  Connected Across Partner Campuses
                </div>

                {/* Main Headline */}
                <h1
                  id="hero-heading"
                  className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
                >
                  Reuniting Students With What Matters{" "}
                  <span className="text-[#059669]">Across Every Campus.</span>
                </h1>

                {/* Supporting Description */}
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg lg:mx-0">
                  FindIt is the centralized lost and found network built for
                  multi-college communities. Report misplaced gear, verify
                  found items, and recover your belongings faster—whether you
                  left them in the library or across campuses.
                </p>

                {/* Primary & Secondary CTA Buttons */}
                <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
                  <Link
  to="/explore"
  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold shadow-sm transition-colors"
>
  Explore Items
</Link>
                  

                  <Link to="/login"

                    className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-xs transition-colors duration-200 hover:border-[#059669] hover:text-[#047857] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669] sm:w-auto sm:text-base"
                  >
                    Report an Item
                  </Link>
                </div>

                {/* Quick Trust / Platform Highlights */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#4B5563] sm:text-sm lg:justify-start">
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-[#059669]">✓</span>{" "}
                    Campus-verified listings
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-[#059669]">✓</span>{" "}
                    Cross-college search
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-[#059669]">✓</span> Safe
                    handoff coordination
                  </span>
                </div>
              </div>

              {/* Right Column: Lost & Found Live Activity Dashboard Preview */}
              <div className="lg:col-span-6">
                <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/60 sm:p-6 lg:max-w-none">
                  {/* Mock Window / Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#059669]">
                        Live Campus Feed
                      </p>
                      <h2 className="text-base font-bold text-[#111827] sm:text-lg">
                        Recent Lost &amp; Found Reports
                      </h2>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F9FAFB] px-2.5 py-1 text-xs font-medium text-[#4B5563] ring-1 ring-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                      All Colleges
                    </span>
                  </div>

                  {/* Mock Search Filter Bar */}
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-[#F9FAFB] px-3.5 py-2.5 text-xs text-[#4B5563] sm:text-sm">
                    <span>Search electronics, IDs, keys, books...</span>
                    <span className="rounded bg-white px-2 py-0.5 text-xs font-medium text-[#111827] shadow-2xs ring-1 ring-gray-200">
                      Filter
                    </span>
                  </div>

                  {/* Preview Item Cards */}
                  <div className="mt-4 space-y-3">
                    {PREVIEW_ITEMS.map((item) => {
                      const isFound = item.status === "Found";

                      return (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-[#F9FAFB]/70 p-3.5 transition-colors hover:border-gray-200 hover:bg-white"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                                  isFound
                                    ? "bg-[#059669]/10 text-[#047857]"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {item.status}
                              </span>
                              <span className="truncate text-xs font-medium text-[#4B5563]">
                                {item.campus}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-sm font-semibold text-[#111827]">
                              {item.title}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-[#4B5563]">
                              {item.location}
                            </p>
                          </div>

                          <span className="shrink-0 text-xs text-[#4B5563]">
                            {item.timeAgo}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Preview Footer Summary */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3.5 text-xs text-[#4B5563]">
                    <span>Showing 3 of 128 active campus listings</span>
                    <span className="font-semibold text-[#059669]">
                      Updated just now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section (Unchanged) */}
        <section
          aria-labelledby="how-it-works-heading"
          className="border-b border-gray-200/80 bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Centered Section Header */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#059669] sm:text-sm">
                Simple Process
              </p>
              <h2
                id="how-it-works-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-4xl"
              >
                How FindIt Works
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4B5563] sm:text-lg">
                Three simple steps to help you recover what matters.
              </p>
            </div>

            {/* 3-Step Cards Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3 lg:gap-8">
              {HOW_IT_WORKS_STEPS.map((item) => {
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.step}
                    className="group relative flex flex-col rounded-2xl border border-gray-200/90 bg-[#F9FAFB]/60 p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#059669]/40 hover:bg-white hover:shadow-md hover:shadow-gray-200/60 sm:p-8"
                  >
                    {/* Card Top Row: Icon Badge + Step Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669] transition-colors duration-200 group-hover:bg-[#059669] group-hover:text-white">
                        <IconComponent className="h-6 w-6" strokeWidth={2} />
                      </div>

                      <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-bold tracking-wider text-[#4B5563] transition-colors duration-200 group-hover:border-[#059669]/30 group-hover:text-[#047857]">
                        STEP {item.step}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="mt-6 text-xl font-bold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section (Unchanged) */}
        <section
          aria-labelledby="features-heading"
          className="border-b border-gray-200/80 bg-[#F9FAFB] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Centered Section Header */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#059669] sm:text-sm">
                Platform Capabilities
              </p>
              <h2
                id="features-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-4xl"
              >
                Everything You Need to Find What&apos;s Lost
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4B5563] sm:text-lg">
                A smarter and simpler way to manage lost and found items across
                college campuses.
              </p>
            </div>

            {/* 4-Card Responsive Feature Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {PLATFORM_FEATURES.map((feature) => {
                const IconComponent = feature.icon;

                return (
                  <div
                    key={feature.id}
                    className="group flex flex-col rounded-2xl border border-gray-200/90 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#059669]/40 hover:shadow-md hover:shadow-gray-200/60 sm:p-7"
                  >
                    {/* Feature Icon Badge */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669] transition-colors duration-200 group-hover:bg-[#059669] group-hover:text-white">
                      <IconComponent className="h-5 w-5" strokeWidth={2} />
                    </div>

                    {/* Feature Title & Description */}
                    <h3 className="mt-5 text-lg font-bold text-[#111827]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Lost & Found Items Section (Unchanged) */}
        <section
          aria-labelledby="featured-items-heading"
          className="border-b border-gray-200/80 bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header + Sample Preview Indicator */}
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#047857]">
                Sample Listings Preview
              </div>
              <h2
                id="featured-items-heading"
                className="mt-3 text-2xl font-bold tracking-tight text-[#111827] sm:text-4xl"
              >
                Recently Reported Items
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4B5563] sm:text-lg">
                Explore some of the latest lost and found reports across
                campuses.
              </p>
            </div>

            {/* 4-Card Responsive Marketplace Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {SAMPLE_FEATURED_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isFound = item.status === "Found";

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#059669]/40 hover:shadow-md hover:shadow-gray-200/60"
                  >
                    {/* Consistent-Height Visual Item Placeholder */}
                    <div className="relative flex h-44 w-full flex-col items-center justify-center border-b border-gray-100 bg-[#F9FAFB] px-4 transition-colors duration-200 group-hover:bg-[#059669]/[0.03]">
                      {/* Lost / Found Status Badge */}
                      <span
                        className={`absolute top-3 left-3 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                          isFound
                            ? "bg-[#059669]/15 text-[#047857]"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>

                      {/* Sample Data Tag */}
                      <span className="absolute top-3 right-3 rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-[#4B5563]">
                        Sample
                      </span>

                      {/* Item Visual Icon */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200/80 bg-white text-[#059669] shadow-2xs transition-transform duration-200 group-hover:scale-105">
                        <IconComponent className="h-7 w-7" strokeWidth={1.8} />
                      </div>
                      <span className="mt-2.5 text-xs font-medium text-[#4B5563]">
                        {item.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-bold text-[#111827] transition-colors group-hover:text-[#047857]">
                        {item.name}
                      </h3>

                      {/* Location & Sample Timestamp */}
                      <div className="mt-3 space-y-1.5 text-xs text-[#4B5563] sm:text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin
                            className="h-4 w-4 shrink-0 text-[#059669]"
                            strokeWidth={2}
                          />
                          <span className="truncate">{item.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock
                            className="h-4 w-4 shrink-0 text-[#4B5563]"
                            strokeWidth={2}
                          />
                          <span>{item.reportedTime}</span>
                        </div>
                      </div>

                      {/* Card Footer Action */}
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <Link to="/#featured-items-heading"
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-[#F9FAFB] px-3.5 py-2 text-xs font-semibold text-[#111827] transition-colors duration-200 hover:border-[#059669] hover:bg-[#059669] hover:text-white sm:text-sm"
                        >
                          View Details
                          <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Sample Data Clarification Note */}
            <p className="mt-8 text-center text-xs text-[#4B5563]">
              * Listings shown above are illustrative sample reports created to
              preview the FindIt campus feed.
            </p>
          </div>
        </section>

        {/* About FindIt Section */}
        <section
          aria-labelledby="about-findit-heading"
          className="border-b border-gray-200/80 bg-[#F9FAFB] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Mission Narrative */}
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#059669] sm:text-sm">
                  ABOUT FINDIT
                </p>
                <h2
                  id="about-findit-heading"
                  className="mt-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-4xl"
                >
                  Bringing Campus Communities Together
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">
                  FindIt is designed to make lost and found management easier
                  across multiple college campuses. Instead of depending on
                  scattered messages, notice boards or informal groups, students
                  can use one centralized platform to report lost belongings,
                  discover found items and coordinate their return.
                </p>
              </div>

              {/* Right Column: Three Structured Highlight Rows */}
              <div className="space-y-4 lg:col-span-6">
                {ABOUT_HIGHLIGHTS.map((highlight) => {
                  const IconComponent = highlight.icon;

                  return (
                    <div
                      key={highlight.id}
                      className="group flex items-start gap-4 rounded-2xl border border-gray-200/90 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#059669]/40 hover:shadow-md hover:shadow-gray-200/60 sm:p-6"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669] transition-colors duration-200 group-hover:bg-[#059669] group-hover:text-white">
                        <IconComponent className="h-5 w-5" strokeWidth={2} />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#111827] sm:text-lg">
                          {highlight.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    

      {/* Footer Section */}
      <footer className="bg-[#022C22] text-white border-t border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          {/* Top Multi-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-800/50">
            
            {/* 1. Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#hero-heading"
                className="inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] rounded-lg"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#059669] text-white shadow-sm">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>FindIt</span>
              </a>
              <p className="text-sm sm:text-base text-emerald-100/75 max-w-sm leading-relaxed">
                Helping students reconnect with their lost belongings across college campuses.
              </p>
            </div>

            {/* 2. Quick Links Column */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#hero-heading"
                    className="text-emerald-100/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works-heading"
                    className="text-emerald-100/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#features-heading"
                    className="text-emerald-100/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#featured-items-heading"
                    className="text-emerald-100/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    Featured Items
                  </a>
                </li>
                <li>
                  <a
                    href="#about-findit-heading"
                    className="text-emerald-100/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* 3. Platform Column (Non-Clickable Placeholders) */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Platform
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5 text-emerald-100/50 cursor-default select-none">
                  <span>Explore Items</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300/90 border border-emerald-800/70">
                    Coming Soon
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-emerald-100/50 cursor-default select-none">
                  <span>Report an Item</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300/90 border border-emerald-800/70">
                    Coming Soon
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-emerald-100/50 cursor-default select-none">
                  <span>Login</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300/90 border border-emerald-800/70">
                    Coming Soon
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-emerald-100/50 cursor-default select-none">
                  <span>Get Started</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300/90 border border-emerald-800/70">
                    Coming Soon
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* 4. Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-emerald-100/65">
            <p>&copy; 2026 FindIt. All rights reserved.</p>
            <p className="text-emerald-200/80 font-medium">
              Built to bring campus communities together.
            </p>
          </div>
        </div>
      </footer>
    </div>
      
  );
}