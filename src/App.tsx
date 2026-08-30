import { useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  basePrice,
  type CartLine,
  type CatId,
  type Product,
} from "./data/menu";
import { lineKey, resolveLines } from "./lib/cart";
import { faNum, normalize } from "./lib/format";
import CartDrawer from "./components/CartDrawer";
import CategoryRail from "./components/CategoryRail";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { HeaderBar, Ticker } from "./components/Header";
import Masthead from "./components/Masthead";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import Reveal from "./components/Reveal";
import { IconBasket, IconCheck, IconSearch, IconX } from "./components/icons";

type SortKey = "featured" | "cheap" | "expensive" | "popular";

const CART_STORAGE = "tin-cart-v1";

const loadCart = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed.filter((l) => l && l.id && l.qty > 0) : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CatId | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [cart, setCart] = useState<CartLine[]>(loadCart);
  const [detail, setDetail] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);
  const [badgeKey, setBadgeKey] = useState(0);

  /* persist cart */
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart]);

  /* body scroll lock */
  useEffect(() => {
    const lock = detail !== null || cartOpen || checkoutOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [detail, cartOpen, checkoutOpen]);

  /* toast timer */
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = (msg: string) => setToast({ id: Date.now(), msg });

  /* ── cart ops ── */
  const addToCart = (p: Product, opt: number | null, qty = 1) => {
    const key = lineKey(p.id, opt);
    setCart((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(20, l.qty + qty) } : l));
      return [...prev, { key, id: p.id, opt, qty }];
    });
    setBadgeKey((k) => k + 1);
    showToast(`«${p.fa}» به سبد اضافه شد`);
  };

  const setQty = (key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(20, qty) } : l))
    );
    if (qty <= 0) setBadgeKey((k) => k + 1);
  };

  const removeLine = (key: string) => {
    setCart((prev) => prev.filter((l) => l.key !== key));
    setBadgeKey((k) => k + 1);
  };

  const clearCart = () => {
    setCart([]);
    setBadgeKey((k) => k + 1);
  };

  /* ── derived ── */
  const lines = useMemo(() => resolveLines(cart), [cart]);
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const qtyById = useMemo(() => {
    const m = new Map<string, number>();
    cart.forEach((l) => m.set(l.id, (m.get(l.id) ?? 0) + l.qty));
    return m;
  }, [cart]);

  const visible = useMemo(() => {
    let list = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
    const q = normalize(query);
    if (q) {
      list = list.filter((p) =>
        normalize(`${p.fa} ${p.en} ${(p.ing ?? []).join(" ")} ${p.desc}`).includes(q)
      );
    }
    const bySort: Record<SortKey, (a: Product, b: Product) => number> = {
      featured: () => 0,
      cheap: (a, b) => basePrice(a) - basePrice(b),
      expensive: (a, b) => basePrice(b) - basePrice(a),
      popular: (a, b) => Number(b.popular ?? false) - Number(a.popular ?? false),
    };
    return [...list].sort(bySort[sort]);
  }, [query, cat, sort]);

  const activeCat = CATEGORIES.find((c) => c.id === cat);
  const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);

  const scrollToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div id="top" className="min-h-screen">
      <Ticker />

      <div className="sticky top-0 z-40">
        <HeaderBar
          query={query}
          onQuery={setQuery}
          cartCount={cartCount}
          badgeKey={badgeKey}
          onCartOpen={() => setCartOpen(true)}
        />
        <CategoryRail cat={cat} onCat={setCat} />
      </div>

      <main>
        <Masthead onBrowse={scrollToMenu} />

        {/* ── menu section ── */}
        <section id="menu" className="mx-auto max-w-7xl scroll-mt-48 px-4 pt-8 md:scroll-mt-36">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-wide text-brand-700">
                  {activeCat ? activeCat.en.toUpperCase() : "FULL MENU"}
                </p>
                <h2 className="mt-1 font-display text-4xl leading-tight text-cocoa-900 sm:text-5xl">
                  {activeCat ? activeCat.fa : "منوی تین"}
                </h2>
                <p className="mt-1 text-sm font-bold text-cocoa-500">
                  {faNum(visible.length)} آیتم
                  {query && (
                    <>
                      {" "}برای «<span className="text-brand-700">{query}</span>»
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-xs font-black text-cocoa-700">
                  مرتب‌سازی:
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="cursor-pointer rounded-full border-2 border-cocoa-900 bg-cream-50 px-4 py-2 text-xs font-extrabold text-cocoa-900 shadow-menu-xs outline-none transition-colors hover:bg-brand-50 focus:border-brand-600"
                >
                  <option value="featured">پیش‌فرض منو</option>
                  <option value="popular">محبوب‌ها اول</option>
                  <option value="cheap">ارزان‌ترین</option>
                  <option value="expensive">گران‌ترین</option>
                </select>
              </div>
            </div>
          </Reveal>

          {visible.length === 0 ? (
            <div className="grid place-items-center py-20 text-center">
              <div>
                <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full border-2 border-dashed border-cocoa-300 text-cocoa-300">
                  <IconSearch className="h-12 w-12" />
                </div>
                <p className="font-display text-3xl text-cocoa-900">چیزی پیدا نشد!</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-cocoa-500">
                  املای دیگری را امتحان کنید یا فیلترها را پاک کنید — مثلاً «لاته»، «شیک» یا «نوتلا».
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCat("all");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-brand-600 px-6 py-2.5 font-display text-lg text-cream-50 shadow-menu-xs transition-all hover:-translate-y-0.5 hover:bg-brand-500"
                >
                  <IconX className="h-4 w-4" />
                  پاک کردن فیلترها
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-7 grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 70} className="h-full">
                  <ProductCard
                    product={p}
                    inCartQty={qtyById.get(p.id) ?? 0}
                    onOpen={setDetail}
                    onQuickAdd={(pr) => addToCart(pr, null, 1)}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* floating mobile cart bar */}
      {cartCount > 0 && !cartOpen && !checkoutOpen && (
        <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="flex w-full animate-rise items-center justify-between rounded-full border-2 border-cocoa-900 bg-brand-600 px-5 py-3.5 font-display text-lg text-cream-50 shadow-menu transition-transform active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <IconBasket className="h-5 w-5" />
              {faNum(cartCount)} آیتم در سبد
            </span>
            <span>{faNum(subtotal.toLocaleString("en-US"))} هزار تومان</span>
          </button>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div key={toast.id} className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 md:bottom-8">
          <div className="flex animate-rise items-center gap-2.5 rounded-full border-2 border-cocoa-900 bg-cocoa-900 px-5 py-3 text-sm font-extrabold text-cream-50 shadow-menu">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600">
              <IconCheck className="h-3.5 w-3.5" />
            </span>
            {toast.msg}
          </div>
        </div>
      )}

      {/* overlays */}
      <ProductModal product={detail} onClose={() => setDetail(null)} onAdd={(p, o, q) => { addToCart(p, o, q); setDetail(null); }} />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeLine}
        onClear={clearCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        onClose={() => setCheckoutOpen(false)}
        onPlaced={clearCart}
      />
    </div>
  );
}
