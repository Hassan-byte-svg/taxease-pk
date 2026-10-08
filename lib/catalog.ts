export type Lang = "en" | "ur";
export type Text = Record<Lang, string>;
export type CategoryId = "tax" | "corporate" | "legal" | "ip" | "compliance";

export function say(value: Text, locale: string) {
  return locale === "ur" ? value.ur : value.en;
}

export const categories: { id: CategoryId; name: Text }[] = [
  { id: "tax", name: { en: "Tax", ur: "ٹیکس" } },
  { id: "corporate", name: { en: "Corporate", ur: "کارپوریٹ" } },
  { id: "legal", name: { en: "Legal", ur: "قانونی" } },
  { id: "ip", name: { en: "IP", ur: "آئی پی" } },
  { id: "compliance", name: { en: "Compliance", ur: "کمپلائنس" } },
];

const docs = {
  doc_cnic: { en: "CNIC", ur: "شناختی کارڈ" },
  doc_photos: { en: "Photographs", ur: "تصاویر" },
  doc_rent: { en: "Rent or ownership paper", ur: "کرایہ یا ملکیت کا کاغذ" },
  doc_letterhead: { en: "Letterhead", ur: "لیٹر ہیڈ" },
  doc_bank: { en: "Bank proof", ur: "بینک کا ثبوت" },
  doc_salary: { en: "Salary certificate", ur: "تنخواہ سرٹیفکیٹ" },
  doc_wealth: { en: "Wealth statement", ur: "ویلتھ سٹیٹمنٹ" },
  doc_notice: { en: "The notice", ur: "نوٹس" },
  doc_passport: { en: "Passport", ur: "پاسپورٹ" },
  doc_foreign: { en: "Foreign income papers", ur: "غیر ملکی آمدن کے کاغذ" },
  doc_proposed: { en: "Proposed name", ur: "تجویز کردہ نام" },
  doc_directors: { en: "Directors’ particulars", ur: "ڈائریکٹرز کی تفصیل" },
  doc_moa: { en: "Memorandum", ur: "میمورنڈم" },
  doc_accounts: { en: "Accounts", ur: "حسابات" },
  doc_papers: { en: "Case papers", ur: "مقدمے کے کاغذ" },
  doc_parties: { en: "Names of the parties", ur: "فریقین کے نام" },
  doc_logo: { en: "The mark", ur: "نشان" },
  doc_class: { en: "Class of goods", ur: "مال کا کلاس" },
  doc_invention: { en: "Description of the invention", ur: "ایجاد کی وضاحت" },
  doc_drawings: { en: "Drawings", ur: "خاکے" },
  doc_pseb: { en: "PSEB form", ur: "پی ایس ای بی فارم" },
  doc_contracts: { en: "Contracts", ur: "معاہدے" },
  doc_bills: { en: "Invoices", ur: "انوائس" },
} as const;

export type DocKey = keyof typeof docs;

export function documentName(key: DocKey, locale: string) {
  return say(docs[key], locale);
}

export type Service = {
  slug: string;
  cat: CategoryId;
  fee: number | null;
  docs: DocKey[];
  timeline: Text;
  name: Text;
  summary: Text;
  fit: string;
};

