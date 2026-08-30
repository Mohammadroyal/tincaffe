import type { ReactNode } from "react";
import { CAT_IMG } from "../data/menu";
import { faNum } from "../lib/format";
import { IconArrowDown, IconBean, IconBike, IconLeaf, IconPhone, IconSparkle } from "./icons";
import Reveal from "./Reveal";

function SpinBadge() {
  return (
    <div className="relative h-24 w-24 sm:h-28 sm:w-28">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="tin-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
        </defs>
        <text fontSize="10.2" letterSpacing="2.6" fill="#52331d" fontWeight="700">
          <textPath href="#tin-circle">TIN COFFEE &amp; BAKERY • FRESH DAILY •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <IconBean className="h-7 w-7 text-brand-600" />
      </span>
    </div>
  );
}

const STICKER = (
  extra: string,
  children: ReactNode
) => (
  <span
    className={`absolute z-10 flex items-center gap-1 rounded-full border-2 border-cocoa-900 px-3 py-1 font-display text-base leading-tight shadow-menu-xs sm:text-lg ${extra}`}
  >
    {children}
  </span>
);

export default function Masthead({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-8 md:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pb-14">
        {/* ── text column ── */}
        <div className="relative z-10">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-cream-50 px-3.5 py-1.5 text-xs font-bold text-cocoa-700 shadow-menu-xs">
              <IconSparkle className="h-3.5 w-3.5 text-brand-600" />
              کافه و بیکری تخصصی — تهران
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display leading-[1.05] text-cocoa-900">
              <span className="relative inline-block text-6xl sm:text-7xl lg:text-8xl">
                تین کافی
                <svg viewBox="0 0 220 14" className="absolute -bottom-2 start-0 w-44 sm:w-56" aria-hidden="true">
                  <path
                    d="M3 10C40 2 80 13 120 7s70-4 97 1"
                    fill="none"
                    stroke="#e25a0b"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="mt-3 block text-4xl text-brand-600 sm:text-5xl lg:text-6xl">
                و بیکریِ تازهٔ هر روز
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-cocoa-700">
              از وافل و کروسانِ تازهٔ فر تا اسپرسوی تازه‌برشت، ماچا، موکتل و دمنوش — منوی کامل تین
              این‌جاست. همهٔ نوشیدنی‌های شیری با <strong className="text-brand-700">شیر بدون لاکتوز</strong> سرو
              می‌شوند و بیکری هر روز صبح پخت می‌شود.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                { icon: <IconBean className="h-4 w-4" />, t: `${faNum(70)} آیتم منو` },
                { icon: <IconLeaf className="h-4 w-4" />, t: "شیر بدون لاکتوز" },
                { icon: <IconSparkle className="h-4 w-4" />, t: "بیکری روزانه" },
                { icon: <IconBike className="h-4 w-4" />, t: "ارسال سریع" },
              ].map((c, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-full border-2 border-cocoa-900/15 bg-cream-50 px-3 py-1.5 text-xs font-bold text-cocoa-700 transition-colors hover:border-cocoa-900"
                >
                  <span className="text-brand-600">{c.icon}</span>
                  {c.t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onBrowse}
                className="group flex h-13 items-center gap-2.5 rounded-full border-2 border-cocoa-900 bg-brand-600 px-6 py-3 font-display text-xl text-cream-50 shadow-menu transition-all hover:-translate-y-1 hover:bg-brand-500 active:translate-y-0 active:shadow-none"
              >
                مشاهدهٔ منو
                <IconArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
              </button>
              <a
                href="tel:+982191009876"
                className="flex items-center gap-2.5 rounded-full border-2 border-cocoa-900 bg-cream-50 px-5 py-3 text-sm font-extrabold text-cocoa-900 shadow-menu-xs transition-all hover:-translate-y-1 hover:bg-brand-50 active:translate-y-0 active:shadow-none"
              >
                <IconPhone className="h-5 w-5 text-brand-600" />
                <span className="ltr">{faNum("021-91009876")}</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── illustration column ── */}
        <Reveal delay={140} className="relative mx-auto h-[340px] w-full max-w-[420px] sm:h-[430px] lg:mx-0">
          {/* dotted backdrop */}
          <div className="absolute -start-2 top-10 h-56 w-56 rounded-full border-2 border-dashed border-brand-500/50 sm:h-72 sm:w-72" />
          <div className="absolute bottom-6 start-10 h-40 w-40 rounded-full bg-brand-500/10" />

          {/* arched coffee image */}
          <div className="absolute inset-y-0 end-6 w-[240px] overflow-hidden rounded-t-full border-2 border-cocoa-900 bg-cream-200 shadow-menu sm:end-10 sm:w-[300px]">
            <img
              src={CAT_IMG.hot}
              alt="فنجان قهوهٔ تین"
              className="h-full w-full object-cover"
              loading="eager"
            />
            {/* steam */}
            <svg viewBox="0 0 60 30" className="absolute top-3 start-1/2 w-16 -translate-x-1/2 text-cocoa-700" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M15 26c-4-5 4-7 0-12S19 7 15 2" className="animate-steam" />
              <path d="M32 26c-4-5 4-7 0-12s4-7 0-12" className="animate-steam" style={{ animationDelay: "0.9s" }} />
              <path d="M48 26c-4-5 4-7 0-12s4-7 0-12" className="animate-steam" style={{ animationDelay: "1.7s" }} />
            </svg>
          </div>

          {/* croissant mascot */}
          <div className="absolute bottom-0 start-0 w-36 animate-floaty sm:w-48">
            <img
              src={CAT_IMG.croissant}
              alt="کروسان تین"
              className="w-full rounded-full border-2 border-cocoa-900 shadow-menu"
              loading="eager"
            />
          </div>

          {/* spinning badge */}
          <div className="absolute start-2 top-0 animate-wiggle">
            <SpinBadge />
          </div>

          {/* price stickers */}
          {STICKER("bg-brand-600 text-cream-50 start-1 top-[46%] rotate-[-7deg] animate-floaty-slow", <>
            وافل <span className="ltr">{faNum(200)}</span>
          </>)}
          {STICKER("bg-cream-50 text-cocoa-900 end-0 bottom-[22%] rotate-6 animate-floaty", <>
            ماچا <span className="ltr">{faNum(190)}</span>
          </>)}
          {STICKER("bg-cocoa-900 text-cream-50 start-16 -bottom-1 rotate-[-3deg]", <>
            کروسان <span className="ltr">{faNum(240)}</span>
          </>)}
        </Reveal>
      </div>

      {/* cafe awning divider */}
      <div className="awning-stripes" />
      <div className="awning-scallop" />
    </section>
  );
}
