import { productById, unitPrice, type CartLine, type Product } from "../data/menu";

export interface ResolvedLine {
  key: string;
  product: Product;
  opt: number | null;
  optLabel: string | null;
  qty: number;
  unit: number;
}

export const lineKey = (id: string, opt: number | null): string => `${id}:${opt ?? -1}`;

export const resolveLines = (lines: CartLine[]): ResolvedLine[] =>
  lines
    .map((l) => {
      const product = productById(l.id);
      if (!product) return null;
      return {
        key: l.key,
        product,
        opt: l.opt,
        optLabel: product.options ? product.options[l.opt ?? 0].label : null,
        qty: l.qty,
        unit: unitPrice(product, l.opt),
      };
    })
    .filter((x): x is ResolvedLine => x !== null);
