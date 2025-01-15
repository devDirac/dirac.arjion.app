import React, { useEffect, useState } from 'react'

import AppBar from "@mui/material/AppBar";
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { Avatar, Grid, Menu, MenuItem, styled } from "@mui/material";
import logoPrincipal from "assets/images/Iconos_APM/fondo_transparente/logoPrincipal2.png";
import advertencia_2 from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_transparente/advertencia_2.png";
import folder_2 from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_transparente/folder_2.png";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SpeedDial from '@mui/material/SpeedDial';
import './style.scss'
import Stack from '@mui/material/Stack';
import { Button } from 'react-bootstrap';
import Switch, { SwitchProps } from '@mui/material/Switch';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { setDarkMode } from 'context';
import { useMaterialUIController } from 'context';
import { useSelector, useDispatch } from 'react-redux';
import ModalComponent from '../Modal/index';
import DinamicTable from '../../componets/DinamicTable/index';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { setMenuRoutes } from '../../actions/menu';
import FiltroContratoForm from '../../componets/FiltroContratoForm/FiltroContratoForm';
import _ from 'lodash';
import { setInfoNewDashboardAlertas } from '../../actions/newDashboard';
import moment from 'moment';
import DinamicTableMejorada from '../../componets/DinamicTableMejorada/DinamicTableMejorada';
import { numericFormatter } from 'react-number-format';

interface HeaderNewDashboardInfoProps {
    enMenu: () => void
    ocultaMenu: () => void
}

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

