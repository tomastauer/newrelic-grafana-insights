import { ConstraintBuilder } from './ConstraintBuilder';
import { ContainsConstraint } from './ContainsConstraint';

function getInstance(input: string) {
  return new ConstraintBuilder(input, new ContainsConstraint(input));
}

describe(ConstraintBuilder.prototype.withDateConstraints.name, () => {
  it.each([
    ['SOME QUERY SINCE 1 UNTIL 2', 'SOME QUERY SINCE 1 UNTIL 2'],
    ['SOME QUERY UNTIL 2', 'SOME QUERY UNTIL 2 since 3'],
    ['SOME QUERY SINCE 1', 'SOME QUERY SINCE 1 until 4'],
    ['SOME QUERY', 'SOME QUERY since 3 until 4'],
  ])('should correctly build query for %s', (input, expectedOutput) => {
    const result = getInstance(input).withDateConstraints(3, 4);

    expect(result.toString()).toEqual(expectedOutput);
  });
});

describe(ConstraintBuilder.prototype.withTimeSeriesClause.name, () => {
  it.each([
    ['SOME QUERY', 3000, 'SOME QUERY'],
    ['SOME QUERY TIMESERIES', 3000, 'SOME QUERY timeseries 3000'],
    ['SOME QUERY TIMESERIES', 1, 'SOME QUERY timeseries 3'],
  ] as Array<[string, number, string]>)('should correctly build query for %s', (input, interval, expectedOutput) => {
    const result = getInstance(input).withTimeSeriesClause(interval, 3000, 4000);

    expect(result.toString()).toEqual(expectedOutput);
  });
});
