/** Salaried individuals, Tax Year 2027, Finance Act 2026. */
export type Slab = {
  label: string;
  min: number;
  max: number | null;
  taxAtFloor: number;
  rate: number;
};

// TODO: Verify these slabs against the current FBR salary rules before relying on them.
export const SALARY_RULESET = "Tax Year 2027 · salaried slabs · Finance Act 2026";

export const salarySlabs: Slab[] = [
  { label: "Up to 600,000", min: 0, max: 600_000, taxAtFloor: 0, rate: 0 },
  { label: "600,001 – 1,200,000", min: 600_000, max: 1_200_000, taxAtFloor: 0, rate: 0.01 },
  { label: "1,200,001 – 2,200,000", min: 1_200_000, max: 2_200_000, taxAtFloor: 6_000, rate: 0.11 },
  { label: "2,200,001 – 3,200,000", min: 2_200_000, max: 3_200_000, taxAtFloor: 116_000, rate: 0.2 },
  { label: "3,200,001 – 4,100,000", min: 3_200_000, max: 4_100_000, taxAtFloor: 316_000, rate: 0.25 },
  { label: "4,100,001 – 5,600,000", min: 4_100_000, max: 5_600_000, taxAtFloor: 541_000, rate: 0.29 },
  { label: "5,600,001 – 7,000,000", min: 5_600_000, max: 7_000_000, taxAtFloor: 976_000, rate: 0.32 },
  { label: "Above 7,000,000", min: 7_000_000, max: null, taxAtFloor: 1_424_000, rate: 0.35 },
];

export function salaryTax(annual: number) {
  const income = Math.max(0, Math.round(annual));
  const slab = salarySlabs.find((item) => income <= (item.max ?? Infinity)) ?? salarySlabs[salarySlabs.length - 1];
  const tax = Math.round(slab.taxAtFloor + Math.max(0, income - slab.min) * slab.rate);
  return {
    annual: income,
    tax,
    monthlyTax: Math.round(tax / 12),
    takeHome: Math.max(0, income - tax),
    effective: income > 0 ? tax / income : 0,
  };
}

/** Non-salaried individuals and AOPs, Tax Year 2027. Same rules as the working desk. */
export const businessSlabs: Slab[] = [
  { label: "Up to 600,000", min: 0, max: 600_000, taxAtFloor: 0, rate: 0 },
  { label: "600,001 – 1,200,000", min: 600_000, max: 1_200_000, taxAtFloor: 0, rate: 0.15 },
  { label: "1,200,001 – 1,600,000", min: 1_200_000, max: 1_600_000, taxAtFloor: 90_000, rate: 0.2 },
  { label: "1,600,001 – 3,200,000", min: 1_600_000, max: 3_200_000, taxAtFloor: 170_000, rate: 0.3 },
  { label: "3,200,001 – 5,600,000", min: 3_200_000, max: 5_600_000, taxAtFloor: 650_000, rate: 0.4 },
  { label: "Above 5,600,000", min: 5_600_000, max: null, taxAtFloor: 1_610_000, rate: 0.45 },
];

export function businessTax(annual: number) {
  const income = Math.max(0, Math.round(annual));
  const slab = businessSlabs.find((item) => income <= (item.max ?? Infinity)) ?? businessSlabs[businessSlabs.length - 1];
  let tax = slab.taxAtFloor + Math.max(0, income - slab.min) * slab.rate;
  const surcharge = income > 10_000_000 ? tax * 0.1 : 0;
  tax += surcharge;
  return {
    annual: income,
    tax: Math.round(tax),
    surcharge: Math.round(surcharge),
    effective: income > 0 ? tax / income : 0,
    slab,
  };
}

/** Standard sales-tax rate. Notified higher rates stay on those goods. */
export const SALES_TAX_RATE = 0.18;

export function salesTax(amount: number, inclusive: boolean) {
  const value = Math.max(0, amount);
  if (inclusive) {
    const net = value / (1 + SALES_TAX_RATE);
    const tax = value - net;
    return { net: Math.round(net), tax: Math.round(tax), gross: Math.round(value), rate: SALES_TAX_RATE };
  }
  const tax = value * SALES_TAX_RATE;
  return { net: Math.round(value), tax: Math.round(tax), gross: Math.round(value + tax), rate: SALES_TAX_RATE };
}

export type GainKind = "property-filer" | "debt-filer" | "debt-nonfiler";

const gainRates: Record<GainKind, number> = {
  "property-filer": 0.15,
  "debt-filer": 0.2,
  "debt-nonfiler": 0.4,
};

export function capitalGain(gain: number, kind: GainKind) {
  const amount = Math.max(0, gain);
  const rate = gainRates[kind];
  return { gain: Math.round(amount), rate, tax: Math.round(amount * rate) };
}
