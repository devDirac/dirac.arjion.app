import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated.default);

const ColumnasChartGac: React.FC<any> = ({ data, categoria, detalle }) => {
    useEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.logo.disabled = true;
        chart.data = data.map((item: any) => ({
            [categoria]: item?.[categoria],
            suma_importe: item.suma_importe,
            suma_importe_en_pesos: item.suma_importe_en_pesos
        }));
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = categoria;
        categoryAxis.renderer.grid.template.location = 0;

        categoryAxis.renderer.labels.template.fontSize = 12; // Tamaño de fuente para el eje X
        

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = Math.max(...data.map((item: any) => Math.max(item.suma_importe, item.suma_importe_en_pesos))) * 1.1; 
        valueAxis.extraMin = 0.1;
        valueAxis.minZoomCount = 15; 
        valueAxis.renderer.labels.template.fontSize = 12; // Tamaño de fuente para el eje Y

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomXY"; 
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.yAxis = valueAxis;

        const firstSeries = chart.series.getIndex(0);
        if (firstSeries) {
            chart.cursor.snapToSeries = firstSeries;
        }

        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();
        function createSeries(field: any, name: any) {
            let series = chart.series.push(new am4charts.ColumnSeries());

            series.dataFields.valueY = field;
            series.dataFields.categoryX = categoria;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.columns.template.width = am4core.percent(60);
            series.columns.template.height = am4core.percent(115);

            series.stacked = false;
            series.columns.template.events.on("hit", (ev: any) => {
                const clickedData = ev.target.dataItem.dataContext;
                detalle && detalle(clickedData);
            });
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;  // Hacer el cursor como "mano"
        }
        createSeries("suma_importe", "Suma Importe");
        createSeries("suma_importe_en_pesos", "Suma Importe en Pesos");
        chart.legend = new am4charts.Legend();
        chart.cursor = new am4charts.XYCursor();
        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>;
};

export default ColumnasChartGac;
