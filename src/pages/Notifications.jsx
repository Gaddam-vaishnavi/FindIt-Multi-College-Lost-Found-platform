import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  Bell,
  BellDot,
  CheckCheck,
  Check,
  PackageCheck,
  Eye,
  MapPin,
  MessageSquarePlus,
  FileEdit,
  CheckCircle2,
  Building2,
  Clock,
  Info,
  Inbox,
} from 'lucide-react';

// Filter tabs matching the required categories
const FILTER_TABS = [
  'All',
  'Unread',
  'Lost Item Updates',
  'Found Item Updates',
];

// Initial 8 static demo notifications (stored in React state, not localStorage)
const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    title: 'Matching Found Item Reported',
    description:
      'A found Dell 65W USB-C Laptop Charger was posted at B V Raju Institute of Technology (BVRIT), Narsapur (Sample) that closely matches your lost item report.',
    category: 'Found Item Updates',
    dateTime: 'Nov 16, 2026 • 10:30 AM',
    isRead: false,
    icon: PackageCheck,
  },
  {
    id: 'NOTIF-02',
    title: 'Someone Viewed Your Lost Item Report',
    description:
      'A verified campus member viewed your report for "Silver MacBook Air Charger (67W)" near Central Library.',
    category: 'Lost Item Updates',
    dateTime: 'Nov 16, 2026 • 09:15 AM',
    isRead: false,
    icon: Eye,
  },
  {
    id: 'NOTIF-03',
    title: 'Found Item Posted Near Your Campus',
    description:
      'A new found item ("Student ID Card & Blue Lanyard") was reported at Central Canteen, Counter 3.',
    category: 'Found Item Updates',
    dateTime: 'Nov 15, 2026 • 04:45 PM',
    isRead: false,
    icon: MapPin,
  },
  {
    id: 'NOTIF-04',
    title: 'Recovery Request Received',
    description:
      'A fellow student submitted a recovery inquiry regarding the "Black Insulated Water Bottle" you reported found.',
    category: 'Found Item Updates',
    dateTime: 'Nov 15, 2026 • 01:20 PM',
    isRead: false,
    icon: MessageSquarePlus,
  },
  {
    id: 'NOTIF-05',
    title: 'Lost Item Report Updated',
    description:
      'Location details on your lost report "Blue Spiral Engineering Physics Notebook" were updated for better campus visibility.',
    category: 'Lost Item Updates',
    dateTime: 'Nov 14, 2026 • 05:10 PM',
    isRead: true,
    icon: FileEdit,
  },
  {
    id: 'NOTIF-06',
    title: 'Item Marked as Resolved',
    description:
      'Your report for "Casio Scientific Calculator" has been marked as resolved after campus handover confirmation.',
    category: 'Lost Item Updates',
    dateTime: 'Nov 13, 2026 • 02:00 PM',
    isRead: true,
    icon: CheckCircle2,
  },
  {
    id: 'NOTIF-07',
    title: 'New Item Reported in Your College',
    description:
      'An "Olive Green Zip-Up Fleece Hoodie (Size M)" was newly logged at CSE Lab Block, Room 304 in your campus network.',
    category: 'Found Item Updates',
    dateTime: 'Nov 12, 2026 • 11:40 AM',
    isRead: true,
    icon: Building2,
  },
  {
    id: 'NOTIF-08',
    title: 'Reminder: Check Your Existing Lost Report',
    description:
      'Your report for "Dell Inspiron 65W USB-C Laptop Charger" has been active for 3 days. Review new found listings to see if it has been turned in.',
    category: 'Lost Item Updates',
    dateTime: 'Nov 11, 2026 • 09:00 AM',
    isRead: true,
    icon: Clock,
  },
];

