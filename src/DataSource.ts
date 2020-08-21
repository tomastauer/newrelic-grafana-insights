import defaults from 'lodash/defaults';
import { BackendSrv, BackendSrvRequest } from '@grafana/runtime';
import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';

import { MyQuery, MyDataSourceOptions, defaultQuery } from './types';
import { Query } from './domain/Query';
import { NewRelicResult } from './domain/NewRelicResult';
import { ResultWithData } from './externalTypes/NewRelic';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  constructor(
    private readonly instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>,
    private readonly backendSrv: BackendSrv
  ) {
    super(instanceSettings);
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const { range, intervalMs } = options;
    const from = range!.from.valueOf();
    const to = range!.to.valueOf();

    const data = await Promise.all(
      options.targets.map(async target => {
        const plainQuery = defaults(target, defaultQuery);
        const query = new Query(plainQuery.nrql);

        const finalQuery = query.builder
          .withDateConstraints(from, to)
          .builder.withTimeSeriesClause(intervalMs ?? 0, from, to)
          .toString();

        const request: BackendSrvRequest = {
          method: 'GET',
          url: `${this.instanceSettings.url}/insightsquery?nrql=${encodeURI(finalQuery)}`,
          body: '{ "query":  "{ requestContext { userId apiKey } }" }',
        };

        const result = (await this.backendSrv.datasourceRequest(request)) as ResultWithData;

        return new NewRelicResult(query.contains).parse(result.data, plainQuery.refId);
      })
    );

    return { data };
  }

  async testDatasource() {
    const request: BackendSrvRequest = {
      method: 'GET',
      url: `${this.instanceSettings.url}/insightsquery?nrql=${encodeURI('SELECT count(*) FROM Transaction')}`,
      body: '{ "query":  "{ requestContext { userId apiKey } }" }',
    };

    try {
      await this.backendSrv.datasourceRequest(request);
      return {
        status: 'success',
        message: 'Success',
      };
    } catch (e) {
      return {
        status: 'failure',
        message: e,
      };
    }
  }
}
