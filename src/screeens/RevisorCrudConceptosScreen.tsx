import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AddConceptos from '../forms/catalogos/Conceptos/AddConceptos';
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import DinamicTableMejorada from '../componets/DinamicTableMejorada/DinamicTableMejorada';
import { deleteConceptoHttp, editConceptoHttp, getAllConceptosHttp, setConceptoHttp } from '../actions/catalogos';
import { useSearchParams } from 'react-router-dom';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const RevisorCrudConceptosScreen: React.FC = () => {

    /* Extraemos el id del usuario de la url   */
    const [queryParameters] = useSearchParams();
    const idUsuario: string = queryParameters.get("id") || '';


    /* Los datos de la tabla (conceptos) */
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

    /* Modal frmulario alta de concepto */
    const [isAlertOpenForm, setIsAlertOpenForm] = useState(false);
    const handleisAlertOpenForm = () => setIsAlertOpenForm(true);
    const handleisAlerCloseForm = () => setIsAlertOpenForm(false);

    /* Modal frmulario edición de concepto */
    const [isAlertOpenFormEdita, setIsAlertOpenFormEdita] = useState(false);
    const handleisAlertOpenFormEdita = () => setIsAlertOpenFormEdita(true);
    const handleisAlerCloseFormEdita = () => setIsAlertOpenFormEdita(false);

    /* Confrmacion para eliminacion o activacion de un concepto */
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    /* Carga inicial de los datos */
    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getAllConceptosHttp();
            setProcesando(false);
            setData(response);
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar el concepto');
            handleisAlertOpen();
        }
    }, []);

    /* Inicializa el componente */
    useEffect(() => {
        getData();
    }, [getData]);

    /* Agrega concepto */
    const handleAddConcepto = async (data: any) => {
        try {
            setProcesando(true);
            await setConceptoHttp({ ...data, ...{ id_usuario: idUsuario } });
            handleisAlerCloseForm();
            setMensajeAlert('Exito al registrar el concepto');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar el concepto');
            handleisAlertOpen();
        }
    }

    /* Edita concepto */
    const handleEditaConcepto = async (data: any) => {
        try {
            setProcesando(true);
            await editConceptoHttp({ ...data, ...{ id_usuario: idUsuario, id: item?.id } })
            handleisAlerCloseFormEdita();
            setMensajeAlert('Exito al editar el concepto');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al editar el concepto');
            handleisAlertOpen();
        }
    }

    /* Elimina o reactiva el concepto */
    const handleDelete = async () => {
        try {
            setProcesando(true);
            await deleteConceptoHttp(item)
            handleisAlerCloseForm();
            setMensajeAlert('Exito al actualizar el estatus del concepto');
            handleisAlertOpen();
            getData();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al actualizar el estatus del concepto');
            handleisAlertOpen();
        }
    }

    return (
        <>
            <AppAppBarC esGastos/>
            <Grid container style={{ backgroundColor: '#fff' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            <h4 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Administrción de los conceptos</h4>
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
                {/* Modal alta de concepto */}
                <ModalComponent handleClose={handleisAlerCloseForm} isOpen={isAlertOpenForm} key={'alertaForm'}>
                    <>
                        <AddConceptos procesando={procesando} enAction={(d) => handleAddConcepto(d)} categorias={data} />
                        <Backdrop className='BackdropClass' open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                </ModalComponent>
                {/* Modal edita concepto */}
                <ModalComponent handleClose={handleisAlerCloseFormEdita} isOpen={isAlertOpenFormEdita} key={'alertaFormEdita'}>
                    <>
                        <AddConceptos procesando={procesando} enAction={(d) => handleEditaConcepto(d)} item={item} categorias={data.filter((r: any) => (!r?.categoria || r?.categoria !== item?.id) && r?.id !== item?.id)} />
                        <Backdrop className='BackdropClass' open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                </ModalComponent>
                {/* Confirmación para eliminar un concepto */}
                <ModalConfirm onAcept={() => {
                    handleDelete();
                    setOpenModalConfirm(false);
                }} onCancel={() => {
                    setOpenModalConfirm(false);
                }} open={openModalConfirm} text={`¿Desea eliminar el concepto seleccionado?`} title={''} />
            </Grid>
        </>
    );
}
export default RevisorCrudConceptosScreen;