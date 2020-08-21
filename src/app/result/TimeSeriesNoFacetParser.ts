import { MutableDataFrame, FieldType, guessFieldTypeFromValue } from '@grafana/data';
import { parseValueResult, parseTimeSeries } from './utils';
import { Parser } from './ResultParser';
import { ResultDataWithTimeSeries } from '@src/externalTypes/NewRelic';

export class TimeSeriesNoFacetParser implements Parser {
  parseResult(data: ResultDataWithTimeSeries, refId: string): MutableDataFrame<any> {
    const dataSample = data.total.results[0];
    const parsedValues = parseValueResult(dataSample);

    const fields = [
      { name: 'time', type: FieldType.time },
      ...parsedValues.map(p => ({ name: p.name, type: guessFieldTypeFromValue(p.value) })),
    ];

    const frames = new MutableDataFrame({
      refId,
      fields,
    });

    parseTimeSeries(data).forEach(item => {
      frames.add({ ...item });
    });

    return frames;
  }
}
