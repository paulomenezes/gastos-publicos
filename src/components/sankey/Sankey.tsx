import React, { useEffect } from 'react';
import * as d3 from 'd3';

const dataInputFederal = [
  { name: 'Imposto de renda', type: 'Renda', value: 16.03 },
  { name: 'CSLL', type: 'Resultado da empresa', value: 3.22 },
  {
    name: 'Contribuição previdenciária',
    type: 'Salários e mão de obra',
    value: 15.4,
  },
  {
    name: 'Previdência de servidores',
    type: 'Salários e mão de obra',
    value: 0.73,
  },
  { name: 'FGTS', type: 'Salários e mão de obra', value: 4.96 },
  { name: 'Cofins', type: 'Consumo (bens e serviços)', value: 9.96 },
  { name: 'PIS/Pasep', type: 'Consumo (bens e serviços)', value: 2.64 },
  { name: 'IPI', type: 'Consumo (bens e serviços)', value: 2.25 },
  {
    name: 'Imposto sobre comércio exterior',
    type: 'Consumo (bens e serviços)',
    value: 1.7,
  },
  { name: 'IOF', type: 'Transações financeiras', value: 1.51 },
  { name: 'Outros', type: 'Outros', value: 7.24 },
];

const dataInputEstadual = [
  { name: 'Imposto de renda', type: 'Renda', value: 1.8 },
  { name: 'ICMS', type: 'Transações financeiras', value: 20.53 },
  { name: 'IPVA', type: 'Propriedades', value: 1.87 },
  {
    name: 'Previdência de servidores',
    type: 'Salários e mão de obra',
    value: 1.46,
  },
  { name: 'Outros', type: 'Outros', value: 1.5 },
];

const dataInputMunicipal = [
  { name: 'Imposto de renda', type: 'Renda', value: 0.75 },
  { name: 'ISS', type: 'Transações financeiras', value: 2.66 },
  { name: 'IPTU', type: 'Propriedades', value: 1.88 },
  {
    name: 'Previdência de servidores',
    type: 'Salários e mão de obra',
    value: 0.57,
  },
  { name: 'Outros', type: 'Outros', value: 1.32 },
];

const dataOutputFederal = [
  { name: 'Benefícios previdenciários', value: 21.8 },
  { name: 'Pessoal', value: 7.1 },
  { name: 'Inativos', value: 4.7 },
  { name: 'Saúde', value: 4.3 },
  { name: 'Despesas não obrigatórias do Executivo', value: 4.5 },
  { name: 'BPC', value: 2 },
  { name: 'Abono e seguro-desemprego', value: 2 },
  { name: 'Educação', value: 2.4 },
  { name: 'Outras despesas federais', value: 4.1 },
];

const dataOutputEstadual = [
  { name: 'Despesa com pessoal', value: 14.9 },
  { name: 'Investimentos', value: 1.8 },
  { name: 'Outras despesas estaduais', value: 11.7 },
];

const dataOutputMunicipal = [
  { name: 'Despesa com pessoal', value: 10.7 },
  { name: 'Investimentos', value: 0.9 },
  { name: 'Outras despesas', value: 7.1 },
];

