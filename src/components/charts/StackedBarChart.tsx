import type { IStackedDataSet } from '@interfaces/datasets';
import { scaleBand, scaleLinear, select } from 'd3';
import type { Component } from 'solid-js';

const StackedBarChart: Component<{
  dataset: IStackedDataSet;
  width?: number;
  height?: number;
}> = ({ dataset, width = 500, height = 500 }) => {
  // Get the axis scales.
  const xScale = scaleBand().range([0, width]);
  const yScale = scaleLinear().range([height, 0]);

  // Get the axis values
  const xDomain = Object.keys(Object.values(dataset)[0]);
  const yDomain = Object.values(Object.values(dataset)[0]);

  // Get the axis domains.
  xScale.domain(xDomain);
  yScale.domain([0, Math.max(...yDomain)]);

  // Capture the SVG element.
  const svg = select('#stacked-bar-chart')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect')
    .data(yDomain)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(d))
    .attr('y', (d) => yScale(d))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height - yScale(d));

  return <svg id="stacked-bar-chart"></svg>;
};

export default StackedBarChart;
