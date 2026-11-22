import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Compass,
  FileText,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  PlusCircle,
  CheckCircle2,
  HelpCircle,
  PackageSearch,
  MapPin,
  Calendar,
  Tag,
  Clock,
  Info,
} from 'lucide-react';

// Static Demo Student Info (for frontend preview only)
const DEMO_STUDENT = {
  name: 'Rohan Verma (Demo Student)',
  studentId: 'DEMO-2026-CS108',
  college: 'Northwood Institute of Technology (Sample Campus)',
};

// Static Sample Overview Metrics
const SAMPLE_STATS = [
  {
    id: 'total',
    label: 'Total Reports',
    value: '12',
    note: 'Sample total',
    icon: FileText,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#059669]',
  },
  {
    id: 'lost',
    label: 'Lost Items',
    value: '5',
    note: 'Sample active/past',
    icon: HelpCircle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'found',
    label: 'Found Items',
    value: '4',
    note: 'Sample logged',
    icon: PackageSearch,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'resolved',
    label: 'Resolved Items',
    value: '3',
    note: 'Sample returned',
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#047857]',
  },
];

// Static Sample Item Reports
const SAMPLE_REPORTS = [
  {
    id: 'REP-101',
    itemName: 'Silver MacBook Air Charger (67W)',
    status: 'Lost',
    category: 'Electronics',
    location: 'Central Library, 2nd Floor Study Hall',
    reportedDate: 'Nov 14, 2026',
  },
  {
    id: 'REP-102',
    itemName: 'Black Insulated Water Bottle (Hydro Flask)',
    status: 'Found',
    category: 'Personal Accessories',
    location: 'Main Cafeteria, Table Area B',
    reportedDate: 'Nov 12, 2026',
  },
  {
    id: 'REP-103',
    itemName: 'Blue Spiral Engineering Physics Notebook',
    status: 'Lost',
    category: 'Books & Stationery',
    location: 'Block C, Lecture Room 204',
    reportedDate: 'Nov 10, 2026',
  },
  {
    id: 'REP-104',
    itemName: 'Student ID Card Lanyard & Hostel Key',
    status: 'Found',
    category: 'ID & Keys',
    location: 'North Gate Security Desk',
    reportedDate: 'Nov 08, 2026',
  },
];

// Static Sample Activity Feed
const SAMPLE_ACTIVITY = [
  {
    id: 'ACT-1',
    title: 'Sample report logged: Silver MacBook Air Charger',
    detail: 'Marked as Lost near Central Library.',
    time: '2 days ago (Demo)',
  },
  {
    id: 'ACT-2',
    title: 'Sample found item posted: Black Insulated Water Bottle',
    detail: 'Listed under Personal Accessories.',
    time: '4 days ago (Demo)',
  },
  {
    id: 'ACT-3',
    title: 'Sample item marked resolved: Casio Scientific Calculator',
    detail: 'Confirmed returned to owner on campus.',
    time: '1 week ago (Demo)',
  },
];

