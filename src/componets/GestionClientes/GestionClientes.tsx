import React from 'react'
import { Grid } from '@mui/material'
import DinamicTable from '../DinamicTable';
import _ from 'lodash';
import ModalComponent from '../Modal';
import type { GestionClientesProps } from './types'
import EditClienteForm from '../AddClienteForm/EditClienteForm';
import useGestionClientes from './useGestionClientes';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './style.scss';

const GestionClientes: React.FC<GestionClientesProps> = (props: GestionClientesProps) => {

    const {
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
    } = useGestionClientes(props);

    

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    {!_.isEmpty(props?.clientes) ? <DinamicTable
                        key={'usuarios'}
                        columnsToShow={AllowCell}
                        data={(props?.clientes).map((u) => {
                            return {
                                id: u?.id,
                                nombre: u?.nombre,
                                nombre_corto: u?.nombre_corto,
                                rfc: u?.rfc,
                                estatus: u?.estatus,
                                id_estatus: u?.estatus === 0 ? 'Inactivo' : 'Activo',
                                fecha_registro: u?.fecha_registro,
                                usuario_alta: u?.usuario_alta
                            }
                        })}
                        actions
                        titulo={''}
                        enAccion={accion}
                    /> : null}
                    <ModalComponent handleClose={handleClose} isOpen={isOpen}>
                        <EditClienteForm resetForm={resetForm} onReset={() => setResetForm(false)} item={clienteDetalle} procesando={props?.procesando} enAccion={editCliente} />
                    </ModalComponent>
                    <ModalConfirm onAcept={() => {
                        deleteCliente();
                    }} onCancel={() => {
                        setOpenModalConfirm(false);
                        setTextModalConfirm('');
                    }} open={openModalConfirm} text={textModalConfirm} title={''} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GestionClientes
