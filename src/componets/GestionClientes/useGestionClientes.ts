import { useState } from 'react'
import { useMaterialUIController } from 'context';
import type { GestionClientesProps } from './types'

const useGestionClientes = (props: GestionClientesProps) => {
  
    const [isOpen, setOpen] = useState(false);
    const [clienteDetalle, setClienteDetalle] = useState<any>({});
    const [resetForm,setResetForm] =useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setResetForm(false);
    };
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const [item,setItem] = useState(null);
    const [controller] = useMaterialUIController();
    const {
        darkMode
    } = controller;
    const accion = (accion: string, data: any) => {
        switch (accion) {
            case 'editar':
                handleOpen();
                setClienteDetalle(data);
                break;
            case 'eliminar':
                deletePregunta(data);
                break;
            case 'reactivar':
                deletePregunta(data);
                break;
            default:
                break;
        }
    }

    const editCliente = async (data: any) => {
        props?.onEdit(data);
        setResetForm(true);
        handleClose();
    }

    const deletePregunta = (data:any) => {
        setItem(data);
        setOpenModalConfirm(true);
        setTextModalConfirm('¿Desea cambiar el estatus del cliente seleccionado?');
    }  

    const deleteCliente = async () => {
        props?.onDelete(item);
        setItem(null);
        setOpenModalConfirm(false);
        setTextModalConfirm('');
    }

    const AllowCell = [
        "id",
        "nombre",
        "nombre_corto",
        "rfc",
        "fecha_final",
        "importe",
        "id_estatus",
        "fecha_registro",
        "usuario_alta",
    ];

    return {
        darkMode,
        accion,
        handleClose,
        isOpen,
        resetForm,
        setResetForm,
        clienteDetalle,
        editCliente,
        setOpenModalConfirm,
        setTextModalConfirm,
        openModalConfirm,
        textModalConfirm,
        deleteCliente,
        AllowCell
  }
}

export default useGestionClientes
