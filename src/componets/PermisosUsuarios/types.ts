export interface UsuariosPermisoResponse {
    active: number
    email: string
    id: number
    name: string
    permiso: "Crear carpetas"
    tipo_permiso_id: number
    usuario: string
}

export default interface PermisosUsuariosProps {
    dataUsuarios: UsuariosPermisoResponse[]
    accion: (accion: string, row: any,idPermiso?:number) => void
    soloPermisos?:boolean
    procesando?:boolean
}