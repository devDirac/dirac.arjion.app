import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard';
import { useMaterialUIController } from 'context';
import { getErrorHttpMessage } from '../../utils';
import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { actualizaConceptoHttp, actualizaEstatusConceptoHttp, getAllConceptosHttp } from '../../actions/conceptos';
import { getFrentesByIdContratoHttp } from '../../actions/frentes';
import { perfilContext } from '../../context/perfilContexto';

const useGestionConceptosPage = () => {
    const perfil = useContext(perfilContext);
    const intl = useIntl();
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [queryParameters] = useSearchParams();
    const id_filtro: string = queryParameters.get("id") || '';

    const [frentes, setFrentes] = useState<any[]>([]);
    const [itemEdit, setItemEdit] = useState<any>(null);
    const [isAlertOpenEdit, setIsAlertOpenEdit] = useState(false);
    const handleisAlertOpenEdit = () => setIsAlertOpenEdit(true);
    const handleisAlerCloseEdit = () => setIsAlertOpenEdit(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [mensajeAlert, setMensajeAlert] = useState<string>('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        if (errorFlujo) {
            navigate('/inicio');
        }
        if (errorFlujoContrato) {
            navigate('/sesion-trabajo-contratos');
        }
        setIsAlertOpen(false);
    };
    const [conceptos, setConceptos] = useState<any[]>([]);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const [errorFlujoContrato, setErrorFlujoContrato] = useState<boolean>(false);
    const [errorFlujo, setErrorFlujo] = useState<boolean>(false);

    const configsButton: any = espacio ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            title={espacio?.obra}
            contratos={espacio?.ctaAsignados}
            element={espacio}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    moment.locale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    } as any
    );

    const getDataConceptos = useCallback(async () => {
        try {
            setProcesando(true);
            const conceptos_ = await getAllConceptosHttp(contrato?.id);
            setConceptos(
                id_filtro ? conceptos_.filter((e: any) => e?.id === +id_filtro).map((a: any) => {
                    return { ...a, ...{ estatus: a?.estatus ? 'Activo' : 'Inactivo' } };
                }) :

                    conceptos_.map((a: any) => {
                        return { ...a, ...{ estatus: a?.estatus ? 'Activo' : 'Inactivo' } };
                    })

            );
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }, [contrato,id_filtro]);

    useEffect(() => {
        getDataConceptos();
    }, [getDataConceptos]);

    const validaContratoSeleccionado = useCallback(() => {
        if (!espacio) {
            setErrorFlujo(true);
            setMensajeAlert(intl.formatMessage({ id: 'general_mensaje_navega_sin_espacio' }));
            handleisAlertOpen();
        }
        if (espacio && !contrato) {
            setErrorFlujoContrato(true);
            setMensajeAlert(intl.formatMessage({ id: 'general_mensaje_navega_sin_contrato' }));
            handleisAlertOpen();
        }
    }, [contrato, espacio]);

    useEffect(() => {
        validaContratoSeleccionado();
    }, [validaContratoSeleccionado]);

    const AllowCell = [
        'cantidad',
        'concepto',
        'descripcion',
        'estatus',
        'fecha_fin',
        'fecha_inicio',
        'id',
        'inciso',
        'linea_base',
        'pu',
        'unidad',
        'tipo_de_concepto'
    ];

    const ExpandedComponent = (datos_expandible: any) => {
        const row = datos_expandible?.data;
        return (
            <div style={{ width: '100%' }}>
                <Grid container p={2}>
                    <Grid item xs={row?.especialidades?.length ? 6 : 12} md={row?.especialidades?.length ? 6 : 12} style={{ border: 'solid 2px #dddddd', padding: '14px' }}>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Contrato:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.contrato}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Frente:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.frente}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Tipo de contrato:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.tipo_de_concepto}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Cerrado:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.cerrado ? 'Si' : 'No'}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Homologado:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.homologado ? 'Si' : 'No'}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Plaza:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.plaza ? 'Si' : 'No'}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Tarea:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {row?.tarea ? 'Si' : 'No'}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    {row?.especialidades?.length ? <Grid item xs={6} md={6} style={{ border: 'solid 2px #dddddd', padding: '14px' }}>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {
                                row?.especialidades.map((s: any, key: any) => {
                                    return (
                                        <div key={key}>
                                            <ListItem alignItems="flex-start" >
                                                <ListItemText
                                                    primary={s?.nombre}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {s?.descripcion}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    )
                                })
                            }
                        </List>
                    </Grid> : null}
                </Grid>
            </div>
        )
    }

    const deletePregunta = (data: any) => {
        setItemEdit(data);
        setOpenModalConfirm(true);
        setTextModalConfirm('¿Desea cambiar el estatus del frente seleccionado?');
    }

    const actualizaEstatus = async () => {
        try {
            setProcesando(true);
            await actualizaEstatusConceptoHttp({...itemEdit,...{perfil}});
            setItemEdit(null);
            setOpenModalConfirm(false);
            setTextModalConfirm('');
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            handleisAlertOpen();
            getDataConceptos();
        } catch (error) {
            setProcesando(false);
            setItemEdit(null);
            setOpenModalConfirm(false);
            setTextModalConfirm('');
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            handleisAlertOpen();
        }
    }

    const handleGuardaConceptos = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaConceptoHttp({...data,...{perfil}});
            handleisAlerCloseEdit();
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            getDataConceptos();
            handleisAlertOpen();
        } catch (err) {
            setProcesando(false);
            handleisAlerCloseEdit();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    const getDataFrentes = useCallback(async () => {
        try {
            setProcesando(true);
            const frentes = await getFrentesByIdContratoHttp(contrato?.id);
            setFrentes(frentes);
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }, [contrato]);

    useEffect(() => {
        getDataFrentes();
    }, [getDataFrentes]);

    return {
        espacio,
        configsButton,
        darkMode,
        conceptos,
        AllowCell,
        setItemEdit,
        handleisAlertOpenEdit,
        deletePregunta,
        ExpandedComponent,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        procesando,
        actualizaEstatus,
        setOpenModalConfirm,
        setTextModalConfirm,
        openModalConfirm,
        textModalConfirm,
        handleisAlerCloseEdit,
        isAlertOpenEdit,
        itemEdit,
        frentes,
        handleGuardaConceptos
    }
}

export default useGestionConceptosPage
