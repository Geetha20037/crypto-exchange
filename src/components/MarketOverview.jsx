import { useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaSearch,
  FaStar,
} from "react-icons/fa";

const marketData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 104582.42,
    change: 2.84,
    marketCap: "2.08T",
    volume: "48.62B",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3824.67,
    change: 4.21,
    marketCap: "460.12B",
    volume: "22.84B",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 184.35,
    change: 6.72,
    marketCap: "89.54B",
    volume: "6.21B",
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 612.48,
    change: -1.36,
    marketCap: "84.72B",
    volume: "1.94B",
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 2.87,
    change: 3.18,
    marketCap: "171.32B",
    volume: "5.43B",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.84,
    change: -0.92,
    marketCap: "29.61B",
    volume: "892.42M",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.24,
    change: 1.64,
    marketCap: "36.42B",
    volume: "1.82B",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: 42.18,
    change: 5.32,
    marketCap: "18.04B",
    volume: "728.61M",
  },
];

function MarketOverview() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] =
    useState(false);

  const filteredMarkets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return marketData.filter((coin) => {
      const matchesSearch =
        !query ||
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query);

      const matchesFavorites =
        !showFavorites ||
        favorites.includes(coin.symbol);

      return matchesSearch && matchesFavorites;
    });
  }, [search, showFavorites, favorites]);

  const toggleFavorite = (symbol) => {
    setFavorites((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
    );
  };

  return (
    <section
      id="markets"
      className="w-full scroll-mt-24"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            Market Overview
          </p>

          <h2 className="mt-1 text-xl font-bold theme-text sm:text-2xl">
            Cryptocurrency Markets
          </h2>

          <p className="mt-1 text-sm theme-muted">
            Track the latest prices and market movements.
          </p>
        </div>

        {/* Search */}

        <div className="flex w-full items-center gap-2 rounded-xl border theme-border theme-input px-3 py-2.5 lg:w-72">
          <FaSearch className="shrink-0 text-sm text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search cryptocurrency..."
            className="w-full bg-transparent text-sm outline-none theme-text placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs theme-muted">
          {filteredMarkets.length} assets found
        </p>

        <button
          type="button"
          onClick={() =>
            setShowFavorites((current) => !current)
          }
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
            showFavorites
              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
              : "theme-border theme-muted hover:text-yellow-500"
          }`}
        >
          <FaStar />

          Watchlist

          {favorites.length > 0 && (
            <span className="rounded-md bg-yellow-500/10 px-1.5 py-0.5 text-[9px]">
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      {/* =====================================================
          DESKTOP TABLE
      ===================================================== */}

      <div className="theme-card hidden overflow-hidden rounded-2xl border md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b theme-border">
                <th className="w-12 px-4 py-4"></th>

                <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Asset
                </th>

                <th className="px-4 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Price
                </th>

                <th className="px-4 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  24h Change
                </th>

                <th className="px-4 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Market Cap
                </th>

                <th className="px-4 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Volume
                </th>

                <th className="px-4 py-4 text-right text-[10px] font-semibold uppercase tracking-wider theme-muted">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMarkets.map((coin) => (
                <MarketRow
                  key={coin.symbol}
                  coin={coin}
                  favorite={favorites.includes(
                    coin.symbol
                  )}
                  onFavorite={() =>
                    toggleFavorite(coin.symbol)
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          MOBILE CARDS
      ===================================================== */}

      <div className="space-y-3 md:hidden">
        {filteredMarkets.map((coin) => (
          <MobileMarketCard
            key={coin.symbol}
            coin={coin}
            favorite={favorites.includes(
              coin.symbol
            )}
            onFavorite={() =>
              toggleFavorite(coin.symbol)
            }
          />
        ))}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredMarkets.length === 0 && (
        <div className="theme-card rounded-2xl border p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
            <FaSearch />
          </div>

          <h3 className="mt-4 text-sm font-bold theme-text">
            No cryptocurrency found
          </h3>

          <p className="mt-1 text-xs theme-muted">
            Try searching with another coin name or symbol.
          </p>
        </div>
      )}
    </section>
  );
}

/* =====================================================
   DESKTOP ROW
===================================================== */

function MarketRow({
  coin,
  favorite,
  onFavorite,
}) {
  const positive = coin.change >= 0;

  return (
    <tr className="theme-row border-b last:border-b-0 transition">

      {/* Favorite */}

      <td className="px-4 py-4">
        <button
          type="button"
          onClick={onFavorite}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
            favorite
              ? "bg-yellow-500/10 text-yellow-500"
              : "theme-muted hover:bg-yellow-500/10 hover:text-yellow-500"
          }`}
          aria-label={`Add ${coin.name} to watchlist`}
        >
          <FaStar className="text-xs" />
        </button>
      </td>

      {/* Asset */}

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={coin.symbol} />

          <div>
            <p className="text-sm font-semibold theme-text">
              {coin.name}
            </p>

            <p className="mt-0.5 text-xs theme-muted">
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}

      <td className="px-4 py-4 text-right">
        <span className="text-sm font-semibold theme-text">
          $
          {coin.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </td>

      {/* Change */}

      <td className="px-4 py-4 text-right">
        <ChangeBadge change={coin.change} />
      </td>

      {/* Market Cap */}

      <td className="px-4 py-4 text-right">
        <span className="text-xs theme-muted">
          ${coin.marketCap}
        </span>
      </td>

      {/* Volume */}

      <td className="px-4 py-4 text-right">
        <span className="text-xs theme-muted">
          ${coin.volume}
        </span>
      </td>

      {/* Action */}

      <td className="px-4 py-4 text-right">
        <button
          type="button"
          onClick={() => {
            document
              .getElementById("trade")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
          className="rounded-lg bg-violet-500/10 px-3 py-2 text-[10px] font-semibold text-violet-500 transition hover:bg-violet-500 hover:text-white"
        >
          Trade
        </button>
      </td>
    </tr>
  );
}

/* =====================================================
   MOBILE CARD
===================================================== */

function MobileMarketCard({
  coin,
  favorite,
  onFavorite,
}) {
  return (
    <div className="theme-card rounded-2xl border p-4">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">
          <CryptoIcon symbol={coin.symbol} />

          <div>
            <p className="text-sm font-bold theme-text">
              {coin.name}
            </p>

            <p className="mt-0.5 text-xs theme-muted">
              {coin.symbol}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onFavorite}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
            favorite
              ? "bg-yellow-500/10 text-yellow-500"
              : "theme-muted hover:text-yellow-500"
          }`}
        >
          <FaStar className="text-xs" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">

        <div>
          <p className="text-[10px] uppercase tracking-wider theme-muted">
            Price
          </p>

          <p className="mt-1 text-sm font-bold theme-text">
            $
            {coin.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider theme-muted">
            24h
          </p>

          <div className="mt-1">
            <ChangeBadge change={coin.change} />
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider theme-muted">
            Market Cap
          </p>

          <p className="mt-1 text-xs font-semibold theme-text">
            ${coin.marketCap}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider theme-muted">
            Volume
          </p>

          <p className="mt-1 text-xs font-semibold theme-text">
            ${coin.volume}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          document
            .getElementById("trade")
            ?.scrollIntoView({
              behavior: "smooth",
            });
        }}
        className="mt-4 w-full rounded-xl bg-violet-500/10 py-2.5 text-xs font-semibold text-violet-500 transition hover:bg-violet-500 hover:text-white"
      >
        Trade {coin.symbol}
      </button>
    </div>
  );
}

/* =====================================================
   CHANGE BADGE
===================================================== */

function ChangeBadge({ change }) {
  const positive = change >= 0;

  return (
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
      {change.toFixed(2)}%
    </span>
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
    ADA: "A",
    DOGE: "Ð",
    AVAX: "A",
  };

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
      {letters[symbol] || symbol[0]}
    </div>
  );
}

export default MarketOverview;