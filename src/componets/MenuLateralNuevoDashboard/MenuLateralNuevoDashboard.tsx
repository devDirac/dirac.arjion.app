import { Avatar, Collapse, Fab, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Zoom } from '@mui/material'
import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import iconoInicio from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_01_inicio.png";
import iconoDashboardContratos from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_02 dashboards de contratos.png";
import iconoGraficaAvance from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_03_Grafica de avance.png";
import iconoContratos from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_04_Contratos.png";
import iconoBitacoraEstimaciones from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_05_bitacora de estimaciones.png";
import iconoConsultaEstimaciones from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_06_consulta de estimaciones.png";
import iconoCalendarioActividades from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_07_Calendario de actividades.png";
import iconoIrAPM from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_08_apm.png";
import iconoPlanMaestro from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_09_Plan maestro.png";
import iconoUsuariosProyecto from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_010_usuarios del proyecto.png";
import iconoActualizacionesSAP from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_011_actualizaciones sap.png";
import iconoConsultaProductividad from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_012_consulta de productividad.png";
import iconoAlertasProyecto from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_013_ alertas del proyecto .png";
import iconoCPO from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_014_cpo.png";
import iconoBalance from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_015_balance.png";
import iconoResponsables from "assets/images/Iconos_APM/100x100_px/Iconos_APM/fondo_azul/iconos_016 responsables .png";

import StarBorder from '@mui/icons-material/StarBorder';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setMenuRoutes } from '../../actions/menu';
import routes from '../../routes';
interface MenuLateralNuevoDashboardProps {
    enToggleDrawer?: (d: boolean, opcion: string) => void
    menuActivo?: string
}


