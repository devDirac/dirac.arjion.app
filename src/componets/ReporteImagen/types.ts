export interface ReporteImagenProps{
    envarFoto?:(foto:any,user:string)=>void
    envarFotos?:(fotos:any,user:string)=>void
}

export interface ParametrosFormProps {
    darkMode:boolean
    parametros:any[]   
    enAccion:(parametro:any)=>void
}

export interface tituloFormProps {
    darkMode:boolean
    enAccion:(parametro:any)=>void
}