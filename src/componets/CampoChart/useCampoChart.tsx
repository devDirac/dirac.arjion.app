import type { CampoChartProps } from "./types"
import { getDataBarSimple, getLabels, getOptionsCHarts } from '../../utils';
import { saveAs } from 'file-saver';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    LineElement,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect } from "react";


export const useCampoChart = ( props: CampoChartProps ) => {

    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        RadialLinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Filler,
        Legend,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
    );

    const options = getOptionsCHarts(props?.esVertical, props?.esApilado, props?.titulo, props?.unidades || '');
    const labels = getLabels(props?.datos || []);
    const data: any = {
        labels,
        datasets: getDataBarSimple(props?.datos || [], props?.rellenaEspacioEnlineal)?.datasets
    };
    const saveCanvas = (id: any) => {
        const canvasSave: any = document.getElementById(id);
        canvasSave && canvasSave.toBlob(function (blob: any) {
            saveAs(blob, `${props?.titulo}.png`);
        });
    }

    useEffect(() => {
        window.dispatchEvent(new Event('resize')); // Fuerza el redimensionamiento en iOS
      }, []);

    return {
        saveCanvas,
        data,
        options
    }
}