const HeaderNewDashboardInfo: React.FC<HeaderNewDashboardInfoProps> = (props: HeaderNewDashboardInfoProps) => {
    const navigate = useNavigate();

    const [controller, dispatch] = useMaterialUIController();
    const {
        darkMode,
    } = controller;
    const [queryParameters] = useSearchParams();
    const dispatch_ = useDispatch();
    const contrato = useSelector((state: any) => state?.app?.espacio || null);
    const foto_user = useSelector((state: any) => state?.app?.user?.data?.foto || null);
    const usuario = useSelector((state: any) => state?.app?.user?.data?.id || null);

    const [isAlertOpenAQlert, setIsAlertOpenAQlert] = useState(false);
    const [mensajeAlertAQlert, setMensajeAlertAQlert] = useState('');
    const handleisAlertOpenAQlert = () => setIsAlertOpenAQlert(true);
    const handleisAlerCloseAQlert = () => {
        setIsAlertOpenAQlert(false);
        navigate('/');

    };
    const ruta = useSelector((state: any) => state?.app?.ruta || []);
    const nombreProyecto = useSelector((state: any) => state?.app?.new_dashboard?.infoObra || []);
    const contratos_user = useSelector((state: any) => (state?.app?.user?.data?.contratos || []).filter((r:any)=>r?.id_obra_principal === contrato?.id) );
    
    const contratosVencidos = useSelector((state: any) =>  (state?.app?.user?.data?.contratos || []).filter((r:any)=>r?.id_obra_principal === contrato?.id).filter((e:any) => {
        const date1 = moment(e?.fecha_final);
        const date2 = moment(new Date());
        const dias_diferencia  = date2.diff(date1, "days")
        return dias_diferencia > 0;
    } ) );

    const contratosProxVencer = useSelector((state: any) => 
        (state?.app?.user?.data?.contratos || []).filter((r:any)=>r?.id_obra_principal === contrato?.id).filter((e:any) => {
            const date1 = moment(e?.fecha_final);
            const date2 = moment(new Date());
            const dias_diferencia  = date1.diff(date2, "days");
            return (dias_diferencia > 0 && dias_diferencia <= 15);
        } )
    );
    const [anchorElFotos, setAnchorElFotos] = React.useState<null | HTMLElement>(null);
    const openFotos = Boolean(anchorElFotos);

    

    const [esVencidos, setEsVencidos] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);


    const handleClickFotos = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElFotos(event.currentTarget);
    };
    const handleCloseFotos = () => {
        setAnchorElFotos(null);
    };

    const handleNavigation = (ruta_: string) => {
        if (ruta_ === 'Inicio') {
            dispatch(setMenuRoutes(ruta));
            navigate('/dashboard-apm' + '?usuario=' + usuario + '&contrato=' + contrato);
        }

        if (ruta === 'Dashboards de contratos') {
            dispatch(setMenuRoutes(ruta));
            navigate('/dashboard-apm-dashboard-contratos' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Gráfica de avance') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-grafica-avance' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Contratos-relacion-apm') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-contratos-relacion-apm' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Contratos-relacion') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-contratos-relacion' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Contratos-vencer') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-contratos-vencer' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Contratos-consulta-crono-financiera') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-contratos-consulta-crono-financiera' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Bitácora de estimaciones') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-bitacora-estimaciones' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Consulta de estimaciones') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-consulta-estimaciones' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Calendario de estimaciones') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-calendario-estimaciones' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Plan maestro') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-plan-maestro' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Usuarios del proyecto') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-usuarios-proyecto' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Actualizaciones SAP') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-actualizaciones-sap' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Consulta de productividad') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-consulta-productividad' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Alertas del proyecto') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-alertas-proyecto' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'CPO') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-CPO' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_ === 'Balance') {
            dispatch(setMenuRoutes(ruta_));
            navigate('/dashboard-apm-balance' + '?usuario=' + usuario + '&contrato=' + contrato)
        }
        if (ruta_.includes('/dashboard-apm-responsables?responsable=')) {
            dispatch(setMenuRoutes(ruta_));
            navigate(ruta_ + '&usuario=' + usuario + '&contrato=' + contrato)
        }
    }


    useEffect(() => {
        if (usuario === '' && contrato === '') {
            setMensajeAlertAQlert('Los parametros usuario y contrato son requeridos, sera redireccionado a la pantalla de logeo')
            handleisAlertOpenAQlert()
        }
    })

    return (
        <>


            <AppBar className='contenedor-principal' position="fixed" style={{ backgroundColor: '#28334a', color: '#fff', minHeight: '75px', boxShadow: '4px 75px 142px -26px rgba(0,0,0,0.6)' }}>
                <Box
                    sx={{
                        width: '100%',
                        mx: 0,
                        paddingLeft: 5,
                        paddingRight: 5,
                        position: 'relative',
                        top: '13px'
                    }}
                >
                    <Toolbar
                        disableGutters
                        sx={{
                            alignItems: "center",
                            minHeight: 70,
                            justifyContent: 'space-between'
                        }}
                    >
                        {/* Logo para pantallas grandes */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            <Avatar alt="Usuario" src={logoPrincipal} sx={{ ml: 2 }} style={{ width: '250px', height: 'auto', objectFit: 'cover', borderRadius: 0 }} />
                        </Typography>


                        {/* Logo para pantallas pequeñas */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                        >
                            <Avatar alt="Usuario" src={logoPrincipal} sx={{ ml: 2 }} style={{ width: '250px', height: 'auto', objectFit: 'cover', borderRadius: 0 }} />
                        </Typography>

                        {/* Menú hamburguesa para pantallas pequeñas */}
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} >
                            <IconButton
                                size="large"
                                aria-label="menú de navegación"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => props?.enMenu()}
                                color="inherit"
                            >
                                <MenuIcon style={{ border: 'solid 1px #222b3a', padding: 5 }} />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} >
                            <IconButton
                                size="large"
                                aria-label="menú de navegación"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => props?.ocultaMenu()}
                                color="inherit"
                            >
                                <MenuIcon style={{ border: 'solid 1px #222b3a', padding: 5 }} />
                            </IconButton>
                        </Box>
                        {/* seccion de la derecha contiene iconos de advertencias y la foto del usuario*/}
                        <Box sx={{ alignItems: 'center', ml: 2, mr: 2, display: { xs: "none", md: "flex" } }}>
                            <Grid container style={{ textAlign: 'right', marginLeft: 5 }}>
                                <Grid item xs={6} style={{}}>
                                    {/* Notificaciones */}
                                    {contratosVencidos?.length ? <Badge badgeContent={contratosVencidos?.length || 0} color="primary"  >
                                        <Avatar alt="Usuario" src={advertencia_2} style={{ width: '100px', position: 'relative', left: '25px', cursor: 'pointer' }} onClick={() => {
                                            setEsVencidos(true);
                                            handleisAlertOpen();
                                        }} />
                                    </Badge> : null}
                                </Grid>
                                <Grid item xs={6} style={{}}>
                                    {/* Configuración */}
                                    {contratosProxVencer?.length ? <Badge badgeContent={contratosProxVencer?.length || 0} color="warning">
                                        <Avatar alt="Usuario" src={folder_2} style={{ width: '100px', position: 'relative', left: '25px', cursor: 'pointer' }} onClick={() => {
                                            setEsVencidos(false);
                                            handleisAlertOpen();
                                        }} />
                                    </Badge> : null}
                                </Grid>
                            </Grid>
                            <Grid container style={{ textAlign: 'right', marginLeft: 5 }}>
                                <Grid item xs={12} style={{}}>
                                    <p style={{ fontSize: '13px', margin: 0, padding: 0 }} className='aqui-mi-titulo'>{contrato?.obra || ''}</p>
                                    <p style={{ fontSize: '11px', margin: 0, padding: 0 }} className='aqui-mi-titulo'><span style={{ width: 50, height: 50, backgroundColor: '#37b549', borderRadius: 10, color: '#37b549' }}>en </span>&nbsp;EN LÍNEA</p>
                                </Grid>
                            </Grid>
                            {/* Imagen del usuario */}
                            <Avatar alt="Usuario" src={foto_user} sx={{ ml: 2 }} style={{ borderRadius: 3, border: 'solid 1px #222b3a' }} />
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>


           
            <SpeedDial
                FabProps={{
                    sx: {
                        bgcolor: '#28334a',
                        '&:hover': {
                            bgcolor: '#2d789c',
                        }
                    }
                }}
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: '20px', right: '0px', width: '100px' }}
                icon={
                    <Button style={{ border: 'none', backgroundColor: 'transparent' }} aria-controls={openFotos ? 'basic-menu-foto' : undefined} aria-haspopup="true" aria-expanded={openFotos ? 'true' : undefined} onClick={handleClickFotos}>
                        <SettingsSuggestIcon fontSize="medium" />
                    </Button>
                }
            />
            <Menu
                id="basic-menu-foto"
                anchorEl={anchorElFotos}
                open={openFotos}
                onClose={handleCloseFotos}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem  >
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography> <small>Claro</small> </Typography>
                        <AntSwitch defaultChecked={darkMode} inputProps={{ 'aria-label': 'ant design' }} onChange={(event: any) => {
                            setDarkMode(dispatch, event.target.checked)
                        }} />
                        <Typography> <small>Obscuro</small> </Typography>
                    </Stack>
                </MenuItem>
            </Menu>

            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        {esVencidos ? (contratosVencidos?.length ? <DinamicTableMejorada
                            key={'Carpetas'}
                            titulo='Contratos vencidos'
                            data={contratosVencidos.map((r:any)=> {
                                return {
                                    contrato: r?.contrato,
                                    fecha_final: r?.fecha_final,
                                    fecha_inicio: r?.fecha_inicio,
                                    fecha_limite: r?.fecha_limite,
                                    fecha_registro: r?.fecha_registro,
                                    importe: numericFormatter((r?.importe + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    moneda: r?.moneda === 1 ? 'Pesos MX' :  r?.moneda === 2 ? 'Dolares EU' : 'Euros'  ,
                                    tipo_cambio: numericFormatter((r?.tipo_cambio + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                }
                            })}
                        /> : <p>Sin resultados</p>) : (contratosProxVencer?.length ? <DinamicTableMejorada
                            flex
                            key={'Carpetas'}
                            titulo='Contratos proximos a vencer (15 días)'
                            data={contratosProxVencer.map((r:any)=> {
                                return {
                                    contrato: r?.contrato,
                                    fecha_final: r?.fecha_final,
                                    fecha_inicio: r?.fecha_inicio,
                                    fecha_limite: r?.fecha_limite,
                                    fecha_registro: r?.fecha_registro,
                                    importe: numericFormatter((r?.importe + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    moneda: r?.moneda === 1 ? 'Pesos MX' :  r?.moneda === 2 ? 'Dolares EU' : 'Euros'  ,
                                    tipo_cambio: numericFormatter((r?.tipo_cambio + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                }
                            })}
                        /> : <p>Sin resultados</p>)}
                    </Grid>
                </Grid>
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseAQlert} isOpen={isAlertOpenAQlert} key={'AQlertalerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlertAQlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
        </>
    )
}

export default HeaderNewDashboardInfo;
