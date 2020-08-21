import { MutableDataFrame, guessFieldTypeFromValue, FieldType } from '@grafana/data';
import { getSingleString, parseValueResult, parseTimeSeries } from './utils';
import { Parser } from './ResultParser';
import { TimeSeriesResult, ResultDataWithFacets } from '@src/externalTypes/NewRelic';

export class TimeSeriesFacetParser implements Parser {
  parseResult(data: ResultDataWithFacets<TimeSeriesResult>, refId: string): MutableDataFrame<any> {
    const dataSample = data.totalResult.total.results[0];
    const parsedValues = parseValueResult(dataSample);

    const fields = [
      { name: 'time', type: FieldType.time },
      ...data.facets!.flatMap(facet =>
        parsedValues.map(p => ({
          name: `${getSingleString(facet.name)} ${p.name}`,
          type: guessFieldTypeFromValue(p.value),
        }))
      ),
    ];

    const frames = new MutableDataFrame({
      refId,
      fields,
    });

    const pivotedFacets = data.facets.reduce((pivot, curr) => {
      const name = getSingleString(curr.name);
      parseTimeSeries(curr).forEach(item => {
        const { time, ...rest } = item;
        const restWithFacets = Object.keys(rest).reduce((result, key) => {
          result[`${name} ${key}`] = rest[key];
          return result;
        }, {} as Record<string, number>);

        pivot[time] = { ...(pivot[time] || {}), ...restWithFacets };
      });

      return pivot;
    }, {} as Record<string, Record<string, unknown>>);

    Object.entries(pivotedFacets).forEach(([time, facets]) => {
      frames.add({ time: Number(time), ...facets });
    });

    return frames;
  }
}
