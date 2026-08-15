import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaBell,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCheckCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

function Header({
  darkTheme,
  setDarkTheme,
  priceAlerts,
  emailNotifications,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [search, setSearch] = useState("");

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  /* =====================================================
     SECTION MAP
  ===================================================== */

  const sectionMap = {
    dashboard: "dashboard",
    home: "dashboard",

    market: "markets",
    markets: "markets",

    trade: "trade",
    trading: "trade",

    portfolio: "portfolio",

    transaction: "transactions",
    transactions: "transactions",

    watchlist: "watchlist",
    favorite: "watchlist",
    favorites: "watchlist",

    setting: "settings",
    settings: "settings",
    preference: "settings",
    preferences: "settings",

    profile: "profile",
    account: "profile",
    geetha: "profile",
  };

  /* =====================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenuOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) {
      return;
    }

    const exactMatch = sectionMap[query];

    if (exactMatch) {
      scrollToSection(exactMatch);
      setSearch("");
      return;
    }

    const partialMatch = Object.keys(sectionMap).find(
      (keyword) => keyword.includes(query)
    );

    if (partialMatch) {
      scrollToSection(sectionMap[partialMatch]);
      setSearch("");
      return;
    }

    alert(
      `No section found for "${search}". Try Dashboard, Markets, Trade, Portfolio, Transactions, Watchlist, Settings or Profile.`
    );
  };

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const handleMarkAsRead = () => {
    setNotificationsRead(true);
  };

  const handleNotificationClick = () => {
    setNotificationOpen((current) => !current);
    setProfileOpen(false);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);

    alert("You have been logged out successfully.");
  };

  /* =====================================================
     THEME CLASSES
  ===================================================== */

  const headerBackground = darkTheme
    ? "bg-[#0b0f19]/95 border-slate-800/80"
    : "bg-white/95 border-slate-200";

  const dropdownBackground = darkTheme
    ? "border-slate-800 bg-[#111827]"
    : "border-slate-200 bg-white";

  const textPrimary = darkTheme
    ? "text-white"
    : "text-slate-900";

  const textSecondary = "text-slate-500";

  const inputBackground = darkTheme
    ? "bg-slate-900/70 border-slate-800"
    : "bg-slate-100 border-slate-200";

  return (
    <header
      className={`sticky top-0 z-[100] w-full border-b backdrop-blur-xl transition-colors duration-300 ${headerBackground}`}
    >
      {/* =====================================================
          HEADER ROW
      ===================================================== */}

      <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <button
          type="button"
          onClick={() => scrollToSection("dashboard")}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-bold text-white shadow-lg shadow-violet-500/20">
            ₿
          </div>

          <div className="hidden text-left sm:block">
            <h1
              className={`text-lg font-bold tracking-tight ${textPrimary}`}
            >
              CryptoX
            </h1>

            <p
              className={`text-[10px] uppercase tracking-widest ${textSecondary}`}
            >
              Exchange
            </p>
          </div>
        </button>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* =====================================================
              SEARCH
          ===================================================== */}

          <form
            onSubmit={handleSearch}
            className={`hidden w-44 items-center gap-2 rounded-xl border px-3 py-2 md:flex lg:w-64 ${inputBackground}`}
          >
            <FaSearch
              className={`shrink-0 text-sm ${
                darkTheme
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search section..."
              className={`w-full bg-transparent text-sm outline-none ${
                darkTheme
                  ? "text-white placeholder:text-slate-600"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <button
              type="submit"
              className={`hidden rounded border px-1.5 py-0.5 text-[10px] lg:block ${
                darkTheme
                  ? "border-slate-700 text-slate-500"
                  : "border-slate-300 text-slate-400"
              }`}
            >
              Enter
            </button>
          </form>

          {/* =====================================================
              NOTIFICATIONS
          ===================================================== */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={handleNotificationClick}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${
                darkTheme
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
              aria-label="Notifications"
              aria-expanded={notificationOpen}
            >
              <FaBell />

              {!notificationsRead && (
                <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-violet-500" />
              )}
            </button>

            {notificationOpen && (
              <div
                className={`absolute right-0 top-12 z-[200] w-[310px] overflow-hidden rounded-2xl border shadow-2xl ${dropdownBackground}`}
              >
                {/* Notification Header */}

                <div
                  className={`flex items-center justify-between border-b px-4 py-3 ${
                    darkTheme
                      ? "border-slate-800"
                      : "border-slate-200"
                  }`}
                >
                  <h3
                    className={`text-sm font-semibold ${textPrimary}`}
                  >
                    Notifications
                  </h3>

                  {!notificationsRead && (
                    <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[10px] font-semibold text-violet-400">
                      New
                    </span>
                  )}
                </div>

                {/* Notification Content */}

                {notificationsRead ? (
                  <div className="px-4 py-8 text-center">
                    <FaCheckCircle className="mx-auto mb-3 text-2xl text-emerald-400" />

                    <p
                      className={`text-sm font-medium ${textPrimary}`}
                    >
                      All caught up
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      You have no unread notifications.
                    </p>
                  </div>
                ) : (
                  <div>
                    {priceAlerts && (
                      <NotificationItem
                        title="Bitcoin price alert"
                        message="BTC is up 2.84% today."
                        darkTheme={darkTheme}
                      />
                    )}

                    <NotificationItem
                      title="Order completed"
                      message="Your simulated BTC order was completed."
                      darkTheme={darkTheme}
                    />

                    <NotificationItem
                      title="Portfolio update"
                      message="Your portfolio gained $284.52."
                      darkTheme={darkTheme}
                    />

                    {emailNotifications && (
                      <NotificationItem
                        title="Email notifications enabled"
                        message="You will receive important account updates."
                        darkTheme={darkTheme}
                      />
                    )}
                  </div>
                )}

                {/* Mark Read */}

                <button
                  type="button"
                  onClick={handleMarkAsRead}
                  disabled={notificationsRead}
                  className={`w-full border-t px-4 py-3 text-xs font-medium transition ${
                    darkTheme
                      ? "border-slate-800"
                      : "border-slate-200"
                  } ${
                    notificationsRead
                      ? "cursor-not-allowed text-slate-400"
                      : "text-violet-400 hover:bg-violet-500/5"
                  }`}
                >
                  {notificationsRead
                    ? "All notifications read"
                    : "Mark all as read"}
                </button>
              </div>
            )}
          </div>

          {/* =====================================================
              PROFILE
          ===================================================== */}

          <div
            ref={profileRef}
            className="relative hidden sm:block"
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen((current) => !current);
                setNotificationOpen(false);
              }}
              className={`flex items-center gap-2 rounded-xl p-1.5 transition ${
                darkTheme
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
              aria-expanded={profileOpen}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-semibold text-white">
                GP
              </div>

              <div className="hidden text-left lg:block">
                <p
                  className={`text-xs font-medium ${textPrimary}`}
                >
                  Geetha
                </p>

                <p className="text-[10px] text-slate-500">
                  Trader
                </p>
              </div>

              <FaChevronDown
                className={`ml-1 text-[10px] text-slate-500 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}

            {profileOpen && (
              <div
                className={`absolute right-0 top-12 z-[200] w-56 rounded-2xl border p-2 shadow-2xl ${dropdownBackground}`}
              >
                <div
                  className={`border-b px-3 py-3 ${
                    darkTheme
                      ? "border-slate-800"
                      : "border-slate-200"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${textPrimary}`}
                  >
                    Geetha
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Crypto Trader
                  </p>
                </div>

                <ProfileButton
                  icon={FaUser}
                  label="My Profile"
                  onClick={() =>
                    scrollToSection("profile")
                  }
                  darkTheme={darkTheme}
                />

                <ProfileButton
                  icon={FaCog}
                  label="Settings"
                  onClick={() =>
                    scrollToSection("settings")
                  }
                  darkTheme={darkTheme}
                />

                <ProfileButton
                  icon={FaChartLine}
                  label="Dashboard"
                  onClick={() =>
                    scrollToSection("dashboard")
                  }
                  darkTheme={darkTheme}
                />

                <ProfileButton
                  icon={FaStar}
                  label="Watchlist"
                  onClick={() =>
                    scrollToSection("watchlist")
                  }
                  darkTheme={darkTheme}
                />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-red-400 transition hover:bg-red-500/10"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(
                (current) => !current
              );
              setNotificationOpen(false);
              setProfileOpen(false);
            }}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition lg:hidden ${
              darkTheme
                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenuOpen && (
        <div
          className={`border-t px-4 py-4 lg:hidden ${
            darkTheme
              ? "border-slate-800 bg-[#0b0f19]"
              : "border-slate-200 bg-white"
          }`}
        >
          {/* Mobile Search */}

          <form
            onSubmit={handleSearch}
            className={`mb-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 ${inputBackground}`}
          >
            <FaSearch className="text-sm text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search section..."
              className={`w-full bg-transparent text-sm outline-none ${
                darkTheme
                  ? "text-white placeholder:text-slate-600"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <button
              type="submit"
              className="text-xs font-semibold text-violet-400"
            >
              Go
            </button>
          </form>

          {/* Mobile Options */}

          <nav className="flex flex-col gap-1">
            <MobileNavButton
              label="Watchlist"
              icon={FaStar}
              onClick={() =>
                scrollToSection("watchlist")
              }
              darkTheme={darkTheme}
            />

            <MobileNavButton
              label="Settings"
              icon={FaCog}
              onClick={() =>
                scrollToSection("settings")
              }
              darkTheme={darkTheme}
            />

            <MobileNavButton
              label="Profile"
              icon={FaUser}
              onClick={() =>
                scrollToSection("profile")
              }
              darkTheme={darkTheme}
            />
          </nav>

          {/* Mobile User */}

          <div
            className={`mt-4 flex items-center gap-3 border-t pt-4 ${
              darkTheme
                ? "border-slate-800"
                : "border-slate-200"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 font-semibold text-white">
              GP
            </div>

            <div>
              <p
                className={`text-sm font-medium ${textPrimary}`}
              >
                Geetha
              </p>

              <p className="text-xs text-slate-500">
                Trader
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* =====================================================
   MOBILE NAV BUTTON
===================================================== */

function MobileNavButton({
  label,
  icon: Icon,
  onClick,
  darkTheme,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
        darkTheme
          ? "text-slate-400 hover:bg-slate-800 hover:text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className="text-sm" />
      {label}
    </button>
  );
}

/* =====================================================
   PROFILE BUTTON
===================================================== */

function ProfileButton({
  icon: Icon,
  label,
  onClick,
  darkTheme,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition ${
        darkTheme
          ? "text-slate-400 hover:bg-slate-800 hover:text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon />
      {label}
    </button>
  );
}

/* =====================================================
   NOTIFICATION ITEM
===================================================== */

function NotificationItem({
  title,
  message,
  darkTheme,
}) {
  return (
    <div
      className={`flex gap-3 border-b px-4 py-3 transition ${
        darkTheme
          ? "border-slate-800 hover:bg-slate-800/50"
          : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
        <FaCheckCircle className="text-xs" />
      </div>

      <div className="min-w-0">
        <p
          className={`text-xs font-medium ${
            darkTheme
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Header;