import { useState } from "react";
import {
  FaMoon,
  FaBell,
  FaShieldAlt,
  FaGlobe,
  FaUser,
  FaLock,
  FaCheck,
} from "react-icons/fa";

function Settings() {
  const [darkTheme, setDarkTheme] = useState(
    !document.documentElement.classList.contains(
      "light-theme"
    )
  );

  const [notifications, setNotifications] =
    useState(true);

  const [priceAlerts, setPriceAlerts] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(false);

  const [language, setLanguage] =
    useState("English");

  const [saved, setSaved] = useState(false);

  /* =====================================================
     THEME
  ===================================================== */

  const changeTheme = (enabled) => {
    setDarkTheme(enabled);

    if (enabled) {
      // DARK MODE
      document.documentElement.classList.remove(
        "light-theme"
      );

      localStorage.setItem("theme", "dark");
    } else {
      // LIGHT MODE
      document.documentElement.classList.add(
        "light-theme"
      );

      localStorage.setItem("theme", "light");
    }

    window.dispatchEvent(
      new Event("theme-change")
    );
  };

  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  const saveSettings = () => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      "priceAlerts",
      JSON.stringify(priceAlerts)
    );

    localStorage.setItem(
      "twoFactor",
      JSON.stringify(twoFactor)
    );

    localStorage.setItem(
      "language",
      language
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <section
      id="settings"
      className="w-full scroll-mt-24"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
          Preferences
        </p>

        <h2 className="mt-1 text-2xl font-bold theme-text">
          Settings
        </h2>

        <p className="mt-1 text-sm theme-muted">
          Manage your account, appearance and
          notification preferences.
        </p>
      </div>

      {/* =================================================
          SETTINGS GRID
      ================================================= */}

      <div className="grid gap-5 lg:grid-cols-2">

        {/* =================================================
            APPEARANCE
        ================================================= */}

        <SettingsCard
          icon={FaMoon}
          title="Appearance"
          description="Customize how CryptoX looks."
        >
          <SettingRow
            icon={FaMoon}
            title="Dark Theme"
            description={
              darkTheme
                ? "Dark interface is enabled."
                : "Light interface is enabled."
            }
          >
            <Toggle
              enabled={darkTheme}
              onChange={changeTheme}
            />
          </SettingRow>
        </SettingsCard>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <SettingsCard
          icon={FaBell}
          title="Notifications"
          description="Control your trading notifications."
        >
          <SettingRow
            icon={FaBell}
            title="Push Notifications"
            description="Receive important account updates."
          >
            <Toggle
              enabled={notifications}
              onChange={setNotifications}
            />
          </SettingRow>

          <SettingRow
            icon={FaCheck}
            title="Price Alerts"
            description="Get notified when crypto reaches your target."
          >
            <Toggle
              enabled={priceAlerts}
              onChange={setPriceAlerts}
            />
          </SettingRow>
        </SettingsCard>

        {/* =================================================
            SECURITY
        ================================================= */}

        <SettingsCard
          icon={FaShieldAlt}
          title="Security"
          description="Protect your trading account."
        >
          <SettingRow
            icon={FaShieldAlt}
            title="Two-Factor Authentication"
            description={
              twoFactor
                ? "2FA protection is enabled."
                : "Add an extra layer of security."
            }
          >
            <Toggle
              enabled={twoFactor}
              onChange={setTwoFactor}
            />
          </SettingRow>

          <button
            type="button"
            onClick={() =>
              alert(
                "Password change feature opened."
              )
            }
            className="mt-2 flex w-full items-center gap-3 rounded-xl border theme-border theme-secondary p-3 text-left transition hover:border-violet-500/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
              <FaLock className="text-xs" />
            </div>

            <div>
              <p className="text-xs font-semibold theme-text">
                Change Password
              </p>

              <p className="mt-0.5 text-[10px] theme-muted">
                Update your account password
              </p>
            </div>
          </button>
        </SettingsCard>

        {/* =================================================
            LANGUAGE
        ================================================= */}

        <SettingsCard
          icon={FaGlobe}
          title="Language"
          description="Choose your preferred language."
        >
          <div>
            <label className="mb-2 block text-xs font-medium theme-muted">
              Interface Language
            </label>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
              }
              className="w-full rounded-xl border theme-border theme-input px-3 py-3 text-sm outline-none transition focus:border-violet-500"
            >
              <option value="English">
                English
              </option>

              <option value="Telugu">
                Telugu
              </option>

              <option value="Tamil">
                Tamil
              </option>

              <option value="Hindi">
                Hindi
              </option>
            </select>
          </div>
        </SettingsCard>

        {/* =================================================
            ACCOUNT
        ================================================= */}

        <SettingsCard
          icon={FaUser}
          title="Account"
          description="Manage your profile information."
        >
          <div className="flex items-center gap-4 rounded-xl theme-secondary p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
              GP
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold theme-text">
                Geetha
              </p>

              <p className="mt-1 text-xs theme-muted">
                geetha@cryptox.com
              </p>

              <p className="mt-1 text-[10px] text-violet-500">
                Trader Account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("profile")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
            className="mt-3 w-full rounded-xl bg-violet-500/10 py-3 text-xs font-semibold text-violet-500 transition hover:bg-violet-500 hover:text-white"
          >
            Open Profile
          </button>
        </SettingsCard>

        {/* =================================================
            SAVE SETTINGS
        ================================================= */}

        <div className="flex items-end">
          <button
            type="button"
            onClick={saveSettings}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5 hover:bg-violet-400"
          >
            {saved ? (
              <>
                <FaCheck />
                Settings Saved
              </>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   SETTINGS CARD
===================================================== */

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="theme-card rounded-2xl border p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
          <Icon className="text-sm" />
        </div>

        <div>
          <h3 className="text-sm font-bold theme-text">
            {title}
          </h3>

          <p className="mt-0.5 text-[10px] theme-muted">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

/* =====================================================
   SETTING ROW
===================================================== */

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl theme-secondary p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
        <Icon className="text-xs" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold theme-text">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] theme-muted">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

/* =====================================================
   TOGGLE
===================================================== */

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled
          ? "bg-violet-500"
          : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition ${
          enabled
            ? "left-6"
            : "left-1"
        }`}
      />
    </button>
  );
}

export default Settings;