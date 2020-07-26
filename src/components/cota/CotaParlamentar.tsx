import React, { useEffect } from 'react';
import * as d3 from 'd3';

import data from './data.json';

interface CotaParlamentarData {
  year: number;
  value: number;
}

export function CotaParlamentar() {
  useEffect(() => {
    const margin = {
      top: 10,
      bottom: 30,
      left: 70,
      right: 10,
    };

    const height = 400;

    const svg = d3
      .select('#cota-parlamentar')
      .append('svg')
      .attr('width', '100%')
      .attr('height', height);

    const width = svg.node()?.getBoundingClientRect().width as number;

    const xAccessor = (d: CotaParlamentarData) => d.year.toString();
    const yAccessor = (d: CotaParlamentarData) => d.value;

    const yMax = d3.max(data, yAccessor) as number;

    const xScale = d3
      .scaleBand()
      .domain(data.map(xAccessor))
      .range([margin.left, width - margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(xAccessor(d)) as number)
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(height) - yScale(yAccessor(d)))
      .attr('fill', '#90CDF4');

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height - margin.bottom})`);

    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left}, 0)`);
  }, []);

  return <div id="cota-parlamentar"></div>;
}
