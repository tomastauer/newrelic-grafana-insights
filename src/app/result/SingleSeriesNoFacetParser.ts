import { MutableDataFrame, guessFieldTypeFromValue } from '@grafana/data';
import { Parser } from './ResultParser';
import { ResultDataWithSingleSeriesResult } from '@src/externalTypes/NewRelic';
import { parseValueResult, pivotParsedValues } from './utils';

export class SingleSeriesNoFacetParser implements Parser {
  parseResult(data: ResultDataWithSingleSeriesResult, refId: string): MutableDataFrame<any> {
    const dataSample = data.results[0];
    const parsedValues = parseValueResult(dataSample);

    const fields = [...parsedValues.map(p => ({ name: p.name, type: guessFieldTypeFromValue(p.value) }))];

    const frames = new MutableDataFrame({
      refId,
      fields,
    });

    pivotParsedValues(parsedValues);

    frames.add({ ...pivotParsedValues(parsedValues) });

    return frames;
  }
}
