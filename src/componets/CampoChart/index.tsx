import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ChartsSelected from '../../hocs/ChartsSelections';
import DinamicTable from '../DinamicTable';
import Indicator from '../Indicator';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import type { CampoChartProps } from './types';
import { useCampoChart } from './useCampoChart';
import './style.scss';
import DinamicTableMejorada from '../DinamicTableMejorada/DinamicTableMejorada';

const CampoChart: React.FC<CampoChartProps> = (props: CampoChartProps) => {
    const {
        saveCanvas,
        data,
        options
    } = useCampoChart(props);
    
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {props?.tipoGrafica !== 'tabla' && props?.tipoGrafica !== 'indicador' ? <IconButton onClick={() => {
                saveCanvas(props?.id);
            }} style={{
                color: '#157efb', float: 'right'
            }}>
                <SaveAltIcon />
            </IconButton> : null}

            {props?.enAccionDelete ? <IconButton onClick={() => {
                props?.enAccionDelete && props?.enAccionDelete(props?.id);
            }} style={{
                color: 'rgba(255, 99, 132, 1)', float: 'right'
            }}>
                <DeleteIcon />
            </IconButton> : null}
            {
                !(props?.datos || []).length && <p>Sin datos disponibles</p>
            }

            <div className='chart-container' style={{ width: '100%', height: props?.height ? props?.height : '400px' }}>
                {/*  grafica de barras */}
                {props?.tipoGrafica === 'barras' && (props?.datos || []).length ? <ChartsSelected id={props?.id} onClick={(d: any) => {
                    props?.click && props?.click(d, data)
                }} type={'bar'} options={options} data={data} /> : null}
                {/* grafica de lineas */}
                {props?.tipoGrafica === 'lineas' && (props?.datos || []).length ? <ChartsSelected id={props?.id} onClick={(d: any) => {
                    props?.click && props?.click(d, data)
                }} type={'line'} options={options} data={data} /> : null}
                {/* grafica de pay */}
                {props?.tipoGrafica === 'pay' && (props?.datos || []).length ? <ChartsSelected id={props?.id} onClick={(d: any) => {
                    props?.click && props?.click(d, data)
                }} type={'pie'} options={options} data={data} /> : null}
                {/* grafica de dona */}
                {props?.tipoGrafica === 'dona' && (props?.datos || []).length ? <ChartsSelected id={props?.id} onClick={(d: any) => {
                    props?.click && props?.click(d, data)
                }} type={'doughnut'} options={options} data={data} /> : null}
                {/* grafica polar */}
                {props?.tipoGrafica === 'polar' && (props?.datos || []).length ? <ChartsSelected id={props?.id} onClick={(d: any) => {
                    props?.click && props?.click(d, data)
                }} type={'polarArea'} options={options} data={data} /> : null}
                {/* grafica radar */}
                {props?.tipoGrafica === 'radar' && (props?.datos || []).length ? <ChartsSelected id={props?.id} onClick={(d: any) => {
                    props?.click && props?.click(d, data)
                }} type={'radar'} options={options} data={data} /> : null}
                {/* grafica tabla */}
                {props?.tipoGrafica === 'tabla' && (props?.datos || []).length ? <DinamicTableMejorada
                    key={props?.id}
                    data={props?.datos}
                    titulo={props?.titulo}
                /> : null}
            </div>
            { /* tipo de indicador de solo dato, 
            * el resultado debe ser un arreglo de objetos de un 
            * solo elemento  donde el objeto tenga la propiedad total*/}
            {props?.tipoGrafica === 'indicador' ? <Indicator
                key={props?.id}
                data={props?.datos}
                titulo={props?.titulo}
                enAccion={(accion: any, row: any) => {
                    props?.click && props?.click(row, accion)
                }}
            /> : null}
        </div>
    )
}

export default CampoChart;