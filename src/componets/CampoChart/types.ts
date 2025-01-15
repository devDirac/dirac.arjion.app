export interface CampoChartProps {
    tipoGrafica: string
    datos?: any
    esVertical: boolean
    esApilado: boolean
    rellenaEspacioEnlineal: boolean
    titulo: string
    unidades?:string
    id: any
    enAccionDelete?: (id: any) => void
    click: (detalle: any, data: any) => void
    darkMode?:boolean
    height?:any
}
