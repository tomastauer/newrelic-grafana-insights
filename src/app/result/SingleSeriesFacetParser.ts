import { MutableDataFrame, guessFieldTypeFromValue } from '@grafana/data';
import { getSingleString, parseValueResult } from './utils';
import { Parser } from './ResultParser';
import { ResultDataWithFacets, SingleSeriesResult } from '@src/externalTypes/NewRelic';

export class SingleSeriesFacetParser implements Parser {
  parseResult(data: ResultDataWithFacets<SingleSeriesResult>, refId: string): MutableDataFrame<any> {
    const dataSample = data.totalResult.results[0];
    const parsedValues = parseValueResult(dataSample);

    const fields = [
      ...data.facets!.flatMap(facet =>
        parsedValues.map(p => ({
          name: `${getSingleString(facet.name)} ${p.name}`,
          type: guessFieldTypeFromValue(p.value),
        }))
      ),
    ];

    const frames = new MutableDataFrame({
      refId: refId,
      fields,
    });

    const pivotedFacets = data.facets.reduce((pivot, curr) => {
      const name = getSingleString(curr.name);

      parsedValues.forEach(item => {
        pivot[`${name} ${item.name}`] = item.value;
      });
      return pivot;
    }, {} as Record<string, number>);

    frames.add({ ...pivotedFacets });

    return frames;
  }
}
