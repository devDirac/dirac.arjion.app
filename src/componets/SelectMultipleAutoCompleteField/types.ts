export interface SelectMultipleAutoCompleteFieldProps {
    label?: string
    id: string
    value?: any[]
    name: string
    placeholder?: string
    required?: boolean
    autoFocus?: boolean
    fullWidth?: boolean
    disabled?: boolean
    onInput?: (e: any) => void
    onChange?: (e: any) => void
    onBlur?: () => void
    InputProps?: any
    formik?:any
    options:any
    btnPlus?:boolean
    onAdd?:()=>void
    onRefresh?:()=>void
    defaultValue:any
    EsMultiple?:boolean
    btnActualiza?:boolean
}