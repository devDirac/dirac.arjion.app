export interface AddFrenteFormProps {
    procesando:boolean
    darkMode:boolean
    item:any
    onReset: () => void
    resetForm: boolean
    enAccion:(data:any)=>void
    frentes:any[]
}