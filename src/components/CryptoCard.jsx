import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function CryptoCard({ crypto }) {
  const isPositive = crypto.change >= 0;

  return (
    <div className="group min-w-0 rounded-2xl border border-slate-800 bg-[#111827] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-[#151d2d] hover:shadow-xl hover:shadow-black/10 sm:p-5">
      {/* Top */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-lg font-bold text-white transition group-hover:bg-violet-500/10 group-hover:text-violet-400">
            {crypto.icon}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              {crypto.name}
            </h3>

            <p className="text-xs font-medium text-slate-500">
              {crypto.symbol}
            </p>
          </div>
        </div>

        {/* Change */}
        <div
          className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isPositive ? (
            <FaArrowUp className="text-[9px]" />
          ) : (
            <FaArrowDown className="text-[9px]" />
          )}

          {Math.abs(crypto.change).toFixed(2)}%
        </div>
      </div>

      {/* Price */}
      <div className="mt-5">
        <p className="text-xl font-bold tracking-tight text-white">
          $
          {crypto.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            Market Cap
          </p>

          <p className="mt-1 truncate text-xs font-medium text-slate-300">
            ${crypto.marketCap}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            Volume 24h
          </p>

          <p className="mt-1 truncate text-xs font-medium text-slate-300">
            ${crypto.volume}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CryptoCard;