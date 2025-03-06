import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DinamicTableMejorada from '../componets/DinamicTableMejorada/DinamicTableMejorada';
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import { deleteoFrmaPagoHttp, editFormaPagoHttp, getAllFormasPagoHttp, setFormaPagoHttp } from '../actions/catalogos';
import { useSearchParams } from 'react-router-dom';
import AddFormaPago from '../forms/catalogos/FormaPago/AddFormaPago';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const RevisorCrudFormaPagoScreen: React.FC = () => {

    /* Extraemos el id del usuario de la url   */
    const [queryParameters] = useSearchParams();
    const idUsuario: string = queryParameters.get("id") || '';

    /* Los datos de la tabla (forma de pago ) */
    const [data, setData] = useState<any>([]);

    /* Para editar o tranajar sobre de un elemento selecionado */
    const [item, setItem] = useState<any>(null);

    /* Para el loader */
    const [procesando, setProcesando] = useState<any>();

    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    /* Modal frmulario alta de tipo de solicitud */
    const [isAlertOpenForm, setIsAlertOpenForm] = useState(false);
    const handleisAlertOpenForm = () => setIsAlertOpenForm(true);
    const handleisAlerCloseForm = () => setIsAlertOpenForm(false);

    /* Modal frmulario edición de tipo de solicitud */
    const [isAlertOpenFormEdita, setIsAlertOpenFormEdita] = useState(false);
    const handleisAlertOpenFormEdita = () => setIsAlertOpenFormEdita(true);
    const handleisAlerCloseFormEdita = () => setIsAlertOpenFormEdita(false);

    /* Confrmacion para eliminacion o activacion de un tipo de solictud */
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    /* Carga inicial de los datos */
    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getAllFormasPagoHttp();
            setProcesando(false);
            setData(response);
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar la forma de pago');
            handleisAlertOpen();
        }
    }, []);

    /* Inicializa el componente */
    useEffect(() => {
        getData();
    }, [getData]);

    /* Agrega tipo de solicitud */
    const handleAddFormaPago = async (data: any) => {
        try {
            setProcesando(true);
            await setFormaPagoHttp({ ...data, ...{ id_usuario: idUsuario } });
            handleisAlerCloseForm();
            setMensajeAlert('Exito al registrar la forma de pago');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar la forma de pago');
            handleisAlertOpen();
        }
    }

    /* Edita la forma de pago */
    const handleEditaFormaPago = async (data: any) => {
        try {
            setProcesando(true);
            await editFormaPagoHttp({ ...data, ...{ id_usuario: idUsuario, id: item?.id } })
            handleisAlerCloseFormEdita();
            setMensajeAlert('Exito al editar la forma de pago');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al editar la forma de pago');
            handleisAlertOpen();
        }
    }

    /* Elimina o reactiva la forma de pago */
    const handleDelete = async () => {
        try {
            setProcesando(true);
            await deleteoFrmaPagoHttp(item)
            handleisAlerCloseForm();
            setMensajeAlert('Exito al actualizar el estatus dla forma de pago');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al actualizar el estatus dla forma de pago');
            handleisAlertOpen();
        }
    }

    return (
        <>
            <AppAppBarC />
            <Grid container style={{ backgroundColor: '#fff', position: 'relative', top: 15, height: 'calc(100vh - 85px)' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            <h4 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Administrar las formas de pago</h4>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                            <Button variant="outlined" style={{ color: '#1976d2' }} onClick={() => {
                                handleisAlertOpenForm();
                            }}>
                                <PlusOneIcon color='info' fontSize='large' />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            {data?.length ?
                                <DinamicTableMejorada
                                    flex
                                    actions
                                    esInfoCarrusel
                                    data={data}
                                    enAccion={(accion, row) => {
                                        setItem(row);
                                        if (accion === 'editar') {
                                            handleisAlertOpenFormEdita()
                                        }
                                        if (accion === 'eliminar') {
                                            setOpenModalConfirm(true);
                                        }

                                    }}
                                /> : procesando ? 'Cargando la información' : <p style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Sin registros</p>}
                        </Grid>
                    </Grid>
                </Grid>
                {/* LOADER GENERAL */}
                <Backdrop className='BackdropClass' open={procesando}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* Modal mensajes en general */}
                <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                    <Grid container spacing={2} style={{ textAlign: 'center' }}>
                        <Grid item xs={12}>
                            <br />
                            <br />
                            <p>{mensajeAlert}</p>
                        </Grid>
                    </Grid>
                </ModalComponent>
                {/* Modal alta de tipo de solicitud */}
                <ModalComponent handleClose={handleisAlerCloseForm} isOpen={isAlertOpenForm} key={'alertaForm'}>
                    <>
                        <AddFormaPago procesando={procesando} enAction={(d) => handleAddFormaPago(d)} />
                        <Backdrop className='BackdropClass' open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                </ModalComponent>
                {/* Modal edita tipo de solicitud */}
                <ModalComponent handleClose={handleisAlerCloseFormEdita} isOpen={isAlertOpenFormEdita} key={'alertaFormEdita'}>
                    <>
                        <AddFormaPago procesando={procesando} enAction={(d) => handleEditaFormaPago(d)} item={item} />
                        <Backdrop className='BackdropClass' open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                </ModalComponent>
                {/* Confirmación para eliminar un tipo de solicitud */}
                <ModalConfirm onAcept={() => {
                    handleDelete();
                    setOpenModalConfirm(false);
                }} onCancel={() => {
                    setOpenModalConfirm(false);
                }} open={openModalConfirm} text={`¿Desea eliminar la forma de pago seleccionado?`} title={''} />

            </Grid >
        </>
    );
}
export default RevisorCrudFormaPagoScreen;