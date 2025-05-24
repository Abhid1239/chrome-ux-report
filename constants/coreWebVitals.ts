// Core Web Vitals configuration and metadata
export const CORE_WEB_VITALS = [
  {
    key: "largest_contentful_paint",
    abbr: "LCP",
    label: "Largest Contentful Paint (LCP)",
    docs: "https://web.dev/lcp/",
    thresholds: [2500, 4000],
    unit: "ms",
    description:
      "Measures loading performance. Good: ≤2.5s, Needs Improvement: ≤4s, Poor: >4s.",
    visible: true,
  },
  {
    key: "first_contentful_paint",
    abbr: "FCP",
    label: "First Contentful Paint (FCP)",
    docs: "https://web.dev/fcp/",
    thresholds: [1800, 3000],
    unit: "ms",
    description:
      "Measures time to first content. Good: ≤1.8s, Needs Improvement: ≤3s, Poor: >3s.",
    visible: false,
  },
  {
    key: "interaction_to_next_paint",
    abbr: "INP",
    label: "Interaction to Next Paint (INP)",
    docs: "https://web.dev/inp/",
    thresholds: [200, 500],
    unit: "ms",
    description:
      "Measures responsiveness. Good: ≤200ms, Needs Improvement: ≤500ms, Poor: >500ms.",
    visible: true,
  },
  {
    key: "total_blocking_time",
    abbr: "TBT",
    label: "Total Blocking Time (TBT)",
    docs: "https://web.dev/tbt/",
    thresholds: [200, 600],
    unit: "ms",
    description:
      "Measures total time blocked. Good: ≤200ms, Needs Improvement: ≤600ms, Poor: >600ms.",
    visible: false,
  },
  {
    key: "first_input_delay",
    abbr: "FID",
    label: "First Input Delay (FID)",
    docs: "https://web.dev/fid/",
    thresholds: [100, 300],
    unit: "ms",
    description:
      "Measures input delay. Good: ≤100ms, Needs Improvement: ≤300ms, Poor: >300ms.",
    visible: true,
  },
  {
    key: "cumulative_layout_shift",
    abbr: "CLS",
    label: "Cumulative Layout Shift (CLS)",
    docs: "https://web.dev/cls/",
    thresholds: [0.1, 0.25],
    unit: "",
    description:
      "Measures visual stability. Good: ≤0.1, Needs Improvement: ≤0.25, Poor: >0.25.",
    visible: true,
  },
  {
    key: "experimental_time_to_first_byte",
    abbr: "TTFB",
    label: "Time to First Byte (TTFB)",
    docs: "https://web.dev/ttfb/",
    thresholds: [800, 1800],
    unit: "ms",
    description:
      "Measures server response. Good: ≤0.8s, Needs Improvement: ≤1.8s, Poor: >1.8s.",
    visible: false,
  },
  {
    key: "time_to_interactive",
    abbr: "TTI",
    label: "Time to Interactive (TTI)",
    docs: "https://web.dev/tti/",
    thresholds: [3800, 7300],
    unit: "ms",
    description:
      "Measures time to interactive. Good: ≤3.8s, Needs Improvement: ≤7.3s, Poor: >7.3s.",
    visible: false,
  },
  {
    key: "speed_index",
    abbr: "SI",
    label: "Speed Index (SI)",
    docs: "https://web.dev/speed-index/",
    thresholds: [3400, 5800],
    unit: "ms",
    description:
      "Measures speed index. Good: ≤3.4s, Needs Improvement: ≤5.8s, Poor: >5.8s.",
    visible: false,
  },
];
