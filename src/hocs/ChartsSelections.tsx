import React, { useRef, MouseEvent } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  InteractionItem,
} from 'chart.js';

import {
  getDatasetAtEvent,
  getElementAtEvent
} from "react-chartjs-2";

interface ChartsProps {
  component?: any;
  type: any
  onClick: any
  options: any
  id: any
  data: any
}

const ChartsSelected: React.FC<ChartsProps> = (
  props: ChartsProps
) => {
  const chartRef = useRef<ChartJS>(null);
  const returnDataClick = (element: InteractionItem[], c: any) => {
    if (!element.length) return;
    const datasetIndex = element[c].datasetIndex;
    const { index } = element[c];
    return {
      longitudElementos: element.length,
      label: props?.data.datasets[datasetIndex].label,
      detalle: { labels: props?.data.labels[index], data: props?.data.datasets[datasetIndex].data[index] }
    }
  }
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    const index = getElementAtEvent((chartRef as any).current, event)?.[0]?.index;
    const clickReturn = returnDataClick(getDatasetAtEvent(chart, event), index);
    props?.onClick && props?.onClick(clickReturn);
  };
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Chart
        {...props}
        ref={chartRef}
        onClick={onClick}
      />
    </div>
  );
};

export default ChartsSelected;