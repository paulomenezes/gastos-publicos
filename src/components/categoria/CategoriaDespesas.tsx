import React, { useEffect } from 'react';
import * as d3 from 'd3';

import data from './data.json';

interface GroupCategoriaDespesa {
  year: number;
  data: CategoriaDespesa[];
  total: number;
}

interface CategoriaDespesa {
  year: number;
  description: string;
  value: number;
  start: number;
  end: number;
}

export function CategoriaDespesa() {
  useEffect(() => {
    const margin = {
      top: 10,
      bottom: 30,
      left: 70,
      right: 10,
    };

    const keys: string[] = [];
    const groupData: {
      [year: number]: GroupCategoriaDespesa;
    } = {};

    for (const d of data) {
      if (!groupData[d.year]) {
        groupData[d.year] = {
          year: d.year,
          data: [],
          total: 0,
        };
      }

      groupData[d.year].data.push({
        ...d,
        start: groupData[d.year].total,
        end: groupData[d.year].total + d.value,
      });

      groupData[d.year].total += d.value;

      if (!keys.includes(d.description)) {
        keys.push(d.description);
      }
    }

    console.log(groupData);

    const dataByYear: Array<GroupCategoriaDespesa> = Object.values(groupData);

    console.log(dataByYear);

    const height = 400;

    const svg = d3
      .select('#categoria-despesa')
      .append('svg')
      .attr('width', '100%')
      .attr('height', height);

    const width = svg.node()?.getBoundingClientRect().width as number;

    const xGroupAccessor = (d: GroupCategoriaDespesa) => d.year.toString();
    const yGroupAccessor = (d: GroupCategoriaDespesa) => d.total;

    const xAccessor = (d: CategoriaDespesa) => d.year.toString();
    const yAccessor = (d: CategoriaDespesa) => d.end;
    const y2Accessor = (d: CategoriaDespesa) => d.start;

    const yMax = d3.max(dataByYear, yGroupAccessor) as number;

    const xScale = d3
      .scaleBand()
      .domain(dataByYear.map(xGroupAccessor))
      .range([margin.left, width - margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeSet3).domain(keys);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .selectAll('g')
      .data(dataByYear)
      .enter()
      .append('g')
      .selectAll('rect')
      .data((d) => d.data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(xAccessor(d)) as number)
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(y2Accessor(d)) - yScale(yAccessor(d)))
      .attr('fill', (d) => colorScale(d.description))
      .attr('data-text', (d) => d.description);

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height - margin.bottom})`);

    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left}, 0)`);
  }, []);

  return <div id="categoria-despesa"></div>;
}
