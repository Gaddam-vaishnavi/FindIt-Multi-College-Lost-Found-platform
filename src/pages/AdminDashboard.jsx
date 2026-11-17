import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Building2,
  Package,
  Flag,
  LogOut,
  Menu,
  X,
  Search,
  RotateCcw,
  Info,
  Clock,
  CheckCircle2,
  Eye,
  XCircle,
  Trash2,
  MapPin,
  Calendar,
  Tag,
} from 'lucide-react';

// Static Demo Student Records
const DEMO_STUDENTS = [
  {
    id: 'STU-01',
    name: 'Rohan Verma',
    email: 'rohan.verma@bvrit.ac.in',
    college: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    status: 'Active',
  },
  {
    id: 'STU-02',
    name: 'Ananya Reddy',
    email: 'ananya.r@bvrit.ac.in',
    college: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    status: 'Active',
  },
  {
    id: 'STU-03',
    name: 'Karthik Nair',
    email: 'k.nair@northwood.edu',
    college: 'Northwood Institute of Technology (Sample)',
    status: 'Pending Verification',
  },
  {
    id: 'STU-04',
    name: 'Meera Krishnan',
    email: 'meera.k@greenfield.edu',
    college: 'Greenfield State University (Sample)',
    status: 'Active',
  },
  {
    id: 'STU-05',
    name: 'Siddharth Rao',
    email: 'sid.rao@stxavier.edu',
    college: 'St. Xavier College of Arts & Science (Sample)',
    status: 'Suspended',
  },
  {
    id: 'STU-06',
    name: 'Priya Sharma',
    email: 'priya.sharma@riverside.edu',
    college: 'Riverside Engineering College (Sample)',
    status: 'Active',
  },
];

// Static Demo College Records
const DEMO_COLLEGES = [
  {
    id: 'COL-01',
    name: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    location: 'Narsapur, Telangana',
    studentCount: 420,
    status: 'Active Campus',
  },
  {
    id: 'COL-02',
    name: 'Northwood Institute of Technology (Sample)',
    location: 'Hyderabad, Telangana',
    studentCount: 315,
    status: 'Active Campus',
  },
  {
    id: 'COL-03',
    name: 'Greenfield State University (Sample)',
    location: 'Bengaluru, Karnataka',
    studentCount: 280,
    status: 'Active Campus',
  },
  {
    id: 'COL-04',
    name: 'St. Xavier College of Arts & Science (Sample)',
    location: 'Mumbai, Maharashtra',
    studentCount: 195,
    status: 'Active Campus',
  },
  {
    id: 'COL-05',
    name: 'Riverside Engineering College (Sample)',
    location: 'Pune, Maharashtra',
    studentCount: 160,
    status: 'Onboarding Preview',
  },
];

// Static Demo Item Listings
const DEMO_ITEM_LISTINGS = [
  {
    id: 'ITM-201',
    itemName: 'Dell Inspiron 65W USB-C Laptop Charger',
    status: 'Lost',
    category: 'Electronics',
    college: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    reportedDate: 'Nov 15, 2026',
  },
  {
    id: 'ITM-202',
    itemName: 'Student ID Card & Blue Lanyard',
    status: 'Found',
    category: 'ID Cards',
    college: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    reportedDate: 'Nov 14, 2026',
  },
  {
    id: 'ITM-203',
    itemName: 'Data Structures & Algorithms Textbook (Cormen)',
    status: 'Lost',
    category: 'Books & Stationery',
    college: 'Northwood Institute of Technology (Sample)',
    reportedDate: 'Nov 13, 2026',
  },
  {
    id: 'ITM-204',
    itemName: 'Casio F-91W Digital Wristwatch',
    status: 'Resolved',
    category: 'Accessories',
    college: 'Greenfield State University (Sample)',
    reportedDate: 'Nov 12, 2026',
  },
  {
    id: 'ITM-205',
    itemName: 'Olive Green Zip-Up Fleece Hoodie (Size M)',
    status: 'Found',
    category: 'Clothing',
    college: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    reportedDate: 'Nov 11, 2026',
  },
  {
    id: 'ITM-206',
    itemName: 'Matte Black Insulated Stainless Steel Flask',
    status: 'Resolved',
    category: 'Personal Items',
    college: 'St. Xavier College of Arts & Science (Sample)',
    reportedDate: 'Nov 10, 2026',
  },
];

