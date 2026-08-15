import { useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaChevronDown,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

function TradingPanel() {
  const [tradeType, setTradeType] = useState("Buy");
  const [orderType, setOrderType] = useState("Market");
  const [price, setPrice] = useState("104582.42");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const total = useMemo(() => {
    const numericPrice = Number(price) || 0;
    const numericAmount = Number(amount) || 0;

    return numericPrice * numericAmount;
  }, [price, amount]);

  const handleAmountChange = (event) => {
    const value = event.target.value;

    if (Number(value) < 0) {
      return;
    }

    setAmount(value);
    setMessage("");
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;

    if (Number(value) < 0) {
      return;
    }

    setPrice(value);
    setMessage("");
  };

  const handleSubmit = () => {
    const numericAmount = Number(amount);
    const numericPrice = Number(price);

    if (!numericAmount || numericAmount <= 0) {
      setMessage("Please enter a valid BTC amount.");
      return;
    }

    if (!numericPrice || numericPrice <= 0) {
      setMessage("Please enter a valid price.");
      return;
    }

    setMessage(
      `${tradeType} order placed successfully for ${numericAmount} BTC.`
    );
  };

  return (
    <div className="theme-card min-w-0 rounded-2xl border p-4 sm:p-5">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
              Trade
            </p>

            <h2 className="mt-1 text-lg font-bold theme-text">
              BTC / USDT
            </h2>
          </div>

          <div className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500">
            Live
          </div>
        </div>

        {/* Current Price */}

        <div className="theme-secondary mt-4 flex items-center justify-between rounded-xl px-3 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider theme-muted">
              Current Price
            </p>

            <p className="mt-1 text-lg font-bold theme-text">
              $104,582.42
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
            <FaArrowUp className="text-[8px]" />
            2.84%
          </div>
        </div>
      </div>

      {/* =====================================================
          BUY / SELL
      ===================================================== */}

      <div className="theme-secondary mb-5 grid grid-cols-2 rounded-xl p-1">
        <button
          type="button"
          onClick={() => {
            setTradeType("Buy");
            setMessage("");
          }}
          className={`rounded-lg py-2.5 text-sm font-semibold transition ${
            tradeType === "Buy"
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/10"
              : "theme-muted hover:text-violet-500"
          }`}
        >
          Buy
        </button>

        <button
          type="button"
          onClick={() => {
            setTradeType("Sell");
            setMessage("");
          }}
          className={`rounded-lg py-2.5 text-sm font-semibold transition ${
            tradeType === "Sell"
              ? "bg-red-500 text-white shadow-lg shadow-red-500/10"
              : "theme-muted hover:text-red-500"
          }`}
        >
          Sell
        </button>
      </div>

      {/* =====================================================
          ORDER TYPE
      ===================================================== */}

      <div className="mb-5">
        <label className="mb-2 block text-xs font-medium theme-muted">
          Order Type
        </label>

        <div className="relative">
          <select
            value={orderType}
            onChange={(event) =>
              setOrderType(event.target.value)
            }
            className="theme-input w-full appearance-none rounded-xl border px-3 py-3 pr-10 text-sm outline-none transition focus:border-violet-500/50"
          >
            <option>Market</option>
            <option>Limit</option>
            <option>Stop Limit</option>
          </select>

          <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500" />
        </div>
      </div>

      {/* =====================================================
          PRICE
      ===================================================== */}

      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium theme-muted">
          Price
        </label>

        <div className="theme-input flex items-center rounded-xl border px-3 transition focus-within:border-violet-500/50">
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="w-full bg-transparent py-3 text-sm outline-none theme-text"
            placeholder="Enter price"
            min="0"
          />

          <span className="text-xs font-medium text-slate-500">
            USDT
          </span>
        </div>
      </div>

      {/* =====================================================
          AMOUNT
      ===================================================== */}

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium theme-muted">
            Amount
          </label>

          <span className="text-[10px] theme-muted">
            Available: 0.245 BTC
          </span>
        </div>

        <div className="theme-input flex items-center rounded-xl border px-3 transition focus-within:border-violet-500/50">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full bg-transparent py-3 text-sm outline-none theme-text"
            placeholder="0.00"
            min="0"
            step="0.0001"
          />

          <span className="text-xs font-medium text-slate-500">
            BTC
          </span>
        </div>
      </div>

      {/* =====================================================
          TOTAL
      ===================================================== */}

      <div className="mb-5 flex items-center justify-between border-t theme-border pt-4">
        <span className="text-xs font-medium theme-muted">
          Total
        </span>

        <span className="text-sm font-bold theme-text">
          $
          {total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {message && (
        <div
          className={`mb-4 flex items-start gap-2 rounded-xl border p-3 text-xs ${
            message.includes("successfully")
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
              : "border-red-500/20 bg-red-500/10 text-red-500"
          }`}
        >
          {message.includes("successfully") && (
            <FaCheckCircle className="mt-0.5 shrink-0" />
          )}

          <span>{message}</span>
        </div>
      )}

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <button
        type="button"
        onClick={handleSubmit}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 ${
          tradeType === "Buy"
            ? "bg-emerald-500 hover:bg-emerald-400"
            : "bg-red-500 hover:bg-red-400"
        }`}
      >
        {tradeType === "Buy" ? (
          <FaArrowUp className="text-xs" />
        ) : (
          <FaArrowDown className="text-xs" />
        )}

        {tradeType} BTC
      </button>

      {/* =====================================================
          SECURITY
      ===================================================== */}

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] theme-muted">
        <FaLock className="text-[8px]" />

        Secure simulated trading environment
      </div>
    </div>
  );
}

export default TradingPanel;