export const services: Service[] = [
  {
    slug: "ntn",
    cat: "tax",
    fee: 8000,
    docs: ["doc_cnic", "doc_photos", "doc_rent", "doc_letterhead", "doc_bank"],
    timeline: { en: "3–7 days", ur: "۳ تا ۷ دن" },
    name: { en: "NTN & business registration", ur: "این ٹی این اور کاروبار کا اندراج" },
    summary: { en: "The tax number the rest of the file depends on.", ur: "وہ ٹیکس نمبر جس پر باقی ساری فائل کھڑی ہوتی ہے۔" },
    fit: "Anyone who needs a tax number before the rest of the file can proceed.",
  },
  {
    slug: "return",
    cat: "tax",
    fee: 12000,
    docs: ["doc_cnic", "doc_salary", "doc_wealth", "doc_bank"],
    timeline: { en: "1–2 weeks", ur: "۱ تا ۲ ہفتے" },
    name: { en: "Income tax return filing", ur: "انکم ٹیکس ریٹرن جمع کرانا" },
    summary: { en: "The annual return, with a paper behind every figure.", ur: "سالانہ ریٹرن، اور ہر عدد کے پیچھے ایک دستاویز۔" },
    fit: "People who need the annual return prepared with a paper behind each figure.",
  },
  {
    slug: "notice",
    cat: "tax",
    fee: 15000,
    docs: ["doc_notice", "doc_cnic", "doc_bank"],
    timeline: { en: "2–5 days", ur: "۲ تا ۵ دن" },
    name: { en: "FBR notice replies", ur: "ایف بی آر نوٹس کے جواب" },
    summary: {
      en: "The notice is read, the deadline is kept, and the reply is prepared for a consultant to sign.",
      ur: "نوٹس پڑھا جاتا ہے، تاریخ سامنے رہتی ہے، اور جواب مشیر کے دستخط کے لیے تیار ہوتا ہے۔",
    },
    fit: "Anyone who has an FBR notice and a deadline to keep.",
  },
  {
    slug: "overseas",
    cat: "tax",
    fee: 20000,
    docs: ["doc_passport", "doc_foreign", "doc_cnic", "doc_bank"],
    timeline: { en: "1–2 weeks", ur: "۱ تا ۲ ہفتے" },
    name: { en: "Overseas Pakistanis tax", ur: "بیرون ملک پاکستانیوں کا ٹیکس" },
    summary: {
      en: "Returns and wealth work for people who earn outside Pakistan.",
      ur: "ان لوگوں کی ریٹرن اور ویلتھ، جو پاکستان سے باہر کمائی کرتے ہیں۔",
    },
    fit: "Pakistanis who earn outside the country and need the return and wealth work.",
  },
  {
    slug: "company",
    cat: "corporate",
    fee: 35000,
    docs: ["doc_cnic", "doc_proposed", "doc_directors", "doc_moa"],
    timeline: { en: "1–2 weeks", ur: "۱ تا ۲ ہفتے" },
    name: { en: "Company formation", ur: "کمپنی کا قیام" },
    summary: {
      en: "A private limited or single-member company, formed with SECP.",
      ur: "پرائیویٹ لمیٹڈ یا سنگل ممبر کمپنی، ایس ای سی پی کے ساتھ۔",
    },
    fit: "Founders forming a private limited or single-member company with SECP.",
  },
  {
    slug: "secp",
    cat: "corporate",
    fee: 18000,
    docs: ["doc_accounts", "doc_cnic", "doc_directors"],
    timeline: { en: "About a week", ur: "تقریباً ایک ہفتہ" },
    name: { en: "SECP returns & compliances", ur: "ایس ای سی پی ریٹرن اور تعمیل" },
    summary: {
      en: "Annual forms, and the dates a company is expected to keep.",
      ur: "سالانہ فارم، اور وہ تاریخیں جو کمپنی کو یاد رکھنی ہیں۔",
    },
    fit: "Companies that must keep annual forms and the dates those forms fall due.",
  },
  {
    slug: "litigation",
    cat: "legal",
    fee: null,
    docs: ["doc_papers", "doc_parties", "doc_cnic"],
    timeline: { en: "Depends on the court", ur: "عدالت پر منحصر ہے" },
    name: { en: "Corporate litigation", ur: "کارپوریٹ مقدمہ" },
    summary: {
      en: "A company dispute, drafted and followed by a licensed advocate.",
      ur: "کمپنی کا تنازع، جو لائسنس یافتہ وکیل لکھتا اور آگے بڑھاتا ہے۔",
    },
    fit: "A company in a dispute that needs a licensed advocate to draft and follow it.",
  },
  {
    slug: "contracts",
    cat: "legal",
    fee: 10000,
    docs: ["doc_parties", "doc_papers", "doc_cnic"],
    timeline: { en: "3–7 days", ur: "۳ تا ۷ دن" },
    name: { en: "Contracts & agreements", ur: "معاہدے اور اقرار نامے" },
    summary: {
      en: "An agreement in plain language, with the obligations marked.",
      ur: "سادہ زبان میں معاہدہ، اور ذمہ داریاں نشان زد۔",
    },
    fit: "Parties who need an agreement in plain language, with the obligations marked.",
  },
  {
    slug: "trademark",
    cat: "ip",
    fee: 15000,
    docs: ["doc_logo", "doc_class", "doc_cnic"],
    timeline: { en: "Filing in days", ur: "چند دن میں درخواست" },
    name: { en: "Trademark registration", ur: "ٹریڈ مارک کا اندراج" },
    summary: {
      en: "Search the mark, file it, and follow it with IPO-Pakistan.",
      ur: "نشان تلاش کریں، درخواست دیں، اور آئی پی او پاکستان پر اس کی پیروی کریں۔",
    },
    fit: "A business that wants a mark searched, filed, and followed with IPO-Pakistan.",
  },
  {
    slug: "patent",
    cat: "ip",
    fee: 45000,
    docs: ["doc_invention", "doc_drawings", "doc_cnic"],
    timeline: { en: "Several months", ur: "کئی مہینے" },
    name: { en: "Patent registration", ur: "پیٹنٹ کا اندراج" },
    summary: {
      en: "An invention, filed with the drawings and the claims it needs.",
      ur: "ایجاد، اپنے خاکوں اور دعووں کے ساتھ داخل کی جاتی ہے۔",
    },
    fit: "An inventor who needs the drawings and claims filed.",
  },
  {
    slug: "pseb",
    cat: "compliance",
    fee: 12000,
    docs: ["doc_pseb", "doc_cnic", "doc_contracts", "doc_bills"],
    timeline: { en: "1–2 weeks", ur: "۱ تا ۲ ہفتے" },
    name: { en: "PSEB IT / freelancer registration", ur: "پی ایس ای بی، آئی ٹی اور فری لانسر اندراج" },
    summary: {
      en: "Registration for an IT firm or a freelancer who invoices from Pakistan.",
      ur: "آئی ٹی فرم یا اس فری لانسر کا اندراج جو پاکستان سے انوائس بھیجتا ہے۔",
    },
    fit: "An IT firm or freelancer who invoices from Pakistan.",
  },
  {
    slug: "package",
    cat: "compliance",
    fee: 75000,
    docs: ["doc_cnic", "doc_proposed", "doc_rent", "doc_bank"],
    timeline: { en: "2–4 weeks", ur: "۲ تا ۴ ہفتے" },
    name: { en: "Full compliance package", ur: "مکمل تعمیل پیکج" },
    summary: {
      en: "For a new business: NTN, the opening registrations, and a calendar of what falls due.",
      ur: "نئے کاروبار کے لیے: این ٹی این، ابتدائی اندراج، اور واجب تاریخوں کا کیلنڈر۔",
    },
    fit: "A new business that wants the opening registrations and a calendar of what falls due.",
  },
];

