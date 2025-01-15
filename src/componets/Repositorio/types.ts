export interface RepositorioProps {
    accion: (accion: string, row: any) => void
    procesando: boolean
    enAccion: (data: any) => void
    data: any[]
}