export function Sankey() {
  useEffect(() => {
    const height = 1400;

    const svg = d3
      .select('#sankey')
      .append('svg')
      .attr('width', '100%')
      .attr('height', height);

    const lineGenerator = d3.line().curve(d3.curveMonotoneX);

    const groups = {
      federal: {
        x: 800,
        y: 150,
        width: 100,
        height: 400,
        name: 'FEDERAL',
        total: 'R$1,55 trilhão',
      },
      estadual: {
        x: 1000,
        y: 700,
        width: 100,
        height: 200,
        name: 'ESTADUAL',
        total: 'R$650,3 bilhões',
      },
      municipal: {
        x: 1200,
        y: 1050,
        width: 100,
        height: 150,
        name: 'MUNICIPAL',
        total: 'R$172 bilhões',
      },
    };

    let startFederal = 0;
    let endFederal = groups.federal.y;

    let startEstadual = groups.estadual.y - 50;
    let endEstadual = groups.estadual.y + 20;

    let startMunicipal = groups.municipal.y - 50;
    let endMunicipal = groups.municipal.y + 40;

    const linesInput = [
      dataInputFederal.map((d) => {
        const size = groups.federal.height * (d.value / 65.64);

        startFederal += size;
        endFederal += size;

        const returnObject = {
          size,
          name: d.name,
          value: d.value,
          type: d.type,
          x: 10,
          y: startFederal,
          line: lineGenerator([
            [390, startFederal],
            [500, startFederal],
            [groups.federal.x - 20, endFederal - size / 2],
            [groups.federal.x, endFederal - size / 2],
          ]),
        };

        startFederal += size / 2;

        return returnObject;
      }),
      dataInputEstadual.map((d) => {
        const size = groups.estadual.height * (d.value / 30.2);

        startEstadual += size;
        endEstadual += size;

        const returnObject = {
          size,
          name: d.name,
          value: d.value,
          type: d.type,
          x: 10,
          y: startEstadual,
          line: lineGenerator([
            [390, startEstadual],
            [500, startEstadual],
            [groups.estadual.x - 20, endEstadual - size / 2],
            [groups.estadual.x, endEstadual - size / 2],
          ]),
        };

        startEstadual += size / 2;

        return returnObject;
      }),
      dataInputMunicipal.map((d) => {
        const size = groups.municipal.height * (d.value / 9.8);

        startMunicipal += size;
        endMunicipal += size;

        const returnObject = {
          size,
          name: d.name,
          value: d.value,
          type: d.type,
          x: 10,
          y: startMunicipal,
          line: lineGenerator([
            [390, startMunicipal],
            [500, startMunicipal],
            [groups.municipal.x - 20, endMunicipal - size / 2],
            [groups.municipal.x, endMunicipal - size / 2],
          ]),
        };

        startMunicipal += size;

        return returnObject;
      }),
    ];

    let startOutputFederal = groups.federal.y;
    let endOutputFederal = groups.federal.y - 300;

    let startOutputEstadual = groups.estadual.y;
    let endOutputEstadual = groups.estadual.y - 80;

    let startOutputMunicipal = groups.municipal.y;
    let endOutputMunicipal = groups.municipal.y - 80;

    const linesOutput = [
      dataOutputFederal.map((d) => {
        const size = groups.federal.height * (d.value / 59);

        startOutputFederal += size;
        endOutputFederal += size * 2.1;

        return {
          size,
          name: d.name,
          value: d.value,
          x: 890 - groups.federal.width + groups.federal.x,
          y: endOutputFederal,
          line: lineGenerator([
            [
              groups.federal.width + groups.federal.x,
              startOutputFederal - size / 2,
            ],
            [
              groups.federal.width + groups.federal.x + 20,
              startOutputFederal - size / 2,
            ],
            [800 - groups.federal.width + groups.federal.x, endOutputFederal],
            [890 - groups.federal.width + groups.federal.x, endOutputFederal],
          ]),
        };
      }),
      dataOutputEstadual.map((d) => {
        const size = groups.estadual.height * (d.value / 32);

        startOutputEstadual += size;
        endOutputEstadual +=
          Math.max(...dataOutputEstadual.map((d) => d.value)) * 5;

        return {
          size,
          name: d.name,
          value: d.value,
          x: 690 - groups.estadual.width + groups.estadual.x,
          y: endOutputEstadual,
          line: lineGenerator([
            [
              groups.estadual.width + groups.estadual.x,
              startOutputEstadual - size / 2,
            ],
            [
              groups.estadual.width + groups.estadual.x + 20,
              startOutputEstadual - size / 2,
            ],
            [
              600 - groups.estadual.width + groups.estadual.x,
              endOutputEstadual,
            ],
            [
              690 - groups.estadual.width + groups.estadual.x,
              endOutputEstadual,
            ],
          ]),
        };
      }),
      dataOutputMunicipal.map((d) => {
        const size = groups.estadual.height * (d.value / 25);

        startOutputMunicipal += size;
        endOutputMunicipal +=
          Math.max(...dataOutputEstadual.map((d) => d.value)) * 5;

        return {
          size,
          name: d.name,
          value: d.value,
          x: 490 - groups.municipal.width + groups.municipal.x,
          y: endOutputMunicipal,
          line: lineGenerator([
            [
              groups.municipal.width + groups.municipal.x,
              startOutputMunicipal - size / 2,
            ],
            [
              groups.municipal.width + groups.municipal.x + 20,
              startOutputMunicipal - size / 2,
            ],
            [
              400 - groups.municipal.width + groups.municipal.x,
              endOutputMunicipal,
            ],
            [
              490 - groups.municipal.width + groups.municipal.x,
              endOutputMunicipal,
            ],
          ]),
        };
      }),
    ];

    const group = svg.append('g').attr('transform', 'translate(0, 50)');

    const extraPaths = [
      {
        color: '#DE5E6D',
        x: groups.federal.x + groups.federal.width - 10,
        y: endFederal - 35,
        name: 'Federal -> Estadual',
        value: 10,
        path: lineGenerator([
          [groups.federal.x + groups.federal.width - 10, endFederal - 35],
          [groups.federal.x + groups.federal.width + 10, endFederal - 25],
          [groups.estadual.x - 10, groups.estadual.y + 5],
          [groups.estadual.x + 10, groups.estadual.y + 15],
        ]),
      },
      {
        color: '#7591C1',
        x: groups.estadual.x + groups.estadual.width - 10,
        y: endEstadual - 15,
        name: 'Estadual -> Municipal',
        value: 10,
        path: lineGenerator([
          [groups.estadual.x + groups.estadual.width - 10, endEstadual - 15],
          [groups.estadual.x + groups.estadual.width + 10, endEstadual - 5],
          [groups.municipal.x - 10, groups.municipal.y + 5],
          [groups.municipal.x + 10, groups.municipal.y + 15],
        ]),
      },
      {
        color: '#DE5E6D',
        x: groups.federal.x + groups.federal.width - 10,
        y: endFederal - 15,
        name: 'Federal -> Municipal',
        value: 10,
        path: lineGenerator([
          [groups.federal.x + groups.federal.width - 10, endFederal - 15],
          [groups.federal.x + groups.federal.width + 10, endFederal - 5],
          [groups.federal.x + groups.federal.width + 50, 850],
          [groups.federal.x + groups.federal.width + 70, 900],
          [groups.municipal.x - 20, groups.municipal.y + 30],
          [groups.municipal.x, groups.municipal.y + 30],
        ]),
      },
    ];

    group
      .selectAll('path.extra-path')
      .data(extraPaths)
      .enter()
      .append('path')
      .attr('d', (d) => d.path)
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 20)
      .attr('fill', 'none')
      .attr('pointer-events', 'visibleStroke')
      .on('mouseover', function (d) {
        let { x, y } = d;

        x += 10;
        y += 20;

        d3.select(this).attr('stroke-opacity', 0.8);

        const groupTooltip = svg
          .append('g')
          .attr('class', 'group-tooltip')
          .attr('pointer-events', 'none');

        const tooltipContainer = groupTooltip
          .append('g')
          .attr('transform', `translate(${x}, ${y})`);

        tooltipContainer
          .append('rect')
          .attr('width', 200)
          .attr('height', 38)
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
          .attr('font-weight', 'bold')
          .attr('transform', 'translate(0, 15)')
          .text(d.name);

        tooltipHeader
          .append('text')
          .attr('font-size', 12)
          .attr('transform', 'translate(0, 30)')
          .text(`Porcentagem: ${d.value}%`);
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke-opacity', 1);
        d3.selectAll('.group-tooltip').remove();
      });

    const types = [
      { name: 'Renda', x: 0 },
      { name: 'Consumo (bens e serviços)', x: 80 },
      { name: 'Resultado da empresa', x: 320 },
      { name: 'Salários e mão de obra', x: 520 },
      { name: 'Transações financeiras', x: 740 },
      { name: 'Propriedades', x: 950 },
      { name: 'Outros', x: 1080 },
    ];

    const typeColors = d3
      .scaleOrdinal()
      .domain(types.map((t) => t.name))
      .range([
        '#DE5E6D',
        '#7591C0',
        '#E9B8BB',
        '#384A78',
        '#3572B0',
        '#8B4C92',
        '#868686',
      ]);

    const groupLegend = group.append('g').attr('class', 'legend');

    const groupLegendItem = groupLegend
      .selectAll('g.legend-item')
      .data(types)
      .enter()
      .append('g')
      .attr('transform', 'translate(390, 0)');

    groupLegendItem
      .append('rect')
      .attr('x', (d) => d.x)
      .attr('y', 10)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d) => typeColors(d.name) as string);

    groupLegendItem
      .append('text')
      .attr('x', (d) => 20 + d.x)
      .attr('y', 22)
      .text((d) => d.name);

    const groupAllInputs = group
      .selectAll('g.input')
      .data(linesInput)
      .enter()
      .append('g')
      .attr('class', 'input');

    const groupInput = groupAllInputs
      .selectAll('g.input-group')
      .data((d) => d)
      .enter()
      .append('g')
      .attr('class', 'input-group');

    groupInput
      .append('path')
      .attr('d', (d) => d.line)
      .attr('stroke', (d) => typeColors(d.type) as string)
      .attr('stroke-width', (d) => d.size)
      .attr('fill', 'none')
      .attr('pointer-events', 'visibleStroke')
      .on('mouseover', function (d) {
        let { x, y } = d;

        x += 170;

        d3.select(this).attr('stroke-opacity', 0.8);

        const groupTooltip = svg
          .append('g')
          .attr('class', 'group-tooltip')
          .attr('pointer-events', 'none');

        const tooltipContainer = groupTooltip
          .append('g')
          .attr('transform', `translate(${x}, ${y})`);

        tooltipContainer
          .append('rect')
          .attr('width', 200)
          .attr('height', 38)
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
          .attr('font-weight', 'bold')
          .attr('transform', 'translate(0, 15)')
          .text(d.name);

        tooltipHeader
          .append('text')
          .attr('font-size', 12)
          .attr('transform', 'translate(0, 30)')
          .text(`Porcentagem: ${d.value}%`);
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke-opacity', 1);
        d3.selectAll('.group-tooltip').remove();
      });

    groupInput
      .append('text')
      .attr('x', (d) => d.x + 370)
      .attr('y', (d) => d.y + 5)
      .attr('text-anchor', 'end')
      .attr('font-size', 12)
      .text((d) => d.name);

    const groupAllOutputs = group
      .selectAll('g.output')
      .data(linesOutput)
      .enter()
      .append('g')
      .attr('class', 'output');

    const groupOutput = groupAllOutputs
      .selectAll('g.output-group')
      .data((d) => d)
      .enter()
      .append('g')
      .attr('class', 'output-group');

    groupOutput
      .append('path')
      .attr('d', (d) => d.line)
      .attr('stroke', '#C0C0C0')
      .attr('stroke-width', (d) => d.size)
      .attr('fill', 'none')
      .attr('pointer-events', 'visibleStroke')
      .on('mouseover', function (d) {
        let { x, y } = d;

        x += 10;
        y += 20;

        d3.select(this).attr('stroke-opacity', 0.8);

        const groupTooltip = svg
          .append('g')
          .attr('class', 'group-tooltip')
          .attr('pointer-events', 'none');

        const tooltipContainer = groupTooltip
          .append('g')
          .attr('transform', `translate(${x}, ${y})`);

        tooltipContainer
          .append('rect')
          .attr('width', 200)
          .attr('height', 38)
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
          .attr('font-weight', 'bold')
          .attr('transform', 'translate(0, 15)')
          .text(d.name);

        tooltipHeader
          .append('text')
          .attr('font-size', 12)
          .attr('transform', 'translate(0, 30)')
          .text(`Porcentagem: ${d.value}%`);
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke-opacity', 1);
        d3.selectAll('.group-tooltip').remove();
      });

    groupOutput
      .append('text')
      .attr('x', (d) => d.x + 10)
      .attr('y', (d) => d.y + 5)
      .attr('font-size', 12)
      .text((d) => d.name);

    const groupTotal = group
      .selectAll('g.total')
      .data(Object.values(groups))
      .enter()
      .append('g')
      .attr('class', 'total');

    groupTotal
      .append('rect')
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y);

    groupTotal
      .append('text')
      .attr('x', (d) => d.x + d.width / 2)
      .attr('y', (d) => d.y + d.height / 2 - 30)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .text((d) => d.name);

    groupTotal
      .append('text')
      .attr('x', (d) => d.x + d.width / 2)
      .attr('y', (d) => d.y + d.height / 2 - 30 + 30)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text('Total');

    groupTotal
      .append('text')
      .attr('x', (d) => d.x + d.width / 2)
      .attr('y', (d) => d.y + d.height / 2 - 30 + 45)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text('arrecadado');

    groupTotal
      .append('text')
      .attr('x', (d) => d.x + d.width / 2)
      .attr('y', (d) => d.y + d.height / 2 - 30 + 60)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text((d) => d.total);
  }, []);

  return <div id="sankey"></div>;
}
