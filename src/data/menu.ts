export type CatId =
  | "waffle"
  | "croissant"
  | "crepe"
  | "pancake"
  | "hot"
  | "cold"
  | "mocktail"
  | "shake"
  | "matcha"
  | "tea"
  | "hotdrink";

export interface ProductOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  fa: string;
  en: string;
  cat: CatId;
  price?: number;
  options?: ProductOption[];
  ing?: string[];
  desc: string;
  popular?: boolean;
  fresh?: boolean;
}

export interface CartLine {
  key: string;
  id: string;
  opt: number | null;
  qty: number;
}

export interface Category {
  id: CatId;
  fa: string;
  en: string;
  img: string;
}

const IMG = {
  waffle: "https://image.qwenlm.ai/generated-images/8ddee7c4-da9e-4b93-ba63-b617d536d614/_result.png",
  croissant: "https://image.qwenlm.ai/generated-images/e2c5fe65-e098-4305-8009-59388eecbddc/_result.png",
  crepe: "https://image.qwenlm.ai/generated-images/e6cc3453-627e-41e4-894d-716ddae629ea/_result.png",
  pancake: "https://image.qwenlm.ai/generated-images/958ae695-8a0c-4a07-9d89-6db7b2fe32f1/_result.png",
  hot: "https://image.qwenlm.ai/generated-images/48c71562-81de-4bc5-b8e3-66eb5b9a2f98/_result.png",
  cold: "https://image.qwenlm.ai/generated-images/9f6c8d08-5fe8-4a54-830b-c30d2d925d3e/_result.png",
  mocktail: "https://image.qwenlm.ai/generated-images/e37d2f96-ae0b-4b51-912b-cde57a869f46/_result.png",
  shake: "https://image.qwenlm.ai/generated-images/51eb4b83-0974-4dd5-a18c-8260a8daaffc/_result.png",
  matcha: "https://image.qwenlm.ai/generated-images/37850724-f645-4600-ade4-a19a10f5fe66/_result.png",
  tea: "https://image.qwenlm.ai/generated-images/284bcf7c-7605-4078-9c45-1c1b064d51a5/_result.png",
};

export const CATEGORIES: Category[] = [
  { id: "waffle", fa: "وافل", en: "Waffles", img: IMG.waffle },
  { id: "croissant", fa: "کروسان", en: "Croissants", img: IMG.croissant },
  { id: "crepe", fa: "کرپ", en: "Crepes", img: IMG.crepe },
  { id: "pancake", fa: "پنکیک", en: "Pancakes", img: IMG.pancake },
  { id: "hot", fa: "بار گرم", en: "Hot Bar", img: IMG.hot },
  { id: "cold", fa: "بار سرد", en: "Cold Bar", img: IMG.cold },
  { id: "mocktail", fa: "موکتل بار", en: "Mocktail Bar", img: IMG.mocktail },
  { id: "shake", fa: "شیک بار", en: "Shake Bar", img: IMG.shake },
  { id: "matcha", fa: "ماچا بار", en: "Matcha Bar", img: IMG.matcha },
  { id: "tea", fa: "تی بار", en: "Tea Bar", img: IMG.tea },
  { id: "hotdrink", fa: "نوشیدنی گرم", en: "Hot Drinks", img: IMG.hot },
];

export const CAT_IMG: Record<CatId, string> = {
  waffle: IMG.waffle,
  croissant: IMG.croissant,
  crepe: IMG.crepe,
  pancake: IMG.pancake,
  hot: IMG.hot,
  cold: IMG.cold,
  mocktail: IMG.mocktail,
  shake: IMG.shake,
  matcha: IMG.matcha,
  tea: IMG.tea,
  hotdrink: IMG.hot,
};

const ratios = (a: number, b: number): ProductOption[] => [
  { label: "نسبت ۷۰/۳۰", price: a },
  { label: "نسبت ۵۰/۵۰", price: b },
];

