import { useEffect, useState } from "react";
import { CATEGORIES, CAT_IMG, type Product } from "../data/menu";
import { faNum } from "../lib/format";
import { IconBasket, IconLeaf, IconMinus, IconPlus, IconSparkle, IconStar, IconX } from "./icons";

export default function ProductModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, opt: number | null, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);
  const [opt, setOpt] = useState(0);

  useEffect(() => {
    setQty(1);
    setOpt(0);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;
  const p = product;
  const cat = CATEGORIES.find((c) => c.id === p.cat);
  const unit = p.options ? p.options[opt].price : p.price ?? 0;
  const total = unit * qty;
  const diet = p.fa.includes("رژیمی");

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={p.fa}>
      <div className="absolute inset-0 animate-fade bg-cocoa-950/70" onClick={onClose} />

      <div className="relative grid max-h-[94vh] w-full animate-rise grid-rows-[220px_1fr] overflow-hidden rounded-t-2xl border-2 border-cocoa-900 bg-cream-50 shadow-menu sm:max-w-3xl sm:grid-cols-2 sm:grid-rows-1 sm:rounded-xl">
        <button
          onClick={onClose}
          aria-label="بستن"
          className="absolute end-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-cocoa-900 bg-cream-50 text-cocoa-900 shadow-menu-xs transition-all hover:rotate-90 hover:bg-brand-600 hover:text-cream-50"
        >
          <IconX className="h-5 w-5" />
        </button>

        {/* image */}
        <div className="relative overflow-hidden border-b-2 border-cocoa-900 bg-cream-200 sm:border-b-0 sm:border-e-2">
          <img src={CAT_IMG[p.cat]} alt={p.fa} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 start-3 rounded-full border-2 border-cocoa-900 bg-cream-50 px-3 py-1 text-xs font-extrabold text-cocoa-900 shadow-menu-xs">
            {cat?.fa}
          </span>
        </div>

        {/* content */}
        <div className="nice-scroll flex flex-col gap-4 overflow-y-auto p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              {p.popular && (
                <span className="flex items-center gap-1 rounded-full bg-cocoa-900 px-2 py-0.5 text-[10px] font-bold text-cream-50">
                  <IconStar className="h-2.5 w-2.5 text-brand-500" /> محبوب
                </span>
              )}
              {p.fresh && (
                <span className="flex items-center gap-1 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-cream-50">
                  <IconSparkle className="h-2.5 w-2.5" /> جدید
                </span>
              )}
              {diet && (
                <span className="flex items-center gap-1 rounded-full bg-leaf-100 px-2 py-0.5 text-[10px] font-bold text-leaf-700">
                  <IconLeaf className="h-2.5 w-2.5" /> رژیمی
                </span>
              )}
            </div>
            <h2 className="mt-2 font-display text-3xl leading-tight text-cocoa-900 sm:text-4xl">{p.fa}</h2>
            <p className="ltr mt-0.5 text-left text-[10px] font-bold uppercase tracking-[0.22em] text-cocoa-300 sm:text-right">
              {p.en}
            </p>
          </div>

          <p className="text-sm leading-7 text-cocoa-700">{p.desc}</p>

          {p.ing && (
            <div>
              <p className="mb-2 text-xs font-black text-cocoa-900">مواد تشکیل‌دهنده</p>
              <div className="flex flex-wrap gap-1.5">
                {p.ing.map((i) => (
                  <span key={i} className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          )}

          {p.options && (
            <div>
              <p className="mb-2 text-xs font-black text-cocoa-900">نسبت شیر و قهوه را انتخاب کنید</p>
              <div className="grid grid-cols-2 gap-2">
                {p.options.map((o, i) => (
                  <button
                    key={o.label}
                    onClick={() => setOpt(i)}
                    className={`rounded-lg border-2 p-2.5 text-center transition-all ${
                      opt === i
                        ? "border-cocoa-900 bg-brand-600 text-cream-50 shadow-menu-xs"
                        : "border-cocoa-900/20 bg-cream-50 text-cocoa-700 hover:border-cocoa-900"
                    }`}
                  >
                    <span className="block text-sm font-extrabold">{o.label}</span>
                    <span className={`block text-xs font-bold ${opt === i ? "text-cream-50/85" : "text-brand-700"}`}>
                      {faNum(o.price)} هزار تومان
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 border-t-2 border-dashed border-cocoa-900/20 pt-4">
            {/* qty stepper */}
            <div className="flex items-center rounded-full border-2 border-cocoa-900 bg-cream-50">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="کاهش تعداد"
                className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-brand-50 disabled:opacity-25"
              >
                <IconMinus className="h-4 w-4" />
              </button>
              <span className="w-9 text-center font-display text-xl">{faNum(qty)}</span>
              <button
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="افزایش تعداد"
                className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-brand-50"
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="text-left">
              <p className="text-[11px] font-bold text-cocoa-500">مبلغ کل</p>
              <p className="font-display text-2xl leading-7 text-brand-600">
                {faNum(total.toLocaleString("en-US"))}
                <span className="text-xs text-cocoa-700"> هزار تومان</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onAdd(p, p.options ? opt : null, qty)}
            className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full border-2 border-cocoa-900 bg-brand-600 py-3.5 font-display text-xl text-cream-50 shadow-menu-sm transition-all hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 active:shadow-none"
          >
            <IconBasket className="h-5 w-5" />
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
