import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import StepperGeneral from '../../componets/StepperGeneral/StepperGeneral';
import React, { useMemo, useState } from 'react';
import SeleccionTipoSoliciud from '../../componets/SeleccionTipoSoliciud/SeleccionTipoSoliciud';
import SolicitudPrestamo from '../../forms/SolicitudPrestamo/SolicitudPrestamo';
import DragAndDropField from '../../componets/DragAndDropField';
import SetFirmaForm from '../../forms/FirmasForm/SetFirmaForm';
import SeleccionTipoSolicitudApple from '../../componets/SeleccionTipoSoliciud/SeleccionTipoSolicitudApple';
import ModalConfirm from '../../componets/ModalConfirm/ModalConfirm';

interface GacStepperFormProps {
    firma: any
    isDisabledNext: any
    activeStep: any
    handleStep: any
    steps: any
    handleSeleccionaTipoSolicitud: any
    tipoSolicitud: any
    perfil: any
    procesando: any
    solicitudForm: any
    handleGuardaFormulario: any
    handleRefreshMonedas: any
    handleRefreshTipoCambio: any
    handlePregunta: any
    handleGuardaDocumentos: any
    setFirma: (data: any) => void
    handleAddProveedor: () => void
    handleAddBancoUsuario: (d: any) => void
}

const GacStepperForm: React.FC<GacStepperFormProps> = ({
    firma,
    isDisabledNext,
    activeStep,
    handleStep,
    steps,
    handleSeleccionaTipoSolicitud,
    tipoSolicitud,
    perfil,
    procesando,
    solicitudForm,
    handleGuardaFormulario,
    handleRefreshMonedas,
    handleRefreshTipoCambio,
    handlePregunta,
    handleGuardaDocumentos,
    setFirma,
    handleAddProveedor,
    handleAddBancoUsuario
}) => {
    const [dataBanco, setDataBanco] = useState({});
    const [openModalConfirmPlay, setOpenModalConfirmPlay] = useState(false);
    const addBancoPregunta = (data: any) => {
        if (data?.banco !== '' && data?.clabe !== '' && data?.cuenta !== '') {
            setDataBanco(data)
            setOpenModalConfirmPlay(true)
        }
    }

    return (
        <div>
            {useMemo(() => <Grid container spacing={2} style={{ paddingTop: 30, width: '100%', paddingLeft: 50, paddingRight: 30 }}>
                {firma ? <StepperGeneral
                    isDisabledNext={isDisabledNext}
                    darkMode={false}
                    textStepsCompleted={'Solicitud creada con éxito'}
                    activeStep={activeStep}
                    onStep={handleStep}
                    steps={steps}
                >
                    {
                        activeStep === 0 ?
                            <Grid container spacing={2} style={{ minHeight: 200 }}>

                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <h5 style={{ color: 'rgb(68, 94, 150)' }}>Seleccione el tipo de solicitud que desea registrar</h5>
                                </Grid>

                                <Grid item xs={12} style={{ paddingTop: 30, paddingBottom: 30 }}>
                                    <SeleccionTipoSolicitudApple tipos={perfil?.tipoSolicitud?.map((r: any) => {
                                        return {
                                            id: r?.id,
                                            title: r?.nombre,
                                            description: r?.descripcion,
                                            requiere_beneficiario: r?.requiere_beneficiario,
                                            requiere_documentos: r?.requiere_documentos,
                                            requiere_concepto: r?.requiere_concepto,
                                            mostrar_pago_quincenas: r?.mostrar_pago_quincenas,
                                            requiere_fechaPago:r?.requiere_fechaPago,
                                            
                                        }
                                    })} seleccionId={tipoSolicitud?.id} seleccion={(tipo: any) => handleSeleccionaTipoSolicitud(tipo)} />

                                </Grid>
                            </Grid>

                            : null
                    }
                    {
                        activeStep === 1 ?

                            <SolicitudPrestamo
                                handlePreguntaAddBanco={(data) => {
                                    addBancoPregunta(data)
                                }}
                                tipoCambio={perfil?.tipoCambio}
                                proveedores={perfil?.proveedores}
                                monedas={perfil?.monedas}
                                bancos={perfil?.bancos}
                                formasPago={perfil?.formasPago}
                                proyectos={perfil?.proyectos}
                                beneficiarios={perfil?.beneficiarios}
                                empresas={perfil?.empresas}
                                conceptos={perfil?.conceptos}
                                tipoSolicitud={{ ...tipoSolicitud, ...{ user: perfil } }}
                                procesando={procesando}
                                item={solicitudForm}
                                enAction={(f) => handleGuardaFormulario(f)}
                                handleRefreshMonedas={() => handleRefreshMonedas()}
                                handleRefreshTipoCambio={() => handleRefreshTipoCambio()}
                                handleAddProveedor={() => {
                                    handleAddProveedor()
                                }}
                            />
                            : null
                    }
                    {
                        activeStep === 2 ? <Grid container spacing={2} style={{ padding: 20 }}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <h5 style={{ color: 'rgb(68, 94, 150)' }}>¿Desea agregar los documentos en este mismo proceso?</h5>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button variant="outlined" size="small" style={{ color: '#1976d2', marginRight: 2 }} onClick={() => {
                                    handlePregunta(1);
                                }}>
                                    Si
                                </Button>
                                <Button variant="outlined" size="small" style={{ color: '#1976d2', marginLeft: 2 }} onClick={() => {
                                    handlePregunta(0);

                                }}>
                                    No
                                </Button>
                            </Grid>

                        </Grid> : null
                    }
                    {
                        activeStep === 3 ?
                            <Grid container style={{ paddingTop: 15 }} >
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <h5 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Carga de documentos</h5>
                                </Grid>
                                <Grid item xs={12} style={{ height: 'auto' }}>
                                    <DragAndDropField
                                        acepted={{
                                            "image/jpeg": [],
                                            "image/jpg": [],
                                            "image/png": [],
                                            "application/pdf": [],
                                            /*  ".doc": [],
                                             ".docx": [], */
                                            "text/xml": []
                                        }}
                                        onAction={(d) => {

                                            handleGuardaDocumentos(d)
                                        }}
                                        multiple
                                        muestraBoton
                                        resultadosTabla
                                    />
                                </Grid>
                                <Backdrop className='BackdropClass' open={procesando}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </Grid>


                            : null
                    }
                </StepperGeneral> : null}
                {
                    !firma ? <SetFirmaForm darkMode={false} procesando={procesando} enAccion={(firma) => {
                        setFirma(firma)
                    }} /> : null
                }


            </Grid>, [firma, perfil, tipoSolicitud, activeStep, solicitudForm])}
            <Backdrop className='BackdropClass' open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ModalConfirm
                esCambioEstatusEstimacion
                esDocumentoAdjunto
                onAcept={(x, file) => {   
                    handleAddBancoUsuario({ ...dataBanco, ...{ alias: x, id_usuario: perfil?.idUsuario, file } });
                    setOpenModalConfirmPlay(false);
                }} onCancel={() => {
                    setOpenModalConfirmPlay(false);
                }} open={openModalConfirmPlay} text={`¿Desea guardar su información bancaria para proximos procesos ?, su información sera custodiada por arjion y no sera expuesta ni compartida a terceros, en los comentarios indique que alias desea asignar a esta información, gracias`} title={''} />
        </div>
    )
}

export default GacStepperForm