export function serviceBySlug(slug: string) {
  return services.find((item) => item.slug === slug);
}

export const steps: { title: Text; body: Text }[] = [
  { title: { en: "You ask", ur: "آپ کہتے ہیں" }, body: { en: "The matter, in your own words.", ur: "معاملہ، آپ کے الفاظ میں۔" } },
  { title: { en: "Papers", ur: "کاغذ" }, body: { en: "Only what that service needs.", ur: "صرف وہ جو اس کام کے لیے چاہیے۔" } },
  { title: { en: "A person", ur: "ایک شخص" }, body: { en: "The file is assigned. You see the name.", ur: "فائل کسی کے نام ہوتی ہے۔ آپ نام دیکھتے ہیں۔" } },
  { title: { en: "Filed", ur: "جمع" }, body: { en: "You keep the receipt in the same account.", ur: "رسید اسی اکاؤنٹ میں رہتی ہے۔" } },
];

export const packages: { name: Text; text: Text; price: number | null }[] = [
  {
    name: { en: "Individual return", ur: "انفرادی ریٹرن" },
    text: { en: "The annual salary return, the wealth statement, and a first reading of one notice.", ur: "سالانہ تنخواہ ریٹرن، ویلتھ سٹیٹمنٹ، اور ایک نوٹس کی پہلی پڑھائی۔" },
    price: 12000,
  },
  {
    name: { en: "Freelancer and PSEB", ur: "فری لانسر اور پی ایس ای بی" },
    text: { en: "PSEB registration for an IT worker or firm, together with the annual return.", ur: "آئی ٹی کارکن یا فرم کا پی ایس ای بی اندراج، سالانہ ریٹرن کے ساتھ۔" },
    price: 25000,
  },
  {
    name: { en: "New business", ur: "نیا کاروبار" },
    text: { en: "NTN, the opening registrations, and a first-year calendar of what falls due.", ur: "این ٹی این، ابتدائی اندراج، اور پہلے سال کی واجب تاریخیں۔" },
    price: 75000,
  },
  {
    name: { en: "Company and mark", ur: "کمپنی اور نشان" },
    text: { en: "A company is formed and a trademark is filed. The fee is quoted after the structure is clear.", ur: "کمپنی بنتی ہے اور ٹریڈ مارک داخل ہوتا ہے۔ فیس ساخت واضح ہونے پر بتائی جاتی ہے۔" },
    price: null,
  },
];

