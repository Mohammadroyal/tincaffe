import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { DELIVERY_FEE, FREE_SHIPPING_AT, PACKAGING_FEE } from "../data/menu";
import type { ResolvedLine } from "../lib/cart";
import { faNum, money, toEnDigits } from "../lib/format";
import { IconArrow, IconBag, IconBike, IconCheck, IconNote, IconX } from "./icons";

type Step = "info" | "review" | "done";
type Method = "delivery" | "pickup";
type Payment = "online" | "onsite";

const inputCls = (err?: string) =>
  `w-full rounded-lg border-2 bg-cream-50 px-3.5 py-2.5 text-sm font-medium outline-none transition-colors placeholder:text-cocoa-300 ${
    err ? "border-[#b4342a]" : "border-cocoa-900/25 focus:border-brand-600"
  }`;

export default function CheckoutModal({
  open,
  lines,
  onClose,
  onPlaced,
}: {
  open: boolean;
  lines: ResolvedLine[];
  onClose: () => void;
  onPlaced: () => void;
}) {
  const [step, setStep] = useState<Step>("info");
  const [processing, setProcessing] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [method, setMethod] = useState<Method>("delivery");
  const [payment, setPayment] = useState<Payment>("online");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setStep("info");
      setProcessing(false);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !processing && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, processing, onClose]);

  if (!open) return null;

  const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
  const deliveryFee = method === "delivery" ? (subtotal >= FREE_SHIPPING_AT ? 0 : DELIVERY_FEE) : 0;
  const total = subtotal + PACKAGING_FEE + deliveryFee;

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = "نام و نام خانوادگی را کامل وارد کنید.";
    const p = toEnDigits(phone.trim()).replace(/^(\+98|98)/, "0");
    if (!/^09\d{9}$/.test(p)) e.phone = "شمارهٔ موبایل باید مثل ۰۹۱۲۳۴۵۶۷۸۹ باشد.";
    if (method === "delivery" && address.trim().length < 10) e.address = "آدرس کامل تحویل را بنویسید.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitOrder = () => {
    setProcessing(true);
    window.setTimeout(() => {
      const code = `TIN-${1000 + Math.floor(Math.random() * 9000)}`;
      setOrderCode(code);
      setProcessing(false);
      setStep("done");
      onPlaced();
      confetti({
        particleCount: 140,
        spread: 75,
        origin: { y: 0.65 },
        colors: ["#e25a0b", "#ee6c1a", "#f7eedc", "#8a5a33", "#fdf9ef"],
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="تسویه‌حساب">
      <div className="absolute inset-0 animate-fade bg-cocoa-950/75" onClick={() => !processing && onClose()} />

      <div className="relative flex max-h-[94vh] w-full max-w-xl animate-rise flex-col overflow-hidden rounded-t-2xl border-2 border-cocoa-900 bg-cream-50 shadow-menu sm:rounded-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b-2 border-cocoa-900 bg-cream-100 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl text-cocoa-900">تسویه‌حساب</h2>
            <div className="mt-1 flex items-center gap-2 text-[11px] font-bold">
              <span className={`rounded-full px-2 py-0.5 ${step !== "info" ? "bg-brand-600 text-cream-50" : "bg-cocoa-900 text-cream-50"}`}>
                ۱. اطلاعات
              </span>
              <span className="h-0.5 w-4 bg-cocoa-900/30" />
              <span className={`rounded-full px-2 py-0.5 ${step === "review" ? "bg-brand-600 text-cream-50" : step === "done" ? "bg-leaf-700 text-cream-50" : "bg-cocoa-900/15 text-cocoa-700"}`}>
                ۲. تایید و پرداخت
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={processing}
            aria-label="بستن"
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-cocoa-900 bg-cream-50 transition-all hover:rotate-90 hover:bg-brand-600 hover:text-cream-50 disabled:opacity-40"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="nice-scroll flex-1 overflow-y-auto">
          {step === "info" && (
            <div className="space-y-5 p-5 sm:p-6">
              {/* method */}
              <div>
                <p className="mb-2 text-xs font-black text-cocoa-900">روش دریافت</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setMethod("delivery")}
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      method === "delivery" ? "border-cocoa-900 bg-brand-600 text-cream-50 shadow-menu-xs" : "border-cocoa-900/20 bg-cream-50 text-cocoa-700 hover:border-cocoa-900"
                    }`}
                  >
                    <IconBike className="mx-auto mb-1 h-6 w-6" />
                    <span className="block text-sm font-extrabold">ارسال با پیک</span>
                    <span className={`block text-[11px] font-bold ${method === "delivery" ? "text-cream-50/85" : "text-brand-700"}`}>
                      {faNum(DELIVERY_FEE)} هزار تومان
                    </span>
                  </button>
                  <button
                    onClick={() => setMethod("pickup")}
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      method === "pickup" ? "border-cocoa-900 bg-brand-600 text-cream-50 shadow-menu-xs" : "border-cocoa-900/20 bg-cream-50 text-cocoa-700 hover:border-cocoa-900"
                    }`}
                  >
                    <IconBag className="mx-auto mb-1 h-6 w-6" />
                    <span className="block text-sm font-extrabold">دریافت حضوری</span>
                    <span className={`block text-[11px] font-bold ${method === "pickup" ? "text-cream-50/85" : "text-leaf-700"}`}>رایگان</span>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="co-name" className="mb-1.5 block text-xs font-black text-cocoa-900">نام و نام خانوادگی *</label>
                <input id="co-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً سارا محمدی" className={inputCls(errors.name)} />
                {errors.name && <p className="mt-1 text-[11px] font-bold text-[#b4342a]">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="co-phone" className="mb-1.5 block text-xs font-black text-cocoa-900">شمارهٔ موبایل *</label>
                <input
                  id="co-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  inputMode="tel"
                  className={`${inputCls(errors.phone)} ltr text-left`}
                />
                {errors.phone && <p className="mt-1 text-[11px] font-bold text-[#b4342a]">{errors.phone}</p>}
              </div>

              {method === "delivery" && (
                <div className="animate-rise">
                  <label htmlFor="co-addr" className="mb-1.5 block text-xs font-black text-cocoa-900">آدرس تحویل *</label>
                  <textarea
                    id="co-addr"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    placeholder="خیابان، کوچه، پلاک، واحد…"
                    className={`${inputCls(errors.address)} resize-none leading-6`}
                  />
                  {errors.address && <p className="mt-1 text-[11px] font-bold text-[#b4342a]">{errors.address}</p>}
                </div>
              )}

              <div>
                <label htmlFor="co-note" className="mb-1.5 flex items-center gap-1.5 text-xs font-black text-cocoa-900">
                  <IconNote className="h-4 w-4 text-brand-600" />
                  یادداشت برای باریستا (اختیاری)
                </label>
                <input id="co-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="مثلاً: لاته کم‌شیرین‌تر باشه" className={inputCls()} />
              </div>

              {/* payment */}
              <div>
                <p className="mb-2 text-xs font-black text-cocoa-900">روش پرداخت</p>
                <div className="space-y-2">
                  {(
                    [
                      { id: "online", t: "پرداخت آنلاین", d: "شبیه‌سازی — پولی کسر نمی‌شود" },
                      { id: "onsite", t: "پرداخت در محل", d: "کارت‌خوان هنگام تحویل" },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPayment(p.id)}
                      className={`flex w-full items-center justify-between rounded-lg border-2 px-3.5 py-2.5 text-start transition-all ${
                        payment === p.id ? "border-cocoa-900 bg-brand-50 shadow-menu-xs" : "border-cocoa-900/20 bg-cream-50 hover:border-cocoa-900"
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-extrabold text-cocoa-900">{p.t}</span>
                        <span className="block text-[11px] font-bold text-cocoa-500">{p.d}</span>
                      </span>
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                          payment === p.id ? "border-brand-600 bg-brand-600 text-cream-50" : "border-cocoa-900/30 text-transparent"
                        }`}
                      >
                        <IconCheck className="h-3 w-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-4 p-5 sm:p-6">
              <div className="overflow-hidden rounded-xl border-2 border-cocoa-900">
                {lines.map((l, i) => (
                  <div key={l.key} className={`flex items-center justify-between gap-3 bg-cream-50 px-3.5 py-2.5 text-sm ${i > 0 ? "border-t border-cocoa-900/15" : ""}`}>
                    <span className="min-w-0 truncate font-bold text-cocoa-900">
                      {l.product.fa}
                      {l.optLabel && <span className="text-[11px] font-bold text-cocoa-500"> ({l.optLabel})</span>}
                      <span className="text-cocoa-500"> × {faNum(l.qty)}</span>
                    </span>
                    <span className="shrink-0 font-display text-base">{money(l.unit * l.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 rounded-xl border-2 border-dashed border-cocoa-900/30 bg-cream-100 p-4 text-sm font-bold text-cocoa-700">
                <div className="flex justify-between"><span>جمع آیتم‌ها</span><span>{money(subtotal)} هزار</span></div>
                <div className="flex justify-between"><span>بسته‌بندی</span><span>{faNum(PACKAGING_FEE)} هزار</span></div>
                <div className="flex justify-between">
                  <span>{method === "delivery" ? "هزینهٔ پیک" : "دریافت حضوری"}</span>
                  <span>{deliveryFee === 0 ? "رایگان" : `${faNum(deliveryFee)} هزار`}</span>
                </div>
                <div className="mt-2 flex justify-between border-t-2 border-cocoa-900/15 pt-2 font-display text-xl text-cocoa-900">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="text-brand-600">{money(total)} هزار تومان</span>
                </div>
              </div>

              <div className="rounded-xl bg-cream-100 p-4 text-[13px] leading-6 text-cocoa-700">
                <p><strong className="text-cocoa-900">{name || "—"}</strong> — <span className="ltr">{phone}</span></p>
                {method === "delivery" ? <p className="mt-0.5">تحویل: {address}</p> : <p className="mt-0.5">تحویل حضوری از شعبهٔ ولیعصر، آماده در ۲۵ دقیقه</p>}
                {note && <p className="mt-0.5 text-brand-700">یادداشت: {note}</p>}
                <button onClick={() => setStep("info")} className="mt-2 text-xs font-black text-brand-700 underline underline-offset-4 hover:text-brand-600">
                  ویرایش اطلاعات
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="grid place-items-center p-8 text-center sm:p-10">
              <div className="grid h-24 w-24 animate-pop place-items-center rounded-full border-2 border-cocoa-900 bg-brand-600 text-cream-50 shadow-menu">
                <IconCheck className="h-12 w-12" />
              </div>
              <h3 className="mt-5 font-display text-4xl text-cocoa-900">سفارش ثبت شد!</h3>
              <p className="mt-2 text-sm leading-7 text-cocoa-700">
                کد پیگیری شما
                <span className="ltr mx-2 inline-block rounded-full border-2 border-cocoa-900 bg-cocoa-900 px-3.5 py-1 font-display text-lg text-cream-50">
                  {orderCode.split("-")[0]}-{faNum(orderCode.split("-")[1])}
                </span>
                <br />
                {method === "delivery" ? "پیک تا ۳۵ دقیقهٔ دیگر دم دره!" : "تا ۲۵ دقیقهٔ دیگر آماده‌ست؛ چای تازه‌دم منتظرته."}
              </p>
              <p className="mt-3 rounded-full bg-cream-200 px-4 py-1.5 text-[11px] font-bold text-cocoa-700">
                این یک شبیه‌سازی است؛ هیچ پرداخت واقعی انجام نشد.
              </p>
              <button
                onClick={onClose}
                className="mt-6 flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-brand-600 px-6 py-3 font-display text-xl text-cream-50 shadow-menu-sm transition-all hover:-translate-y-0.5 hover:bg-brand-500"
              >
                بازگشت به منو
                <IconArrow className="h-5 w-5 rotate-180" />
              </button>
            </div>
          )}
        </div>

        {/* footer actions */}
        {step !== "done" && (
          <div className="border-t-2 border-cocoa-900 bg-cream-100 p-4 sm:px-6">
            {step === "info" ? (
              <button
                onClick={() => validate() && setStep("review")}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-cocoa-900 bg-brand-600 py-3.5 font-display text-xl text-cream-50 shadow-menu-sm transition-all hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 active:shadow-none"
              >
                مرور سفارش
                <IconArrow className="h-5 w-5" />
              </button>
            ) : (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setStep("info")}
                  disabled={processing}
                  className="flex items-center justify-center rounded-full border-2 border-cocoa-900 bg-cream-50 px-5 py-3 text-sm font-extrabold text-cocoa-900 transition-all hover:bg-cream-200 disabled:opacity-40"
                >
                  بازگشت
                </button>
                <button
                  onClick={submitOrder}
                  disabled={processing}
                  className="flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full border-2 border-cocoa-900 bg-brand-600 py-3.5 font-display text-xl text-cream-50 shadow-menu-sm transition-all hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 active:shadow-none disabled:translate-y-0 disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-cream-50/40 border-t-cream-50" />
                      در حال ثبت سفارش…
                    </>
                  ) : (
                    <>پرداخت {money(total)} هزار تومان</>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
