import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onNrqlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, nrql: event.target.value });
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { nrql } = query;

    return (
      <div className="gf-form-inline">
        <div className="gf-form gf-form--grow">
          <label className="gf-form-label query-keyword width-7">NRQL</label>
          <input type="text" className="gf-form-input" value={nrql} onChange={this.onNrqlChange} />
        </div>
      </div>
    );
  }
}
