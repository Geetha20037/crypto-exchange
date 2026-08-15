import { useMemo, useState } from "react";
import {
  FaArrowUp,
  FaChartLine,
} from "react-icons/fa";

const chartData = {
  "1H": [
    103850,
    104120,
    103980,
    104420,
    104180,
    104760,
    104520,
    104920,
    104680,
    105120,
    104880,
    104582,
  ],

  "1D": [
    101850,
    102420,
    101980,
    103120,
    102780,
    103850,
    103420,
    104280,
    103920,
    104760,
    104320,
    105180,
    104582,
  ],

  "1W": [
    98250,
    99540,
    97820,
    101240,
    100180,
    102450,
    101860,
    103720,
    102980,
    104250,
    103840,
    105120,
    104582,
  ],

  "1M": [
    92450,
    94120,
    93280,
    96540,
    97820,
    95480,
    99250,
    101240,
    99840,
    102620,
    103480,
    104820,
    104582,
  ],
};

const periods = ["1H", "1D", "1W", "1M"];

function PriceChart() {
  const [period, setPeriod] = useState("1D");

  const prices = chartData[period];

  const chart = useMemo(() => {
    const width = 900;
    const height = 300;
    const paddingX = 10;
    const paddingY = 20;

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const range = max - min || 1;

    const points = prices.map((price, index) => {
      const x =
        paddingX +
        (index / (prices.length - 1)) *
          (width - paddingX * 2);

      const y =
        height -
        paddingY -
        ((price - min) / range) *
          (height - paddingY * 2);

      return {
        x,
        y,
        price,
      };
    });

    const linePath = points
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
      )
      .join(" ");

    const areaPath = `
      ${linePath}
      L ${points[points.length - 1].x} ${height}
      L ${points[0].x} ${height}
      Z
    `;

    return {
      points,
      linePath,
      areaPath,
      min,
      max,
    };
  }, [prices]);

  const firstPrice = prices[0];
  const currentPrice = prices[prices.length - 1];

  const percentageChange =
    ((currentPrice - firstPrice) / firstPrice) * 100;

  const positive = percentageChange >= 0;

  return (
    <div
      id="markets"
      className="theme-card w-full min-w-0 rounded-2xl border p-4 sm:p-5"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <FaChartLine />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                Market Chart
              </p>

              <h2 className="mt-1 text-lg font-bold theme-text">
                BTC / USDT
              </h2>
            </div>
          </div>
        </div>

        {/* Time Period */}

        <div className="flex items-center gap-1 rounded-xl theme-secondary p-1">
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={`rounded-lg px-3 py-2 text-[10px] font-semibold transition ${
                period === item
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/10"
                  : "theme-muted hover:text-violet-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================
          PRICE
      ===================================================== */}

      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <div>
          <p className="text-2xl font-bold tracking-tight theme-text sm:text-3xl">
            $
            {currentPrice.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div
          className={`mb-1 flex items-center gap-1 text-xs font-semibold ${
            positive
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          <FaArrowUp className="text-[8px]" />

          {positive ? "+" : ""}
          {percentageChange.toFixed(2)}%
        </div>

        <span className="mb-1 text-[10px] theme-muted">
          {period} performance
        </span>
      </div>

      {/* =====================================================
          CHART
      ===================================================== */}

      <div className="relative mt-5 h-[260px] w-full overflow-hidden rounded-xl theme-secondary sm:h-[320px]">
        {/* Grid Lines */}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                key={index}
                className="border-t border-dashed theme-border"
              />
            )
          )}
        </div>

        {/* SVG */}

        <svg
          viewBox="0 0 900 300"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="chartAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#8b5cf6"
                stopOpacity="0.25"
              />

              <stop
                offset="100%"
                stopColor="#8b5cf6"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Area */}

          <path
            d={chart.areaPath}
            fill="url(#chartAreaGradient)"
          />

          {/* Line */}

          <path
            d={chart.linePath}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current Point */}

          <circle
            cx={
              chart.points[
                chart.points.length - 1
              ].x
            }
            cy={
              chart.points[
                chart.points.length - 1
              ].y
            }
            r="7"
            fill="#8b5cf6"
            stroke="white"
            strokeWidth="3"
          />
        </svg>

        {/* Current Price Label */}

        <div className="absolute right-3 top-3 rounded-lg border border-violet-500/20 bg-violet-500/10 px-2 py-1">
          <p className="text-[9px] font-semibold text-violet-500">
            $
            {currentPrice.toLocaleString(
              "en-US"
            )}
          </p>
        </div>

        {/* Min / Max */}

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-between">
          <span className="rounded bg-black/10 px-1.5 py-1 text-[9px] theme-muted">
            $
            {chart.min.toLocaleString(
              "en-US"
            )}
          </span>

          <span className="rounded bg-black/10 px-1.5 py-1 text-[9px] theme-muted">
            $
            {chart.max.toLocaleString(
              "en-US"
            )}
          </span>
        </div>
      </div>

      {/* =====================================================
          FOOTER STATS
      ===================================================== */}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ChartStat
          label="Open"
          value={firstPrice}
        />

        <ChartStat
          label="High"
          value={chart.max}
        />

        <ChartStat
          label="Low"
          value={chart.min}
        />

        <ChartStat
          label="Current"
          value={currentPrice}
          highlight
        />
      </div>
    </div>
  );
}

/* =====================================================
   STAT
===================================================== */

function ChartStat({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="theme-secondary rounded-xl p-3">
      <p className="text-[9px] uppercase tracking-wider theme-muted">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-bold ${
          highlight
            ? "text-violet-500"
            : "theme-text"
        }`}
      >
        $
        {value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

export default PriceChart;