export interface AddConceptoProps {
    procesando: boolean
    darkMode: boolean
    enAccion: (data: any) => void
    item?: any
    frentes: any[]
    esDesdeConceptos?: boolean
    esTemporal?: boolean
}