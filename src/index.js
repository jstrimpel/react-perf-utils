import ReactDefaultPerfAnalysis from 'react/lib/ReactDefaultPerfAnalysis';

const metricsMap = {
  render: 'render',
  mount: 'exclusive'
}

function getMetric(displayName, measurements, metric, avg) {
  const summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
  const metrics = summary.filter((metric) => {
    return displayName === metric.componentName;
  })[0];
  const value = metrics && metrics[metricsMap[metric]];

  return avg ? value / metrics.count : value;
}

module.exports = {
  getAvgRenderTime: function (displayName, measurements) {
    return getMetric(displayName, measurements, 'render', true);
  },

  getAvgMountTime: function (displayName, measurements) {
    return getMetric(displayName, measurements, 'mount', true);
  },

  getTotalRenderTime: function (displayName, measurements) {
    return getMetric(displayName, measurements, 'render', false);
  },

  getTotalMountTime: function (displayName, measurements) {
    return getMetric(displayName, measurements, 'mount', false);
  },

  getExclusiveSummary: ReactDefaultPerfAnalysis.getExclusiveSummary,

  getInclusiveSummary: ReactDefaultPerfAnalysis.getInclusiveSummary,

  getDOMSummary: ReactDefaultPerfAnalysis.getDOMSummary,

  getTotalTime: ReactDefaultPerfAnalysis.getTotalTime
};
