import { isArray } from 'lodash';
import { ValueResult, TimeSeriesResult } from '@src/externalTypes/NewRelic';

export function getSingleString(value: string | string[]) {
  return isArray(value) ? value.join(' ') : value;
}

type ParsedValueResult = Array<{ name: string; value: number }>;

type ParsedTimeSeriesItem = { time: number; [key: string]: number };

function isPercentile(key: string, value: ValueResult[keyof ValueResult]): value is Record<number, number> {
  return key === 'percentiles';
}

function isNumberValue(key: string, value: ValueResult[keyof ValueResult]): value is number {
  return key !== 'percentiles';
}

export function parseValueResult(dataSample: ValueResult) {
  const parsedValues: ParsedValueResult = [];

  for (let dataKey in dataSample) {
    const value = dataSample[dataKey as keyof ValueResult];
    if (isPercentile(dataKey, value)) {
      for (let per in value) {
        parsedValues.push({ name: per, value: value[per] });
      }
    }

    if (isNumberValue(dataKey, value)) {
      parsedValues.push({ name: dataKey, value });
    }
  }

  return parsedValues;
}

export function pivotParsedValues(parsedValueResult: ParsedValueResult) {
  return parsedValueResult.reduce((agg, curr) => {
    agg[curr.name] = curr.value;
    return agg;
  }, {} as Record<string, number>);
}

export function parseTimeSeries(data: TimeSeriesResult) {
  const { timeSeries, total } = data;
  const startTime = total.beginTimeSeconds * 1000;

  const tick = Math.round(((total.endTimeSeconds - total.beginTimeSeconds) * 1000) / timeSeries.length);

  return timeSeries.reduce((result, timeSeriesItem, i) => {
    const time = tick < 1000 ? startTime + i * tick : timeSeriesItem.beginTimeSeconds * 1000;
    result.push({ time, ...pivotParsedValues(parseValueResult(timeSeriesItem.results[0])) });
    return result;
  }, [] as ParsedTimeSeriesItem[]);
}
