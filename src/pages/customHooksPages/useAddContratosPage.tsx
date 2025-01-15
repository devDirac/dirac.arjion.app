import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getErrorHttpMessage } from '../../utils/index';
import { getClientes } from '../../actions/clientes';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { getObrasConRelaciones } from '../../actions/proyectos';
import { useMaterialUIController } from 'context';
import { saveUserContrato, setContratoHttp, setParametroToContratoHttp, setUserToContractHTTP } from '../../actions/contratos';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { setFlujo } from '../../actions/flujoInicial';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import _ from 'lodash';
import { perfilContext } from '../../context/perfilContexto';


const useAddContratosPage = () => {
    const perfil = useContext(perfilContext);
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [obraSeleccion, setObraSeleccion] = useState('');
    const [procesando, setProcesando] = useState<boolean>(false);
    const [resetForm0, setResetForm0] = useState<boolean>(false);
    const [resetForm, setResetForm] = useState<boolean>(false);
    const [clientes, setClientes] = useState<any[]>([]);
    const [responsables, setResponsables] = useState<any[]>([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isDisabledNext, setIsDisabledNext] = useState<boolean>(true);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [contrato, setContrato] = useState<{}>({});
    const [contratoId, setContratoId] = useState<number>(0);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const catalogos_error_obtener = intl.formatMessage({ id: 'catalogos_error_obtener' });
    const esFlujoInicial = useSelector((state: any) => state?.app?.flujoInicial || null);
    const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
    const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
    const [esExito, setEsExito] = useState(false);
    
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const configsButton: any = !_.isEmpty(espacio) ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            title={espacio?.obra}
            element={espacio}
            contratos={espacio?.ctaAsignados}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    const [steps, setSteps] = useState<any[]>([
        { name: intl.formatMessage({ id: 'stepper_contratos_paso_0' }), step: 0 },
        { name: intl.formatMessage({ id: 'stepper_contratos_paso_1' }), step: 1 },
        { name: intl.formatMessage({ id: 'stepper_contratos_paso_2' }), step: 2 },
        { name: intl.formatMessage({ id: 'stepper_contratos_paso_2.1' }), step: 3 },
        { name: intl.formatMessage({ id: 'stepper_contratos_paso_3' }), step: 4 },
    ])


    const handleSeleccionProyecto = (data: any) => {
        setIsDisabledNext(false);
        setObraSeleccion(data?.obra || '');
    }

    const setContrato_ = (data: any) => {
        setContrato(data);
        setIsDisabledNext(false);
    }
    const getResponsablesState = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getObrasConRelaciones();
            setResponsables(response.filter((r: any) => r?.id === +obraSeleccion)?.[0]?.asociacion || []);
            setProcesando(false);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || catalogos_error_obtener );
            handleisAlertOpen();
            setProcesando(false);
        }
    }, [obraSeleccion, catalogos_error_obtener]);

    const getClientesState = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getClientes();
            setClientes(response);
            setProcesando(false);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || catalogos_error_obtener);
            handleisAlertOpen();
            setProcesando(false);
        }
    }, [catalogos_error_obtener]);

    useEffect(() => {
        setAhut(token);
    }, [token]);


    useEffect(() => {
        getClientesState();
        getResponsablesState();
    }, [getClientesState, getResponsablesState]);

    const guardaContrato = async () => {
        try {
            setProcesando(true);
            const response = await setContratoHttp({...contrato,...{perfil}});
            setContratoId(response?.id);
            setProcesando(false);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setEsExito(true);
            handleisAlertOpen();
            setContrato({});
            setActiveStep(3);
            setIsDisabledNext(true);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
            setProcesando(false);
        }
    }

    const setStepRegistro = (step: number) => {
        if (step === 3 && steps.length !== 6) {
            guardaContrato();
            return;
        }
        if (esExito && step === 0 && esFlujoInicial) {
            dispatch(setFlujo({ paso: 3, desc: 'Se agrego un contrato al proyecto seleccionado en el paso 1', esCoordinador, esSupervisor, esModoDios }));
            navigate(`/sesion-trabajo-contratos`);
            return;
        }
        setActiveStep(step);
        setIsDisabledNext(true);
        if (step === 2) {
            setIsDisabledNext(false);
        }
        if (activeStep && steps.length === 6) {
            const actualSteps = Object.assign([], steps);
            setSteps(actualSteps.filter((a: any) => a?.name !== intl.formatMessage({ id: 'stepper_contratos_paso_4' })));
        }
    }

    const onSeleccionPreguntaUsuarios = (tipo: number) => {
        if (!tipo) {
            setActiveStep(5);
            return;
        }
        const actualSteps = Object.assign([], steps);
        actualSteps.push({ name: intl.formatMessage({ id: 'stepper_contratos_paso_4' }), step: 5 });
        setSteps(actualSteps);
        setActiveStep(5);
    }

    const handleGuardaSeleccionados = async (data: any) => {
        try {
            setProcesando(true);
            await data.reduce(async (a: any, usr: any) => {
                try {
                    await a;
                    await setUserToContractHTTP({...usr,...{perfil}});
                } catch (error) {
                    setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignaciones' }) + ': ' + usr?.email);
                    handleisAlertOpen();
                }
            }, Promise.resolve());
            setProcesando(false)
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignaciones' }));
            handleisAlertOpen();
            setActiveStep(5);
            setIsDisabledNext(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
            setProcesando(false);
        }
    }

    const handleGuardaUsuario = async (data: any) => {
        try {
            setProcesando(true);
            await setUserToContractHTTP({...data,...{perfil}});
            setProcesando(false);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignacion' }));
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
            setProcesando(false);
        }
    }

    const handleFinish = () => {
        setProcesando(true);
        setTimeout(() => {
            setProcesando(false);
            setActiveStep(6);
            setIsDisabledNext(false);
        }, 2000);
    }

    const handleGuardaUsuarioFormulario = async (data: any) => {
        try {
            setProcesando(true);
            await saveUserContrato({...data,...{perfil}});
            setProcesando(false);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignaciones' }));
            handleisAlertOpen();
            setActiveStep(6);
            setIsDisabledNext(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }))
            handleisAlertOpen();
            setProcesando(false);
        }
    }

    const setFormularioParametros = async (data: any) => {
        try {
            setProcesando(true);
            await setParametroToContratoHttp({...data,...{perfil}});
            setProcesando(false);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setEsExito(true);
            handleisAlertOpen();
            setActiveStep(4);
            setIsDisabledNext(true);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
            setProcesando(false);
        }
    }
    return {
        isDisabledNext,
        darkMode,
        steps,
        activeStep,
        setStepRegistro,
        setResetForm0,
        resetForm0,
        procesando,
        handleSeleccionProyecto,
        obraSeleccion,
        responsables,
        clientes,
        setResetForm,
        resetForm,
        setContrato_,
        contrato,
        onSeleccionPreguntaUsuarios,
        contratoId,
        handleGuardaSeleccionados,
        handleGuardaUsuario,
        handleFinish,
        handleGuardaUsuarioFormulario,
        setActiveStep,
        setIsDisabledNext,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        setFormularioParametros,
        espacio,
        configsButton,
        intl,
        getClientesState
    }
}

export default useAddContratosPage
