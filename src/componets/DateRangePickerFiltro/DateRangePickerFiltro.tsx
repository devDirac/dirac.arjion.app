import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DateRangePicker } from 'rsuite';
import './style.scss'

const DateRangePickerFiltro: React.FC<any> = (props: any) => {
    return <div className="your-container-class"><DateRangePicker 
    onOpen={()=>props?.handleOpen && props?.handleOpen()}  // Detectar cuando se abre el DatePicker
    onClose={()=>props?.handleClose && props?.handleClose()} // Detectar cuando se cierra el DatePicker
    style={{ width: '100%' }} size="sm" placeholder={props?.title || ''} onChange={(r) => {
        props?.enAccion(r)
    }} /></div>
};

export default DateRangePickerFiltro;