const MenuLateralNuevoDashboard: React.FC<MenuLateralNuevoDashboardProps> = (props: MenuLateralNuevoDashboardProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    
    const responsables = useSelector((state: any) => state?.app?.new_dashboard?.opcionesResponsables || []);
    const ruta = useSelector((state: any) => location?.pathname.includes('dashboard-apm') && location?.pathname.includes('-info') ? state?.app?.ruta2 || '' : state?.app?.ruta1 || '');
    const [open, setOpen] = React.useState(ruta === 'Contratos-relacion-apm' || ruta === 'Contratos-relacion' || ruta === 'Contratos-vencer' || ruta === 'Contratos-consulta-crono-financiera' ? true : false);
    const [openResponsables, setOpenResponsables] = React.useState(ruta === 'responsables-autor-1' || ruta === 'responsables-autor-2' || ruta === 'responsables-auditor-demo-3' || ruta === 'responsables-auditor-demo' ? true : false);
    
    const [openAvance, setOpenAvance] = React.useState(ruta === 'proyeccion-de-avance' || ruta === 'avance-financiero' || ruta === 'avance-fisico' || ruta === 'avance-real-vs-programado' ? true : false);


    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickResponsables = () => {
        setOpenResponsables(!openResponsables);
    };

    const handleClickAvance = () => {
        setOpenAvance(!openAvance);
    };

    const handleNavigation = (s: string) => {
        if (s === 'Inicio') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm');
        }
        if (s === 'Dashboards de contratos') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-dashboard-contratos')
        }
        if (s === 'Gráfica de avance') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-grafica-avance')
        }
        if (s === 'Contratos-relacion-apm') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-contratos-relacion-apm')
        }
        if (s === 'Contratos-relacion') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-contratos-relacion')
        }
        if (s === 'Contratos-vencer') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-contratos-vencer')
        }
        if (s === 'Contratos-consulta-crono-financiera') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-contratos-consulta-crono-financiera')
        }
        if (s === 'Bitácora de estimaciones') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-bitacora-estimaciones')
        }
        if (s === 'Consulta de estimaciones') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-consulta-estimaciones')
        }
        if (s === 'Calendario de estimaciones') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-calendario-estimaciones')
        }
        if (s === 'Plan maestro') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-plan-maestro')
        }
        if (s === 'Usuarios del proyecto') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-usuarios-proyecto')
        }
        if (s === 'Actualizaciones SAP') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-actualizaciones-sap')
        }
        if (s === 'Consulta de productividad') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-consulta-productividad')
        }
        if (s === 'Alertas del proyecto') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-alertas-proyecto')
        }
        if (s === 'CPO') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-CPO')
        }
        if (s === 'Balance') {
            dispatch(setMenuRoutes(s));
            navigate('/dashboard-apm-balance')
        }
        if (s.includes('/dashboard-apm-responsables?responsable=')) {
            dispatch(setMenuRoutes(s));
            navigate(s)
        }
    }

    return (
        <Grid container>
            <Grid xs={12} className='degradado'>
                <h5 className='ITEMS-MENU-BOLD'>MENÚ DE NAVEGACIÓN DEL PROYECTO</h5>
            </Grid>
            <Grid xs={12} style={{ backgroundColor: '#fff', padding: 0 }}>
                <List sx={{ width: '100%' }}>
                    <ListItem className={`elementoMenu ${ruta === 'Inicio' || ruta === '' || !ruta ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Inicio')}>
                        <Avatar alt="Usuario" src={iconoInicio} sx={{ borderRadius: 1,  }} style={{width:34, height:34}} />&nbsp;
                        <p className='ITEMS-MENU'>Inicio {ruta === 'Inicio' ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem>
                   
                   { location?.pathname.includes('dashboard-apm') && !location?.pathname.includes('-info') ? <ListItem className={`elementoMenu ${ruta === 'Gráfica de avance' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Gráfica de avance')}>
                        <Avatar alt="Usuario" src={iconoGraficaAvance} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Gráfica de avance {ruta === 'Gráfica de avance' ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem> : null }

                    {
                        location?.pathname.includes('dashboard-apm') && location?.pathname.includes('-info') ? 
                        <ListItem className={`elementoMenu ${ruta === 'dashboard-apm-avance-financiero-info' || ruta === 'dashboard-apm-avance-fisico-info' || ruta === 'dashboard-apm-avance-real-vs-programado-info' || ruta === 'Gráfica de avance' ? 'activo' : ''}`} onClick={handleClickAvance}>
                            <Avatar alt="Usuario" src={iconoGraficaAvance} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                            <p className='ITEMS-MENU'>Graficas de desglose de avance {openAvance ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                        </ListItem> : null
                    }
                    {
                        location?.pathname.includes('dashboard-apm') && location?.pathname.includes('-info') ? <Collapse in={openAvance} timeout="auto" unmountOnExit key={'avance'}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Gráfica de avance')} className={` ${ruta === 'Gráfica de avance' ? 'activo' : ''} `} >
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Gráfica de avance</p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'dashboard-apm-avance-fisico-info')} className={` ${ruta === 'dashboard-apm-avance-fisico-info' ? 'activo' : ''} `} >
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Avance fisico</p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'dashboard-apm-avance-financiero-info')} className={` ${ruta === 'dashboard-apm-avance-financiero-info' ? 'activo' : ''} `} >
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Avance financiero</p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'dashboard-apm-avance-real-vs-programado-info')} className={` ${ruta === 'dashboard-apm-avance-real-vs-programado-info' ? 'activo' : ''} `} >
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Avance Finan. Real vs Programado </p>
                            </ListItemButton>
                        </List>
                    </Collapse>: null
                    }


                    <ListItem className={`elementoMenu ${ruta === 'Contratos-relacion-apm' || ruta === 'Contratos-relacion' || ruta === 'Contratos-vencer' || ruta === 'Contratos-consulta-crono-financiera' || ruta === 'todos-los-contratos' || ruta === 'contratos-vigentes'  ? 'activo' : ''}`} onClick={handleClick}>
                        <Avatar alt="Usuario" src={iconoContratos} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Contratos {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Contratos-relacion-apm')} className={` ${ruta === 'Contratos-relacion-apm' ? 'activo' : ''} `} >
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Relación de contratos APM </p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Contratos-relacion')} className={` ${ruta === 'Contratos-relacion' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Relación de contratos </p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Contratos-vencer')} className={` ${ruta === 'Contratos-vencer' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Contratos a vencer </p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Contratos-consulta-crono-financiera')} className={` ${ruta === 'Contratos-consulta-crono-financiera' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Consulta crono-financiera </p>
                            </ListItemButton>
                            {/* {
                                location?.pathname.includes('dashboard-apm') && location?.pathname.includes('-info') ? 
                                <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'todos-los-contratos')} className={` ${ruta === 'todos-los-contratos' ? 'activo' : ''} `}>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon fontSize='small' />
                                    </ListItemIcon>
                                    <p className='ITEMS-MENU'>Todos los contratos </p>
                                </ListItemButton> : null
                            }
                            {
                                location?.pathname.includes('dashboard-apm') && location?.pathname.includes('-info') ? 
                                <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'contratos-vigentes')} className={` ${ruta === 'contratos-vigentes' ? 'activo' : ''} `}>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon fontSize='small' />
                                    </ListItemIcon>
                                    <p className='ITEMS-MENU'>Contratos vigentes </p>
                                </ListItemButton> : null
                            } */}
                        </List>
                    </Collapse>
                    <ListItem className={`elementoMenu ${ruta === 'Bitácora de estimaciones' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Bitácora de estimaciones')}>
                        <Avatar alt="Usuario" src={iconoBitacoraEstimaciones} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Bitácora de estimaciones {ruta === 'Bitácora de estimaciones' ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Consulta de estimaciones' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Consulta de estimaciones')}>
                        <Avatar alt="Usuario" src={iconoConsultaEstimaciones} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Consulta de estimaciones {ruta === 'Consulta de estimaciones' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Calendario de estimaciones' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Calendario de estimaciones')}>
                        <Avatar alt="Usuario" src={iconoCalendarioActividades} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Calendario de actividades {ruta === 'Calendario de estimaciones' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Ir al APM' ? 'activo' : ''}`} onClick={() => {
                        props?.enToggleDrawer && props?.enToggleDrawer(false, 'Ir al APM');
                        if(location?.pathname.includes('dashboard-apm') && location?.pathname.includes('-info')){
                            dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'parametros-sistema')));
                            navigate(`/catalogo-de-conceptos-por-frentes`);
                        }else{
                            window.open(`https://apmdirac.mx/`);
                        }
                        
                        }}>
                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Ir a <strong>APM</strong> {ruta === 'Ir al APM' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Plan maestro' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Plan maestro')}>
                        <Avatar alt="Usuario" src={iconoPlanMaestro} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Plan maestro {ruta === 'Plan maestro' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Usuarios del proyecto' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Usuarios del proyecto')}>
                        <Avatar alt="Usuario" src={iconoUsuariosProyecto} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Usuarios del proyecto {ruta === 'Usuarios del proyecto' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Actualizaciones SAP' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Actualizaciones SAP')}>
                        <Avatar alt="Usuario" src={iconoActualizacionesSAP} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Actualizaciones SAP {ruta === 'Actualizaciones SAP' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Consulta de productividad' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Consulta de productividad')}>
                        <Avatar alt="Usuario" src={iconoConsultaProductividad} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Consulta de productividad {ruta === 'Consulta de productividad' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Alertas del proyecto' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Alertas del proyecto')}>
                        <Avatar alt="Usuario" src={iconoAlertasProyecto} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Alertas del proyecto {ruta === 'Alertas del proyecto' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'CPO' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'CPO')}>
                        <Avatar alt="Usuario" src={iconoCPO} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>CPO {ruta === 'CPO' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Balance' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Balance')}>
                        <Avatar alt="Usuario" src={iconoBalance} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Balance {ruta === 'Balance' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ typeof ruta === 'string' ? ruta.includes('/dashboard-apm-responsables?responsable=') ? 'activo' : '' : ''}`} onClick={handleClickResponsables}>
                        <Avatar alt="Usuario" src={iconoResponsables} sx={{ borderRadius: 1 }} style={{width:34, height:34}}/>&nbsp;
                        <p className='ITEMS-MENU'>Responsables {openResponsables ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <Collapse in={openResponsables} timeout="auto" unmountOnExit key={'responsables'}>
                        <List component="div" disablePadding>
                            {
                                responsables.map((r: any) => {
                                    return (
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, '/dashboard-apm-responsables?responsable='+r?.usuario)} className={` ${ruta === '/dashboard-apm-responsables?responsable='+r?.usuario ? 'activo' : ''} `} >
                                            <ListItemIcon>
                                                <FiberManualRecordIcon fontSize='small' />
                                            </ListItemIcon>
                                            <p className='ITEMS-MENU'>{r?.nombre}</p>
                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                    </Collapse>
                    
                </List>
            </Grid>
        </Grid>
    )
}

export default MenuLateralNuevoDashboard
