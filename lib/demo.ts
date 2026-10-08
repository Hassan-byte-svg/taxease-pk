/** Sample marketing figures. Not live company results. */
export const sampleStats = [
  { id: "downloads", value: 1_000_000, suffix: "+" },
  { id: "rating", value: 4.5, suffix: "★" },
  { id: "refunds", value: 120_000, suffix: "+" },
] as const;

export const samplePlans = [
  { id: "essential", once: 2_500, monthly: 499 },
  { id: "priority", once: 7_500, monthly: 1_499, popular: true },
  { id: "premium", once: 18_000, monthly: 3_999 },
] as const;

export const partnerMarks = ["HBL", "UBL", "MCB", "Meezan", "Alfalah", "JazzCash", "Easypaisa"] as const;

/** Next individual return date used for the countdown. Confirm with FBR. */
export const FILING_DEADLINE = "2027-09-30T23:59:59+05:00";
