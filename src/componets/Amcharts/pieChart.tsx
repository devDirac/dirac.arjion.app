import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated.default);

interface ObjetoPie{
  category: string
  value: number
}

interface PieChartProps {
  data:ObjetoPie[]
  detalle:(d:any)=>void
}

const PieChart:React.FC<PieChartProps> = ({data, detalle}) => {
  useLayoutEffect(() => {
    let chart = am4core.create("chartdivssss", am4charts.PieChart);
    chart.logo.disabled = true;
    chart.data = data;
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.slices.template.tooltipText = "{category}: ${valor} ({value.percent.formatNumber('#.0')}%)";

    pieSeries.slices.template.events.on("hit", (ev: any) => {
      const clickedData = ev.target.dataItem.dataContext;
      detalle && detalle(clickedData);
  });
    chart.legend = new am4charts.Legend();
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="chartdivssss" style={{ width: "100%", height: "500px" }}></div>;
};

export default PieChart;