// Initial Static Demo Flagged Reports (managed in React state for preview moderation actions)
const INITIAL_MODERATION_REPORTS = [
  {
    id: 'MOD-101',
    listingTitle: 'Unlabeled Cash Wallet Found Near Gate 2',
    college: 'B V Raju Institute of Technology (BVRIT), Narsapur (Sample)',
    reason: 'Missing identifying details and unclear item description',
    reportDate: 'Nov 16, 2026',
    moderationStatus: 'Pending Review',
  },
  {
    id: 'MOD-102',
    listingTitle: 'Duplicate Post: Silver MacBook Air Charger',
    college: 'Northwood Institute of Technology (Sample)',
    reason: 'Suspected duplicate listing submitted twice within 10 minutes',
    reportDate: 'Nov 15, 2026',
    moderationStatus: 'Pending Review',
  },
  {
    id: 'MOD-103',
    listingTitle: 'Promotional Event Flyer Posted in Lost & Found',
    college: 'Greenfield State University (Sample)',
    reason: 'Off-topic spam post unrelated to lost or found campus belongings',
    reportDate: 'Nov 14, 2026',
    moderationStatus: 'Pending Review',
  },
  {
    id: 'MOD-104',
    listingTitle: 'External Phone Number Shared in Item Description',
    college: 'St. Xavier College of Arts & Science (Sample)',
    reason: 'Contains personal contact details instead of using campus verification',
    reportDate: 'Nov 12, 2026',
    moderationStatus: 'Under Review',
  },
];

// Static Demo Platform Activity Feed
const DEMO_PLATFORM_ACTIVITY = [
  {
    id: 'ACT-01',
    type: 'Registration',
    title: 'New student account registered (Demo)',
    detail: 'Ananya Reddy joined B V Raju Institute of Technology (BVRIT), Narsapur (Sample).',
    time: '35 mins ago',
  },
  {
    id: 'ACT-02',
    type: 'Report',
    title: 'New lost item report submitted (Demo)',
    detail: 'Dell Inspiron 65W USB-C Laptop Charger logged under Electronics.',
    time: '2 hours ago',
  },
  {
    id: 'ACT-03',
    type: 'Resolved',
    title: 'Listing marked as resolved (Demo)',
    detail: 'Casio F-91W Digital Wristwatch confirmed returned at Greenfield State University.',
    time: '5 hours ago',
  },
  {
    id: 'ACT-04',
    type: 'Moderation',
    title: 'Listing flagged for moderator review (Demo)',
    detail: 'Duplicate Post: Silver MacBook Air Charger queued in Report Moderation.',
    time: '1 day ago',
  },
];

