import {
  ResultMetadata,
  ResultPerformanceStats,
  SingleTimeSeriesResult,
  ValueResult,
  ResultDataWithTimeSeries,
  ResultDataWithFacets,
  TimeSeriesResult,
  ResultDataWithSingleSeriesResult,
  SingleSeriesResult,
} from '@src/externalTypes/NewRelic';

export function getResultDataWithSingleValueWithFacets(): ResultDataWithFacets<SingleSeriesResult> {
  return {
    facets: [
      {
        results: [{ count: 1 }] as ValueResult[],
        name: 'facet1',
      },
      {
        results: [{ count: 2 }] as ValueResult[],
        name: 'facet2',
      },
    ],
    totalResult: {
      results: [{ count: 1 }, { count: 2 }] as ValueResult[],
    },
    metadata: getResultMetadata(),
    performanceStats: getPerformanceStats(),
  };
}

export function getResultDataWithSingleValueWithoutFacets(): ResultDataWithSingleSeriesResult {
  return {
    results: [{ count: 1 }, { count: 2 }] as ValueResult[],
    metadata: getResultMetadata(),
    performanceStats: getPerformanceStats(),
  };
}

export function getResultDataWithTimeSeriesAndFacets(): ResultDataWithFacets<TimeSeriesResult> {
  return {
    facets: [
      {
        timeSeries: getAllSingleTimeSeriesResult(),
        total: getTotalSingleTimeSeriesResult(),
        name: 'facet1',
      },
      {
        timeSeries: getAllSingleTimeSeriesResult(),
        total: getTotalSingleTimeSeriesResult(),
        name: 'facet2',
      },
    ],
    totalResult: {
      timeSeries: getAllSingleTimeSeriesResult(),
      total: getTotalSingleTimeSeriesResult(),
    },
    metadata: getResultMetadata(),
    performanceStats: getPerformanceStats(),
  };
}

export function getResultDataWithTimeSeriesWithoutFacets(): ResultDataWithTimeSeries {
  return {
    timeSeries: getAllSingleTimeSeriesResult(),
    total: getTotalSingleTimeSeriesResult(),
    metadata: getResultMetadata(),
    performanceStats: getPerformanceStats(),
  };
}

export function getAllSingleTimeSeriesResult(): SingleTimeSeriesResult[] {
  return [
    {
      beginTimeSeconds: 1,
      endTimeSeconds: 1,
      inspectedCount: 1,
      results: [{ count: 1 }] as ValueResult[],
    },
    {
      beginTimeSeconds: 2,
      endTimeSeconds: 2,
      inspectedCount: 2,
      results: [{ count: 2 }] as ValueResult[],
    },
  ];
}

export function getTotalSingleTimeSeriesResult(): SingleTimeSeriesResult {
  return {
    beginTimeSeconds: 1,
    endTimeSeconds: 2,
    inspectedCount: 2,
    results: [{ count: 1 }, { count: 2 }] as ValueResult[],
  };
}

export function getResultMetadata(): ResultMetadata {
  return {
    beginTime: '2020',
    beginTimeMillis: 2020,
    bucketSizeMillis: 100,
    contents: '',
    endTime: '2021',
    endTimeMillis: 2021,
    eventType: 'event',
    eventTypes: ['type1', 'type2'],
    facet: ['facet1', 'facet2'],
    facetExpression: 'FACET 1 FACET 2',
    guid: 'guid',
    limit: 1,
    messages: [],
    offset: 1,
    openEnded: false,
    rawCompareWith: '',
    rawSince: '',
    rawUntil: '',
    routerGuid: '',
  };
}

export function getPerformanceStats(): ResultPerformanceStats {
  return {
    inspectedCount: 2,
    matchCount: 100,
    omittedCount: 0,
    wallClockTime: 0,
  };
}
