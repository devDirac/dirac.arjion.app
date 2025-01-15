import React from 'react'
import type { GestionUsuariosProps } from './types'
import { Grid } from '@mui/material'
import DinamicTable from '../DinamicTable';
import _ from 'lodash';
import ModalComponent from '../Modal';
import EditUserForm from '../AddUserForm/editUserForm';
import useGestionUsuarios from './useGestionUsuarios';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './style.scss';
import brandDark from "../../assets/images/logo.png";
const GestionUsuarios: React.FC<GestionUsuariosProps> = (props: GestionUsuariosProps) => {

    const {
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
    } = useGestionUsuarios(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    {!_.isEmpty(props?.users) ? <DinamicTable
                        key={'usuarios'}
                        data={(props?.users).map((u) => {
                            return {
                                id: u?.id,
                                usuario: u?.usuario,
                                nombre: u?.name,
                                correo: u?.email,
                                "Teléfono": u?.telefono,
                                activo: u?.activo ? 'Activo' : 'Inactivo',
                                id_tipo_usuario: u?.id_tipo_usuario,
                                foto: !u?.foto ? brandDark : u?.foto,
                                
                            }
                        })}
                        actions
                        titulo={''}
                        enAccion={accion}
                    /> : null}
                    <ModalComponent handleClose={handleClose} isOpen={isOpen}>
                        <EditUserForm item={userDetalle} procesando={props?.procesando} action={editUser} />
                    </ModalComponent>
                    <ModalConfirm onAcept={() => {
                        deleteUser();
                    }} onCancel={() => {
                        setOpenModalConfirm(false);
                        setTextModalConfirm('');
                    }} open={openModalConfirm} text={textModalConfirm} title={''} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GestionUsuarios
