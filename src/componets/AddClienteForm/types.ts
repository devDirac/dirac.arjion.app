export interface AddClienteFormPros {
    procesando:boolean
    enAccion:(data:any)=>void
    resetForm:boolean
    onReset:()=>void
    item?:any
}

