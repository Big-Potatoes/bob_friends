import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const PeopleCountPie = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    startAngle={-90}
    endAngle={90}
    innerRadius={0.65}
    padAngle={1}
    cornerRadius={1}
    activeOuterRadiusOffset={8}
    borderWidth={0}
    colors={[`var(--maincolor)`, `var(--black-100)`]}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    enableArcLabels={false}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 2]],
    }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    legends={[]}
  />
)

export default PeopleCountPie
