export type CapacityState = "available" | "limited" | "full";

export interface CapacityStatus {
  state: CapacityState;
  quarter: string;
  slotsRemaining?: number;
}

const CAPACITY_LIMIT = parseInt(process.env.CAPACITY_LIMIT || "4", 10);
const ACTIVE_SLOTS = parseInt(process.env.ACTIVE_SLOTS || "2", 10);

export function getCapacityStatus(): CapacityStatus {
  const currentSlots = ACTIVE_SLOTS;
  const remaining = CAPACITY_LIMIT - currentSlots;
  const quarter = "Q3 2026";

  if (remaining <= 0) {
    return {
      state: "full",
      quarter,
      slotsRemaining: 0,
    };
  }

  if (remaining === 1) {
    return {
      state: "limited",
      quarter,
      slotsRemaining: remaining,
    };
  }

  return {
    state: "available",
    quarter,
    slotsRemaining: remaining,
  };
}

export function getCapacityBadgeText(status: CapacityStatus): string {
  switch (status.state) {
    case "available":
      return `● ACCEPTING ENGAGEMENTS — ${status.quarter}`;
    case "limited":
      return `● LIMITED AVAILABILITY — ${status.quarter}`;
    case "full":
      return "● ENGAGEMENTS FILLED — JOIN WAITLIST";
  }
}

export function getCapacityBadgeColor(status: CapacityStatus): string {
  switch (status.state) {
    case "available":
      return "cobalt";
    case "limited":
      return "medium";
    case "full":
      return "default";
  }
}
