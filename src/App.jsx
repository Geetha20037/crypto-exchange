import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Portfolio from "./components/Portfolio";
import MarketOverview from "./components/MarketOverview";
import PriceChart from "./components/PriceChart";
import TradingPanel from "./components/TradingPanel";
import OrderBook from "./components/OrderBook";
import RecentTransactions from "./components/RecentTransactions";
import Footer from "./components/Footer";

function App() {
  /* =====================================================
     GLOBAL SETTINGS
  ===================================================== */

  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("crypto-dark-theme");

    return savedTheme === null
      ? true
      : savedTheme === "true";
  });

  const [priceAlerts, setPriceAlerts] = useState(() => {
    const saved = localStorage.getItem("crypto-price-alerts");

    return saved === null
      ? true
      : saved === "true";
  });

  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem(
      "crypto-email-notifications"
    );

    return saved === null
      ? false
      : saved === "true";
  });

  /* =====================================================
     THEME
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "crypto-dark-theme",
      String(darkTheme)
    );

    document.documentElement.classList.toggle(
      "light-theme",
      !darkTheme
    );

    document.body.classList.toggle(
      "light-theme",
      !darkTheme
    );
  }, [darkTheme]);

  /* =====================================================
     SAVE PRICE ALERT SETTINGS
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "crypto-price-alerts",
      String(priceAlerts)
    );
  }, [priceAlerts]);

  /* =====================================================
     SAVE EMAIL SETTINGS
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "crypto-email-notifications",
      String(emailNotifications)
    );
  }, [emailNotifications]);

  /* =====================================================
     SMOOTH NAVIGATION
  ===================================================== */

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "");

      if (!hash) return;

      const element = document.getElementById(hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    };

    handleHashNavigation();

    window.addEventListener(
      "hashchange",
      handleHashNavigation
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashNavigation
      );
    };
  }, []);

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
        darkTheme
          ? "bg-[#0b0f19] text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        priceAlerts={priceAlerts}
        emailNotifications={emailNotifications}
      />

      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="flex w-full">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <Sidebar />

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="min-w-0 flex-1">

          <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            <div className="mx-auto w-full max-w-[1600px]">

              {/* =====================================================
                  DASHBOARD
              ===================================================== */}

              <section
                id="dashboard"
                className="scroll-mt-24"
              >
                <div className="mb-8">

                  <p className="mb-1 text-sm theme-muted">
                    Welcome back, Geetha 👋
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight theme-text sm:text-3xl">
                    Dashboard
                  </h1>

                  <p className="mt-1 max-w-xl text-sm leading-6 theme-muted">
                    Monitor your cryptocurrency portfolio,
                    market movements, and trading activity
                    from one place.
                  </p>

                </div>

                {/* Dashboard summary */}
                <Portfolio />
              </section>

              {/* =====================================================
                  MARKETS
              ===================================================== */}

              <section
                id="markets"
                className="mt-10 scroll-mt-24"
              >
                <MarketOverview />
              </section>

              {/* =====================================================
                  TRADE
              ===================================================== */}

              <section
                id="trade"
                className="mt-10 scroll-mt-24"
              >
                <div className="mb-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                    Trading
                  </p>

                  <h2 className="mt-1 text-xl font-bold theme-text sm:text-2xl">
                    Trade Cryptocurrency
                  </h2>

                  <p className="mt-1 text-sm theme-muted">
                    Analyze price movements and place
                    simulated orders.
                  </p>

                </div>

                <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">

                  <PriceChart />

                  <TradingPanel />

                </div>
              </section>

              {/* =====================================================
                  PORTFOLIO
              ===================================================== */}

              <section
                id="portfolio"
                className="mt-10 scroll-mt-24"
              >
                <div className="mb-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                    Assets
                  </p>

                  <h2 className="mt-1 text-xl font-bold theme-text sm:text-2xl">
                    Portfolio Overview
                  </h2>

                  <p className="mt-1 text-sm theme-muted">
                    Review your cryptocurrency holdings
                    and allocation.
                  </p>

                </div>

                <Portfolio />
              </section>

              {/* =====================================================
                  TRANSACTIONS
              ===================================================== */}

              <section
                id="transactions"
                className="mt-10 scroll-mt-24"
              >
                <div className="mb-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                    Activity
                  </p>

                  <h2 className="mt-1 text-xl font-bold theme-text sm:text-2xl">
                    Market Activity
                  </h2>

                  <p className="mt-1 text-sm theme-muted">
                    Monitor order book depth and recent
                    trading activity.
                  </p>

                </div>

                <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.8fr)]">

                  <OrderBook />

                  <RecentTransactions />

                </div>
              </section>

              {/* =====================================================
                  WATCHLIST
              ===================================================== */}

              <section
                id="watchlist"
                className="mt-10 scroll-mt-24"
              >
                <div className="theme-card rounded-2xl border p-5 sm:p-6">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400">
                    Favorites
                  </p>

                  <h2 className="mt-1 text-xl font-bold theme-text">
                    Watchlist
                  </h2>

                  <p className="mt-1 text-sm theme-muted">
                    Your favorite cryptocurrencies will
                    appear here.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <WatchItem
                      name="Bitcoin"
                      symbol="BTC"
                      price="$104,582.42"
                      change="+2.84%"
                    />

                    <WatchItem
                      name="Ethereum"
                      symbol="ETH"
                      price="$3,824.67"
                      change="+1.72%"
                    />

                    <WatchItem
                      name="Solana"
                      symbol="SOL"
                      price="$184.35"
                      change="+4.21%"
                    />

                  </div>
                </div>
              </section>

              {/* =====================================================
                  SETTINGS
              ===================================================== */}

              <section
                id="settings"
                className="mt-10 scroll-mt-24"
              >
                <div className="theme-card rounded-2xl border p-5 sm:p-6">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                    Preferences
                  </p>

                  <h2 className="mt-1 text-xl font-bold theme-text">
                    Settings
                  </h2>

                  <p className="mt-1 text-sm theme-muted">
                    Manage your dashboard preferences.
                  </p>

                  <div className="mt-5 space-y-3">

                    <SettingItem
                      title="Dark Theme"
                      description={
                        darkTheme
                          ? "Use the dark cryptocurrency dashboard theme."
                          : "Use the light cryptocurrency dashboard theme."
                      }
                      enabled={darkTheme}
                      setEnabled={setDarkTheme}
                    />

                    <SettingItem
                      title="Price Alerts"
                      description={
                        priceAlerts
                          ? "Price alerts are currently enabled."
                          : "Price alerts are currently disabled."
                      }
                      enabled={priceAlerts}
                      setEnabled={setPriceAlerts}
                    />

                    <SettingItem
                      title="Email Notifications"
                      description={
                        emailNotifications
                          ? "Email notifications are enabled."
                          : "Email notifications are disabled."
                      }
                      enabled={emailNotifications}
                      setEnabled={setEmailNotifications}
                    />

                  </div>

                  {/* CURRENT SETTINGS */}

                  <div className="theme-secondary mt-5 rounded-xl border theme-border p-4">

                    <p className="text-xs font-semibold theme-text">
                      Current settings
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">

                      <StatusItem
                        label="Theme"
                        value={
                          darkTheme
                            ? "Dark"
                            : "Light"
                        }
                        active={true}
                      />

                      <StatusItem
                        label="Price Alerts"
                        value={
                          priceAlerts
                            ? "Enabled"
                            : "Disabled"
                        }
                        active={priceAlerts}
                      />

                      <StatusItem
                        label="Email"
                        value={
                          emailNotifications
                            ? "Enabled"
                            : "Disabled"
                        }
                        active={emailNotifications}
                      />

                    </div>
                  </div>
                </div>
              </section>

              {/* =====================================================
                  PROFILE
              ===================================================== */}

              <section
                id="profile"
                className="mt-10 scroll-mt-24"
              >
                <div className="theme-card rounded-2xl border p-5 sm:p-6">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                    Account
                  </p>

                  <h2 className="mt-1 text-xl font-bold theme-text">
                    My Profile
                  </h2>

                  <div className="mt-5 flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-bold text-white">
                      GP
                    </div>

                    <div>

                      <p className="font-semibold theme-text">
                        Geetha
                      </p>

                      <p className="mt-1 text-sm theme-muted">
                        Crypto Trader
                      </p>

                      <p className="mt-1 text-xs theme-muted">
                        geetha@example.com
                      </p>

                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <ProfileStat
                      label="Account Type"
                      value="Trader"
                    />

                    <ProfileStat
                      label="Trading Status"
                      value="Active"
                    />

                    <ProfileStat
                      label="Member Since"
                      value="2026"
                    />

                  </div>
                </div>
              </section>

              {/* =====================================================
                  FOOTER
              ===================================================== */}

              <Footer />

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =====================================================
   WATCHLIST ITEM
