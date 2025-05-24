import { CORE_WEB_VITALS } from "../constants/coreWebVitals";

// Utility: get background color class based on thresholds
export function getBgClass(key: string, value: number): string {
  const vital = CORE_WEB_VITALS.find((v) => v.key === key);
  if (!vital) return "";
  const [good, needsImprovement] = vital.thresholds;
  if (key === "cumulative_layout_shift") {
    // For CLS, lower is better
    if (value <= good) return "bg-green-100";
    if (value <= needsImprovement) return "bg-yellow-100";
    return "bg-red-100";
  } else {
    // For others, lower is better
    if (value <= good) return "bg-green-100";
    if (value <= needsImprovement) return "bg-yellow-100";
    return "bg-red-100";
  }
}
