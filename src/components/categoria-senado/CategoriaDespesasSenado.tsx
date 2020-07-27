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

export function CategoriaDespesaSenado() {
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

    data.sort((a, b) => a.value - b.value);

    for (const d of data) {
      if (!groupData[d.year]) {
        groupData[d.year] = {
          year: d.year,
          data: [],
          total: 0,
        };
      }

      groupData[d.year].data.splice(0, 0, {
        ...d,
        start: groupData[d.year].total,
        end: groupData[d.year].total + d.value,
      });

      groupData[d.year].total += d.value;

      if (!keys.includes(d.description)) {
        keys.push(d.description);
      }
    }

    const dataByYear: Array<GroupCategoriaDespesa> = Object.values(groupData);

    const height = 400;

    const svg = d3
      .select('#categoria-despesa-senado')
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

    const groups = svg.selectAll('g').data(dataByYear).enter().append('g');

    const locale = d3.formatLocale({
      decimal: ',',
      thousands: '.',
      grouping: [3],
      currency: ['R$ ', ''],
    });

    const formatter = locale.format('$,.2f');

    groups
      .on('mouseenter', function (d) {
        const x =
          (xScale(xGroupAccessor(d)) as number) + xScale.bandwidth() / 2;

        const groupTooltip = svg
          .append('g')
          .attr('class', 'group-tooltip')
          .attr('pointer-events', 'none');

        groupTooltip
          .append('line')
          .attr('x1', x)
          .attr('y1', yScale(yMax))
          .attr('x2', x)
          .attr('y2', yScale(0))
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('opacity', 0.5);

        const tooltipContainer = groupTooltip
          .append('g')
          .attr(
            'transform',
            `translate(${x + (d.year >= 2018 ? -345 : 5)}, ${yScale(yMax)})`
          );

        tooltipContainer
          .append('rect')
          .attr('width', 340)
          .attr('height', 270)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('fill', '#fff')
          .attr('stroke', '#CCC');

        const tooltipHeader = tooltipContainer
          .append('g')
          .attr('transform', `translate(5, 0)`);

        tooltipHeader
          .append('text')
          .attr('font-size', 12)
          .attr('transform', 'translate(0, 15)')
          .text('Categoria');
        tooltipHeader
          .append('text')
          .attr('font-size', 12)
          .attr('transform', 'translate(330, 15)')
          .attr('text-anchor', 'end')
          .text('Valor');

        const tooltipBody = tooltipContainer
          .selectAll('g.data-row')
          .data(d.data)
          .enter()
          .append('g')
          .attr('class', 'data-row')
          .attr('transform', `translate(5, 0)`);

        tooltipBody
          .append('rect')
          .attr('width', 10)
          .attr('height', 10)
          .attr('rx', 2)
          .attr('ry', 2)
          .attr('fill', (d) => colorScale(d.description))
          .attr('transform', (d, i) => `translate(0, ${32 + i * 20})`)
          .text((d) => d.description);

        tooltipBody
          .append('text')
          .attr('font-size', 12)
          .attr('transform', (d, i) => `translate(15, ${40 + i * 20})`)
          .text((d) => d.description);

        tooltipBody
          .append('text')
          .attr('font-size', 12)
          .attr('transform', (d, i) => `translate(330, ${40 + i * 20})`)
          .attr('text-anchor', 'end')
          .text((d) => formatter(d.value));
      })
      .on('mouseleave', function () {
        d3.selectAll('.group-tooltip').remove();
      });

    groups
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

  return <div id="categoria-despesa-senado"></div>;
}