function AdminDashboard() {
  // Active sidebar tab state
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Student Management search & filter state
  const [studentSearch, setStudentSearch] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');

  // Item Management search & filter state
  const [itemSearch, setItemSearch] = useState('');
  const [itemStatusFilter, setItemStatusFilter] = useState('All');

  // Report Moderation local demo state & feedback banner
  const [moderationReports, setModerationReports] = useState(
    INITIAL_MODERATION_REPORTS
  );
  const [moderationBanner, setModerationBanner] = useState('');

  // Navigation items for Sidebar
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'colleges', label: 'College Management', icon: Building2 },
    { id: 'items', label: 'Item Management', icon: Package },
    { id: 'moderation', label: 'Report Moderation', icon: Flag },
  ];

  // Derived overview counts from local demo state
  const pendingModerationCount = moderationReports.filter(
    (report) =>
      report.moderationStatus === 'Pending Review' ||
      report.moderationStatus === 'Under Review'
  ).length;

  const overviewCards = [
    {
      label: 'Total Students',
      value: DEMO_STUDENTS.length,
      subtext: 'Sample student accounts',
      icon: Users,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#059669]',
    },
    {
      label: 'Registered Colleges',
      value: DEMO_COLLEGES.length,
      subtext: 'Sample participating campuses',
      icon: Building2,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
    {
      label: 'Total Item Listings',
      value: DEMO_ITEM_LISTINGS.length,
      subtext: 'Sample Lost & Found records',
      icon: Package,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#047857]',
    },
    {
      label: 'Pending Moderation Reports',
      value: pendingModerationCount,
      subtext: 'Updates live with demo actions',
      icon: Flag,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  // Filtered Students
  const filteredStudents = DEMO_STUDENTS.filter((student) => {
    const query = studentSearch.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchesStatus =
      studentStatusFilter === 'All' || student.status === studentStatusFilter;

    return matchesQuery && matchesStatus;
  });

  // Filtered Item Listings
  const filteredItems = DEMO_ITEM_LISTINGS.filter((item) => {
    const query = itemSearch.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      item.itemName.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.college.toLowerCase().includes(query);

    const matchesStatus =
      itemStatusFilter === 'All' || item.status === itemStatusFilter;

    return matchesQuery && matchesStatus;
  });

  // Frontend-only moderation status update (does not delete records or touch a backend)
  const handleModerationAction = (reportId, newStatus, actionLabel) => {
    setModerationReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? { ...report, moderationStatus: newStatus }
          : report
      )
    );
    setModerationBanner(
      `Demo Action Applied: Report ${reportId} marked as "${newStatus}" (${actionLabel}). Actual database records are unaffected in frontend preview mode.`
    );
  };

  // Reset demo moderation statuses back to initial sample state
  const handleResetModerationDemo = () => {
    setModerationReports(INITIAL_MODERATION_REPORTS);
    setModerationBanner('Demo moderation queue reset to initial sample states.');
  };

  // Switch active tab and close mobile drawer
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  // Badge style helpers
  const getStudentStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-[#047857] border-emerald-200';
      case 'Pending Verification':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getItemStatusBadge = (status) => {
    switch (status) {
      case 'Lost':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Found':
        return 'bg-emerald-50 text-[#047857] border-emerald-200';
      default:
        return 'bg-sky-50 text-sky-700 border-sky-200';
    }
  };

  const getModerationStatusBadge = (status) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Under Review':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Dismissed':
        return 'bg-gray-100 text-[#4B5563] border-gray-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#111827]"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#059669] text-white">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>FindIt Admin</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close admin menu' : 'Open admin menu'}
          className="p-2 rounded-lg text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#059669]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-gray-900/40 z-30 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Brand */}
          <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#111827]"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#059669] text-white shadow-sm">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <span className="block">FindIt Admin</span>
                <span className="block text-[11px] font-medium text-[#047857]">
                  Platform Console
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#4B5563] hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Navigation Tabs */}
          <nav aria-label="Admin dashboard sections" className="px-3 py-5 space-y-1.5">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isSelected = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  aria-current={isSelected ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-[#047857] font-semibold border border-emerald-200/70'
                      : 'text-[#4B5563] font-medium hover:text-[#111827] hover:bg-gray-100/80'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <IconComponent
                      className={`w-4 h-4 ${
                        isSelected ? 'text-[#059669]' : 'text-gray-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </span>

                  {item.id === 'moderation' && pendingModerationCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                      {pendingModerationCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Admin Demo Info & Logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="px-3 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-200/80">
            <p className="text-xs font-semibold text-[#111827]">
              Campus Administrator (Demo)
            </p>
            <p className="text-[11px] text-[#4B5563] mt-0.5">
              Frontend Preview Mode
            </p>
          </div>

          <Link
            to="/login"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#4B5563] hover:text-red-600 hover:bg-red-50/70 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Global Demo Content Disclaimer */}
        <div className="flex items-start sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <span className="font-semibold">Frontend Admin Preview:</span> All student directories, campus statistics, listings, and moderation controls use static demo data. No backend or database changes are performed.
          </p>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              {sidebarItems.find((item) => item.id === activeTab)?.label}
            </h1>
            <p className="mt-1 text-sm text-[#4B5563]">
              Monitor multi-college activity, campus listings, and community moderation across FindIt.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-[#4B5563] hover:text-[#111827] border border-gray-200 shadow-2xs transition-colors self-start sm:self-auto"
          >
            Switch to Student View
          </Link>
        </div>

        {/* =========================================================
            SECTION 1: OVERVIEW
           ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 Statistic Cards */}
            <section
              aria-label="Platform overview statistics"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5"
            >
              {overviewCards.map((card) => {
                const CardIcon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex items-start justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#4B5563]">
                        {card.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-[#111827] tracking-tight">
                        {card.value}
                      </p>
                      <p className="mt-1 text-xs text-[#4B5563]">{card.subtext}</p>
                    </div>
                    <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                      <CardIcon
                        className={`w-5 h-5 ${card.iconColor}`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Recent Platform Activity */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#111827]">
                    Recent Platform Activity
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                    Sample registrations, reported items, and resolved cases across campuses
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-[#4B5563]">
                  Demo Feed
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {DEMO_PLATFORM_ACTIVITY.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#059669] shrink-0 ring-4 ring-emerald-50" />
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">
                          {activity.title}
                        </p>
                        <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                          {activity.detail}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] shrink-0 pl-6 sm:pl-0">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            SECTION 2: STUDENT MANAGEMENT
           ========================================================= */}
        {activeTab === 'students' && (
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            {/* Search & Filter Controls */}
            <div className="p-5 sm:p-6 border-b border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#111827]">
                    Sample Student Directory
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563]">
                    Showing {filteredStudents.length} of {DEMO_STUDENTS.length} demo student records
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-[#047857] border border-emerald-200 self-start sm:self-auto">
                  Demo Student Data
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Search Input */}
                <div className="sm:col-span-7 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search students by name or email..."
                    aria-label="Search students by name or email"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] border border-gray-300 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
                  />
                </div>

                {/* Status Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={studentStatusFilter}
                    onChange={(e) => setStudentStatusFilter(e.target.value)}
                    aria-label="Filter students by account status"
                    className="block w-full px-3.5 py-2.5 text-sm text-[#111827] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
                  >
                    <option value="All">All Account Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStudentSearch('');
                      setStudentStatusFilter('All');
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-semibold text-[#4B5563] hover:text-[#111827] cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Students Table or Empty State */}
            {filteredStudents.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-base font-bold text-[#111827]">
                  No matching demo students found
                </p>
                <p className="mt-1 text-sm text-[#4B5563]">
                  Try adjusting your search query or account status filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Student Name
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Email
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        College
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Account Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white text-sm">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-[#F9FAFB]/70">
                        <td className="px-6 py-4 font-semibold text-[#111827] whitespace-nowrap">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 text-[#4B5563] whitespace-nowrap">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 text-[#4B5563]">
                          {student.college}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStudentStatusBadge(
                              student.status
                            )}`}
                          >
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            SECTION 3: COLLEGE MANAGEMENT
           ========================================================= */}
        {activeTab === 'colleges' && (
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#111827]">
                  Participating Colleges
                </h2>
                <p className="text-xs sm:text-sm text-[#4B5563]">
                  Demo campus network records and sample student enrollment counts
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
                Demo Campus Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      College Name
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Location
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Sample Student Count
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white text-sm">
                  {DEMO_COLLEGES.map((college) => (
                    <tr key={college.id} className="hover:bg-[#F9FAFB]/70">
                      <td className="px-6 py-4 font-semibold text-[#111827]">
                        {college.name}
                      </td>
                      <td className="px-6 py-4 text-[#4B5563] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                          {college.location}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#111827] whitespace-nowrap">
                        {college.studentCount} students (Demo)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#047857] border border-emerald-200">
                          {college.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* =========================================================
            SECTION 4: ITEM MANAGEMENT
           ========================================================= */}
        {activeTab === 'items' && (
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            {/* Search & Filter Controls */}
            <div className="p-5 sm:p-6 border-b border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#111827]">
                    Sample Item Listings
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563]">
                    Showing {filteredItems.length} of {DEMO_ITEM_LISTINGS.length} demo item listings
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-[#4B5563] self-start sm:self-auto">
                  Demo Listings
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Search Input */}
                <div className="sm:col-span-7 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    placeholder="Search items by name, category, or college..."
                    aria-label="Search item listings"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] border border-gray-300 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
                  />
                </div>

                {/* Status Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={itemStatusFilter}
                    onChange={(e) => setItemStatusFilter(e.target.value)}
                    aria-label="Filter items by status"
                    className="block w-full px-3.5 py-2.5 text-sm text-[#111827] bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
                  >
                    <option value="All">All Item Statuses</option>
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      setItemSearch('');
                      setItemStatusFilter('All');
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-semibold text-[#4B5563] hover:text-[#111827] cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Items Table or Empty State */}
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-base font-bold text-[#111827]">
                  No matching demo listings found
                </p>
                <p className="mt-1 text-sm text-[#4B5563]">
                  Try clearing your search term or selecting a different status filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Item Name
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Status
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Category
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        College
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        Reported Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white text-sm">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[#F9FAFB]/70">
                        <td className="px-6 py-4 font-semibold text-[#111827]">
                          {item.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getItemStatusBadge(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#4B5563] whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-gray-400" />
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#4B5563]">
                          {item.college}
                        </td>
                        <td className="px-6 py-4 text-[#4B5563] whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {item.reportedDate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            SECTION 5: REPORT MODERATION
           ========================================================= */}
        {activeTab === 'moderation' && (
          <div className="space-y-4">
            {/* Moderation Action Feedback Banner */}
            {moderationBanner && (
              <div
                role="status"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-[#047857]"
              >
                <span>{moderationBanner}</span>
                <button
                  type="button"
                  onClick={() => setModerationBanner('')}
                  className="text-xs font-semibold underline hover:text-[#111827] self-start sm:self-auto cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#111827]">
                    Flagged Listings Moderation Queue
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                    Frontend-only demo controls — records remain visible with updated sample status badges.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetModerationDemo}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-[#4B5563] hover:text-[#111827] self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Statuses</span>
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {moderationReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    {/* Flagged Report Info */}
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-mono font-semibold text-[#4B5563] bg-gray-100 px-2 py-0.5 rounded">
                          {report.id}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getModerationStatusBadge(
                            report.moderationStatus
                          )}`}
                        >
                          {report.moderationStatus}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#4B5563]">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          Reported {report.reportDate}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#111827]">
                        {report.listingTitle}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4B5563]">
                        <span className="font-semibold text-[#111827]">
                          Reason for reporting:
                        </span>{' '}
                        {report.reason}
                      </p>

                      <p className="text-xs text-[#4B5563] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>{report.college}</span>
                      </p>
                    </div>

                    {/* Frontend-Only Moderation Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleModerationAction(
                            report.id,
                            'Under Review',
                            'Review'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleModerationAction(
                            report.id,
                            'Dismissed',
                            'Dismiss'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#4B5563] hover:text-[#111827] border border-gray-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Dismiss</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleModerationAction(
                            report.id,
                            'Removed (Demo)',
                            'Remove'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;