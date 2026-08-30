import type { ReactNode } from "react";
import type { CatId } from "../data/menu";

type P = { className?: string };

const S = ({ className, children }: P & { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconBean = ({ className }: P) => (
  <S className={className}>
    <ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(35 12 12)" />
    <path d="M8.6 5.8q5.6 6 1 13" />
  </S>
);

export const IconSearch = ({ className }: P) => (
  <S className={className}>
    <circle cx="11" cy="11" r="6.2" />
    <path d="M15.6 15.6 20 20" />
  </S>
);

export const IconBasket = ({ className }: P) => (
  <S className={className}>
    <path d="M4.2 9.5h15.6l-1.4 8.3a2.6 2.6 0 0 1-2.6 2.2H8.2a2.6 2.6 0 0 1-2.6-2.2z" />
    <path d="m8.3 9.5 3-5.5M15.7 9.5l-3-5.5M9.5 13v4M14.5 13v4" />
  </S>
);

export const IconPlus = ({ className }: P) => (
  <S className={className}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const IconMinus = ({ className }: P) => (
  <S className={className}>
    <path d="M5 12h14" />
  </S>
);

export const IconX = ({ className }: P) => (
  <S className={className}>
    <path d="m6 6 12 12M18 6 6 18" />
  </S>
);

export const IconCheck = ({ className }: P) => (
  <S className={className}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </S>
);

export const IconTrash = ({ className }: P) => (
  <S className={className}>
    <path d="M4.5 6.5h15M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5M6.5 6.5l.8 12A2 2 0 0 0 9.3 20.5h5.4a2 2 0 0 0 2-1.9l.8-12.1M10 10.5v6M14 10.5v6" />
  </S>
);

export const IconStar = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.2 6-5.5-3-5.5 3 1.2-6L3.2 9.2l6.1-.8z" />
  </svg>
);

export const IconBike = ({ className }: P) => (
  <S className={className}>
    <circle cx="6" cy="16.5" r="3.2" />
    <circle cx="18" cy="16.5" r="3.2" />
    <path d="M6 16.5 9.5 9h5.2M12.8 16.5 15 9.5M13.7 6.5h2.6l1.7 10" />
  </S>
);

export const IconBag = ({ className }: P) => (
  <S className={className}>
    <path d="M5.8 8h12.4l.9 11.2a1 1 0 0 1-1 1.3H5.9a1 1 0 0 1-1-1.3z" />
    <path d="M9 10.5V6.8a3 3 0 0 1 6 0v3.7" />
  </S>
);

export const IconClock = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.5V12l3 2.2" />
  </S>
);

export const IconPhone = ({ className }: P) => (
  <S className={className}>
    <path d="M5.5 4h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4z" />
  </S>
);

export const IconPin = ({ className }: P) => (
  <S className={className}>
    <path d="M12 21s-6.8-5.4-6.8-10.3A6.8 6.8 0 0 1 12 3.9a6.8 6.8 0 0 1 6.8 6.8C18.8 15.6 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </S>
);

export const IconArrow = ({ className }: P) => (
  <S className={className}>
    <path d="M19 12H5.5M11 6l-6 6 6 6" />
  </S>
);

export const IconArrowDown = ({ className }: P) => (
  <S className={className}>
    <path d="M12 5v13.5M6 13l6 6 6-6" />
  </S>
);

export const IconLeaf = ({ className }: P) => (
  <S className={className}>
    <path d="M5.5 18.5C5.5 9.5 12 4.5 19.5 4.5c0 8-5 14-14 14z" />
    <path d="M5.5 18.5c3-6 6.5-9 10.5-11" />
  </S>
);

export const IconSparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.5 14 9l6.5 2L14 13.5 12 20l-2-6.5L3.5 11 10 9z" />
  </svg>
);

export const IconFlame = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3c1.2 3 5 4.6 5 9a5 5 0 0 1-10 0c0-2 .9-3.6 2-5.1.6 1.1 1.4 1.6 1.4 1.6C10.2 6.6 11 5 12 3z" />
  </S>
);

export const IconNote = ({ className }: P) => (
  <S className={className}>
    <path d="M5 4.5h14v15H5z" />
    <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" />
  </S>
);

/* ── category icons ── */

const IconWaffle = ({ className }: P) => (
  <S className={className}>
    <rect x="4" y="4" width="16" height="16" rx="3.5" />
    <path d="M9.4 4v16M14.6 4v16M4 9.4h16M4 14.6h16" />
  </S>
);