===================================================== */

function WatchItem({
  name,
  symbol,
  price,
  change,
}) {
  return (
    <div className="theme-secondary rounded-xl border theme-border p-4 transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold theme-text">
            {name}
          </p>

          <p className="mt-1 text-xs theme-muted">
            {symbol}
          </p>
        </div>

        <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500">
          {change}
        </span>

      </div>

      <p className="mt-4 text-lg font-bold theme-text">
        {price}
      </p>

    </div>
  );
}

/* =====================================================
   SETTING ITEM
===================================================== */

function SettingItem({
  title,
  description,
  enabled,
  setEnabled,
}) {
  return (
    <div className="theme-secondary flex items-center justify-between gap-4 rounded-xl border theme-border p-4">

      <div className="min-w-0">

        <p className="text-sm font-medium theme-text">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 theme-muted">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition-all duration-200 ${
          enabled
            ? "bg-violet-500"
            : "bg-slate-300 dark:bg-slate-700"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled
              ? "translate-x-5"
              : "translate-x-0"
          }`}
        />
      </button>

    </div>
  );
}

/* =====================================================
   STATUS ITEM
===================================================== */

function StatusItem({
  label,
  value,
  active,
}) {
  return (
    <div className="theme-card rounded-lg border theme-border px-3 py-2">

      <p className="text-[10px] uppercase tracking-wider theme-muted">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2">

        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active
              ? "bg-emerald-400"
              : "bg-slate-400"
          }`}
        />

        <p className="text-xs font-semibold theme-text">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =====================================================
   PROFILE STAT
===================================================== */

function ProfileStat({
  label,
  value,
}) {
  return (
    <div className="theme-secondary rounded-xl border theme-border p-4">

      <p className="text-[10px] uppercase tracking-wider theme-muted">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold theme-text">
        {value}
      </p>

    </div>
  );
}

export default App;