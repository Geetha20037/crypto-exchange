import { useMemo, useState } from "react";
import {
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaClock,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const initialNotifications = [
  {
    id: 1,
    title: "Bitcoin price increased",
    message:
      "BTC has increased by 2.84% in the last 24 hours.",
    time: "5 min ago",
    type: "price",
    read: false,
  },
  {
    id: 2,
    title: "Order completed",
    message:
      "Your BTC/USDT buy order has been completed successfully.",
    time: "24 min ago",
    type: "trade",
    read: false,
  },
  {
    id: 3,
    title: "Price alert",
    message:
      "Bitcoin crossed your alert price of $104,000.",
    time: "1 hour ago",
    type: "alert",
    read: true,
  },
  {
    id: 4,
    title: "Portfolio update",
    message:
      "Your portfolio is up 8.42% this month.",
    time: "3 hours ago",
    type: "portfolio",
    read: true,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [showPanel, setShowPanel] = useState(false);

  const [priceAlertEnabled, setPriceAlertEnabled] =
    useState(false);

  const [alertPrice, setAlertPrice] =
    useState("105000");

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => !notification.read
      ).length,
    [notifications]
  );

  /* =====================================================
     MARK ONE AS READ
  ===================================================== */

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  /* =====================================================
     MARK ALL AS READ
  ===================================================== */

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /* =====================================================
     DELETE NOTIFICATION
  ===================================================== */

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  /* =====================================================
     CREATE PRICE ALERT
  ===================================================== */

  const togglePriceAlert = () => {
    setPriceAlertEnabled((current) => !current);

    if (!priceAlertEnabled) {
      const newNotification = {
        id: Date.now(),
        title: "Price alert enabled",
        message: `You will be notified when BTC reaches $${Number(
          alertPrice
        ).toLocaleString("en-US")}.`,
        time: "Just now",
        type: "alert",
        read: false,
      };

      setNotifications((current) => [
        newNotification,
        ...current,
      ]);
    }
  };

  return (
    <>
      {/* ===================================================
          NOTIFICATION BUTTON
      =================================================== */}

      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setShowPanel((current) => !current)
          }
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <FaBell />

          {unreadCount > 0 && (
            <span className="absolute right-2 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[8px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* =================================================
            DROPDOWN
        ================================================= */}

        {showPanel && (
          <div className="absolute right-0 top-12 z-[100] w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-2xl border theme-border theme-card shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b theme-border p-4">
              <div>
                <h3 className="text-sm font-bold theme-text">
                  Notifications
                </h3>

                <p className="mt-0.5 text-[10px] theme-muted">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 px-2.5 py-2 text-[10px] font-semibold text-violet-500 transition hover:bg-violet-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaCheckDouble />

                Mark all read
              </button>
            </div>

            {/* Notifications */}

            <div className="max-h-[340px] overflow-y-auto">

              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <FaBell className="mx-auto text-xl theme-muted" />

                  <p className="mt-3 text-sm font-semibold theme-text">
                    No notifications
                  </p>

                  <p className="mt-1 text-xs theme-muted">
                    You're all caught up.
                  </p>
                </div>
              ) : (
                notifications.map(
                  (notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onRead={() =>
                        markAsRead(
                          notification.id
                        )
                      }
                      onDelete={() =>
                        deleteNotification(
                          notification.id
                        )
                      }
                    />
                  )
                )
              )}
            </div>

            {/* =================================================
                PRICE ALERT
            ================================================= */}

            <div className="border-t theme-border p-4">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold theme-text">
                    BTC Price Alert
                  </p>

                  <p className="mt-0.5 text-[10px] theme-muted">
                    Notify me when BTC reaches:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={togglePriceAlert}
                  className={`relative h-6 w-11 rounded-full transition ${
                    priceAlertEnabled
                      ? "bg-violet-500"
                      : "bg-slate-700"
                  }`}
                  aria-label="Toggle BTC price alert"
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                      priceAlertEnabled
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border theme-border theme-input px-3">
                <span className="text-xs theme-muted">
                  $
                </span>

                <input
                  type="number"
                  value={alertPrice}
                  onChange={(event) =>
                    setAlertPrice(
                      event.target.value
                    )
                  }
                  className="w-full bg-transparent py-2.5 text-xs outline-none theme-text"
                  placeholder="Enter price"
                />
              </div>

              {priceAlertEnabled && (
                <p className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-500">
                  <FaCheck />

                  Price alert is active.
                </p>
              )}
            </div>

            {/* Close */}

            <button
              type="button"
              onClick={() => setShowPanel(false)}
              className="flex w-full items-center justify-center gap-1 border-t theme-border py-3 text-[10px] font-semibold theme-muted transition hover:text-violet-500"
            >
              <FaTimes />

              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* =====================================================
   NOTIFICATION ITEM
===================================================== */

function NotificationItem({
  notification,
  onRead,
  onDelete,
}) {
  return (
    <div
      className={`group border-b theme-border p-4 transition ${
        notification.read
          ? "theme-row"
          : "bg-violet-500/[0.04]"
      }`}
    >
      <div className="flex gap-3">

        {/* Icon */}

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            notification.read
              ? "theme-secondary theme-muted"
              : "bg-violet-500/10 text-violet-500"
          }`}
        >
          {notification.type === "price" && "₿"}

          {notification.type === "trade" && "↔"}

          {notification.type === "alert" && "!"}

          {notification.type === "portfolio" && "↗"}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-xs font-semibold ${
                notification.read
                  ? "theme-text"
                  : "text-violet-500"
              }`}
            >
              {notification.title}
            </p>

            {!notification.read && (
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            )}
          </div>

          <p className="mt-1 text-[10px] leading-relaxed theme-muted">
            {notification.message}
          </p>

          <div className="mt-2 flex items-center justify-between">

            <span className="flex items-center gap-1 text-[9px] theme-muted">
              <FaClock />

              {notification.time}
            </span>

            <div className="flex items-center gap-1">

              {!notification.read && (
                <button
                  type="button"
                  onClick={onRead}
                  className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1.5 text-[9px] font-semibold text-emerald-500 transition hover:bg-emerald-500 hover:text-white"
                >
                  <FaCheck />

                  Mark as read
                </button>
              )}

              <button
                type="button"
                onClick={onDelete}
                className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-500"
                aria-label="Delete notification"
              >
                <FaTrash className="text-[9px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;