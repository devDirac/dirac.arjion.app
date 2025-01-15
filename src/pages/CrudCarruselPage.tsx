import { Backdrop, Box, Card, CardContent, CircularProgress, Divider, Grid, IconButton, Link, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import env from "react-dotenv";
import AddBannerForm from "../componets/Carrusel/AddBannerForm";
import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import AddCarruselForm from "../componets/Carrusel/AddCarruselForm";
import { getErrorHttpMessage, sleep } from "../utils";
import { useIntl } from "react-intl";
import { addPisoHttp, asignarContenidoHttp, deleteInfoBannerHttp, deletePisoHttp, editPisoHttp, getContenidoInformacionHttp, getContenidoParaAsignarHttp, getInfoBannerHttp, getPlayListHttp, setInfoBannerHttp, updateInfoBannerHttp } from "../actions/banner";
import ModalComponent from "../componets/Modal";
import DinamicTableMejorada from "../componets/DinamicTableMejorada/DinamicTableMejorada";
import AppAppBarC from "../componets/Carrusel/AppAppBarC";
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { AnyARecord } from "dns";
import SearchFiltro from "../componets/SearchFiltro/SearchFiltro";
import _ from "lodash";
import ModalConfirm from "../componets/ModalConfirm/ModalConfirm";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddPisoForm from "../componets/Carrusel/AddPisoForm";
import DinamicTable from "../componets/DinamicTable";
import CampoSwitch from "../componets/CampoSwitch";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CrudCarruselPage: React.FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const id_usuario: string = queryParameters.get("id") || '0';
    const [tipo, setTipo] = useState<any>(null);
    const [procesando, setProcesando] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const [isAlertOpenEdit, setIsAlertOpenEdit] = useState(false);
    const handleisAlertOpenEdit = () => setIsAlertOpenEdit(true);
    const handleisAlerCloseEdit = () => setIsAlertOpenEdit(false);
    const [value, setValue] = React.useState(0);
    const [playList, setPlayList] = useState<any>([]);
    const [playListAll, setPlayListAll] = useState([]);
    const [data, setData] = useState([]);
    const [dataAsignar, setDataAsignar] = useState([]);
    const [itmEdit, setItemEdit] = useState<any>(null);
    const [tipoEdit, setTipoEdit] = useState('');
    const [playListSeleccionado, setPlayListSeleccionado] = useState<any>(null);
    const [playListSeleccionadoAsignar, setPlayListSeleccionadoAsignar] = useState<any>(null);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [openModalConfirmPlay, setOpenModalConfirmPlay] = useState(false);
    const [playList_, setPlayList_] = useState([]);
    const [playListAll_, setPlayListAll_] = useState([]);
    const [isAlertOpenEditPlay, setIsAlertOpenEditPlay] = useState(false);
    const handleisAlertOpenEditPlay = () => setIsAlertOpenEditPlay(true);
    const handleisAlerCloseEditPlay = () => setIsAlertOpenEditPlay(false);
    const [itemEditPlay, setItemEditPlay] = useState<any>(null);

    const [isAlertOpenEditPlayAdd, setIsAlertOpenEditPlayAdd] = useState(false);
    const handleisAlertOpenEditPlayAdd = () => setIsAlertOpenEditPlayAdd(true);
    const handleisAlerCloseEditPlayAdd = () => setIsAlertOpenEditPlayAdd(false);

    const handleEditPlayList = async (dta: any) => {
        try {
            setProcesando(true);
            await editPisoHttp({ id: itemEditPlay?.id, piso: dta?.piso });
            handleisAlerCloseEditPlay();
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            handleisAlertOpen();
            getPisos_();
            getPisos();
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            console.log(error)
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            handleisAlertOpen();
        }
    }

    const getPisos_ = useCallback(async () => {
        try {
            setProcesando(true);
            const resp: any = await getPlayListHttp();
            setPlayListAll_(resp)
            setPlayList_(resp)
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            console.log(error)
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }, []);

    useEffect(() => {
        getPisos_()
    }, [getPisos_]);

    const handleFiltro_ = (textoFiltrar: string) => {
        const text_ = textoFiltrar.toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');
        const clonUser = Object.assign([], playListAll_);
        if (_.isEmpty(textoFiltrar)) {
            setPlayList_(playListAll_);
            return;
        }
        setPlayList_(
            clonUser.filter(
                (c: any) =>
                    (c?.piso || '').toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').includes(text_.trim())
            )
        );
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setPlayList(playListAll);
        setPlayListSeleccionadoAsignar(null)
        getContenidoInformacion()
        setTipo(null)
        setPlayListSeleccionado(null)
        setData([])
        getPisos_()
    };

    const getPisos = useCallback(async () => {
        try {
            setProcesando(true);
            const resp: any = await getPlayListHttp();
            setPlayList(resp);
            setPlayListAll(resp);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }, []);

    const handleEditItem = async (data: any) => {
        try {
            setProcesando(true);
            const texto = data?.texto;
            const piso = data?.piso.map((w: any) => w?.value);
            const media = data?.file || null;
            const data1 = new FormData();
            if (texto) {
                data1.append("texto", texto);
            }
            if (media) {
                data1.append("file", media);
            }
            data1.append("piso", piso.toString());
            data1.append("id", itmEdit?.id)
            await updateInfoBannerHttp(data1);
            setItemEdit(null);
            getData(playListSeleccionado);
            getContenidoInformacion()
            handleisAlerCloseEdit()
            setMensajeAlert('Exito al actualizar');
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }

    const handleAddPiso = async (data: any) => {
        try {
            setProcesando(true);
            await addPisoHttp({ ...data, ...{ user_id: id_usuario } });
            handleisAlerCloseEditPlayAdd();
            getPisos();
            getPisos_();
            setMensajeAlert('Exito al guardar');
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }

    const handleAddItem = async (data: any) => {
        try {
            setProcesando(true);
            const texto = data?.texto;
            const piso = data?.piso.map((w: any) => w?.value);
            const media = data?.file || null;
            const data1 = new FormData();
            if (texto) {
                data1.append("texto", texto);
            }
            if (media) {
                data1.append("file", media);
            }
            data1.append("piso", piso.toString());
            data1.append("user_id", id_usuario);
            await setInfoBannerHttp(data1);
            getContenidoInformacion()
            getPisos()
            setMensajeAlert('Exito al guardar');
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }

    const getContenidoInformacion = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getContenidoInformacionHttp();
            setDataAsignar(response);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            handleisAlertOpen();
        }
    }, [])

    useEffect(() => {
        getContenidoInformacion()
    }, [getContenidoInformacion])

    const getDataAsignar = async (id: any) => {
        try {
            setProcesando(true);
            const response = await getContenidoParaAsignarHttp(id);
            setDataAsignar(response);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }

    const getData = async (id: any) => {
        try {
            setProcesando(true);
            const response = await getInfoBannerHttp(id);
            setData(response);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }

    useEffect(() => {
        getPisos();
    }, [getPisos]);

    const handleDeletePlay = async () => {
        try {
            setProcesando(true);
            await deletePisoHttp(itemEditPlay?.id);
            getPisos_();
            getPisos();
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_eliminar' }));
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_eliminar' }));
            handleisAlertOpen();
        }
    }

    const handleDelete = async () => {
        try {
            setProcesando(true);
            await deleteInfoBannerHttp(itmEdit?.id, playListSeleccionado);
            setItemEdit(null);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_eliminar' }));
            handleisAlertOpen();
            getContenidoInformacion()
            getData(playListSeleccionado);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_eliminar' }));
            handleisAlertOpen();
        }
    }

    const handleFiltro = (textoFiltrar: string) => {
        const text_ = textoFiltrar.toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');
        const clonUser = Object.assign([], playListAll);
        if (_.isEmpty(textoFiltrar)) {
            setPlayList(playListAll);
            return;
        }
        setPlayList(
            clonUser.filter(
                (c: any) =>
                    (c?.piso || '').toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').includes(text_.trim())
            )
        );
    };

    const deletePreguntaPlay = () => {
        setOpenModalConfirmPlay(true);
    }

    const deletePregunta = () => {
        setOpenModalConfirm(true);
    }

    const handleCheck = (dta: any, elementoId: any) => {
        const nuevosDataAsignar: any = Object.assign([], dataAsignar);
        setDataAsignar(nuevosDataAsignar.map((r: any) => {
            const check = r?.id === elementoId ? dta : r?.check
            return {
                ...r,
                ...{
                    check
                }

            }
        }))
    }

    const handleAsignarRepositorio = async () => {
        try {
            setProcesando(true)
            await asignarContenidoHttp({ elementos: dataAsignar, id_play: playListSeleccionadoAsignar });
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            getPisos();
            getPisos_();
            handleisAlertOpen();
            getDataAsignar(playListSeleccionadoAsignar);
            setProcesando(false)
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    return (
        <>
            <AppAppBarC />
            <Grid container style={{ backgroundColor: '#fff', position: 'relative', top: 20 }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrar listas de reproducción" {...a11yProps(0)} />
                            <Tab label="Administrar el repositorio de multimedia" {...a11yProps(1)} />
                            <Tab label="Asignar contenido a las listas de reproducción" {...a11yProps(2)} />
                            <Tab label="Consulta de listas con contenido asignado" {...a11yProps(3)} />
                            <Tab label="Reproducir listas de reproducción" {...a11yProps(4)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'right' }}>
                            <Button
                                size="sm"
                                variant={`outline-primary ${tipo === 'banner' ? 'active' : ''}`}
                                onClick={(e: any) => {
                                    handleisAlertOpenEditPlayAdd()
                                }}
                            > Agregar lista de reproducción </Button>
                        </Grid>
                        {playList_?.length ? <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'center' }}>
                            <DinamicTableMejorada
                                actions
                                flex
                                esInfoCarrusel
                                enAccion={(accion, data) => {
                                    setItemEditPlay(data);
                                    if (accion === 'eliminar') {
                                        deletePreguntaPlay();
                                    }
                                    if (accion === 'editar') {
                                        handleisAlertOpenEditPlay();
                                    }
                                }}
                                key={'playList_'}
                                columnsToShow={['lista_reproduccion', 'contenido']}
                                data={playList_.map((r: any) => {
                                    return {
                                        ...r,
                                        ...{
                                            lista_reproduccion: r?.piso,
                                            contenido: r?.elementos
                                        }
                                    }
                                })}
                            />
                        </Grid> : null}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid xs={12} style={{ textAlign: 'center' }}>
                            <ButtonGroup>
                                <Button
                                    variant={`outline-primary ${tipo === 'banner' ? 'active' : ''}`}
                                    onClick={(e: any) => {
                                        setTipo('banner');
                                    }}
                                > Marquesina </Button>
                                <Button
                                    variant={`outline-primary ${tipo === 'carrusel' ? 'active' : ''}`}
                                    onClick={(e: any) => {
                                        setTipo('carrusel');
                                    }}
                                > Carrusel </Button>
                            </ButtonGroup>
                            <Divider></Divider>
                            <Grid container>
                                {tipo === 'banner' ? <Grid xs={12} style={{ textAlign: 'left' }}>
                                    <AddBannerForm addLista={(d) => handleAddPiso(d)} pisos={playList?.map((r: any) => {
                                        return {
                                            nombre: r?.piso, id: r?.id
                                        }
                                    })} procesando={false} enAccion={(d) => handleAddItem(d)} />
                                </Grid> : null}
                                {tipo === 'carrusel' ? <Grid xs={12} style={{ textAlign: 'left' }}>
                                    <AddCarruselForm addLista={(d) => handleAddPiso(d)} pisos={playList?.map((r: any) => {
                                        return {
                                            nombre: r?.piso, id: r?.id
                                        }
                                    })} procesando={false} enAccion={(d) => handleAddItem(d)} />
                                </Grid> : null}
                            </Grid>
                            {dataAsignar.filter((r: any) => {
                                        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
                                        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
                                        const extension = (r.ruta_media || '').split('.').pop().toLowerCase();
                                        let tipo_;
                                        if (imageExtensions.includes(extension)) {
                                            tipo_ = 'carrusel';
                                        } else if (videoExtensions.includes(extension)) {
                                            tipo_ = 'carrusel';
                                        } else {
                                            tipo_ = 'banner'
                                        }
                                        return tipo_ === tipo
                                    })?.length && tipo ? <Grid xs={12} style={{ textAlign: 'center', paddingTop: 50 }}>
                                <DinamicTableMejorada
                                    actions
                                    flex
                                    esInfoCarrusel
                                    enAccion={(accion, data) => {
                                        setItemEdit({ ...data, ...{ piso: (data?.piso + '').split(",") } })
                                        if (accion === 'eliminar') {
                                            deletePregunta()
                                        }
                                        if (accion === 'editar') {
                                            const extension = (data?.ruta_media || '').split('.').pop().toLowerCase();
                                            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                                            const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
                                            if (imageExtensions.includes(extension)) {
                                                setTipoEdit('imagen')
                                            } else if (videoExtensions.includes(extension)) {
                                                setTipoEdit('video')
                                            } else {
                                                setTipoEdit('texto')
                                            }
                                            handleisAlertOpenEdit();
                                        }
                                    }}
                                    key={'reclasificaciones'}
                                    columnsToShow={['texto', 'fecha_registro', 'ruta', 'lista', 'tipo']}
                                    data={dataAsignar.filter((r: any) => {
                                        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
                                        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
                                        const extension = (r.ruta_media || '').split('.').pop().toLowerCase();
                                        let tipo_;
                                        if (imageExtensions.includes(extension)) {
                                            tipo_ = 'carrusel';
                                        } else if (videoExtensions.includes(extension)) {
                                            tipo_ = 'carrusel';
                                        } else {
                                            tipo_ = 'banner'
                                        }
                                        return tipo_ === tipo
                                    }).map((r: any) => {
                                        const piso: any = playList.find((w: any) => w?.id === r?.piso);
                                        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
                                        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
                                        const extension = (r.ruta_media || '').split('.').pop().toLowerCase();
                                        let tipo;
                                        if (imageExtensions.includes(extension)) {
                                            tipo = 'Image';
                                        } else if (videoExtensions.includes(extension)) {
                                            tipo = 'Video';
                                        } else {
                                            tipo = 'Noticias'
                                        }
                                        return {
                                            ...r,
                                            ...{
                                                ruta: r?.ruta_media,
                                                lista: piso?.piso || '',
                                                fecha_registro: r?.fecha_registro,
                                                tipo
                                            }
                                        }
                                    })}
                                />
                            </Grid> : tipo && !procesando ? <p style={{ marginTop: 50, textAlign: 'center' }}></p> : tipo && procesando ? '' : ''}


                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Grid container spacing={2}>
                            <Grid xs={12} style={{ textAlign: 'center' }}>
                                <h5>Selecciona la lista de reproducción para agregar o eliminar contenido</h5>
                            </Grid>
                            {playList?.length ? <Grid xs={12} style={{ textAlign: 'center' }} >
                                {playList.map((r: any, key: any) => {
                                    return (
                                        <Button
                                            size="sm"
                                            style={{ marginRight: 5 }}
                                            onClick={(e: any) => {
                                                getDataAsignar(r?.id);
                                                setPlayListSeleccionadoAsignar(r?.id)
                                            }}
                                            variant={`outline-primary ${playListSeleccionadoAsignar === r?.id ? 'active' : ''}`}>
                                            {r?.piso}
                                        </Button>
                                    )
                                })}
                            </Grid> : null}






                            {dataAsignar?.length && playListSeleccionadoAsignar ? <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'right' }}>
                                <Button
                                    size="sm"
                                    variant={`outline-primary ${tipo === 'banner' ? 'active' : ''}`}
                                    onClick={(e: any) => {
                                        handleAsignarRepositorio()
                                    }}
                                > Guardar cambios </Button>
                            </Grid> : null}
                            {dataAsignar?.length && playListSeleccionadoAsignar ? <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'center' }}>
                                <List
                                    sx={{
                                        width: '100%',
                                        margin: '0 auto',
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    {dataAsignar.map((r: any, key: any) => {
                                        return (
                                            <React.Fragment key={r?.id}>
                                                <ListItem alignItems="flex-start" style={{}} secondaryAction={
                                                    <CampoSwitch
                                                        key={key}
                                                        label={r?.check ? 'Contenido agregado' : 'Agregar conteido'}
                                                        value={r?.check}
                                                        onAction={(v) => handleCheck(v, r?.id)}
                                                    />
                                                }>
                                                    <ListItemText
                                                        primary={r?.texto ? 'Contenido para la marquesina' : 'Contenido para el carrusel'}
                                                        secondary={
                                                            <React.Fragment>
                                                                {r?.texto ? r?.texto : <Link
                                                                    target="_blank"
                                                                    href={`${env.API_URL_DOCUMENTOS === 'https://diracapm.qubi.com.mx/' ? env.API_URL_DOCUMENTOS + (r?.ruta_media || "").replaceAll('storage/app/', '') : env.API_URL_DOCUMENTOS + r?.ruta_media}`}
                                                                >
                                                                    <PreviewIcon color='primary' />
                                                                </Link>}
                                                                <p>{(r?.ruta_media || "").replaceAll('storage/app/documentos/', '')}</p>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </React.Fragment>
                                        )
                                    })}
                                </List>
                            </Grid> : null}
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Grid container spacing={2}>
                            <Grid xs={12} style={{ textAlign: 'center' }}>
                                <h5>Selecciona la lista de reproducción</h5>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: 360 }}>
                                    <SearchFiltro onFiltro={handleFiltro} />
                                </div>
                            </Grid></Grid>
                        {playList?.filter((r: any) => r?.elementos)?.length ? <Grid item xs={12} style={{ textAlign: 'center' }} >
                            {playList.filter((r: any) => r?.elementos).map((r: any, key: any) => {
                                return (
                                    <Button
                                        size="sm"
                                        style={{ marginRight: 5 }}
                                        onClick={(e: any) => {
                                            getData(r?.id);
                                            setPlayListSeleccionado(r?.id)
                                        }}
                                        variant={`outline-primary ${playListSeleccionado === r?.id ? 'active' : ''}`}>
                                        {r?.piso}
                                    </Button>
                                )
                            })}

                        </Grid> : <Grid item xs={12} style={{ textAlign: 'center' }} >Ninguna de sus listas de reproducción tienen contenido asignado</Grid>}
                        {data?.length ? <Grid xs={12} style={{ textAlign: 'center', paddingTop: 50 }}>
                            <DinamicTableMejorada
                                flex
                                esInfoCarrusel
                                key={'reclasificaciones'}
                                columnsToShow={['texto', 'fecha_registro', 'ruta', 'lista', 'tipo']}
                                data={data.map((r: any) => {
                                    const piso: any = playList.find((w: any) => w?.id === r?.piso);
                                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
                                    const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
                                    const extension = (r.ruta_media || '').split('.').pop().toLowerCase();
                                    let tipo;
                                    if (imageExtensions.includes(extension)) {
                                        tipo = 'Image';
                                    } else if (videoExtensions.includes(extension)) {
                                        tipo = 'Video';
                                    } else {
                                        tipo = 'Noticias'
                                    }
                                    return {
                                        ...r,
                                        ...{
                                            ruta: r?.ruta_media,
                                            lista: piso?.piso || '',
                                            fecha_registro: r?.fecha_registro,
                                            tipo
                                        }
                                    }
                                })}
                            />
                        </Grid> : playListSeleccionado && !procesando ? <p style={{ marginTop: 50, textAlign: 'center' }}>Sin registros</p> : playListSeleccionado && procesando ? '' : ''}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <Grid xs={12} style={{ textAlign: 'center' }}>
                            <Grid
                                container
                                style={{ backgroundColor: '#fff', position: 'relative', top: 20 }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15 }}>
                                    <h5>Listas de reproducción</h5>
                                </Grid>
                                <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ width: 360 }}>
                                        <SearchFiltro onFiltro={handleFiltro_} />
                                    </div>
                                </Grid>
                                {playList_?.length ? <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'center' }}>
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 360,
                                            margin: '0 auto',
                                            bgcolor: 'background.paper',
                                        }}
                                    >
                                        {playList_.map((r: any) => {
                                            return (
                                                <React.Fragment key={r?.id}>
                                                    <ListItem alignItems="flex-start" style={{}} secondaryAction={
                                                        <IconButton edge="end" aria-label="delete" disabled={r?.elementos === 0} onClick={() => {
                                                            navigate('/info-dirac?playlist=' + r?.id)
                                                        }}>
                                                            <HighlightAltIcon />
                                                        </IconButton>
                                                    }>
                                                        <ListItemText
                                                            primary={r?.piso}
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        sx={{ color: 'text.primary', display: 'inline' }}
                                                                    >
                                                                        {r?.elementos === 0 ? 'No hay elementos para mostrar' : 'Seleccione la lista'}
                                                                    </Typography>
                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </React.Fragment>
                                            )
                                        })}
                                    </List>
                                </Grid> : null}
                            </Grid >
                        </Grid>
                    </CustomTabPanel>
                </Box>
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
                <ModalComponent handleClose={handleisAlerCloseEditPlay} isOpen={isAlertOpenEditPlay} key={'alertaEditPlay_1'}>
                    <AddPisoForm procesando={procesando} enAccion={(d) => { handleEditPlayList(d) }} item={itemEditPlay} />
                </ModalComponent>
                <ModalComponent handleClose={handleisAlerCloseEditPlayAdd} isOpen={isAlertOpenEditPlayAdd} key={'alertaEditPlay'}>
                    <AddPisoForm procesando={procesando} enAccion={(d) => { handleAddPiso(d) }} />
                </ModalComponent>
                <ModalComponent handleClose={handleisAlerCloseEdit} isOpen={isAlertOpenEdit} key={'alertaEdit'}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <br></br>
                            <br></br>
                            <br></br>
                            {tipoEdit === 'imagen' || tipoEdit === 'video' ? <AddCarruselForm addLista={(d) => handleAddPiso(d)} pisos={playList?.map((r: any) => {
                                return {
                                    nombre: r?.piso, id: r?.id
                                }
                            })} item={itmEdit} procesando={false} enAccion={(d) => handleEditItem(d)} /> : null}
                            {tipoEdit === 'texto' ? <AddBannerForm addLista={(d) => handleAddPiso(d)} pisos={playList?.map((r: any) => {
                                return {
                                    nombre: r?.piso, id: r?.id
                                }
                            })} item={itmEdit} procesando={false} enAccion={(d) => handleEditItem(d)} /> : null}
                        </Grid>
                    </Grid>
                </ModalComponent>
                <ModalConfirm onAcept={() => {
                    handleDelete();
                    setOpenModalConfirm(false);
                }} onCancel={() => {
                    setOpenModalConfirm(false);
                }} open={openModalConfirm} text={`¿Desea eliminar el registro seleccionado, tome en cuenta este elemento no aparecera en ninguna lista de reproducción asociada?`} title={''} />
                <ModalConfirm onAcept={() => {
                    handleDeletePlay();
                    setOpenModalConfirmPlay(false);
                }} onCancel={() => {
                    setOpenModalConfirmPlay(false);
                }} open={openModalConfirmPlay} text={`¿Desea eliminar la lista de reproducción seleccionada?`} title={''} />
            </Grid>
        </>
    );
};

export default CrudCarruselPage;
