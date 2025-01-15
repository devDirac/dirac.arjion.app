import { useState } from 'react'
import type { GestionUsuariosProps } from './types'
import { useMaterialUIController } from 'context';


const useGestionUsuarios = (props: GestionUsuariosProps) => {
    const [isOpen, setOpen] = useState(false);
    const [userDetalle, setUserDetall] = useState<any>({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                setUserDetall(data);
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

    const editUser = async (data: any) => {
        props?.onEdit(data);
        handleClose();
    }

    const deletePregunta = (data:any) => {
        setItem(data);
        setOpenModalConfirm(true);
        setTextModalConfirm('¿Desea cambiar el estatus del usuario seleccionado?');
    }  

    const deleteUser = async () => {
        props?.onDelete(item);
        setItem(null);
        setOpenModalConfirm(false);
        setTextModalConfirm('');
    }  
    
    return {
        darkMode,
        accion,
        handleClose,
        isOpen,
        userDetalle,
        editUser,

        setOpenModalConfirm,
        setTextModalConfirm,
        openModalConfirm,
        textModalConfirm,
        deleteUser
    }
}

export default useGestionUsuarios
