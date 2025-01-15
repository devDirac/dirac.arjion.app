export interface AddContratosFormProps {
    onReset: () => void
    resetForm: boolean
    procesando: boolean
    enAccion: (data: any) => void
    cientes: any[]
    responsables: any[]
    darkMode: boolean
    obra:string
    item:any
    esEspecialidadPadre?:boolean
    onCliente?:()=>void
}

export interface SeleccionProyectoProps {
    onReset: () => void
    resetForm: boolean
    procesando: boolean
    enAccion: (data: any) => void
    darkMode: boolean
}

export interface TarjetaContratoProps{
    contrato:any
    darkMode:boolean
    cientes: any[]
    responsables: any[]
}