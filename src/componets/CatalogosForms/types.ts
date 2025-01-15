export default interface CatalogosFormsProps {
    
}

export interface CatalogosGenericosProps {
    procesando:boolean
    action:(data:any)=>void
    titulo:string
    catalogo:string
    item?:any
    idObra?:number|string
}

export interface CatalogosClasificacionContratoProps {
    procesando:boolean
    action:(data:any)=>void
    titulo:string
    catalogo:string
    item?:any
    idObra?:number|string
}

export interface CatalogoEspecialidadProps {
    procesando:boolean
    action:(data:any)=>void
    titulo:string
    catalogo:string
    item?:any
    idObra?:number|string
    onReset?: () => void
    resetForm?: boolean
    esEspecialidadPadre?:boolean
    idEspecialidadPadre?:any
    esEdicion?:boolean
    cientes?:any
    peps?:any
}