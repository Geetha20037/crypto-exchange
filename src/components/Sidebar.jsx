import { useState } from "react";
import {
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaHistory,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const menuItems = [
  {
    label: "Dashboard",
    icon: FaChartLine,
    target: "dashboard",
  },
  {
    label: "Markets",
    icon: FaExchangeAlt,
    target: "markets",
  },
  {
    label: "Trade",
    icon: FaChartLine,
    target: "trade",
  },
  {
    label: "Portfolio",
    icon: FaWallet,
    target: "portfolio",
  },
  {
    label: "Transactions",
    icon: FaHistory,
    target: "transactions",
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Section #${id} not found`);
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Keep URL/hash in sync
    window.history.replaceState(null, "", `#${id}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      alert("You have been logged out.");
    }
  };

  return (
    <aside
      className={`hidden min-h-[calc(100vh-4rem)] shrink-0 border-r theme-border theme-card transition-all duration-300 lg:block ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex min-h-[calc(100vh-4rem)] flex-col p-4">

        {/* MENU */}
        <div className="flex-1">
          <p
            className={`mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] theme-muted ${
              collapsed ? "text-center" : ""
            }`}
          >
            {collapsed ? "•••" : "Menu"}
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className={`group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium transition ${
                    collapsed
                      ? "justify-center"
                      : "gap-3"
                  } theme-muted hover:bg-violet-500/10 hover:text-violet-500`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="shrink-0 text-base transition group-hover:text-violet-500" />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="my-6 border-t theme-border" />

          {/* FAVORITES */}
          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] theme-muted ${
              collapsed ? "text-center" : ""
            }`}
          >
            {collapsed ? "•••" : "Favorites"}
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("watchlist")}
            className={`group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium theme-muted transition hover:bg-yellow-500/10 hover:text-yellow-500 ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }`}
            title={collapsed ? "Watchlist" : undefined}
          >
            <FaStar className="shrink-0 text-sm transition group-hover:text-yellow-500" />

            {!collapsed && (
              <span>Watchlist</span>
            )}
          </button>
        </div>

        {/* BOTTOM */}
        <div className="space-y-1.5">

          {/* SETTINGS */}
          <button
            type="button"
            onClick={() => scrollToSection("settings")}
            className={`group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium theme-muted transition hover:bg-violet-500/10 hover:text-violet-500 ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }`}
            title={collapsed ? "Settings" : undefined}
          >
            <FaCog className="shrink-0 transition group-hover:rotate-45 group-hover:text-violet-500" />

            {!collapsed && (
              <span>Settings</span>
            )}
          </button>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className={`group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium theme-muted transition hover:bg-red-500/10 hover:text-red-500 ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }`}
            title={collapsed ? "Logout" : undefined}
          >
            <FaSignOutAlt className="shrink-0 transition group-hover:text-red-500" />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>

          {/* COLLAPSE */}
          <button
            type="button"
            onClick={() =>
              setCollapsed((current) => !current)
            }
            className="mt-3 flex w-full items-center justify-center rounded-xl border theme-border theme-secondary py-2.5 theme-muted transition hover:border-violet-500/40 hover:text-violet-500"
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <FaChevronRight />
            ) : (
              <FaChevronLeft />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;