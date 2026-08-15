import { useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaWallet,
  FaChartPie,
} from "react-icons/fa";

const holdingsData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    amount: 0.245,
    price: 104582.42,
    value: 25622.69,
    change: 8.42,
    allocation: 48,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    amount: 1.84,
    price: 3824.67,
    value: 7037.39,
    change: 5.27,
    allocation: 13,
  },
  {
    name: "Solana",
    symbol: "SOL",
    amount: 18.5,
    price: 184.35,
    value: 3410.48,
    change: 12.64,
    allocation: 7,
  },
  {
    name: "BNB",
    symbol: "BNB",
    amount: 5.2,
    price: 612.48,
    value: 3184.9,
    change: -1.84,
    allocation: 6,
  },
  {
    name: "XRP",
    symbol: "XRP",
    amount: 420,
    price: 2.87,
    value: 1205.4,
    change: 3.18,
    allocation: 3,
  },
];

function Portfolio() {
  const [selectedAsset, setSelectedAsset] = useState("All");

  const totalPortfolio = useMemo(() => {
    return holdingsData.reduce(
      (total, asset) => total + asset.value,
      0
    );
  }, []);

  const totalProfit = 2846.73;

  const availableBalance = 12480.32;

  const filteredHoldings =
    selectedAsset === "All"
      ? holdingsData
      : holdingsData.filter(
          (asset) => asset.symbol === selectedAsset
        );

  return (
    <section
      id="portfolio"
      className="w-full scroll-mt-24"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
          Your Assets
        </p>

        <h2 className="mt-1 text-xl font-bold theme-text sm:text-2xl">
          Portfolio
        </h2>

        <p className="mt-1 text-sm theme-muted">
          Track your cryptocurrency holdings and performance.
        </p>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Portfolio */}

        <SummaryCard
          title="Total Portfolio"
          value={`$${totalPortfolio.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          subtitle="+8.42% this month"
          positive
          icon={<FaWallet />}
        />

        {/* Available Balance */}

        <SummaryCard
          title="Available Balance"
          value={`$${availableBalance.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          subtitle="Ready to trade"
          icon={<FaWallet />}
        />

        {/* Profit */}

        <SummaryCard
          title="Total Profit"
          value={`+$${totalProfit.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          subtitle="+12.84% overall"
          positive
          icon={<FaArrowUp />}
        />

        {/* Assets */}

        <SummaryCard
          title="Total Assets"
          value={`${holdingsData.length}`}
          subtitle="Cryptocurrencies"
          icon={<FaChartPie />}
        />
      </div>

      {/* =====================================================
          MAIN PORTFOLIO CONTENT
      ===================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[0.8fr_1.2fr]">

        {/* ===================================================
            ASSET ALLOCATION
        =================================================== */}

        <div className="theme-card rounded-2xl border p-5">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                Allocation
              </p>

              <h3 className="mt-1 text-lg font-bold theme-text">
                Asset Allocation
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <FaChartPie />
            </div>
          </div>

          {/* Allocation Circle */}

          <div className="mt-7 flex justify-center">
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#8b5cf6 0% 48%, #3b82f6 48% 61%, #10b981 61% 68%, #f59e0b 68% 74%, #ef4444 74% 77%, #64748b 77% 100%)",
              }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full theme-card">
                <span className="text-[10px] uppercase tracking-wider theme-muted">
                  Portfolio
                </span>

                <span className="mt-1 text-lg font-bold theme-text">
                  100%
                </span>
              </div>
            </div>
          </div>

          {/* Allocation List */}

          <div className="mt-7 space-y-3">
            {holdingsData.map((asset) => (
              <AllocationItem
                key={asset.symbol}
                asset={asset}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            HOLDINGS
        =================================================== */}

        <div className="theme-card rounded-2xl border p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                Holdings
              </p>

              <h3 className="mt-1 text-lg font-bold theme-text">
                Your Assets
              </h3>
            </div>

            {/* Filter */}

            <div className="flex gap-1 overflow-x-auto rounded-xl theme-secondary p-1">
              {[
                "All",
                "BTC",
                "ETH",
                "SOL",
                "BNB",
                "XRP",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSelectedAsset(item)
                  }
                  className={`shrink-0 rounded-lg px-3 py-2 text-[10px] font-semibold transition ${
                    selectedAsset === item
                      ? "bg-violet-500/10 text-violet-500"
                      : "theme-muted hover:text-violet-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Holdings */}

          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b theme-border">
                  <th className="px-3 py-3 text-left text-[10px] uppercase tracking-wider theme-muted">
                    Asset
                  </th>

                  <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider theme-muted">
                    Amount
                  </th>

                  <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider theme-muted">
                    Price
                  </th>

                  <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider theme-muted">
                    Value
                  </th>

                  <th className="px-3 py-3 text-right text-[10px] uppercase tracking-wider theme-muted">
                    24h
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredHoldings.map((asset) => (
                  <HoldingRow
                    key={asset.symbol}
                    asset={asset}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Holdings */}

          <div className="mt-5 space-y-3 md:hidden">
            {filteredHoldings.map((asset) => (
              <MobileHolding
                key={asset.symbol}
                asset={asset}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  subtitle,
  positive,
  icon,
}) {
  return (
    <div className="theme-card rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs theme-muted">
            {title}
          </p>

          <p className="mt-2 text-xl font-bold theme-text">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
          {icon}
        </div>

      </div>

      <p
        className={`mt-3 text-[10px] font-semibold ${
          positive
            ? "text-emerald-500"
            : "theme-muted"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* =====================================================
   ALLOCATION ITEM
===================================================== */

function AllocationItem({ asset }) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`h-2.5 w-2.5 rounded-full ${
          asset.symbol === "BTC"
            ? "bg-violet-500"
            : asset.symbol === "ETH"
              ? "bg-blue-500"
              : asset.symbol === "SOL"
                ? "bg-emerald-500"
                : asset.symbol === "BNB"
                  ? "bg-yellow-500"
                  : "bg-red-500"
        }`}
      />

      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <span className="text-xs font-medium theme-text">
            {asset.name}
          </span>

          <span className="text-xs font-semibold theme-text">
            {asset.allocation}%
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{
              width: `${asset.allocation}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   DESKTOP HOLDING ROW
===================================================== */

function HoldingRow({ asset }) {
  const positive = asset.change >= 0;

  return (
    <tr className="theme-row border-b last:border-b-0">

      <td className="px-3 py-4">
        <div className="flex items-center gap-3">
          <CryptoIcon
            symbol={asset.symbol}
          />

          <div>
            <p className="text-sm font-semibold theme-text">
              {asset.name}
            </p>

            <p className="mt-0.5 text-xs theme-muted">
              {asset.symbol}
            </p>
          </div>
        </div>
      </td>

      <td className="px-3 py-4 text-right">
        <span className="text-xs font-medium theme-text">
          {asset.amount}
        </span>
      </td>

      <td className="px-3 py-4 text-right">
        <span className="text-xs theme-muted">
          $
          {asset.price.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </span>
      </td>

      <td className="px-3 py-4 text-right">
        <span className="text-xs font-semibold theme-text">
          $
          {asset.value.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </span>
      </td>

      <td className="px-3 py-4 text-right">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            positive
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          {positive ? (
            <FaArrowUp className="text-[7px]" />
          ) : (
            <FaArrowDown className="text-[7px]" />
          )}

          {positive ? "+" : ""}
          {asset.change.toFixed(2)}%
        </span>
      </td>
    </tr>
  );
}

/* =====================================================
   MOBILE HOLDING
===================================================== */

function MobileHolding({ asset }) {
  const positive = asset.change >= 0;

  return (
    <div className="theme-secondary rounded-xl p-3">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <CryptoIcon
            symbol={asset.symbol}
          />

          <div>
            <p className="text-sm font-semibold theme-text">
              {asset.name}
            </p>

            <p className="text-xs theme-muted">
              {asset.amount} {asset.symbol}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold theme-text">
            $
            {asset.value.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>

          <p
            className={`mt-1 text-[10px] font-semibold ${
              positive
                ? "text-emerald-500"
                : "text-red-500"
            }`}
          >
            {positive ? "+" : ""}
            {asset.change.toFixed(2)}%
          </p>
        </div>

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

export default Portfolio;