const IconCroissant = ({ className }: P) => (
  <S className={className}>
    <path d="M4.5 15.5C4.5 10 8.5 5.5 12 5.5s7.5 4.5 7.5 10c0 1.6-2.1 2.3-3.2 1.2-1.4-1.5-2.6-2.2-4.3-2.2s-2.9.7-4.3 2.2c-1.1 1.1-3.2.4-3.2-1.2z" />
    <path d="M9.5 7.5 8.6 13M14.5 7.5l.9 5.5" />
  </S>
);

const IconCrepe = ({ className }: P) => (
  <S className={className}>
    <path d="M4 18.5 12 5l8 13.5z" />
    <path d="M8.2 18.5c.8-3.2 6.8-3.2 7.6 0" />
    <circle cx="12" cy="12.5" r="1" fill="currentColor" stroke="none" />
  </S>
);

const IconPancake = ({ className }: P) => (
  <S className={className}>
    <ellipse cx="12" cy="7.5" rx="7.5" ry="2.8" />
    <path d="M4.5 7.5v4.2c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V7.5" />
    <path d="M4.5 11.7V16c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-4.3" />
  </S>
);

const IconCup = ({ className }: P) => (
  <S className={className}>
    <path d="M5 10h11v5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 15z" />
    <path d="M16 11h1.4a2.4 2.4 0 0 1 0 4.8H16" />
    <path d="M8.2 3.2c-.9 1.4.9 2 0 3.4M12.2 3.2c-.9 1.4.9 2 0 3.4" />
  </S>
);

const IconIce = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    <path d="M12 3 10 5m2-2 2 2M12 21l-2-2m2 2 2-2" />
  </S>
);

const IconCocktail = ({ className }: P) => (
  <S className={className}>
    <path d="M5 4h14l-6 7.5V18" />
    <path d="M8.5 21h7M8 8h8" />
    <path d="m15 4 2.5-2" />
  </S>
);

const IconShake = ({ className }: P) => (
  <S className={className}>
    <path d="M8 6.5h8L14.8 20.5H9.2z" />
    <path d="M8.4 10.5h7.2M13 6.5 15.5 3" />
    <path d="M9.5 6.5c0-1.7 5-1.7 5 0" />
  </S>
);

const IconMatcha = ({ className }: P) => (
  <S className={className}>
    <path d="M10 2.8h4v2.7h-4z" />
    <path d="M10 5.5c-1.2 2.8-2.2 4-2.2 6.8a4.2 4.2 0 0 0 8.4 0c0-2.8-1-4-2.2-6.8" />
    <path d="M10.7 6.5v5M12 6.8v6M13.3 6.5v5" />
    <path d="M6 20.5h12" />
  </S>
);

const IconTeapot = ({ className }: P) => (
  <S className={className}>
    <path d="M8 8.5h8.5a5.5 5.5 0 0 1 0 11H9.5a5.8 5.8 0 0 1-1.5-11.3z" />
    <path d="m8 10.5-4-2 .8 5 3.5-.7M10 8.5c.5-2 4.5-2 5 0M12.2 4.5v2" />
  </S>
);

const IconMug = ({ className }: P) => (
  <S className={className}>
    <path d="M5 8h11v9a3.5 3.5 0 0 1-3.5 3.5h-4A3.5 3.5 0 0 1 5 17z" />
    <path d="M16 9.5h1.3a2.3 2.3 0 0 1 0 4.6H16" />
    <path d="M10.5 11.5c-.9 1-.9 2.4 0 3.4" />
  </S>
);

export const CategoryIcon = ({ id, className }: { id: CatId | "all"; className?: string }) => {
  switch (id) {
    case "waffle": return <IconWaffle className={className} />;
    case "croissant": return <IconCroissant className={className} />;
    case "crepe": return <IconCrepe className={className} />;
    case "pancake": return <IconPancake className={className} />;
    case "hot": return <IconCup className={className} />;
    case "cold": return <IconIce className={className} />;
    case "mocktail": return <IconCocktail className={className} />;
    case "shake": return <IconShake className={className} />;
    case "matcha": return <IconMatcha className={className} />;
    case "tea": return <IconTeapot className={className} />;
    case "hotdrink": return <IconMug className={className} />;
    default: return <IconBean className={className} />;
  }
};
