import { getResultDataWithTimeSeriesAndFacets } from '@test/factories/newRelicFactory';
import { TimeSeriesFacetParser } from './TimeSeriesFacetParser';

it('should return parsed data', () => {
  const data = getResultDataWithTimeSeriesAndFacets();

  const result = new TimeSeriesFacetParser().parseResult(data, 'refId');
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
          "name": "facet1 count",
          "type": "number",
          "values": Array [
            1,
            2,
          ],
        },
        Object {
          "config": Object {},
          "labels": undefined,
          "name": "facet2 count",
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
