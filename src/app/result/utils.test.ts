import { getSingleString, parseValueResult, pivotParsedValues, parseTimeSeries } from './utils';
import { ValueResult } from '@src/externalTypes/NewRelic';
import { getResultDataWithTimeSeriesWithoutFacets } from '@test/factories/newRelicFactory';

describe(getSingleString.name, () => {
  it.each([
    ['string', 'string'],
    ['string a string b', ['string a', 'string b']],
  ])('should return %s for input %s', (expectedOutput, input) => {
    expect(getSingleString(input)).toEqual(expectedOutput);
  });
});

describe(parseValueResult.name, () => {
  it('should return parsed simple data', () => {
    const valueResult = { count: 123 } as ValueResult;

    expect(parseValueResult(valueResult)).toEqual([{ name: 'count', value: 123 }]);
  });

  it('should return parsed percentile data', () => {
    const valueResult = { percentiles: { 50: 123, 90: 321 } } as ValueResult;

    expect(parseValueResult(valueResult)).toEqual([
      { name: '50', value: 123 },
      { name: '90', value: 321 },
    ]);
  });
});

describe(pivotParsedValues.name, () => {
  it('should return pivoted data', () => {
    const valueResult = { percentiles: { 50: 123, 90: 321 } } as ValueResult;

    expect(pivotParsedValues(parseValueResult(valueResult))).toEqual({ 50: 123, 90: 321 });
  });
});

describe(parseTimeSeries.name, () => {
  const timeSeries = getResultDataWithTimeSeriesWithoutFacets();

  const result = parseTimeSeries(timeSeries);
  expect(result).toEqual([
    { time: 1000, count: 1 },
    { time: 1500, count: 2 },
  ]);
});
