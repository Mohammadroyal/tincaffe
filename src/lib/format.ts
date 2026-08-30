const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Convert latin digits to Persian digits */
export const faNum = (v: number | string): string =>
  String(v).replace(/\d/g, (d) => FA_DIGITS[+d]);

/** Format a number with Persian digits and thousands grouping */
export const money = (n: number): string =>
  faNum(n.toLocaleString("en-US")).replace(/,/g, "٬");

/** Normalize Persian/Arabic digits to latin */
export const toEnDigits = (s: string): string =>
  s
    .replace(/[۰-۹]/g, (c) => String(FA_DIGITS.indexOf(c)))
    .replace(/[٠-٩]/g, (c) => String("٠١٢٣٤٥٦٧٨٩".indexOf(c)));

/** Normalize text for search: digits, letter variants, ZWNJ */
export const normalize = (s: string): string =>
  toEnDigits(s)
    .toLowerCase()
    .replace(/[ي]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200e\u200f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