export const values: { title: Text; body: Text }[] = [
  { title: { en: "Visible", ur: "نظر آئے" }, body: { en: "The client can see the status without calling.", ur: "کلائنٹ بغیر کال کے کیفیت دیکھ سکتا ہے۔" } },
  { title: { en: "Assigned", ur: "سونپا گیا" }, body: { en: "Every open matter has a name on it.", ur: "ہر کھلی فائل پر ایک نام ہے۔" } },
  { title: { en: "Separate money", ur: "الگ رقم" }, body: { en: "The professional fee is never mixed with a government charge.", ur: "پیشہ ورانہ فیس سرکاری چارج میں نہیں ملتی۔" } },
];

export const aiFlows: { slug: string; q: Text; a: Text }[] = [
  { slug: "ntn", q: { en: "Do you already have a tax number?", ur: "کیا آپ کے پاس ٹیکس نمبر ہے؟" }, a: { en: "NTN registration is the usual first paper for a new business.", ur: "این ٹی این اندراج نئے کاروبار کا عام پہلا کاغذ ہے۔" } },
  { slug: "return", q: { en: "Is this a salary, or a business return?", ur: "یہ تنخواہ ہے، یا کاروبار کی ریٹرن؟" }, a: { en: "The return service prepares the annual file. A consultant signs what is filed.", ur: "ریٹرن سروس سالانہ فائل تیار کرتی ہے۔ جو جمع ہو، اس پر مشیر دستخط کرتا ہے۔" } },
  { slug: "notice", q: { en: "What date is written on the notice?", ur: "نوٹس پر کون سی تاریخ لکھی ہے؟" }, a: { en: "Bring the notice. The reply stays a draft until a qualified person signs it.", ur: "نوٹس لائیں۔ جواب اس وقت تک مسودہ ہے جب تک اہل شخص دستخط نہ کر دے۔" } },
  { slug: "overseas", q: { en: "Do you earn outside Pakistan?", ur: "کیا آپ پاکستان سے باہر کماتے ہیں؟" }, a: { en: "Overseas work covers the return and the wealth papers for income earned abroad.", ur: "بیرون ملک کام غیر ملک کمائی کی ریٹرن اور ویلتھ کے کاغذ ڈھانپتا ہے۔" } },
  { slug: "company", q: { en: "Private limited, or a single member company?", ur: "پرائیویٹ لمیٹڈ، یا سنگل ممبر کمپنی؟" }, a: { en: "Company formation is done with SECP. The structure decides the fee.", ur: "کمپنی کا قیام ایس ای سی پی کے ساتھ ہوتا ہے۔ ساخت فیس طے کرتی ہے۔" } },
  { slug: "trademark", q: { en: "Do you already have the logo and the class of goods?", ur: "کیا لوگو اور مال کا کلاس موجود ہے؟" }, a: { en: "Trademark work searches the mark and files it with IPO-Pakistan.", ur: "ٹریڈ مارک کا کام نشان تلاش کرتا ہے اور آئی پی او پاکستان میں داخل کرتا ہے۔" } },
  { slug: "pseb", q: { en: "Are you an IT firm, or a freelancer?", ur: "آپ آئی ٹی فرم ہیں، یا فری لانسر؟" }, a: { en: "PSEB registration is for IT firms and freelancers who invoice from Pakistan.", ur: "پی ایس ای بی اندراج ان آئی ٹی فرموں اور فری لانسرز کے لیے ہے جو پاکستان سے انوائس بھیجتے ہیں۔" } },
  { slug: "package", q: { en: "Is the business new, and not yet registered?", ur: "کیا کاروبار نیا ہے، اور ابھی اندراج نہیں ہوا؟" }, a: { en: "The full package opens NTN and the first registrations, then keeps the due dates.", ur: "مکمل پیکج این ٹی این اور پہلے اندراج کھولتا ہے، پھر واجب تاریخیں رکھتا ہے۔" } },
];

