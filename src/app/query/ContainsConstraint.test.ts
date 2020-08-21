import { ContainsConstraint } from './ContainsConstraint';

it.each([
  [true, 'SOME QUERY FACET data', 'containsFacet'],
  [false, 'SOME QUERY data', 'containsFacet'],
  [true, 'SOME QUERY UNTIL data', 'containsUntil'],
  [false, 'SOME QUERY data', 'containsUntil'],
  [true, 'SOME QUERY SINCE data', 'containsSince'],
  [false, 'SOME QUERY data', 'containsSince'],
  [true, 'SOME QUERY TIMESERIES data', 'containsTimeSeries'],
  [false, 'SOME QUERY data', 'containsTimeSeries'],
] as Array<[boolean, string, keyof ContainsConstraint]>)(
  'should return %s for query %s and method %s',
  (expectedResult, query, method) => {
    expect(new ContainsConstraint(query)[method]()).toEqual(expectedResult);
  }
);
