export interface AddCarpetaCompartidaProps {
    procesando: boolean
    enAccion: (data: any) => void
}

export interface ShareCarpetaCompartidaProps {
    procesando: boolean
    enAccion: (data: any) => void
    usuarios:any[]
    carpetas:any[]
}