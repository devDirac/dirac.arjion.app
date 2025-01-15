import { Backdrop, CircularProgress, Grid } from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import ComplexProjectCard from "../examples/Cards/ProjectCards/ComplexProjectCard";
import { useSelector } from "react-redux";
import moment from "moment";
import ModalComponent from "../componets/Modal";
import { useMaterialUIController } from "context";
import { useLocation } from "react-router-dom";
import DinamicTable from "../componets/DinamicTable";
import { StoreType } from "../types/geericTypes";
import { setAhut } from "../actions/auth";
import { deleteResponsablesConceptoHttp, editResponsablesConceptoHttp, getResponsablesConeptoHttp, getResponsablesHttp, setResponsablesConceptoHttp } from "../actions/conceptos";
import ModalConfirm from "../componets/ModalConfirm/ModalConfirm";
import AddResponsablesConcepto from "../componets/AddResponsablesConcepto/AddResponsablesConcepto";
import { getErrorHttpMessage } from "../utils";
import { sleep } from "../utils";
import StepperGeneral from "../componets/StepperGeneral/StepperGeneral";
import { useIntl } from "react-intl";
import { Button } from "react-bootstrap";
import CountHitosForm from "../componets/AddHitosForm/countHitosForm";

const VerResponsablesConcepto: React.FC = () => {
    const intl = useIntl();

    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const [columns, setColumns] = useState<any[]>([])
    const [procesando, setProcesando] = useState(false);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const location = useLocation();

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const [hitos, setHitos] = useState<any[]>([]);
    const [hitoEdit, setHitoEdit] = useState<any>(null);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '')
    const [responsables, setResponsables] = useState<any[]>([]);

    const [isAlertOpenHito, setIsAlertOpenHito] = useState(false);
    const handleisAlertOpenHito = () => setIsAlertOpenHito(true);
    const handleisAlerCloseHito = () => setIsAlertOpenHito(false);

    const [isAlertOpenResponsables, setIsAlertOpenResponsables] = useState(false);
    const handleisAlertOpenResponsables = () => setIsAlertOpenResponsables(true);
    const handleisAlerCloseResponsables = () => setIsAlertOpenResponsables(false);


    const getResponsables = useCallback(async () => {
        try {
            setProcesando(true)
            const responsables_ = await getResponsablesHttp(contrato?.id);
            setResponsables(responsables_)
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
        }
    }, [])

    useEffect(() => {
        getResponsables()
    }, [getResponsables])

    useEffect(() => {
        setAhut(token);
    }, [token]);

    useEffect(() => {
        setColumns(
            [
                "porcentaje",
                "concepto",
                "Nombre",
                "fecha_registro"
            ])
    }, []);


    const configsButton: any = espacio ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            contratos={espacio?.ctaAsignados}
            title={espacio?.obra}
            element={espacio}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    const getResponsablesInit = useCallback(async () => {
        try {
            setProcesando(true)
            const hitos_ = await getResponsablesConeptoHttp(location?.state?.id || null);
            setHitos(hitos_)
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
        }
    }, [])

    useEffect(() => {
        getResponsablesInit()
    }, [getResponsablesInit])

    const handleEditarResponsable = (row: any) => {
        setHitoEdit(row);
        handleisAlertOpenHito()
    }

    const handleEditResponsable = async (h: any) => {
        try {
            setProcesando(true)
            await editResponsablesConceptoHttp({ id_responsable: h?.responsable, porcentaje: h?.porcentaje, id: hitoEdit?.id })
            setProcesando(false);
            handleisAlerCloseHito()
            getResponsablesInit()
            setMensajeAlert('Exito al acutalizar');

            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const deleteResponsable = async () => {
        try {
            setOpenModalConfirm(false);
            setProcesando(true)
            await deleteResponsablesConceptoHttp(hitoEdit?.id)
            setProcesando(false);
            handleisAlerCloseHito()
            getResponsablesInit()
            setMensajeAlert('Exito al eliminar');
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const [activeStepResponsables, setActiveStepResponsables] = React.useState(0);
    const [isDisabledNextResponsables, setIsDisabledNextResponsables] = useState<boolean>(false);
    const [stepsResponsables, setStepsResponsables] = useState<any[]>([
        { name: 'Número de responsables', step: 0 }
    ]);

    const [steps, setSteps] = useState<any[]>([
        { name: 'Número de hitos', step: 0 }
    ]);

    const [activeStep, setActiveStep] = React.useState(0);
    const handleStepResponsables = (step: number) => {
        setActiveStepResponsables(step);
        if (step === 1) {
            setIsDisabledNextResponsables(!responsablesCrea.length ? true : false)
        }
        if (step === 0 && steps.length > 1 && responsablesCrea.length) {
            setResponsablesCrea([]);
            setSteps([
                { name: 'Número de hitos', step: 0 }
            ])
        }
    }

    const handleAddResponsable = (h: any) => {
        const hitosCrea_ = Object.assign([], responsablesCrea);
        hitosCrea_.push(h);
        handleStepResponsables(activeStepResponsables + 1)
        setResponsablesCrea(hitosCrea_);
    }


    const [responsablesCrea, setResponsablesCrea] = useState<any[]>([])
    const handleAddNumerResponsables = (a: any) => {
        const actualSteps = Object.assign([], [
            { name: 'Número de responsables', step: 0 }
        ]);
        for (let index = 0; index < a?.numero; index++) {
            actualSteps.push({ name: 'Responsable #' + (+actualSteps.length), step: (+index) + 1 });
            setStepsResponsables(actualSteps);
        }
        actualSteps.push({ name: 'Guardar responsables', step: actualSteps.length });
        setStepsResponsables(actualSteps);
        handleStepResponsables(activeStep + 1)
        setResponsablesCrea([]);
    }
    const handleAddResponsables = async () => {
        try {
            setProcesando(true);
            handleisAlerCloseResponsables()
            handleStepResponsables(activeStepResponsables + 1)
            await responsablesCrea.reduce(async (a: any, res: any) => {
                try {
                    await a;
                    await sleep(1000)
                    await setResponsablesConceptoHttp({ id_concepto: location?.state?.id, id_responsable: res?.responsable, porcentaje: res?.porcentaje });
                } catch (error) {
                    setMensajeAlert('Error al registrar el responsable ');
                    handleisAlertOpen();
                }
            }, Promise.resolve());
            
            getResponsablesInit();
            
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }



    return (
        <DashboardLayout>
            <DashboardNavbar />
            {espacio ? <Grid container spacing={2}>
                <Grid item xs={12}>
                    {configsButton}
                </Grid>
            </Grid> : null}

            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 3 }} style={darkMode ? { backgroundColor: '#1f283e', padding: '25px', minHeight: '370px' } : { backgroundColor: '#fff', padding: '25px', minHeight: '370px' }}>
                <Grid item xs={12} style={{textAlign:'right'}}>
                    <Button
                        variant="outline-success"
                        onClick={(e: any) => {

                            handleisAlertOpenResponsables()
                        }}
                    >
                        {intl.formatMessage({ id: "btn_agregar_responsables" })}
                    </Button>
                </Grid>
                {useMemo(
                    () => (
                        <Grid item xs={12}>
                            {
                                hitos && hitos.length && !procesando ?
                                    <DinamicTable
                                        esResponsablesConcepto
                                        columnsToShow={columns}
                                        data={hitos}
                                        enAccion={(accion: string, row: any) => {
                                            if (accion === 'editar') {
                                                handleEditarResponsable(row);
                                            }
                                            if (accion === 'eliminar') {
                                                setHitoEdit(row)
                                                setOpenModalConfirm(true);
                                                setTextModalConfirm('¿Desea eliminar al responsable seleccionado?');
                                            }

                                        }}
                                        actions
                                    /> : hitos && !hitos.length && !procesando ?
                                        <Grid container spacing={2}> <Grid item xs={12}>Sin registros</Grid> </Grid> : null
                            }
                        </Grid>
                    ),
                    [procesando, hitos]
                )}

            </Grid>
            <Backdrop className='BackdropClass' open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseHito} isOpen={isAlertOpenHito} key={'actualiza_estatus'}>
                <>
                    <AddResponsablesConcepto item={hitoEdit} responsables={responsables} procesando={procesando} onAccion={(h) => { handleEditResponsable(h) }} darkMode={darkMode} />
                    {JSON.stringify(hitoEdit)}
                </>

            </ModalComponent>



            <ModalConfirm onAcept={() => {
                deleteResponsable()
            }} onCancel={() => {
                setOpenModalConfirm(false);
                setTextModalConfirm('');
            }} open={openModalConfirm} text={textModalConfirm} title={''} />


            <ModalComponent handleClose={handleisAlerCloseResponsables} isOpen={isAlertOpenResponsables} key={'addResponsables'}>
                <StepperGeneral
                    isDisabledNext={isDisabledNextResponsables}
                    darkMode={darkMode}
                    textStepsCompleted={'Proceso finalizado'}
                    activeStep={activeStepResponsables}
                    onStep={handleStepResponsables}
                    steps={stepsResponsables}
                >
                    {
                        activeStepResponsables === 0 ?
                            <CountHitosForm titulo={'Cuantos responsables desea agregar'} procesando={procesando} onAccion={(a: any) => { handleAddNumerResponsables(a) }} darkMode={darkMode} /> : null
                    }
                    {
                        activeStepResponsables > 0 ?
                            stepsResponsables.filter(a => a?.step === activeStepResponsables && a?.name !== 'Guardar responsables').map((a: any, key: number) => {
                                const item = responsablesCrea[activeStep - 1];
                                return <AddResponsablesConcepto item={item} key={key + activeStepResponsables} responsables={responsables} procesando={procesando} onAccion={(h) => { handleAddResponsable(h) }} darkMode={darkMode} />
                            })
                            : null
                    }
                    {
                        activeStepResponsables + 1 === stepsResponsables.length && activeStepResponsables !== 0 ? <Grid container spacing={2}><Grid item xs={12} md={12} style={{ textAlign: 'center', minHeight: '100px' }}>
                            <Button
                                variant="outline-success"
                                onClick={(e: any) => {

                                    handleAddResponsables()
                                }}
                            >
                                {intl.formatMessage({ id: "general_guardar" })}
                            </Button>
                        </Grid></Grid> : null
                    }
                </StepperGeneral>
            </ModalComponent>


        </DashboardLayout>
    );
}

export default VerResponsablesConcepto;