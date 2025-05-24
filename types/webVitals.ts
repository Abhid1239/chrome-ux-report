export interface MetricPercentiles {
  p75: number;
}

export interface Metrics {
  [key: string]: {
    percentiles: MetricPercentiles;
  };
}

export interface RecordData {
  metrics: Metrics;
}

export interface DataItem {
  url: string;
  data?: {
    record: RecordData;
  };
  error?: string;
}

export type ShowcaseInsightsProps = {
  data: DataItem[];
};

export interface CoreWebVital {
  key: string;
  abbr: string;
  label: string;
  docs: string;
  thresholds: number[];
  unit: string;
  description: string;
  visible: boolean;
}

export interface WebVitalColumn {
  key: string;
  visible: boolean;
  label: string;
  abbr: string;
  description: string;
}

export interface SortPosition {
  key: string;
  direction: "asc" | "desc";
}
