import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import DinamicTableMejorada from '../componets/DinamicTableMejorada/DinamicTableMejorada';
import AddTipoSolicitud from '../forms/catalogos/TipoSolicitud/AddTipoSolicitud';
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import { deleteTiposSolicitudHttp, editTiposSolicitudHttp, getAllTiposSolicitudesHttp, setTiposSolicitudHttp } from '../actions/catalogos';
import { useSearchParams } from 'react-router-dom';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const RevisorCrudTipoSolicitudScreen: React.FC = () => {

    /* Extraemos el id del usuario de la url   */
    const [queryParameters] = useSearchParams();
    const idUsuario: string = queryParameters.get("id") || '';

    /* Los datos de la tabla (tipo de solicitud) */
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
            const response = await getAllTiposSolicitudesHttp();
            setProcesando(false);
            setData(response);
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar el tipo de solicitud');
            handleisAlertOpen();
        }
    }, []);

    /* Inicializa el componente */
    useEffect(() => {
        getData();
    }, [getData]);

    /* Agrega tipo de solicitud */
    const handleAddTipoSolicitud = async (data: any) => {
        try {
            setProcesando(true);
            await setTiposSolicitudHttp({ ...data, ...{ id_usuario: idUsuario } });
            handleisAlerCloseForm();
            setMensajeAlert('Éxito al registrar el tipo de solicitud');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar el tipo de solicitud');
            handleisAlertOpen();
        }
    }

    /* Edita el tipo de solicitud */
    const handleEditaTipoSolicitud = async (data: any) => {
        try {
            setProcesando(true);
            await editTiposSolicitudHttp({ ...data, ...{ id_usuario: idUsuario, id: item?.id } })
            handleisAlerCloseFormEdita();
            setMensajeAlert('Éxito al editar el tipo de solicitud');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al editar el tipo de solicitud');
            handleisAlertOpen();
        }
    }

    /* Elimina o reactiva el tipo de solicitud */
    const handleDelete = async () => {
        try {
            setProcesando(true);
            await deleteTiposSolicitudHttp(item)
            handleisAlerCloseForm();
            setMensajeAlert('Éxito al actualizar el estatus del tipo de solicitud');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al actualizar el estatus del tipo de solicitud');
            handleisAlertOpen();
        }
    }

    return (
        <>
            <AppAppBarC esGastos />
            <Grid container style={{ backgroundColor: '#fff' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            <h4 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Administración de los tipos de solicitud</h4>
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
                                    //flex
                                    actions
                                    esInfoCarrusel
                                    data={data.map((r: any) => {
                                        return {
                                            ...r,
                                            ...{
                                                requiere_beneficiario: r?.requiere_beneficiario === 1 ? 'Si' : 'No',
                                                requiere_documentos: r?.requiere_documentos === 1 ? 'Si' : 'No',
                                                requiere_concepto: r?.requiere_concepto === 1 ? 'Si' : 'No',
                                                mostrar_pago_quincenas: r?.mostrar_pago_quincenas === 1 ? 'Si' : 'No',
                                                requiere_aprobacion_revisor:r?.requiere_aprobacion_revisor === 1 ? 'Si' : 'No',
                                                muestra_notificar_nomina: r?.muestra_notificar_nomina === 1 ? 'Si' : 'No',
                                                requiere_fecha_pago:r?.requiere_fechaPago  ===  1 ? 'Si' : 'No',
                                                revisor_antes_pagador:r?.revisor_antes_pagador  ===  1 ? 'Si' : 'No',
                                                estatus: r?.estatus === 1 ? 'Activo' : 'Inactivo',
                                            }
                                        }
                                    })}
                                    columnsToShow={[
                                        'clave',
                                        'nombre',
                                        'descripcion',
                                        'estatus',
                                        'fecha_registro',
                                        'requiere_beneficiario',
                                        'requiere_documentos',
                                        'requiere_concepto',
                                        'mostrar_pago_quincenas',
                                        'muestra_notificar_nomina',
                                        'requiere_aprobacion_revisor',
                                        'requiere_fecha_pago'
                                    ]}
                                    pinned={[{ columna: 'clave', lado: 'left' },{ columna: 'nombre', lado: 'left' }]}
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
                        <AddTipoSolicitud key={'add_1'} procesando={procesando} enAction={(d) => handleAddTipoSolicitud(d)} />
                        <Backdrop className='BackdropClass' open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                </ModalComponent>
                {/* Modal edita tipo de solicitud */}
                <ModalComponent handleClose={handleisAlerCloseFormEdita} isOpen={isAlertOpenFormEdita} key={'alertaFormEdita'}>
                    <>
                        <AddTipoSolicitud key={'add_2'} procesando={procesando} enAction={(d) => handleEditaTipoSolicitud(d)} item={item} />
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
                }} open={openModalConfirm} text={`¿Desea eliminar el tipo de solicitud seleccionado?`} title={''} />

            </Grid >
        </>
    );
}
export default RevisorCrudTipoSolicitudScreen;