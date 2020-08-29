# New Relic Insights – Grafana data source plugin

![Build](https://github.com/tomastauer/newrelic-grafana-insights/workflows/Build/badge.svg)

Allows querying the New Relic Insights using NRQL and display the data inside the Grafana dashboard.

## Getting started
Download the latest release and unpack the `dist.zip` file to your `grafana` plugins directory (e.g. `/usr/local/var/lib/grafana/plugins`)
a 
Go to the plugin settings and enter your New relic appId and token (it has to have rights to query New relic server using NRQL)

After this, it should appear as a data source inside the dropdown in your dashboard widgets.

## Supported queries
Support of queries is very limited, currently four main types of queries are supported.

- queries with `TIMESERIES`
- queries with `TIMESERIES` and with facets
- queries with single value record
- queries with single value record and with facets

## Timerange
Plugin is using the time range provided by grafana and extends the query with it using the following rules:

- if query does not contain `SINCE`, lower time boundary from the `grafana` time range is applied; otherwise, value from the query is used
- if query does not contain `UNTIL`, upper time boundary from the `grafana` time range is applied; otherwise, value from the query is used

## Timeseries
By adding `TIMESERIES` into the query, plugin will switch between two modes:

1. no `TIMESERIES`, only single record is returned (it can contain more values). This cannot be represented using the chart visualization
2. `TIMESERIES` is provided in the query, time series result is returned. This is suitable for being represented by charts.

### New relic bucket limitations

New relic allows to return only 366 buckets per query. Interval for the query is changed to be compliant with this limitation. This means, that interval settings from `grafana` might not be taken into account if the number of buckets would exceed the limit.

Same applies for the `TIMESERIES` argument. It is omitted during the processing as ideal bucket size is computed based on the time range.

## Examples
Queries in the following list are tested and supported

```nrql
SELECT percentile(duration, 50, 95, 99) FROM Transaction WHERE appName = 'my app name' TIMESERIES FACET appName

SELECT average(duration) FROM Transaction where appName = 'my app name' FACET appName, containerId

SELECT rate(count(*), 1 second) FROM Transaction WHERE appName = 'my app name'

SELECT count(*) FORM Transaction SINCE '2019-01-01' UNTIL '2020-01-10'
```
