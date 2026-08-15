import { useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const sellOrders = [
  { price: 104720.45, amount: 0.0184 },
  { price: 104685.32, amount: 0.0261 },
  { price: 104642.18, amount: 0.0147 },
  { price: 104615.72, amount: 0.0325 },
  { price: 104598.91, amount: 0.0218 },
];

const buyOrders = [
  { price: 104560.24, amount: 0.0246 },
  { price: 104524.18, amount: 0.0182 },
  { price: 104487.65, amount: 0.0314 },
  { price: 104452.21, amount: 0.0168 },
  { price: 104418.76, amount: 0.0275 },
];

const currentPrice = 104582.42;

function OrderBook() {
  const [activeSide, setActiveSide] = useState("both");

  const visibleSellOrders = useMemo(() => {
    return activeSide === "buy" ? [] : sellOrders;
  }, [activeSide]);

  const visibleBuyOrders = useMemo(() => {
    return activeSide === "sell" ? [] : buyOrders;
  }, [activeSide]);

  const calculateTotal = (price, amount) => {
    return price * amount;
  };

  return (
    <div className="theme-card w-full min-w-0 rounded-2xl border p-4 sm:p-5">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
            Market Depth
          </p>

          <h2 className="mt-1 text-lg font-bold theme-text">
            Order Book
          </h2>
        </div>

        <div className="rounded-lg bg-violet-500/10 px-2 py-1 text-[10px] font-semibold text-violet-400">
          BTC / USDT
        </div>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="theme-secondary mb-4 grid grid-cols-3 rounded-xl p-1">
        <button
          type="button"
          onClick={() => setActiveSide("both")}
          className={`rounded-lg py-2 text-xs font-semibold transition ${
            activeSide === "both"
              ? "bg-violet-500/10 text-violet-500"
              : "theme-muted hover:text-violet-500"
          }`}
        >
          Both
        </button>

        <button
          type="button"
          onClick={() => setActiveSide("buy")}
          className={`rounded-lg py-2 text-xs font-semibold transition ${
            activeSide === "buy"
              ? "bg-emerald-500/10 text-emerald-500"
              : "theme-muted hover:text-emerald-500"
          }`}
        >
          Buys
        </button>

        <button
          type="button"
          onClick={() => setActiveSide("sell")}
          className={`rounded-lg py-2 text-xs font-semibold transition ${
            activeSide === "sell"
              ? "bg-red-500/10 text-red-500"
              : "theme-muted hover:text-red-500"
          }`}
        >
          Sells
        </button>
      </div>

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="grid grid-cols-3 px-2 py-2 text-[10px] font-semibold uppercase tracking-wider theme-muted">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      {/* =====================================================
          SELL ORDERS
      ===================================================== */}

      {visibleSellOrders.length > 0 && (
        <div className="space-y-0.5">
          {visibleSellOrders.map((order, index) => (
            <OrderRow
              key={`sell-${index}`}
              order={order}
              type="sell"
              calculateTotal={calculateTotal}
            />
          ))}
        </div>
      )}

      {/* =====================================================
          CURRENT PRICE
      ===================================================== */}

      {activeSide === "both" && (
        <div className="my-3 flex items-center justify-between rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/10">
              <FaArrowUp className="text-[9px] text-violet-400" />
            </span>

            <span className="text-[10px] font-medium theme-muted">
              Market Price
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-violet-500">
              $
              {currentPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            <p className="text-[9px] text-emerald-500">
              +2.84%
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          BUY ORDERS
      ===================================================== */}

      {visibleBuyOrders.length > 0 && (
        <div className="space-y-0.5">
          {visibleBuyOrders.map((order, index) => (
            <OrderRow
              key={`buy-${index}`}
              order={order}
              type="buy"
              calculateTotal={calculateTotal}
            />
          ))}
        </div>
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-4 flex items-center justify-between border-t theme-border pt-3">
        <span className="text-[10px] theme-muted">
          Spread
        </span>

        <span className="text-[10px] font-semibold theme-text">
          $22.18
        </span>
      </div>
    </div>
  );
}

/* =====================================================
   ORDER ROW
===================================================== */

function OrderRow({
  order,
  type,
  calculateTotal,
}) {
  const total = calculateTotal(
    order.price,
    order.amount
  );

  const isSell = type === "sell";

  return (
    <div
      className={`theme-row relative grid grid-cols-3 items-center rounded-lg border border-transparent px-2 py-2 transition ${
        isSell
          ? "hover:bg-red-500/5"
          : "hover:bg-emerald-500/5"
      }`}
    >
      <span
        className={`text-xs font-medium ${
          isSell
            ? "text-red-500"
            : "text-emerald-500"
        }`}
      >
        $
        {order.price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>

      <span className="text-right text-xs theme-muted">
        {order.amount.toFixed(4)}
      </span>

      <span className="text-right text-xs theme-muted">
        $
        {total.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </div>
  );
}

export default OrderBook;