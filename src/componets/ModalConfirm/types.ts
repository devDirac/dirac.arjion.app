export interface ModalConfirmProps {
    onAcept:(comentarios?:string, file?:any)=>void
    onCancel:()=>void
    open:boolean
    text:string
    title:string
    esCambioEstatusEstimacion?:boolean
    esDocumentoAdjunto?:boolean
}