function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewBanner, setPreviewBanner] = useState('');

  // Sidebar items: Dashboard is active, unbuilt pages show Coming Soon, Logout links to /login
 // Sidebar items: Dashboard is active, Browse Items links to /explore, remaining unbuilt pages show Coming Soon
  // Sidebar items: Dashboard is active, Browse Items & Notifications link to their routes, remaining unbuilt pages show Coming Soon
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true, to: null, comingSoon: false },
    { label: 'Browse Items', icon: Compass, active: false, to: '/explore', comingSoon: false },
    { label: 'My Reports', icon: FileText, active: false, to: null, comingSoon: true },
    { label: 'Notifications', icon: Bell, active: false, to: '/notifications', comingSoon: false },
    { label: 'Profile', icon: User, active: false, to: null, comingSoon: true },
  ];

  const handleQuickActionPreview = (actionLabel) => {
    setPreviewBanner(
      `Preview Mode: "${actionLabel}" form will be added in an upcoming step.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col lg:flex-row">
      {/* Mobile Top Header Bar */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-[#111827]"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#059669] text-white">
            <Search className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>FindIt</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="p-2 rounded-lg text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#059669]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-gray-900/40 z-30 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation (Fixed on Desktop, Slide-over Drawer on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#111827]"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#059669] text-white shadow-sm">
                <Search className="w-5 h-5" aria-hidden="true" />
              </span>
              <span>FindIt</span>
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

          {/* Navigation Links */}
          <nav aria-label="Student dashboard navigation" className="px-3 py-5 space-y-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
               
              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-gray-100/80 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-[#059669]" />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              }
              if (item.active) {
                return (
                  <div
                    key={item.label}
                    aria-current="page"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 text-[#047857] font-semibold text-sm border border-emerald-200/70"
                  >
                    <span className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-[#059669]" />
                      <span>{item.label}</span>
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-[#4B5563]/75 select-none cursor-default"
                >
                  <span className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4 text-gray-400" />
                    <span>{item.label}</span>
                  </span>
                  {item.comingSoon && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-[#4B5563]">
                      Coming Soon
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Section: Demo Badge + Logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="px-3 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-200/80">
            <p className="text-xs font-semibold text-[#111827] truncate">
              {DEMO_STUDENT.name}
            </p>
            <p className="text-[11px] text-[#4B5563] truncate mt-0.5">
              {DEMO_STUDENT.studentId}
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
      <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Demo Content Notice */}
        <div className="flex items-start sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <span className="font-semibold">Frontend Preview Mode:</span> Student profile details, statistics, reports, and activity below use static demo data.
          </p>
        </div>

        {/* Welcome Header & Quick Actions */}
        <section className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-[#047857] text-xs font-medium">
             
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              Welcome to FindIt
            </h1>
           
          </div>

         </section>
        
{/* Quick Actions */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
  <Link
    to="/report-lost"
    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors"
  >
    <PlusCircle className="w-4 h-4" />
    <span>Report Lost Item</span>
  </Link>

  <Link
    to="/report-found"
    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50/70 text-[#047857] border border-[#059669] text-sm font-semibold transition-colors"
  >
    <PackageSearch className="w-4 h-4" />
    <span>Report Found Item</span>
  </Link>
</div>


        {/* Quick Action Preview Feedback Banner */}
        {previewBanner && (
          <div
            role="status"
            className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-[#047857]"
          >
            <span>{previewBanner}</span>
            <button
              type="button"
              onClick={() => setPreviewBanner('')}
              className="text-xs font-semibold underline hover:text-[#111827] cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Overview Statistic Cards */}
        <section aria-label="Sample report overview statistics">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827]">Campus Report Overview</h2>
           
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {SAMPLE_STATS.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-[#4B5563]">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-[#111827] tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-[#4B5563]">{stat.note}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                    <StatIcon className={`w-5 h-5 ${stat.iconColor}`} aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Two-Column Layout: Recent Reports & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reports (Takes 2/3 width on desktop) */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#111827]">Recent Reports</h2>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                  Sample lost and found entries across your campus
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-[#4B5563]">
                Demo Data
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {SAMPLE_REPORTS.map((report) => {
                const isLost = report.status === 'Lost';
                return (
                  <div
                    key={report.id}
                    className="p-5 sm:px-6 hover:bg-[#F9FAFB]/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isLost
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-[#047857] border border-emerald-200'
                          }`}
                        >
                          {report.status}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-[#111827]">
                          {report.itemName}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#4B5563]">
                        <span className="inline-flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-gray-400" />
                          {report.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {report.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#4B5563] shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{report.reportedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Activity (Takes 1/3 width on desktop) */}
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#111827]">Recent Activity</h2>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                Sample campus timeline
              </p>
            </div>

            <div className="p-6 space-y-5 flex-1">
              {SAMPLE_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3.5">
                  <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#059669] shrink-0 ring-4 ring-emerald-50" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#111827] leading-snug">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[#4B5563]">{activity.detail}</p>
                    <p className="inline-flex items-center gap-1 text-[11px] text-[#4B5563]/80 pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;