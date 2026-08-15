import { useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaSearch,
} from "react-icons/fa";

const transactionsData = [
  {
    id: "TXN-8F29A1",
    crypto: "Bitcoin",
    symbol: "BTC",
    type: "Buy",
    amount: 0.025,
    price: 104582.42,
    status: "Completed",
    date: "Aug 15, 2026 • 02:42 PM",
  },
  {
    id: "TXN-7C41B8",
    crypto: "Ethereum",
    symbol: "ETH",
    type: "Sell",
    amount: 0.42,
    price: 3824.67,
    status: "Completed",
    date: "Aug 15, 2026 • 01:18 PM",
  },
  {
    id: "TXN-6D73E4",
    crypto: "Solana",
    symbol: "SOL",
    type: "Buy",
    amount: 4.8,
    price: 184.35,
    status: "Pending",
    date: "Aug 15, 2026 • 11:36 AM",
  },
  {
    id: "TXN-5A92F6",
    crypto: "BNB",
    symbol: "BNB",
    type: "Buy",
    amount: 1.25,
    price: 612.48,
    status: "Completed",
    date: "Aug 14, 2026 • 06:24 PM",
  },
  {
    id: "TXN-4E18C2",
    crypto: "XRP",
    symbol: "XRP",
    type: "Sell",
    amount: 120,
    price: 2.87,
    status: "Completed",
    date: "Aug 14, 2026 • 04:51 PM",
  },
  {
    id: "TXN-3B65D9",
    crypto: "Bitcoin",
    symbol: "BTC",
    type: "Sell",
    amount: 0.018,
    price: 103921.28,
    status: "Cancelled",
    date: "Aug 14, 2026 • 02:09 PM",
  },
];

function RecentTransactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactionsData.filter((transaction) => {
      const matchesSearch =
        !query ||
        transaction.id.toLowerCase().includes(query) ||
        transaction.crypto.toLowerCase().includes(query) ||
        transaction.symbol.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <section
      id="transactions"
      className="w-full scroll-mt-24"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            Activity
          </p>

          <h2 className="mt-1 text-xl font-bold theme-text sm:text-2xl">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm theme-muted">
            View your latest cryptocurrency trading activity.
          </p>
        </div>

        {/* Search */}

        <div className="flex w-full items-center gap-2 rounded-xl border theme-border theme-input px-3 py-2.5 lg:w-64">
          <FaSearch className="shrink-0 text-sm text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search transactions..."
            className="w-full bg-transparent text-sm outline-none theme-text placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="theme-card mb-4 flex w-full items-center gap-1 overflow-x-auto rounded-xl border p-1">
        {["All", "Buy", "Sell"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              filter === item
                ? "bg-violet-500/10 text-violet-500"
                : "theme-muted hover:text-violet-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* =====================================================
          DESKTOP TABLE
      ===================================================== */}

      <div className="theme-card hidden overflow-hidden rounded-2xl border md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="border-b theme-border">
                <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Transaction
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Cryptocurrency
                </th>

                <th className="px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Type
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Amount
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Price
                </th>

                <th className="px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map(
                (transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          MOBILE CARDS
      ===================================================== */}

      <div className="space-y-3 md:hidden">
        {filteredTransactions.map(
          (transaction) => (
            <MobileTransactionCard
              key={transaction.id}
              transaction={transaction}
            />
          )
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredTransactions.length === 0 && (
        <div className="theme-card rounded-2xl border p-8 text-center">
          <p className="text-sm font-semibold theme-text">
            No transactions found
          </p>

          <p className="mt-1 text-xs theme-muted">
            Try another transaction ID, coin or filter.
          </p>
        </div>
      )}
    </section>
  );
}

/* =====================================================
   DESKTOP ROW
===================================================== */

function TransactionRow({ transaction }) {
  const isBuy = transaction.type === "Buy";

  return (
    <tr className="theme-row border-b last:border-b-0">
      {/* Transaction ID */}

      <td className="px-5 py-4">
        <p className="text-xs font-semibold theme-text">
          {transaction.id}
        </p>

        <p className="mt-1 text-[10px] theme-muted">
          Simulated transaction
        </p>
      </td>

      {/* Crypto */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <CryptoIcon
            symbol={transaction.symbol}
          />

          <div>
            <p className="text-sm font-semibold theme-text">
              {transaction.crypto}
            </p>

            <p className="mt-0.5 text-xs theme-muted">
              {transaction.symbol}
            </p>
          </div>
        </div>
      </td>

      {/* Type */}

      <td className="px-5 py-4 text-center">
        <TypeBadge
          type={transaction.type}
        />
      </td>

      {/* Amount */}

      <td className="px-5 py-4 text-right">
        <span className="text-sm font-semibold theme-text">
          {transaction.amount}
        </span>

        <span className="ml-1 text-xs theme-muted">
          {transaction.symbol}
        </span>
      </td>

      {/* Price */}

      <td className="px-5 py-4 text-right">
        <span className="text-sm theme-text">
          $
          {transaction.price.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </span>
      </td>

      {/* Status */}

      <td className="px-5 py-4 text-center">
        <StatusBadge
          status={transaction.status}
        />
      </td>

      {/* Date */}

      <td className="px-5 py-4 text-right">
        <span className="whitespace-nowrap text-xs theme-muted">
          {transaction.date}
        </span>
      </td>
    </tr>
  );
}

/* =====================================================
   MOBILE CARD
===================================================== */

function MobileTransactionCard({
  transaction,
}) {
  const isBuy = transaction.type === "Buy";

  return (
    <div className="theme-card rounded-2xl border p-4">
      {/* Top */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <CryptoIcon
            symbol={transaction.symbol}
          />

          <div>
            <p className="text-sm font-semibold theme-text">
              {transaction.crypto}
            </p>

            <p className="mt-0.5 text-xs theme-muted">
              {transaction.id}
            </p>
          </div>
        </div>

        <TypeBadge
          type={transaction.type}
        />
      </div>

      {/* Details */}

      <div className="mt-4 grid grid-cols-2 gap-4 border-t theme-border pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider theme-muted">
            Amount
          </p>

          <p className="mt-1 text-sm font-semibold theme-text">
            {transaction.amount}{" "}
            {transaction.symbol}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider theme-muted">
            Price
          </p>

          <p className="mt-1 text-sm font-semibold theme-text">
            $
            {transaction.price.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>
      </div>

      {/* Bottom */}

      <div className="mt-4 flex items-center justify-between border-t theme-border pt-4">
        <span className="text-[10px] theme-muted">
          {transaction.date}
        </span>

        <StatusBadge
          status={transaction.status}
        />
      </div>
    </div>
  );
}

/* =====================================================
   CRYPTO ICON
===================================================== */

function CryptoIcon({ symbol }) {
  const letters = {
    BTC: "₿",
    ETH: "Ξ",
    SOL: "S",
    BNB: "B",
    XRP: "X",
  };

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
      {letters[symbol] || symbol[0]}
    </div>
  );
}

/* =====================================================
   TYPE BADGE
===================================================== */

function TypeBadge({ type }) {
  const isBuy = type === "Buy";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold ${
        isBuy
          ? "bg-emerald-500/10 text-emerald-500"
          : "bg-red-500/10 text-red-500"
      }`}
    >
      {isBuy ? (
        <FaArrowUp className="text-[7px]" />
      ) : (
        <FaArrowDown className="text-[7px]" />
      )}

      {type}
    </span>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {
  const styles = {
    Completed:
      "bg-emerald-500/10 text-emerald-500",
    Pending:
      "bg-yellow-500/10 text-yellow-500",
    Cancelled:
      "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`inline-flex rounded-lg px-2 py-1 text-[10px] font-semibold ${
        styles[status] ||
        "bg-slate-500/10 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

export default RecentTransactions;