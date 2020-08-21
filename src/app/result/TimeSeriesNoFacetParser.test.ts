import { getResultDataWithTimeSeriesWithoutFacets } from '@test/factories/newRelicFactory';
import { TimeSeriesNoFacetParser } from './TimeSeriesNoFacetParser';

it('should return parsed data', () => {
  const data = getResultDataWithTimeSeriesWithoutFacets();

  const result = new TimeSeriesNoFacetParser().parseResult(data, 'refId');
  expect(result).toMatchInlineSnapshot(`
    Object {
      "fields": Array [
        Object {
          "config": Object {},
          "labels": undefined,
          "name": "time",
          "type": "time",
          "values": Array [
            1000,
            1500,
          ],
        },
        Object {
          "config": Object {},
          "labels": undefined,
          "name": "count",
          "type": "number",
          "values": Array [
            1,
            2,
          ],
        },
      ],
      "meta": undefined,
      "name": undefined,
      "refId": "refId",
    }
  `);
});
