import { ContainsConstraint } from './ContainsConstraint';
import { keywords } from './constants';
import { Query } from '@domain/Query';

export class ConstraintBuilder {
  constructor(private readonly input: string, private readonly containsConstraint: ContainsConstraint) {}

  withDateConstraints(from: number, to: number) {
    const sinceConstraint = this.containsConstraint.containsSince() ? '' : `${keywords.since} ${from}`;
    const untilConstraint = this.containsConstraint.containsUntil() ? '' : `${keywords.until} ${to}`;

    return new Query([this.input, sinceConstraint, untilConstraint].filter(i => i !== '').join(' '));
  }

  withTimeSeriesClause(intervalMs: number, from: number, to: number) {
    if (!this.containsConstraint.containsTimeSeries()) {
      return this.input;
    }

    const minimalBucketSize = Math.ceil((to - from) / 366);

    const bucketSize = Math.max(intervalMs, minimalBucketSize);
    const timeSeriesConstraint = `${keywords.timeSeries} ${bucketSize}`;

    return new Query(`${this.input.replace(new RegExp(keywords.timeSeries, 'gi'), '')}${timeSeriesConstraint}`);
  }
}
