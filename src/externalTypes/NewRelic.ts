export interface ResultWithData {
  data: ResultData<SingleSeriesResult | TimeSeriesResult>;
}

export type ResultData<TResult> =
  | ResultDataWithFacets<TResult>
  | ResultDataWithTimeSeries
  | ResultDataWithSingleSeriesResult;

export interface BaseResultData {
  metadata: ResultMetadata;
  performanceStats: ResultPerformanceStats;
}

export type ResultDataWithFacets<TResult> = BaseResultData & FacetResult<TResult>;

export type ResultDataWithTimeSeries = BaseResultData & TimeSeriesResult;

export type ResultDataWithSingleSeriesResult = BaseResultData & SingleSeriesResult;

type WithName<T> = T & { name: string | string[] };

export interface SingleSeriesResult {
  results: ValueResult[];
}

export interface FacetResult<TResult> {
  facets: Array<WithName<TResult>>;
  totalResult: TResult;
}

export interface TimeSeriesResult {
  timeSeries: SingleTimeSeriesResult[];
  total: SingleTimeSeriesResult;
}

export type ValueResult = {
  count?: number;
  average?: number;
  result?: number;
  percentage?: number;
  percentiles?: Record<number, number>;
};

export interface SingleTimeSeriesResult {
  beginTimeSeconds: number;
  endTimeSeconds: number;
  inspectedCount: number;
  results: ValueResult[];
}

export interface ResultMetadata {
  beginTime: string;
  beginTimeMillis: number;
  bucketSizeMillis: number;
  contents: any;
  endTime: string;
  endTimeMillis: number;
  eventType: string;
  eventTypes: string[];
  facet?: string | string[];
  facetExpression?: string;
  guid: string;
  limit: number;
  messages: any[];
  offset: number;
  openEnded: boolean;
  rawCompareWith: string;
  rawSince: string;
  rawUntil: string;
  routerGuid: string;
}

export interface ResultPerformanceStats {
  inspectedCount: number;
  matchCount: number;
  omittedCount: number;
  wallClockTime: number;
}
