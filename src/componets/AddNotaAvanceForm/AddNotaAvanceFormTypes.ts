export interface AddNotaAvanceFormProps {
    procesando:boolean
    item?:any
    darkMode:boolean
    onAccion:(data:any)=>void
    resetForm:boolean
    onReset:()=>void
}