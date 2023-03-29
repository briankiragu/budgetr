import type { Component } from 'solid-js';
import * as d3 from 'd3';

const ExpensesReport: Component<{ dataset: number[][] }> = ({ dataset }) => {
  // Step 3
  const svg = d3.select('svg');
  const margin = 200;
  const width = parseInt(svg.attr('width'), 10) - margin; // 300
  const height = parseInt(svg.attr('height'), 10) - margin; // 200

  // Step 4
  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

  const g = svg.append('g').attr('transform', `translate(${100}, ${100})`);

  // Step 5
  // Title
  svg
    .append('text')
    .attr('x', width / 2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Line Chart');

  // X label
  svg
    .append('text')
    .attr('x', width / 2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Independant');

  // Y label
  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(60, ${height}) rotate(-90)`)
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Dependant');

  // Step 6
  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  g.append('g').call(d3.axisLeft(yScale));

  // Step 7
  svg
    .append('g')
    .selectAll('dot')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d[0]))
    .attr('cy', (d) => yScale(d[1]))
    .attr('r', 3)
    .attr('transform', `translate(${100}, ${100})`)
    .style('fill', '#CC0000');

  // Step 8
  const line = d3
    .line()
    .x((d: d3.NumberValue[]) => xScale(d[0]))
    .y((d: d3.NumberValue[]) => yScale(d[1]))
    .curve(d3.curveMonotoneX);

  svg
    .append('path')
    .datum(dataset)
    .attr('class', 'line')
    .attr('transform', `translate(${100}, ${100})`)
    .attr('d', line)
    .style('fill', 'none')
    .style('stroke', '#CC0000')
    .style('stroke-width', '2');

  return <svg width="500" height="400"></svg>;
};

export default ExpensesReport;
