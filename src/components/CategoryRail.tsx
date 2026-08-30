import { CATEGORIES, PRODUCTS, type CatId } from "../data/menu";
import { faNum } from "../lib/format";
import { CategoryIcon } from "./icons";

export default function CategoryRail({
  cat,
  onCat,
}: {
  cat: CatId | "all";
  onCat: (c: CatId | "all") => void;
}) {
  const counts = new Map<string, number>();
  PRODUCTS.forEach((p) => counts.set(p.cat, (counts.get(p.cat) ?? 0) + 1));

  const chip = (active: boolean) =>
    `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 px-3.5 py-2 text-[13px] font-bold transition-all duration-200 ${
      active
        ? "border-cocoa-900 bg-brand-600 text-cream-50 shadow-menu-xs"
        : "border-cocoa-900/15 bg-cream-50 text-cocoa-700 hover:-translate-y-0.5 hover:border-cocoa-900"
    }`;

  return (
    <nav className="border-b-2 border-cocoa-900 bg-cream-100/95 backdrop-blur" aria-label="دسته‌بندی منو">
      <div className="mx-auto max-w-7xl px-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          <button className={chip(cat === "all")} onClick={() => onCat("all")}>
            <CategoryIcon id="all" className="h-[17px] w-[17px]" />
            همه
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                cat === "all" ? "bg-cocoa-900 text-cream-50" : "bg-cocoa-900/10 text-cocoa-700"
              }`}
            >
              {faNum(PRODUCTS.length)}
            </span>
          </button>

          {CATEGORIES.map((c) => {
            const active = cat === c.id;
            return (
              <button key={c.id} className={chip(active)} onClick={() => onCat(active ? "all" : c.id)}>
                <CategoryIcon id={c.id} className="h-[17px] w-[17px]" />
                {c.fa}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                    active ? "bg-cocoa-900 text-cream-50" : "bg-cocoa-900/10 text-cocoa-700"
                  }`}
                >
                  {faNum(counts.get(c.id) ?? 0)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
