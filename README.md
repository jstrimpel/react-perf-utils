# react-perf-utils
A small library that provides access to the algorithms that are used for the pretty print
functions in [`react-addons-perf`](https://facebook.github.io/react/docs/perf.html)
and a handful of simple functions that can be used to measure against rendering performance
budgets when testing.

See [`react-addons-perf`](https://facebook.github.io/react/docs/perf.html) for more information on
how to collect measurements.

## API
See `react/lib/ReactDefaultPerfAnalysis.js` for more information on `getExclusiveSummary`,
`getInclusiveSummary`, `getDOMSummary`, and `getTotalTime`.

### Setup
All API examples assume that the following code has been executed:

```javascript
import ReactDOM from "react-dom";
import Perf from 'react-addons-perf';
import MyApp from './my-app';

// start -> render -> stop -> get measurements
Perf.start();
ReactDOM.render(<MyApp />, document.getElementById('root'));
Perf.stop();
```

### `getAvgRenderTime`
The average rendering time for all instances of a given component.

```javascript
const measurements = Perf.getLastMeasurements();
const avgRenderTime = PerfUtils.getAvgRenderTime('SomeCmpName', measurements);
```

### `getAvgMountTime`
The average mount time for all instances of a given component.

```javascript
const measurements = Perf.getLastMeasurements();
const avgMountTime = PerfUtils.getAvgMountTime('SomeCmpName', measurements);
```

### `getTotalRenderTime`
The total rendering time for all instances of a given component.

```javascript
const measurements = Perf.getLastMeasurements();
const totalRenderTime = PerfUtils.getTotalRenderTime('SomeCmpName', measurements);
```

### `getTotalMountTime`
The total mount time for all instances of a given component.

```javascript
const measurements = Perf.getLastMeasurements();
const totalMountTime = PerfUtils.getTotalMountTime('SomeCmpName', measurements);
```