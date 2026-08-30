import { NOTES } from "../data/menu";
import { faNum } from "../lib/format";
import { IconBean, IconClock, IconPhone, IconPin, IconSparkle } from "./icons";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-cocoa-950 text-cream-100">
      <div className="awning-stripes" />
      {/* watermark */}
      <span className="ltr pointer-events-none absolute -bottom-9 -left-4 select-none font-display text-[170px] leading-none text-cream-100/5 sm:text-[230px]">
        TIN
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:py-16">
        {/* brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-cream-100/25 bg-brand-600">
              <IconBean className="h-6 w-6 text-cream-50" />
            </span>
            <div className="leading-none">
              <p className="font-display text-3xl text-cream-50">تین کافی و بیکری</p>
              <p className="ltr mt-1 text-left text-[9px] font-bold tracking-[0.3em] text-cream-100/50">
                TIN COFFEE &amp; BAKERY
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-cream-100/65">
            قهوهٔ تخصصی، بیکری تازهٔ هر روز و نوشیدنی‌های خلاقانه — همه در یک منو. صبح‌ها با بوی
            کروسان شروع می‌شود و شب‌ها با یک موکتل تمام می‌شود.
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-500">
            <IconSparkle className="h-3.5 w-3.5" />
            بیکری هر روز ساعت ۷ صبح پخت می‌شود
          </p>
        </div>

        {/* hours + contact */}
        <div className="space-y-4 text-sm">
          <h3 className="font-display text-xl text-cream-50">ساعت کاری و تماس</h3>
          <p className="flex items-start gap-2.5 leading-7 text-cream-100/75">
            <IconClock className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-500" />
            همه‌روزه از {faNum(8)} صبح تا {faNum(23)} شب
          </p>
          <p className="flex items-start gap-2.5 leading-7 text-cream-100/75">
            <IconPhone className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-500" />
            <a href="tel:+982191009876" className="ltr transition-colors hover:text-brand-500">
              {faNum("021-91009876")}
            </a>
          </p>
          <p className="flex items-start gap-2.5 leading-7 text-cream-100/75">
            <IconPin className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-500" />
            تهران، خیابان ولیعصر، نبش کوچهٔ بهار، پلاک {faNum(12)}
          </p>
        </div>

        {/* menu notes */}
        <div className="space-y-3 text-sm">
          <h3 className="font-display text-xl text-cream-50">یادداشت‌های منو</h3>
          <p className="border-e-2 border-brand-600 pe-3 leading-7 text-cream-100/65">{NOTES.bakery}</p>
          <p className="border-e-2 border-brand-600 pe-3 leading-7 text-cream-100/65">{NOTES.milk}</p>
          <p className="inline-block rounded-full border border-cream-100/20 px-3.5 py-1.5 text-xs font-bold text-brand-200">
            کلیهٔ قیمت‌ها به هزار تومان است
          </p>
        </div>
      </div>

      <div className="relative border-t border-cream-100/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] font-bold text-cream-100/40 sm:flex-row">
          <p>© {faNum(1404)} تین کافی و بیکری — دموی فروشگاهی</p>
          <p className="ltr tracking-[0.3em]">TIN COFFEE &amp; BAKERY</p>
        </div>
      </div>
    </footer>
  );
}
