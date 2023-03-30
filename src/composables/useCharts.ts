import { select } from 'd3';

// Import interfaces
import type { IGroupedDataSet } from '@interfaces/datasets';

export default () => {
  const stackedBarChart = (dataset: IGroupedDataSet[]) => {
    // Create the chart
    const svg = select('svg');

    return { svg };
  };

  return { stackedBarChart };
};
