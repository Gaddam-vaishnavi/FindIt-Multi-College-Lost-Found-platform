import { Link, useParams } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  Tag,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Sparkles,
  Info,
  MessageSquare,
  PackageX,
  Laptop,
  BookOpen,
  IdCard,
  Watch,
  Shirt,
  Briefcase,
  Package,
} from 'lucide-react';
import { DEMO_ITEMS } from '../data/sampleItems';

// Helper to render a large category-specific visual placeholder
function ItemLargeVisual({ item }) {
  const isLost = item.status === 'Lost';

  const getCategoryIcon = () => {
    switch (item.category) {
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
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
      <div
        className={`min-h-[280px] sm:min-h-[360px] flex flex-col items-center justify-center p-8 text-center ${
          isLost ? 'bg-amber-50/60' : 'bg-emerald-50/70'
        }`}
      >
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm ${
            isLost
              ? 'bg-white text-amber-600 border border-amber-200/80'
              : 'bg-white text-[#059669] border border-emerald-200/80'
          }`}
        >
          <IconComponent className="w-10 h-10" aria-hidden="true" />
        </div>

        <p className="mt-4 text-sm font-semibold text-[#111827]">
          {item.category} Preview
        </p>
        <p className="mt-1 text-xs text-[#4B5563] max-w-xs">
          Sample visual placeholder — uploaded item photographs will appear here once backend storage is connected.
        </p>
      </div>

      {/* Reference Footer inside Visual Card */}
      <div className="px-5 py-3.5 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between text-xs text-[#4B5563]">
        <span>Record ID: {item.id}</span>
        <span className="font-medium">Demo Sample Record</span>
      </div>
    </div>
  );
}

function ItemDetails() {
  // Read the dynamic ":id" parameter from the URL (/items/:id)
  const { id } = useParams();

  // Look up the matching record from the shared sample data
  const item = DEMO_ITEMS.find((entry) => entry.id === id);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse Items</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#111827]"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#059669] text-white shadow-sm">
              <Search className="w-4 h-4" aria-hidden="true" />
            </span>
            <span>FindIt</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!item ? (
          /* Invalid ID / Item Not Found State */
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-10 sm:p-14 text-center max-w-xl mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <PackageX className="w-7 h-7" aria-hidden="true" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">
              Item Not Found
            </h1>
            <p className="mt-2 text-sm text-[#4B5563]">
              We couldn&apos;t find a reported item matching ID{' '}
              <span className="font-mono font-semibold text-[#111827]">
                {id || 'unknown'}
              </span>
              . It may have been removed or the link may be incorrect.
            </p>
            <Link
              to="/explore"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Browse Items
            </Link>
          </section>
        ) : (
          /* Valid Item Details View */
          <div className="space-y-6">
            {/* Demo Data Notice */}
            <div className="flex items-start sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
              <p>
                <span className="font-semibold">Frontend Preview:</span> This item record uses static demo data. Reporter contact and item claim workflows will be enabled once backend authentication is connected.
              </p>
            </div>

            {/* Responsive Two-Column Layout: Large Visual Left, Item Info Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Large Item Visual */}
              <div className="lg:col-span-5">
                <ItemLargeVisual item={item} />
              </div>

              {/* Right Column: Item Information Cards */}
              <div className="lg:col-span-7 space-y-6">
                {/* Primary Header & Metadata Card */}
                <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-7 space-y-5">
                  {/* Status & Category Pills */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Lost'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-[#047857] border border-emerald-200'
                      }`}
                    >
                      {item.status} Item
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-[#4B5563]">
                      <Tag className="w-3.5 h-3.5 text-gray-500" />
                      {item.category}
                    </span>
                  </div>

                  {/* Item Name */}
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight leading-snug">
                    {item.itemName}
                  </h1>

                  {/* Key Location & Date Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9FAFB] border border-gray-200/60">
                      <Building2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
                          College / Campus
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-[#111827]">
                          {item.college}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9FAFB] border border-gray-200/60">
                      <MapPin className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
                          Specific Location
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-[#111827]">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9FAFB] border border-gray-200/60 sm:col-span-2">
                      <Calendar className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
                          Reported Date
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-[#111827]">
                          {item.reportedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Description & Identifying Details Card */}
                <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-7 space-y-5">
                  <div>
                    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#111827]">
                      <FileText className="w-4 h-4 text-[#059669]" />
                      Full Description
                    </h2>
                    <p className="mt-2.5 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.identifyingDetails && item.identifyingDetails.trim() !== '' && (
                    <div className="pt-5 border-t border-gray-100">
                      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#111827]">
                        <Sparkles className="w-4 h-4 text-[#059669]" />
                        Additional Identifying Details
                      </h2>
                      <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed bg-[#F9FAFB] p-3.5 rounded-xl border border-gray-200/60">
                        {item.identifyingDetails}
                      </p>
                    </div>
                  )}
                </section>

                {/* Contact / Recovery Action Card (Coming Soon — No Fake Reporter Info) */}
                <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#111827]">
                        {item.status === 'Lost'
                          ? 'Found This Item?'
                          : 'Is This Your Belonging?'}
                      </h2>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4B5563]">
                      Verified student messaging and campus claim verification will be available once backend services are connected.
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-400 border border-gray-200 text-sm font-semibold cursor-not-allowed shrink-0 select-none"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact / Claim (Coming Soon)</span>
                  </button>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ItemDetails;