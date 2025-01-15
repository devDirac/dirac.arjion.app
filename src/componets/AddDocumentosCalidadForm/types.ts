export interface AddDocumentosCalidadFormProps {
    procesando:boolean
    enAccion:(data:any)=>void
}

export interface AddComentarioDocmentoCalidadFormProps {
    procesando:boolean
    enAccion:(data:any)=>void
    title?:string
}