export interface AddAvanceFormProps {
    procesando:boolean
    item?:any
    onAccion:(data:any)=>void
    darkMode:boolean
    resetForm:boolean
    onReset:()=>void
}