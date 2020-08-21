import { getResultDataWithSingleValueWithoutFacets } from '@test/factories/newRelicFactory';
import { SingleSeriesNoFacetParser } from './SingleSeriesNoFacetParser';

it('should return parsed data', () => {
  const data = getResultDataWithSingleValueWithoutFacets();

  const result = new SingleSeriesNoFacetParser().parseResult(data, 'refId');
  expect(result).toMatchInlineSnapshot(`
    Object {
      "fields": Array [
        Object {
          "config": Object {},
          "labels": undefined,
          "name": "count",
          "type": "number",
          "values": Array [
            1,
          ],
        },
      ],
      "meta": undefined,
      "name": undefined,
      "refId": "refId",
    }
  `);
});