function Notifications() {
  // Notification list state & active filter tab state
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('All');

  // Derived counters — update automatically whenever `notifications` changes
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  // Mark a single notification as read
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  // Mark every notification as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true }))
    );
  };

  // Filter notifications according to the currently selected tab
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'Unread') {
      return !item.isRead;
    }
    if (activeTab === 'Lost Item Updates') {
      return item.category === 'Lost Item Updates';
    }
    if (activeTab === 'Found Item Updates') {
      return item.category === 'Found Item Updates';
    }
    return true; // 'All'
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
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

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Demo Content Notice */}
        <div className="flex items-start sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <span className="font-semibold">Demo Notifications Preview:</span> Alerts below are static sample updates for frontend testing. Real-time notifications will connect when backend services are added.
          </p>
        </div>

        {/* Page Title & Mark All as Read Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              Notifications
            </h1>
            
          </div>

          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors self-start sm:self-auto ${
              unreadCount > 0
                ? 'bg-[#059669] hover:bg-[#047857] text-white border-transparent shadow-sm cursor-pointer'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Overview Summary Cards: Total & Unread */}
        <section
          aria-label="Notification summary counters"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B5563]">
                Total Notifications
              </p>
              <p className="mt-1.5 text-3xl font-bold text-[#111827] tracking-tight">
                {totalCount}
              </p>
              <p className="mt-0.5 text-xs text-[#4B5563]">
                Sample campus activity alerts
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 text-[#059669]">
              <Bell className="w-6 h-6" aria-hidden="true" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B5563]">
                Unread Notifications
              </p>
              <p className="mt-1.5 text-3xl font-bold text-[#111827] tracking-tight">
                {unreadCount}
              </p>
              <p className="mt-0.5 text-xs text-[#4B5563]">
                {unreadCount === 0
                  ? 'All notifications caught up'
                  : 'Requires your attention'}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl ${
                unreadCount > 0
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <BellDot className="w-6 h-6" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section aria-label="Filter notifications">
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
            {FILTER_TABS.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#059669] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 border border-gray-200/80'
                  }`}
                >
                  <span>{tab}</span>
                  {tab === 'Unread' && unreadCount > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                        isSelected
                          ? 'bg-white text-[#047857]'
                          : 'bg-emerald-50 text-[#047857]'
                      }`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Notifications List or Empty State */}
        {filteredNotifications.length === 0 ? (
          <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-10 sm:p-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              No notifications in &ldquo;{activeTab}&rdquo;
            </h2>
            <p className="mt-2 text-sm text-[#4B5563] max-w-md mx-auto">
              {activeTab === 'Unread'
                ? 'You have read all of your notifications. Switch to "All" to review earlier campus report updates.'
                : 'There are no sample notifications matching this category right now.'}
            </p>
            {activeTab !== 'All' && (
              <button
                type="button"
                onClick={() => setActiveTab('All')}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
              >
                View All Notifications
              </button>
            )}
          </section>
        ) : (
          <section
            aria-label="Notification feed"
            className="space-y-3.5"
          >
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              const isUnread = !notification.isRead;
              const isLostCategory =
                notification.category === 'Lost Item Updates';

              return (
                <article
                  key={notification.id}
                  className={`rounded-2xl border p-5 sm:p-6 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                    isUnread
                      ? 'bg-emerald-50/40 border-emerald-300/90 shadow-sm'
                      : 'bg-white border-gray-200/80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Left Icon Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isUnread
                          ? 'bg-[#059669] text-white shadow-xs'
                          : 'bg-gray-100 text-[#4B5563]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>

                    {/* Notification Body */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {isUnread && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#059669] text-white"
                          >
                            Unread
                          </span>
                        )}

                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isLostCategory
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                              : 'bg-emerald-50 text-[#047857] border border-emerald-200/80'
                          }`}
                        >
                          {notification.category}
                        </span>

                        <span className="text-xs text-[#4B5563]">
                          {notification.dateTime}
                        </span>
                      </div>

                      <h2
                        className={`text-base leading-snug ${
                          isUnread
                            ? 'font-bold text-[#111827]'
                            : 'font-semibold text-[#111827]/90'
                        }`}
                      >
                        {notification.title}
                      </h2>

                      <p className="text-sm text-[#4B5563] leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Action: Mark as Read or Read Status */}
                  <div className="sm:self-center shrink-0 pl-14 sm:pl-0">
                    {isUnread ? (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#047857] border border-emerald-200 hover:border-[#059669] text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 text-[#059669]" />
                        <span>Mark as Read</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B5563]/75 px-3 py-1.5">
                        <CheckCheck className="w-3.5 h-3.5 text-[#059669]" />
                        <span>Read</span>
                      </span>
                    )}
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

export default Notifications;