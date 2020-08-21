import { ContainsConstraint } from '@app/query/ContainsConstraint';
import { ConstraintBuilder } from '@app/query/ConstraintBuilder';

export class Query {
  private _contains: ContainsConstraint;
  private _builder: ConstraintBuilder;

  constructor(private readonly input: string) {
    this._contains = new ContainsConstraint(input);
    this._builder = new ConstraintBuilder(input, this._contains);
  }

  get contains() {
    return this._contains;
  }

  get builder() {
    return this._builder;
  }

  valueOf() {
    return this.input;
  }

  toString() {
    return this.input;
  }
}
