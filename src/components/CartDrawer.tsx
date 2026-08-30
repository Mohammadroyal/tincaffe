import { useEffect } from "react";
import { CAT_IMG, FREE_SHIPPING_AT, PACKAGING_FEE } from "../data/menu";
import type { ResolvedLine } from "../lib/cart";
import { faNum, money } from "../lib/format";
import { IconArrow, IconBasket, IconBike, IconCheck, IconMinus, IconPlus, IconTrash, IconX } from "./icons";

export default function CartDrawer({
  open,
  lines,
  onClose,
  onSetQty,
  onRemove,
  onClear,
  onCheckout,
}: {
  open: boolean;
  lines: ResolvedLine[];
  onClose: () => void;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onCheckout: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_AT) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const freeShip = remaining === 0 && subtotal > 0;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-cocoa-950/60 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className={`absolute left-0 top-0 flex h-full w-full max-w-md flex-col border-r-2 border-cocoa-900 bg-cream-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0.24,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="سبد خرید"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b-2 border-cocoa-900 bg-cream-50 px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-2xl text-cocoa-900">
            <IconBasket className="h-6 w-6 text-brand-600" />
            سبد خرید
            {count > 0 && (
              <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-black text-cream-50">
                {faNum(count)} آیتم
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="بستن سبد"
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-cocoa-900 bg-cream-50 transition-all hover:rotate-90 hover:bg-brand-600 hover:text-cream-50"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          /* empty state */
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <div className="mx-auto mb-4 grid h-24 w-24 animate-floaty place-items-center rounded-full border-2 border-dashed border-cocoa-300 text-cocoa-300">
                <IconBasket className="h-11 w-11" />
              </div>
              <p className="font-display text-2xl text-cocoa-900">سبدت خالیه!</p>
              <p className="mt-1 text-sm text-cocoa-500">یه کروسان زبل یا آیس‌لاته کارامل بزن، پشیمون نمی‌شی.</p>
              <button
                onClick={onClose}
                className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-brand-600 px-5 py-2.5 font-display text-lg text-cream-50 shadow-menu-xs transition-all hover:-translate-y-0.5 hover:bg-brand-500"
              >
                بریم سراغ منو
                <IconArrow className="h-4 w-4 rotate-180" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* free shipping */}
            <div className="border-b-2 border-cocoa-900/10 bg-brand-50 px-5 py-3.5">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-cocoa-700">
                  <IconBike className={`h-4.5 w-4.5 ${freeShip ? "text-leaf-700" : "text-brand-600"}`} />
                  {freeShip ? "ارسال رایگان فعال شد!" : "ارسال رایگان برای خرید بالای " + faNum(FREE_SHIPPING_AT) + " هزار"}
                </span>
                {freeShip ? (
                  <IconCheck className="h-4 w-4 text-leaf-700" />
                ) : (
                  <span className="text-brand-700">{faNum(remaining)} هزار مانده</span>
                )}
              </div>
              <div className="h-2.5 overflow-hidden rounded-full border border-cocoa-900/25 bg-cream-50">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${freeShip ? "bg-leaf-700" : "bg-brand-600"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* lines */}
            <div className="nice-scroll flex-1 space-y-3 overflow-y-auto p-4">
              {lines.map((l) => (
                <div key={l.key} className="flex gap-3 rounded-xl border-2 border-cocoa-900 bg-cream-50 p-2.5 shadow-menu-xs">
                  <img src={CAT_IMG[l.product.cat]} alt={l.product.fa} className="h-16 w-16 shrink-0 rounded-lg border-2 border-cocoa-900 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-cocoa-900">{l.product.fa}</p>
                    {l.optLabel && <p className="text-[11px] font-bold text-cocoa-500">{l.optLabel}</p>}
                    <p className="mt-0.5 text-[11px] font-bold text-brand-700">{faNum(l.unit)} هزار / عدد</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border-2 border-cocoa-900">
                        <button
                          onClick={() => onSetQty(l.key, l.qty - 1)}
                          aria-label="کاهش"
                          className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-brand-50"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-black">{faNum(l.qty)}</span>
                        <button
                          onClick={() => onSetQty(l.key, l.qty + 1)}
                          aria-label="افزایش"
                          className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-brand-50"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-display text-lg text-cocoa-900">{money(l.unit * l.qty)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(l.key)}
                    aria-label={`حذف ${l.product.fa}`}
                    className="self-start rounded-full p-1.5 text-cocoa-300 transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button onClick={onClear} className="w-full pt-1 text-center text-xs font-bold text-cocoa-500 underline-offset-4 transition hover:text-brand-700 hover:underline">
                پاک کردن کل سبد
              </button>
            </div>

            {/* summary */}
            <div className="space-y-2 border-t-2 border-cocoa-900 bg-cream-50 p-5">
              <div className="flex justify-between text-sm font-bold text-cocoa-700">
                <span>جمع آیتم‌ها</span>
                <span>{money(subtotal)} هزار تومان</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-cocoa-700">
                <span>هزینهٔ بسته‌بندی</span>
                <span>{faNum(PACKAGING_FEE)} هزار تومان</span>
              </div>
              <p className="text-[11px] leading-5 text-cocoa-500">
                افزودنی‌ها و هزینهٔ ارسال در مرحلهٔ تسویه محاسبه می‌شود.
              </p>
              <button
                onClick={onCheckout}
                className="mt-1 flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-cocoa-900 bg-brand-600 py-3.5 font-display text-xl text-cream-50 shadow-menu-sm transition-all hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 active:shadow-none"
              >
                تسویه‌حساب
                <IconArrow className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
