import { MutableDataFrame } from '@grafana/data';
import { ContainsConstraint } from '@app/query/ContainsConstraint';
import { SingleSeriesFacetParser } from './SingleSeriesFacetParser';
import { SingleSeriesNoFacetParser } from './SingleSeriesNoFacetParser';
import { TimeSeriesFacetParser } from './TimeSeriesFacetParser';
import { TimeSeriesNoFacetParser } from './TimeSeriesNoFacetParser';
import {
  ResultDataWithTimeSeries,
  ResultDataWithFacets,
  TimeSeriesResult,
  SingleSeriesResult,
  ResultDataWithSingleSeriesResult,
} from '@src/externalTypes/NewRelic';

export interface Parser {
  parseResult(data: unknown, refId: string, alias: string): MutableDataFrame;
}

export class ResultParser {
  private readonly singleValueFacetParser = new SingleSeriesFacetParser();
  private readonly singleValueNoFacetParser = new SingleSeriesNoFacetParser();
  private readonly timeSeriesFacetParser = new TimeSeriesFacetParser();
  private readonly timeSeriesNoFacetParser = new TimeSeriesNoFacetParser();

  constructor(private readonly containsConstraint: ContainsConstraint) {}

  parseResult(data: unknown, refId: string): MutableDataFrame {
    if (this.containsConstraint.containsTimeSeries()) {
      return this.containsConstraint.containsFacet()
        ? this.timeSeriesFacetParser.parseResult(data as ResultDataWithFacets<TimeSeriesResult>, refId)
        : this.timeSeriesNoFacetParser.parseResult(data as ResultDataWithTimeSeries, refId);
    } else {
      return this.containsConstraint.containsFacet()
        ? this.singleValueFacetParser.parseResult(data as ResultDataWithFacets<SingleSeriesResult>, refId)
        : this.singleValueNoFacetParser.parseResult(data as ResultDataWithSingleSeriesResult, refId);
    }
  }
}
