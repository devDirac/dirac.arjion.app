
export interface GestionClientesProps{
    procesando:boolean
    clientes:any[]
    onEdit:(data:any)=>void
    onDelete:(data:any)=>void
} 