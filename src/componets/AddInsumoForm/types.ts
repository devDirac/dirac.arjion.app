export interface AaddInsumoFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    item?:any
}

export interface AddEntradaInsumoFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    item?:any   
    origenes:any[]
    addOrigen: () => void
}

export interface AddOrigenDestinoFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    item?:any
}