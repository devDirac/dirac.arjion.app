export interface GestionUsuariosProps{
    procesando:boolean
    users:any[]
    onEdit:(data:any)=>void
    onDelete:(data:any)=>void
}