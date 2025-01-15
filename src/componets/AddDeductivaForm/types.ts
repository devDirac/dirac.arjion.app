export interface AddDeductivaFormProps {
    procesando:boolean
    item?:any
    onAccion:(data:any)=>void
    darkMode:boolean
    resetForm:boolean
    onReset:()=>void
    obra:any
    contrato:any
    folioAnterior?:string
}