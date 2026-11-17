import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_ITEMS } from '../data/sampleItems';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Tag,
  Building2,
  MapPin,
  Calendar,
  Eye,
  Info,
  PackageX,
  ArrowLeft,
  Laptop,
  BookOpen,
  IdCard,
  Watch,
  Shirt,
  Briefcase,
  Package,
} from 'lucide-react';

// Filter dropdown options
const STATUS_OPTIONS = ['All', 'Lost', 'Found'];

const CATEGORY_OPTIONS = [
  'All',
  'Electronics',
  'Books & Stationery',
  'ID Cards',
  'Accessories',
  'Clothing',
  'Personal Items',
  'Other',
];

const COLLEGE_OPTIONS = [
  'All Campuses',
  'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
  'Northwood Institute of Technology (Sample)',
  'Greenfield State University (Sample)',
  'St. Xavier College of Arts & Science (Sample)',
  'Riverside Engineering College (Sample)',
];

// Clearly identified demo Lost & Found records (Frontend Preview Data)


// Helper to render a relevant visual placeholder icon based on item category
function CategoryVisualPlaceholder({ category, status }) {
  const isLost = status === 'Lost';

  const getCategoryIcon = () => {
    switch (category) {
      case 'Electronics':
        return Laptop;
      case 'Books & Stationery':
        return BookOpen;
      case 'ID Cards':
        return IdCard;
      case 'Accessories':
        return Watch;
      case 'Clothing':
        return Shirt;
      case 'Personal Items':
        return Briefcase;
      default:
        return Package;
    }
  };

  const IconComponent = getCategoryIcon();

  return (
    <div
      className={`h-40 w-full flex flex-col items-center justify-center border-b border-gray-100 relative ${
        isLost ? 'bg-amber-50/60' : 'bg-emerald-50/70'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${
          isLost
            ? 'bg-white text-amber-600 border border-amber-200/70'
            : 'bg-white text-[#059669] border border-emerald-200/70'
        }`}
      >
        <IconComponent className="w-6 h-6" aria-hidden="true" />
      </div>
      <span className="mt-2.5 text-[11px] font-medium text-[#4B5563]">
        Demo Visual Placeholder • {category}
      </span>
    </div>
  );
}

function BrowseItems() {
  // Search and multi-filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState('All Campuses');

  // Check whether any search term or non-default filter is active
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedStatus !== 'All' ||
    selectedCategory !== 'All' ||
    selectedCollege !== 'All Campuses';

  // Reset all search and filter controls
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedCategory('All');
    setSelectedCollege('All Campuses');
  };

  // Combine search query + status + category + college filters
  const filteredItems = DEMO_ITEMS.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      query === '' ||
      item.itemName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesStatus =
      selectedStatus === 'All' || item.status === selectedStatus;

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesCollege =
      selectedCollege === 'All Campuses' || item.college === selectedCollege;

    return matchesSearch && matchesStatus && matchesCategory && matchesCollege;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#111827]"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#059669] text-white shadow-sm">
                <Search className="w-5 h-5" aria-hidden="true" />
              </span>
              <span>FindIt</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-sm">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-semibold shadow-xs transition-colors"
            >
              Student Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Demo Data Notice Banner */}
        <div className="flex items-start sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <span className="font-semibold">Demo Listings Preview:</span> All items and campus names displayed below are sample frontend records for testing search and filtering.
          </p>
        </div>

        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              Browse Lost &amp; Found Items
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#4B5563]">
              Discover items reported across participating college campuses.
            </p>
          </div>

          <div className="text-sm font-medium text-[#4B5563] bg-white px-3.5 py-2 rounded-xl border border-gray-200/80 self-start md:self-auto">
            Showing{' '}
            <span className="font-bold text-[#111827]">{filteredItems.length}</span> of{' '}
            <span className="font-semibold text-[#111827]">{DEMO_ITEMS.length}</span>{' '}
            demo {filteredItems.length === 1 ? 'record' : 'records'}
          </div>
        </div>

        {/* Search & Multi-Filter Controls Card */}
        <section
          aria-label="Search and filter reported items"
          className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 sm:p-6 space-y-4"
        >
          {/* Search Input Row */}
          <div className="relative">
            <label htmlFor="item-search" className="sr-only">
              Search by item name or keywords
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="item-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by item name or keywords (e.g. charger, ID card, watch, keys)..."
              className="block w-full pl-10 pr-4 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] border border-gray-300 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] transition-colors"
            />
          </div>

          {/* Filter Dropdowns + Clear Filters Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* Status Filter */}
            <div className="lg:col-span-3">
              <label
                htmlFor="status-filter"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#059669]" />
                Status
              </label>
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-3.5 py-2.5 text-sm text-[#111827] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Statuses (Lost & Found)' : status}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-3">
              <label
                htmlFor="category-filter"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5"
              >
                <Tag className="w-3.5 h-3.5 text-[#059669]" />
                Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3.5 py-2.5 text-sm text-[#111827] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* College / Campus Filter */}
            <div className="sm:col-span-2 lg:col-span-4">
              <label
                htmlFor="college-filter"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-[#059669]" />
                College / Campus
              </label>
              <select
                id="college-filter"
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="block w-full px-3.5 py-2.5 text-sm text-[#111827] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
              >
                {COLLEGE_OPTIONS.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="sm:col-span-2 lg:col-span-2">
              <button
                type="button"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                  hasActiveFilters
                    ? 'bg-white hover:bg-gray-50 text-[#111827] border-gray-300 cursor-pointer'
                    : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </section>

        {/* Results Grid or Friendly Empty State */}
        {filteredItems.length === 0 ? (
          <section className="bg-white rounded-2xl border border-gray-200/80 p-10 sm:p-14 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mx-auto mb-4">
              <PackageX className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              No matching items found
            </h2>
            <p className="mt-2 text-sm text-[#4B5563] max-w-md mx-auto">
              We couldn&apos;t find any demo reports matching your current search keywords or selected filters. Try broadening your search or resetting the filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Search &amp; Filters
            </button>
          </section>
        ) : (
          <section
            aria-label="Reported items list"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => {
              const isLost = item.status === 'Lost';
              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-colors"
                >
                  <div>
                    {/* Visual Placeholder */}
                    <CategoryVisualPlaceholder
                      category={item.category}
                      status={item.status}
                    />

                    {/* Card Body */}
                    <div className="p-5 space-y-3.5">
                      {/* Status & Category Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isLost
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-[#047857] border border-emerald-200'
                          }`}
                        >
                          {item.status}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B5563] bg-gray-100 px-2.5 py-0.5 rounded-full">
                          <Tag className="w-3 h-3 text-gray-500" />
                          {item.category}
                        </span>
                      </div>

                      {/* Item Name & Description */}
                      <div>
                        <h2 className="text-base font-bold text-[#111827] leading-snug">
                          {item.itemName}
                        </h2>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Metadata: College, Location, Date */}
                      <div className="pt-2 border-t border-gray-100 space-y-2 text-xs text-[#4B5563]">
                        <div className="flex items-start gap-2">
                          <Building2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item.college}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>Reported {item.reportedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: View Details (Coming Soon) */}
                  {/* Card Footer: Navigate to Item Details */}
                  <div className="px-5 py-3.5 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#4B5563]">
                      {item.id}
                    </span>

                    <Link
                      to={`/items/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-emerald-50 text-[#047857] border border-emerald-200 hover:border-[#059669] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#059669]" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}

export default BrowseItems;