import React, { useEffect } from 'react';
import * as d3 from 'd3';

import dataCamara from './data-camara.json';
import dataSenado from './data-senado.json';

interface CotaParlamentarData {
  year: number;
  value: number;
}

export function CotaParlamentar() {
  useEffect(() => {
    const margin = {
      top: 20,
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

    const keys = dataCamara.map(xAccessor);

    const yMax = d3.max(dataCamara, yAccessor) as number;

    const xScale = d3
      .scaleBand()
      .domain(dataCamara.map(xAccessor))
      .range([margin.left, width - margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(['camara', 'senado']);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const groups = svg.selectAll('g').data(keys).enter().append('g');

    const locale = d3.formatLocale({
      decimal: ',',
      thousands: '.',
      grouping: [3],
      currency: ['R$ ', ''],
    });

    const formatter = locale.format('$,.2f');

    groups
      .on('mouseenter', (d) => {
        const x = (xScale(d) as number) + xScale.bandwidth() / 2;

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
            `translate(${x + (+d >= 2019 ? -215 : 5)}, ${yScale(yMax)})`
          );

        tooltipContainer
          .append('rect')
          .attr('width', 210)
          .attr('height', 70)
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
          .attr('transform', 'translate(200, 15)')
          .attr('text-anchor', 'end')
          .text('Valor');

        const dataTooltip = [
          {
            key: 'camara',
            description: 'câmara',
            value: dataCamara.find((dt) => dt.year.toString() === d)
              ?.value as number,
          },
          {
            key: 'senado',
            description: 'senado',
            value: dataSenado.find((dt) => dt.year.toString() === d)
              ?.value as number,
          },
        ];

        const tooltipBody = tooltipContainer
          .selectAll('g.data-row')
          .data(dataTooltip)
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
          .attr('fill', (dt) => colorScale(dt.key))
          .attr('transform', (_, i) => `translate(0, ${32 + i * 20})`);

        tooltipBody
          .append('text')
          .attr('font-size', 12)
          .attr('transform', (_, i) => `translate(15, ${40 + i * 20})`)
          .text((dt) => dt.description);

        tooltipBody
          .append('text')
          .attr('font-size', 12)
          .attr('transform', (_, i) => `translate(200, ${40 + i * 20})`)
          .attr('text-anchor', 'end')
          .text((dt) => formatter(dt.value));
      })
      .on('mouseleave', () => {
        d3.selectAll('.group-tooltip').remove();
      });

    groups
      .selectAll('rect.camara')
      .data((d) => dataCamara.filter((dt) => dt.year.toString() === d))
      .enter()
      .append('rect')
      .attr('class', 'camara')
      .attr('x', (d) => xScale(xAccessor(d)) as number)
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', (d) => yScale(height) - yScale(yAccessor(d)))
      .attr('fill', colorScale('camara'));

    groups
      .selectAll('rect.senado')
      .data((d) => dataSenado.filter((dt) => dt.year.toString() === d))
      .enter()
      .append('rect')
      .attr('class', 'senado')
      .attr(
        'x',
        (d) => (xScale(xAccessor(d)) as number) + xScale.bandwidth() / 2
      )
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', (d) => yScale(height) - yScale(yAccessor(d)))
      .attr('fill', colorScale('senado'));

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height - margin.bottom})`);

    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left}, 0)`);

    const dataLegend = [
      {
        key: 'camara',
        description: 'câmara',
      },
      {
        key: 'senado',
        description: 'senado',
      },
    ];

    const legendGroup = svg.append('g').attr('class', 'legend');

    const legendBody = legendGroup
      .selectAll('g.data-row')
      .data(dataLegend)
      .enter()
      .append('g')
      .attr('class', 'data-row')
      .attr('transform', `translate(72, 0)`)
      .attr('cursor', 'pointer')
      .on('mouseenter', (d) => {
        const key = d.key === 'senado' ? 'camara' : 'senado';
        d3.selectAll(`rect.${key}`).attr('opacity', 0.5);
      })
      .on('mouseleave', () => {
        d3.selectAll('rect.senado').attr('opacity', 1);
        d3.selectAll('rect.camara').attr('opacity', 1);
      });

    legendBody
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', (d) => colorScale(d.key))
      .attr('transform', (_, i) => `translate(${i * 80}, 0)`);

    legendBody
      .append('text')
      .attr('font-size', 12)
      .attr('transform', (_, i) => `translate(${15 + i * 80}, 8)`)
      .text((d) => d.description);
  }, []);

  return <div id="cota-parlamentar"></div>;
}
