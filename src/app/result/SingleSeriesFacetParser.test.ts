import { getResultDataWithSingleValueWithFacets } from '@test/factories/newRelicFactory';
import { SingleSeriesFacetParser } from './SingleSeriesFacetParser';

it('should return parsed data', () => {
  const data = getResultDataWithSingleValueWithFacets();

  const result = new SingleSeriesFacetParser().parseResult(data, 'refId');
  expect(result).toMatchInlineSnapshot(`
    Object {
      "fields": Array [
        Object {
          "config": Object {},
          "labels": undefined,
          "name": "facet1 count",
          "type": "number",
          "values": Array [
            1,
          ],
        },
        Object {
          "config": Object {},
          "labels": undefined,
          "name": "facet2 count",
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