export const govNote: Text = {
  en: "Government charges are separate. A consultant confirms them before anything is filed.",
  ur: "سرکاری چارج الگ ہیں۔ جمع کرانے سے پہلے مشیر ان کی تصدیق کرتا ہے۔",
};

export const copy = {
  servicesTitle: { en: "Find the matter, then the next step.", ur: "پہلے معاملہ، پھر اگلا قدم۔" },
  servicesLead: { en: "Tax, corporate, legal, IP, and compliance. Open a service to see the papers, the time, and the fee.", ur: "ٹیکس، کارپوریٹ، قانونی، آئی پی، اور کمپلائنس۔ خدمت کھولیں، کاغذ، وقت، اور فیس دیکھیں۔" },
  search: { en: "Search services", ur: "خدمت تلاش کریں" },
  empty: { en: "No service matches that.", ur: "اس سے کوئی خدمت نہیں ملی۔" },
  open: { en: "Open this service", ur: "یہ خدمت کھولیں" },
  from: { en: "From", ur: "سے" },
  quoted: { en: "Quoted", ur: "نرخ نامہ" },
  backServices: { en: "All services", ur: "ساری خدمات" },
  timeline: { en: "Time", ur: "وقت" },
  fee: { en: "Professional fee", ur: "پیشہ ورانہ فیس" },
  documents: { en: "Papers this service asks for", ur: "اس کام کے کاغذ" },
  covers: { en: "What this covers", ur: "یہ کیا ڈھانپتا ہے" },
  who: { en: "Who it is for", ur: "یہ کس کے لیے ہے" },
  next: { en: "What happens next", ur: "آگے کیا ہوتا ہے" },
  speak: { en: "Speak to the desk", ur: "ڈیسک سے بات کریں" },
  calcTitle: { en: "Calculators", ur: "کیلکولیٹر" },
  calcLead: { en: "Salary, business, sales tax, and capital gain. Each result is an estimate from the published Tax Year 2027 rules. It does not file a return.", ur: "تنخواہ، کاروبار، سیلز ٹیکس، اور کیپیٹل گین۔ ہر نتیجہ ٹیکس سال ۲۰۲۷ کے شائع شدہ قواعد کا تخمینہ ہے۔ یہ ریٹرن جمع نہیں کرواتا۔" },
  salary: { en: "Salary", ur: "تنخواہ" },
  business: { en: "Business", ur: "کاروبار" },
  sales: { en: "Sales tax", ur: "سیلز ٹیکس" },
  gain: { en: "Capital gain", ur: "کیپیٹل گین" },
  monthly: { en: "Monthly", ur: "ماہانہ" },
  annual: { en: "Annual", ur: "سالانہ" },
  amount: { en: "Amount", ur: "رقم" },
  inclusive: { en: "Amount already includes sales tax", ur: "رقم میں سیلز ٹیکس شامل ہے" },
  property: { en: "Property, filer", ur: "جائیداد، فائلر" },
  debtFiler: { en: "Debt, filer", ur: "قرض، فائلر" },
  debtNon: { en: "Debt, non-filer", ur: "قرض، نان فائلر" },
  taxDue: { en: "Estimated tax", ur: "تخمینی ٹیکس" },
  eachMonth: { en: "Each month", ur: "ہر مہینہ" },
  afterTax: { en: "Estimated salary after tax", ur: "ٹیکس کے بعد تنخواہ" },
  surcharge: { en: "Surcharge", ur: "سرچارج" },
  net: { en: "Net", ur: "خالص" },
  gross: { en: "Gross", ur: "کل" },
  aiTitle: { en: "A guide, not a decision", ur: "رہنمائی، فیصلہ نہیں" },
  aiLead: { en: "Pick the closest matter. The guide names a service and the question a person will ask. It does not sign a return, a notice, or a pleading.", ur: "قریب ترین معاملہ چنیں۔ رہنما خدمت بتاتا ہے اور وہ سوال جو ایک شخص پوچھے گا۔ یہ ریٹرن، نوٹس، یا عرضی پر دستخط نہیں کرتا۔" },
  aiPrompt: { en: "What is the matter?", ur: "معاملہ کیا ہے؟" },
  aiReco: { en: "A place to start", ur: "شروع کرنے کی جگہ" },
  startOver: { en: "Start over", ur: "دوبارہ" },
  priceTitle: { en: "Packages", ur: "پیکج" },
  priceLead: { en: "These are the working package fees. A quotation can still change, and government charges are not inside the fee.", ur: "یہ کام کے پیکج کی فیس ہے۔ نرخ پھر بھی بدل سکتا ہے، اور سرکاری چارج فیس کے اندر نہیں۔" },
  choose: { en: "Request this", ur: "یہ مانگیں" },
  aboutTitle: { en: "How the desk works", ur: "ڈیسک کیسے کام کرتی ہے" },
  aboutLead: {
    en: "Public pages for the visitor, one record for the client, and a person on the file. The guide can point to a service. It does not sign a return, a notice, or a pleading.",
    ur: "زائر کے لیے صفحات، کلائنٹ کے لیے ایک ریکارڈ، اور فائل پر ایک شخص۔ رہنما خدمت بتا سکتا ہے۔ وہ ریٹرن، نوٹس، یا عرضی پر دستخط نہیں کرتا۔",
  },
  whoTitle: { en: "Who the desk is for", ur: "ڈیسک کس کے لیے ہے" },
  contactTitle: { en: "Tell us what you need help with.", ur: "بتائیں کس کام میں مدد چاہیے۔" },
  contactLead: { en: "Share the matter. This screen keeps what you typed. The desk inbox is not connected yet, so also call or use WhatsApp.", ur: "معاملہ لکھیں۔ یہ اسکرین آپ کی لکھی بات رکھتی ہے۔ ڈیسک کا ان باکس ابھی جڑا نہیں، اس لیے کال یا واٹس ایپ بھی کریں۔" },
  name: { en: "Name", ur: "نام" },
  phone: { en: "Phone", ur: "فون" },
  email: { en: "Email", ur: "ای میل" },
  interest: { en: "Service", ur: "خدمت" },
  message: { en: "Brief description", ur: "مختصر بات" },
  method: { en: "Preferred contact", ur: "رابطے کا طریقہ" },
  time: { en: "Preferred time", ur: "وقت" },
  timeHint: { en: "For example, weekday morning", ur: "مثلاً ہفتے کے دن صبح" },
  send: { en: "Request consultation", ur: "مشاورت مانگیں" },
  sentTitle: { en: "Your request is on this screen.", ur: "آپ کی درخواست اس اسکرین پر ہے۔" },
  sentBody: { en: "It was not saved to a desk. Call or WhatsApp with the same details so a person can read them.", ur: "یہ ڈیسک پر محفوظ نہیں ہوئی۔ یہی تفصیل کال یا واٹس ایپ پر بھیجیں تاکہ ایک شخص پڑھ سکے۔" },
  resourcesTitle: { en: "Resources", ur: "وسائل" },
  resourcesLead: { en: "The same places the working site uses: a calculator, a guide, the desk, and the questions on the home page.", ur: "وہی جگہیں جو کام کی سائٹ استعمال کرتی ہے: کیلکولیٹر، رہنما، ڈیسک، اور ہوم کے سوال۔" },
  questions: { en: "Questions", ur: "سوال" },
} as const;
