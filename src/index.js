import ReactDefaultPerfAnalysis from "react-dom/lib/ReactPerf";
import assign from "object-assign";

const metricsMap = {
  render: "render",
  mount: "exclusive"
};

// copied from react/lib/ReactDefaultPerfAnalysis.js
// this is used when getting rendering and mounting times because
// ReactDefaultPerfAnalysis.getExclusiveSummary sets a minimum threshold of 1.2ms.
const DONT_CARE_THRESHOLD = 0;
function getExclusiveSummary(measurements) {
  var candidates = {};
  var displayName;

  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);

    for (var id in allIDs) {
      displayName = measurement.displayNames[id].current;

      candidates[displayName] = candidates[displayName] || {
        componentName: displayName,
        inclusive: 0,
        exclusive: 0,
        render: 0,
        count: 0
      };
      if (measurement.render[id]) {
        candidates[displayName].render += measurement.render[id];
      }
      if (measurement.exclusive[id]) {
        candidates[displayName].exclusive += measurement.exclusive[id];
      }
      if (measurement.inclusive[id]) {
        candidates[displayName].inclusive += measurement.inclusive[id];
      }
      if (measurement.counts[id]) {
        candidates[displayName].count += measurement.counts[id];
      }
    }
  }
  // Now make a sorted array with the results.
  var arr = [];
  for (displayName in candidates) {
    if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
      arr.push(candidates[displayName]);
    }
  }

  arr.sort(function(a, b) {
    return b.exclusive - a.exclusive;
  });

  return arr;
}

function getMetric(displayName, measurements, metric, avg) {
  const summary = getExclusiveSummary(measurements);
  const metrics = summary.filter(metric => {
    return displayName === metric.componentName;
  })[0];
  const value = metrics && metrics[metricsMap[metric]];

  // component does not exist
  if (!metrics) {
    throw 'react-perf-utils: The compoent, "' +
      displayName +
      '"", does not exist in the measurements object.';
  }
  return avg ? value / metrics.count : value;
}

module.exports = {
  getAvgRenderTime: function(displayName, measurements) {
    return getMetric(displayName, measurements, "render", true);
  },

  getAvgMountTime: function(displayName, measurements) {
    return getMetric(displayName, measurements, "mount", true);
  },

  getTotalRenderTime: function(displayName, measurements) {
    return getMetric(displayName, measurements, "render", false);
  },

  getTotalMountTime: function(displayName, measurements) {
    return getMetric(displayName, measurements, "mount", false);
  },

  getExclusiveSummary: ReactDefaultPerfAnalysis.getExclusive,

  getInclusiveSummary: ReactDefaultPerfAnalysis.getInclusive,

  getDOMSummary: ReactDefaultPerfAnalysis.printOperations,

  getWasted: ReactDefaultPerfAnalysis.getWasted
};
