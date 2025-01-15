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
import { useNavigate } from 'react-router-dom';
import { setMenuRoutes } from '../../actions/menu';
interface MenuLateralNuevoDashboardProps {
    enToggleDrawer?: (d: boolean, opcion: string) => void
    menuActivo?: string
}


const MenuLateralNuevoDashboard: React.FC<MenuLateralNuevoDashboardProps> = (props: MenuLateralNuevoDashboardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ruta = useSelector((state: any) => state?.app?.ruta || '');
    const [open, setOpen] = React.useState(ruta === 'Contratos-relacion-apm' || ruta === 'Contratos-relacion' || ruta === 'Contratos-vencer' || ruta === 'Contratos-consulta-crono-financiera' ? true : false);
    const [openResponsables, setOpenResponsables] = React.useState(ruta === 'responsables-autor-1' || ruta === 'responsables-autor-2' || ruta === 'responsables-auditor-demo-3' || ruta === 'responsables-auditor-demo' ? true : false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickResponsables = () => {
        setOpenResponsables(!openResponsables);
    };

    return (
        <Grid container>
            <Grid xs={12} className='degradado'>
                <h5 className='ITEMS-MENU-BOLD'>MENÚ DE NAVEGACIÓN DEL CONTRATO</h5>
            </Grid>
            <Grid xs={12} style={{ backgroundColor: '#fff', padding: 0 }}>
                <List sx={{ width: '100%' }}>
                    <ListItem className={`elementoMenu ${ruta === 'InicioContrato' || ruta === '' || !ruta ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'InicioContrato')}>
                        <Avatar alt="Usuario" src={iconoInicio} sx={{ borderRadius: 1, }} style={{ width: 34, height: 34 }} />&nbsp;
                        <p className='ITEMS-MENU'>Inicio {ruta === 'InicioContrato' ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'todos-los-contratos' || ruta === 'todos-los-contratos-vigentes' ? 'activo' : ''}`} onClick={handleClick}>
                        <Avatar alt="Usuario" src={iconoContratos} sx={{ borderRadius: 1 }} style={{ width: 34, height: 34 }} />&nbsp;
                        <p className='ITEMS-MENU'>Dashboard contratos {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'todos-los-contratos')} className={` ${ruta === 'todos-los-contratos' ? 'activo' : ''} `} >
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Todos los contratos </p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'todos-los-contratos-vigentes')} className={` ${ruta === 'todos-los-contratos-vigentes' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Contratos vigentes </p>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItem className={`elementoMenu ${ruta === 'proyeccion-avance-contrato' || ruta === 'avance-financiero-contrato' || ruta === 'avance-fisico-contrato' || ruta === 'avance-financiero-vs-programado' ? 'activo' : ''}`} onClick={handleClickResponsables}>
                        <Avatar alt="Usuario" src={iconoGraficaAvance} sx={{ borderRadius: 1 }} style={{ width: 34, height: 34 }} />&nbsp;
                        <p className='ITEMS-MENU'>Avances {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />} </p>
                    </ListItem>
                    <Collapse in={openResponsables} timeout="auto" unmountOnExit key={'responsables'}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'proyeccion-avance-contrato')} className={` ${ruta === 'proyeccion-avance-contrato' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Proyección y avance</p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'avance-financiero-contrato')} className={` ${ruta === 'avance-financiero-contrato' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Avance financiero </p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'avance-fisico-contrato')} className={` ${ruta === 'avance-fisico-contrato' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Avance fisico </p>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'avance-financiero-vs-programado')} className={` ${ruta === 'avance-financiero-vs-programado' ? 'activo' : ''} `}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small' />
                                </ListItemIcon>
                                <p className='ITEMS-MENU'>Avance Finan. Real vs Programado </p>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItem className={`elementoMenu ${ruta === 'Calendario de estimacionesContrato' ? 'activo' : ''}`} onClick={() => props?.enToggleDrawer && props?.enToggleDrawer(false, 'Calendario de estimacionesContrato')}>                        <Avatar alt="Usuario" src={iconoCalendarioActividades} sx={{ borderRadius: 1 }} style={{ width: 34, height: 34 }} />&nbsp;
                        <p className='ITEMS-MENU'>Calendario de actividades {ruta === 'Calendario de estimacionesContrato' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                    <ListItem className={`elementoMenu ${ruta === 'Ir al APM' ? 'activo' : ''}`} onClick={() => {
                        props?.enToggleDrawer && props?.enToggleDrawer(false, 'Ir al APM');
                        window.open(`https://apmdirac.mx/`);
                    }}>
                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1 }} style={{ width: 34, height: 34 }} />&nbsp;
                        <p className='ITEMS-MENU'>Ir a <strong>APM</strong> {ruta === 'Ir al APM' ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</p>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}

export default MenuLateralNuevoDashboard;