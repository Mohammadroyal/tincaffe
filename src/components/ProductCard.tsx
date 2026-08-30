import { CAT_IMG, type Product } from "../data/menu";
import { faNum } from "../lib/format";
import { IconLeaf, IconPlus, IconSparkle, IconStar } from "./icons";

export default function ProductCard({
  product,
  inCartQty,
  onOpen,
  onQuickAdd,
}: {
  product: Product;
  inCartQty: number;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  const p = product;
  const hasOptions = !!p.options;
  const price = hasOptions ? Math.min(...p.options!.map((o) => o.price)) : p.price!;
  const diet = p.fa.includes("رژیمی");

  return (
    <article
      onClick={() => onOpen(p)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-cocoa-900 bg-cream-50 shadow-menu-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-menu"
    >
      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={CAT_IMG[p.cat]}
          alt={p.fa}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        {/* badges */}
        <div className="absolute start-2 top-2 flex flex-col items-start gap-1.5">
          {p.popular && (
            <span className="flex items-center gap-1 rounded-full border border-cocoa-900 bg-cocoa-900 px-2 py-0.5 text-[10px] font-bold text-cream-50">
              <IconStar className="h-2.5 w-2.5 text-brand-500" />
              محبوب
            </span>
          )}
          {p.fresh && (
            <span className="flex items-center gap-1 rounded-full border border-cocoa-900 bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-cream-50">
              <IconSparkle className="h-2.5 w-2.5" />
              جدید
            </span>
          )}
          {diet && (
            <span className="flex items-center gap-1 rounded-full border border-cocoa-900 bg-leaf-100 px-2 py-0.5 text-[10px] font-bold text-leaf-700">
              <IconLeaf className="h-2.5 w-2.5" />
              رژیمی
            </span>
          )}
        </div>
        {/* in-cart chip */}
        {inCartQty > 0 && (
          <span className="absolute end-2 top-2 grid h-7 min-w-7 place-items-center rounded-full border-2 border-cream-50 bg-cocoa-900 px-1 text-xs font-black text-cream-50 animate-pop">
            ×{faNum(inCartQty)}
          </span>
        )}
        {/* price tag */}
        <span className="absolute bottom-2 start-2 flex items-baseline gap-1 rounded-lg border-2 border-cocoa-900 bg-brand-600 px-2.5 py-0.5 text-cream-50 shadow-menu-xs">
          {hasOptions && <span className="text-[10px] font-bold">از</span>}
          <span className="font-display text-xl leading-6">{faNum(price)}</span>
          <span className="text-[10px] font-bold">هزار</span>
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-1 p-3.5 md:p-4">
        <h3 className="truncate text-[15px] font-extrabold text-cocoa-900 md:text-base">{p.fa}</h3>
        <p className="ltr -mt-0.5 text-left text-[9.5px] font-bold uppercase tracking-[0.16em] text-cocoa-300">
          {p.en}
        </p>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-brand-700">
          {p.ing ? `با ${p.ing.join("، ")}` : p.desc}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2.5">
          {hasOptions ? (
            <span className="text-[11px] font-bold text-cocoa-500">{faNum(2)} انتخاب نسبت</span>
          ) : (
            <span className="text-[11px] font-bold text-cocoa-500">آماده در {faNum(15)} دقیقه</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasOptions) onOpen(p);
              else onQuickAdd(p);
            }}
            className="flex items-center gap-1.5 rounded-full border-2 border-cocoa-900 bg-cocoa-900 px-3.5 py-1.5 text-xs font-extrabold text-cream-50 transition-all hover:bg-brand-600 active:scale-90"
            aria-label={hasOptions ? `انتخاب ${p.fa}` : `افزودن ${p.fa} به سبد`}
          >
            <IconPlus className="h-3.5 w-3.5" />
            {hasOptions ? "انتخاب" : "افزودن"}
          </button>
        </div>
      </div>
    </article>
  );
}
