import { ContainsConstraint } from '@app/query/ContainsConstraint';
import { ResultParser } from '@app/result/ResultParser';

export class NewRelicResult {
  private readonly _resultParser: ResultParser;

  constructor(containsConstraint: ContainsConstraint) {
    this._resultParser = new ResultParser(containsConstraint);
  }

  parse(data: unknown, refId: string) {
    return this._resultParser.parseResult(data, refId);
  }
}