export const PRODUCTS: Product[] = [
  // ─── وافل ───
  { id: "wf-1", fa: "وافل ساده", en: "Simple Waffle", cat: "waffle", price: 200, ing: ["نوتلا"], desc: "وافل بلژیکی ترد با نوتلای اصل؛ ساده و دوست‌داشتنی." },
  { id: "wf-2", fa: "وافل زبل", en: "Zabel Waffle", cat: "waffle", price: 240, ing: ["موز", "نوتلا"], desc: "ترکیب موز و نوتلا روی وافل داغ؛ پرانرژی و خوش‌عطر.", popular: true },
  { id: "wf-3", fa: "وافل رژیمی", en: "Diet Waffle", cat: "waffle", price: 250, ing: ["موز", "عسل", "کنجد", "کره بادام زمینی"], desc: "با عسل، موز، کنجد و کرهٔ بادام‌زمینی؛ سبک و مقوی." },
  { id: "wf-4", fa: "وافل شکمو", en: "Glutton Waffle", cat: "waffle", price: 280, ing: ["موز", "نوتلا", "توت فرنگی", "کره بادام زمینی", "کنجد"], desc: "بمب خوشمزه با موز، نوتلا، توت‌فرنگی، کرهٔ بادام‌زمینی و کنجد.", popular: true },

  // ─── کروسان ───
  { id: "cr-1", fa: "کروسان ساده", en: "Simple Croissant", cat: "croissant", price: 200, ing: ["موز", "نوتلا"], desc: "کروسان کره‌ای تازهٔ فر، با موز و نوتلا." },
  { id: "cr-2", fa: "کروسان زبل", en: "Zabel Croissant", cat: "croissant", price: 240, ing: ["موز", "نوتلا", "توت فرنگی"], desc: "کروسان با موز، نوتلا و توت‌فرنگی تازه.", popular: true },
  { id: "cr-3", fa: "کروسان رژیمی", en: "Diet Croissant", cat: "croissant", price: 250, ing: ["موز", "عسل", "کنجد", "کره بادام زمینی"], desc: "کروسان سبک با عسل، کنجد و کرهٔ بادام‌زمینی." },
  { id: "cr-4", fa: "کروسان شکمو", en: "Glutton Croissant", cat: "croissant", price: 280, ing: ["موز", "نوتلا", "توت فرنگی", "کره بادام زمینی", "کنجد"], desc: "پرملات‌ترین کروسان منو؛ با توت‌فرنگی و نوتلا." },
  { id: "cr-5", fa: "کروسان بستنی", en: "Ice Cream Croissant", cat: "croissant", price: 280, ing: ["موز", "نوتلا", "بستنی"], desc: "کروسان گرم با اسکوپ بستنی وانیل؛ تضاد داغ و سرد.", fresh: true },

  // ─── کرپ ───
  { id: "cp-1", fa: "کرپ ساده", en: "Simple Crepe", cat: "crepe", price: 250, ing: ["موز", "نوتلا"], desc: "کرپ لطیف فرانسوی با موز و نوتلا." },
  { id: "cp-2", fa: "کرپ زبل", en: "Zabel Crepe", cat: "crepe", price: 285, ing: ["موز", "نوتلا", "توت فرنگی"], desc: "کرپ با موز، نوتلا و توت‌فرنگی تازه." },
  { id: "cp-3", fa: "کرپ شکمو", en: "Glutton Crepe", cat: "crepe", price: 260, ing: ["موز", "نوتلا", "توت فرنگی", "کره بادام زمینی", "کنجد"], desc: "کرپِ پر از موز، نوتلا، توت‌فرنگی و کرهٔ بادام‌زمینی." },
  { id: "cp-4", fa: "کرپ رژیمی", en: "Diet Crepe", cat: "crepe", price: 285, ing: ["موز", "عسل", "کنجد", "کره بادام زمینی"], desc: "کرپ سبک با عسل، موز و کنجد؛ بدون عذاب وجدان." },

  // ─── پنکیک ───
  { id: "pk-1", fa: "پنکیک زبل", en: "Zabel Pancake", cat: "pancake", price: 250, ing: ["موز", "نوتلا"], desc: "پنکیک پفکی با موز و نوتلا؛ شروع شیرین روز." },
  { id: "pk-2", fa: "پنکیک شکمو", en: "Glutton Pancake", cat: "pancake", price: 285, ing: ["موز", "نوتلا", "توت فرنگی", "کنجد", "عسل"], desc: "پنکیک با توت‌فرنگی، کنجد و عسل؛ کامل و سیرکننده." },
  { id: "pk-3", fa: "پنکیک رژیمی", en: "Diet Pancake", cat: "pancake", price: 260, ing: ["موز", "عسل", "کره بادام زمینی", "کنجد"], desc: "پنکیک با عسل و کرهٔ بادام‌زمینی؛ سبک و مقوی." },

  // ─── بار گرم (۷۰/۳۰ و ۵۰/۵۰) ───
  { id: "ht-1", fa: "اسپرسو", en: "Espresso", cat: "hot", options: ratios(100, 130), desc: "عصارهٔ خالص دانه‌های تازه‌برشت؛ کوتاه و قدرتمند.", popular: true },
  { id: "ht-2", fa: "آمریکانو", en: "Americano", cat: "hot", options: ratios(120, 150), desc: "اسپرسوی رقیق‌شده با آب داغ؛ ساده و شفاف." },
  { id: "ht-3", fa: "کاپوچینو", en: "Cappuccino", cat: "hot", options: ratios(160, 180), desc: "اسپرسو، شیر بخارپز و فوم مخملی؛ کلاسیک ایتالیایی." },
  { id: "ht-4", fa: "لاته اورجینال", en: "Original Latte", cat: "hot", options: ratios(180, 210), desc: "شیر ابریشمی و اسپرسوی متعادل؛ محبوبِ صبح‌ها.", popular: true },
  { id: "ht-5", fa: "لاته نارگیل", en: "Coconut Latte", cat: "hot", options: ratios(190, 220), desc: "لاته با شیر نارگیل بدون لاکتوز؛ خوش‌عطر و لطیف." },
  { id: "ht-6", fa: "لاته کارامل", en: "Caramel Latte", cat: "hot", options: ratios(190, 220), desc: "لاته با سس کارامل خانگی؛ شیرینیِ ملایم." },
  { id: "ht-7", fa: "موکا", en: "Mocha", cat: "hot", options: ratios(190, 220), desc: "تلاقی قهوه و شکلات؛ گرم و دلنشین." },

  // ─── بار سرد (۷۰/۳۰ و ۵۰/۵۰) ───
  { id: "cd-1", fa: "آیس اسپرسو", en: "Ice Espresso", cat: "cold", options: ratios(110, 140), desc: "اسپرسوی داغ روی یخ؛ بیدارکنندهٔ فوری." },
  { id: "cd-2", fa: "آیس آمریکانو", en: "Ice Americano", cat: "cold", options: ratios(110, 140), desc: "خنک، سبک و بدون شیر؛ برای روزهای گرم." },
  { id: "cd-3", fa: "آیس لاته", en: "Ice Latte", cat: "cold", options: ratios(190, 220), desc: "شیر سرد و اسپرسو روی یخ؛ ساده و تازه." },
  { id: "cd-4", fa: "آیس لاته نارگیل", en: "Ice Coconut Latte", cat: "cold", options: ratios(200, 230), desc: "با شیر نارگیل بدون لاکتوز؛ خنک و معطر." },
  { id: "cd-5", fa: "آیس لاته کارامل", en: "Ice Caramel Latte", cat: "cold", options: ratios(200, 230), desc: "کارامل و شیر سرد؛ پرفروشِ تابستان.", popular: true },
  { id: "cd-6", fa: "آیس موکا", en: "Ice Mocha", cat: "cold", options: ratios(200, 230), desc: "شکلات و قهوهٔ سرد؛ انرژی خنک." },
  { id: "cd-7", fa: "آفوگاتو", en: "Affogato", cat: "cold", options: ratios(240, 270), desc: "بستنی وانیلی غرق در اسپرسوی داغ؛ دسر و قهوه با هم." },
  { id: "cd-8", fa: "اورنج کافی", en: "Orange Coffee", cat: "cold", options: ratios(250, 280), desc: "آب پرتقال تازه و اسپرسو؛ جسورانه و متفاوت.", fresh: true },

  // ─── موکتل بار ───
  { id: "mk-1", fa: "رد سالت", en: "Red Salt", cat: "mocktail", price: 240, desc: "میوه‌های قرمز با لبهٔ نمکی؛ ترش، شیرین و جسور." },
  { id: "mk-2", fa: "آیس راش", en: "Ice Rush", cat: "mocktail", price: 230, desc: "یخی، مرکباتی و فوق‌العاده خنک." },
  { id: "mk-3", fa: "موهیتو", en: "Mojito", cat: "mocktail", price: 220, desc: "نعنا، لیموترش و سودا؛ کلاسیکِ همیشه‌تازه.", popular: true },
  { id: "mk-4", fa: "بلک بری", en: "Blackberry", cat: "mocktail", price: 240, desc: "شاه‌توت تازه با لیمو؛ بنفشِ خوش‌رنگ." },
  { id: "mk-5", fa: "مارگاریتا", en: "Margarita", cat: "mocktail", price: 240, desc: "لیموترش و لبهٔ نمکی؛ به سبک تین." },
  { id: "mk-6", fa: "اسکای لاین", en: "Skyline", cat: "mocktail", price: 230, desc: "لایه‌های آبیِ مرکباتی؛ به رنگ آسمان." },
  { id: "mk-7", fa: "پیناکولادا", en: "Pina Colada", cat: "mocktail", price: 240, desc: "نارگیل و آناناس؛ تعطیلات در یک لیوان." },
  { id: "mk-8", fa: "اسپشیال موکتل", en: "Special Mocktail", cat: "mocktail", price: 270, desc: "ترکیب امضای بار تین؛ هر روز یک سورپرایز تازه.", fresh: true },

  // ─── شیک بار ───
  { id: "sh-1", fa: "شیک چاکلت", en: "Chocolate Shake", cat: "shake", price: 240, desc: "شیک غلیظ شکلاتی با خامهٔ تازه." },
  { id: "sh-2", fa: "شیک نوتلا", en: "Nutella Shake", cat: "shake", price: 270, desc: "نوتلای اصل در یک شیک خامه‌ای؛ پرطرفدارِ همه.", popular: true },
  { id: "sh-3", fa: "شیک توت فرنگی", en: "Strawberry Shake", cat: "shake", price: 240, desc: "توت‌فرنگی تازه با شیر و خامه." },
  { id: "sh-4", fa: "شیک بادام زمینی", en: "Peanut Shake", cat: "shake", price: 260, desc: "کرهٔ بادام‌زمینی و شیر؛ مقوی و سیرکننده." },
  { id: "sh-5", fa: "شیک بیسکویت", en: "Biscuit Shake", cat: "shake", price: 260, desc: "شیک بیسکویتی با تکه‌های ترد." },
  { id: "sh-6", fa: "شیک کارامل", en: "Caramel Shake", cat: "shake", price: 250, desc: "کارامل و شیر؛ شیرینیِ دلنشین." },
  { id: "sh-7", fa: "شیک نارگیل", en: "Coconut Shake", cat: "shake", price: 260, desc: "شیر نارگیل بدون لاکتوز با بستنی وانیل." },
  { id: "sh-8", fa: "شیک اورئو", en: "Oreo Shake", cat: "shake", price: 260, desc: "اورئوی خردشده در شیک خامه‌ای؛ crunchy!" },
  { id: "sh-9", fa: "شیک بلوبری", en: "Blueberry Shake", cat: "shake", price: 260, desc: "بلوبری تازه؛ بنفشِ خوش‌طعم." },

  // ─── ماچا بار ───
  { id: "mt-1", fa: "ماچا اورجینال", en: "Original Matcha", cat: "matcha", price: 190, desc: "ماچای تشریفاتی ژاپن، هم‌زده با چاسن بامبو." },
  { id: "mt-2", fa: "ماچا نارگیل", en: "Coconut Matcha", cat: "matcha", price: 230, desc: "ماچا با شیر نارگیل بدون لاکتوز؛ نرم و معطر.", popular: true },
  { id: "mt-3", fa: "ماچا کارامل", en: "Caramel Matcha", cat: "matcha", price: 230, desc: "ماچا با سس کارامل؛ ترکیب عجیبِ دوست‌داشتنی." },
  { id: "mt-4", fa: "ماچا فندق", en: "Hazelnut Matcha", cat: "matcha", price: 230, desc: "ماچا با شیر فندق؛ آجیلی و نرم." },
  { id: "mt-5", fa: "ماچا توت فرنگی", en: "Strawberry Matcha", cat: "matcha", price: 240, desc: "لایه‌های توت‌فرنگی و ماچا؛ خوش‌عکس و خوش‌طعم." },
  { id: "mt-6", fa: "ماچا وانیل", en: "Vanilla Matcha", cat: "matcha", price: 240, desc: "ماچای لطیف با عطر وانیل طبیعی." },
  { id: "mt-7", fa: "ماچاگاتو", en: "Matchagato", cat: "matcha", price: 270, desc: "اسپرسو و ماچا در یک لیوان؛ دو برابر انرژی.", fresh: true },
  { id: "mt-8", fa: "ماچا سودا", en: "Matcha Soda", cat: "matcha", price: 260, desc: "ماچای گازدار و خنک؛ تجربه‌ای متفاوت." },

  // ─── تی بار ───
  { id: "te-1", fa: "چای سیاه کلاسیک", en: "Classic Black Tea", cat: "tea", price: 120, desc: "چای دم‌کردهٔ ایرانی با عطر هل؛ همیشه به‌موقع." },
  { id: "te-2", fa: "چای میوه‌ای", en: "Fruit Tea", cat: "tea", price: 160, desc: "ترکیب میوه‌های خشک؛ شیرین و معطر." },
  { id: "te-3", fa: "دمنوش راز", en: "Raz Herbal Tea", cat: "tea", price: 170, desc: "ترکیب مخصوص تین؛ رازِ آرامشِ عصرها." },
  { id: "te-4", fa: "دمنوش آرامش", en: "Calm Herbal Tea", cat: "tea", price: 190, desc: "بابونه و بهارنارنج؛ برای یک شب راحت." },
  { id: "te-5", fa: "دمنوش انرژی", en: "Energy Herbal Tea", cat: "tea", price: 190, desc: "جینسینگ و لیمو؛ سوختِ طبیعی روز." },
  { id: "te-6", fa: "دمنوش سلامت", en: "Health Herbal Tea", cat: "tea", price: 180, desc: "زعتر و آویشن؛ تقویت ایمنی بدن." },
  { id: "te-7", fa: "دمنوش تایم لایم", en: "Thyme Lime Herbal Tea", cat: "tea", price: 190, desc: "آویشن و لیموی تازه؛ گرم و تسکین‌دهنده.", fresh: true },

  // ─── نوشیدنی گرم ───
  { id: "hd-1", fa: "ماسالوس", en: "Masalos", cat: "hotdrink", price: 230, desc: "ادویه‌های ماسالا با شیر گرم؛ تند و گرم و اصیل." },
  { id: "hd-2", fa: "ایتالین چاکلت", en: "Italian Chocolate", cat: "hotdrink", price: 220, desc: "شکلات تلخ ذوب‌شده به سبک ایتالیا؛ غلیظ و لوکس." },
  { id: "hd-3", fa: "شیر کره بادام زمینی", en: "Peanut Butter Milk", cat: "hotdrink", price: 260, desc: "شیر گرم و کرهٔ بادام‌زمینی؛ بمب پروتئین." },
  { id: "hd-4", fa: "چای کرک", en: "Karak Tea", cat: "hotdrink", price: 190, desc: "چای غلیظ خلیجی با هل و دارچین." },
  { id: "hd-5", fa: "چای ماسالا", en: "Masala Tea", cat: "hotdrink", price: 190, desc: "چای سیاه با ادویه‌های هندی و شیر گرم." },
  { id: "hd-6", fa: "هات چاکلت", en: "Hot Chocolate", cat: "hotdrink", price: 200, desc: "شکلات داغ کلاسیک با خامهٔ تازه؛ آغوشِ گرم.", popular: true },
  { id: "hd-7", fa: "چای لاته", en: "Tea Latte", cat: "hotdrink", price: 220, desc: "چای و شیر بخارپز؛ نرم و ملایم." },
];

export const NOTES = {
  bakery:
    "کلیه آیتم‌های بیکری ۲۵۰ الی ۴۰۰ گرمی می‌باشد. افزودنی‌ها و هزینهٔ بسته‌بندی جداگانه محاسبه می‌شود.",
  milk: "کلیه آیتم‌های شیرقهوه، شیر نارگیل، شیر فندق و شیر، بدون لاکتوز سرو می‌شوند.",
};

export const unitPrice = (p: Product, opt: number | null): number =>
  p.options ? p.options[opt ?? 0].price : p.price ?? 0;

export const basePrice = (p: Product): number =>
  p.options ? Math.min(...p.options.map((o) => o.price)) : p.price ?? 0;

export const productById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const FREE_SHIPPING_AT = 600;
export const DELIVERY_FEE = 35;
export const PACKAGING_FEE = 15;
