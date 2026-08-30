import { IconBasket, IconBean, IconSearch, IconX } from "./icons";
import { faNum } from "../lib/format";

const TICKER_ITEMS = [
  "بیکری تازهٔ هر روز",
  "قهوهٔ تخصصی تازه‌برشت",
  "شیر بدون لاکتوز",
  "موکتل و ماچا بار",
  "۷۰ آیتم خوشمزه",
  "ارسال سریع در تهران",
  "بسته‌بندی مخصوص بیرون‌بر",
];

export function Ticker() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER_ITEMS.map((t, i) => (
        <span key={i} className="flex items-center gap-2.5 pe-2.5 text-[13px] font-medium text-cream-100/90">
          <span>{t}</span>
          <IconBean className="h-3.5 w-3.5 text-brand-500" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b-2 border-cocoa-900 bg-cocoa-950 py-2">
      <div className="flex w-max animate-ticker">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function SearchBox({ query, onQuery, id }: { query: string; onQuery: (v: string) => void; id: string }) {
  return (
    <div className="relative w-full">
      <IconSearch className="pointer-events-none absolute start-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-cocoa-500" />
      <input
        id={id}
        type="text"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="جست‌وجوی منو… مثلاً «لاته» یا «نوتلا»"
        className="h-11 w-full rounded-full border-2 border-cocoa-900 bg-cream-50 ps-10 pe-9 text-sm font-medium text-cocoa-900 shadow-menu-xs outline-none transition-all placeholder:text-cocoa-300 focus:border-brand-600 focus:bg-cream-50 focus:shadow-[3px_3px_0_0_#e25a0b]"
      />
      {query && (
        <button
          onClick={() => onQuery("")}
          aria-label="پاک کردن جست‌وجو"
          className="absolute end-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-cocoa-900/20 text-cocoa-500 transition hover:bg-brand-50 hover:text-brand-700"
        >
          <IconX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function HeaderBar({
  query,
  onQuery,
  cartCount,
  badgeKey,
  onCartOpen,
}: {
  query: string;
  onQuery: (v: string) => void;
  cartCount: number;
  badgeKey: number;
  onCartOpen: () => void;
}) {
  return (
    <header className="border-b-2 border-cocoa-900 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-3 md:h-[72px] md:gap-5">
          {/* brand */}
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="تین کافی و بیکری">
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-cocoa-900 bg-brand-600 shadow-menu-xs transition-transform hover:-rotate-6">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-cream-50" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
                <path d="M6 9.5h9v5a4.5 4.5 0 0 1-9 0z" fill="currentColor" stroke="none" />
                <path d="M15 10.5h1.7a2.2 2.2 0 0 1 0 4.4H15" />
                <path d="M8.3 4.5c-.8 1 .8 1.6 0 2.7M11.5 4.5c-.8 1 .8 1.6 0 2.7" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[26px] text-cocoa-900">تین کافی</span>
              <span className="ltr block text-left text-[9px] font-bold tracking-[0.28em] text-cocoa-500">
                TIN COFFEE &amp; BAKERY
              </span>
            </span>
          </a>

          {/* desktop search */}
          <div className="hidden max-w-xl flex-1 md:block">
            <SearchBox query={query} onQuery={onQuery} id="search-desktop" />
          </div>

          <div className="ms-auto flex items-center gap-2.5">
            {/* open-now pill */}
            <span className="hidden items-center gap-2 rounded-full border-2 border-cocoa-900/15 bg-cream-100 px-3 py-1.5 text-xs font-bold text-cocoa-700 lg:flex">
              <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse-dot" />
              باز تا ۲۳:۰۰
            </span>

            {/* cart */}
            <button
              onClick={onCartOpen}
              className="relative flex h-11 items-center gap-2 rounded-full border-2 border-cocoa-900 bg-brand-600 px-3.5 text-sm font-extrabold text-cream-50 shadow-menu-xs transition-all hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 active:shadow-none md:px-4"
              aria-label={`سبد خرید، ${faNum(cartCount)} آیتم`}
            >
              <IconBasket className="h-5 w-5" />
              <span className="hidden sm:inline">سبد خرید</span>
              <span
                key={badgeKey}
                className={`absolute -start-1.5 -top-1.5 grid h-6 min-w-6 animate-pop place-items-center rounded-full border-2 border-cream-50 bg-cocoa-900 px-1 text-[11px] font-black text-cream-50 ${
                  cartCount === 0 ? "hidden" : ""
                }`}
              >
                {faNum(cartCount)}
              </span>
            </button>
          </div>
        </div>

        {/* mobile search */}
        <div className="pb-3 md:hidden">
          <SearchBox query={query} onQuery={onQuery} id="search-mobile" />
        </div>
      </div>
    </header>
  );
}
