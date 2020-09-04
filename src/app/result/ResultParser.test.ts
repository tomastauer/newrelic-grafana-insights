import { ResultParser } from './ResultParser';
import { TimeSeriesFacetParser } from './TimeSeriesFacetParser';
import { TimeSeriesNoFacetParser } from './TimeSeriesNoFacetParser';
import { SingleSeriesFacetParser } from './SingleSeriesFacetParser';
import { SingleSeriesNoFacetParser } from './SingleSeriesNoFacetParser';
import { ContainsConstraint } from '../query/ContainsConstraint';

let mapping: Record<string, Function>;

beforeEach(() => {
  mapping = {
    timeSeriesFacetParse: jest.fn(),
    timeSeriesNoFacetParse: jest.fn(),
    singleValueFacetParse: jest.fn(),
    singleValueNoFacetParse: jest.fn(),
  };

  (TimeSeriesFacetParser as jest.Mock) = jest
    .fn()
    .mockImplementation(() => ({ parseResult: mapping.timeSeriesFacetParse }));
  (TimeSeriesNoFacetParser as jest.Mock) = jest
    .fn()
    .mockImplementation(() => ({ parseResult: mapping.timeSeriesNoFacetParse }));
  (SingleSeriesFacetParser as jest.Mock) = jest
    .fn()
    .mockImplementation(() => ({ parseResult: mapping.singleValueFacetParse }));
  (SingleSeriesNoFacetParser as jest.Mock) = jest
    .fn()
    .mockImplementation(() => ({ parseResult: mapping.singleValueNoFacetParse }));
});

describe(ResultParser.name, () => {
  it.each([
    ['SELECT QUERY', 'singleValueNoFacetParse'],
    ['SELECT QUERY FACET a', 'singleValueFacetParse'],
    ['SELECT QUERY TIMESERIES', 'timeSeriesNoFacetParse'],
    ['SELECT QUERY TIMESERIES FACET a', 'timeSeriesFacetParse'],
  ] as Array<[string, string]>)('should for query %s call %s', (query, parser) => {
    new ResultParser(new ContainsConstraint(query)).parseResult({}, 'refId');

    expect(mapping[parser]).toHaveBeenCalled();
  });
});
