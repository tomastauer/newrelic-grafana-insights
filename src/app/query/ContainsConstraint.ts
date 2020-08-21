import { keywords } from './constants';

type ValueOf<T> = T[keyof T];

export class ContainsConstraint {
  constructor(private readonly input: string) {}

  private containsKeyword(keyword: ValueOf<typeof keywords>) {
    const regexp = new RegExp(String.raw`^${keyword}|\s${keyword}$|\s${keyword}\s`, 'gmi');
    return regexp.test(this.input);
  }

  containsSince() {
    return this.containsKeyword(keywords.since);
  }

  containsUntil() {
    return this.containsKeyword(keywords.until);
  }

  containsFacet() {
    return this.containsKeyword(keywords.facet);
  }

  containsTimeSeries() {
    return this.containsKeyword(keywords.timeSeries);
  }
}
