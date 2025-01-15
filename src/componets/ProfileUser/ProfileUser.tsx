import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { useMaterialUIController } from 'context';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { ProfileUserProps } from './types';
import EventCalendar from "../../examples/Calendar";
import moment from 'moment';
import { useSelector } from 'react-redux';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PermisosUsuarios from '../../componets/PermisosUsuarios/PermisosUsuarios';
import { getUserPermisos } from '../../actions/users';
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { getBitacoraPorUsuarioSesionHttp } from '../../actions/bitacora';
import './style.scss'

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

const ProfileUser: React.FC<ProfileUserProps> = (props: ProfileUserProps) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const idUser = useSelector((state: any) => state?.app?.user?.data?.id || 0);
    const proyectosUser = useSelector((state: any) => state?.app?.user?.data?.proyectos || []);
    const permisosUser = useSelector((state: any) => state?.app?.user?.data?.permisos || []);
    const ajustesSitioUser = useSelector((state: any) => state?.app?.user?.data?.ajustes_sitio || []);
    const [dataUsuarios, setDataUsuarios] = useState<any[]>([]);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [value, setValue] = React.useState(0);
    const [eventos, setEventos] = useState<any[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getBitacora = useCallback(async () => {
        try {
            const response = await getBitacoraPorUsuarioSesionHttp();
            const a = response.map((a: any) => {
                return {
                    id: a?.id,
                    title: a?.evento || '',
                    start: moment(a?.creado || new Date()).format("YYYY-MM-DD"),
                    end: moment(a?.creado || new Date()).format("YYYY-MM-DD"),
                    className: "info",
                    content: a?.descripcion || ''
                }
            })
            setEventos(a);
        } catch (error) {

        }
    }, [])

    const getDatosUsuariosPermisos = useCallback(async () => {
        try {
            setProcesando(true);
            const response: any = await getUserPermisos();
            setDataUsuarios(response.filter((s: any) => s.id === idUser));
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
        }
    }, [idUser]);

    useEffect(() => {
        getDatosUsuariosPermisos();
    }, [getDatosUsuariosPermisos]);

    useEffect(() => {
        getBitacora();
    }, [getBitacora]);

    const getColor = (color: string) => {
        switch (color) {
            case 'primary':
                return '#e91e63';
            case 'dark':
                return '#344767';
            case 'info':
                return '#49a3f1';
            case 'success':
                return '#66BB6A';
            case 'warning':
                return '#FFA726';
            case 'error':
                return '#EF5350';
            default:
                return '#344767';
        }
    }

    const capitalizarPrimeraLetra = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Permisos" {...a11yProps(0)} />
                                <Tab label="Ajustes de usuario" {...a11yProps(1)} />
                                <Tab label="Proyectos" {...a11yProps(2)} />
                                <Tab label="Bitácora del usuario" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            {permisosUser?.length ? <PermisosUsuarios soloPermisos accion={(a, v, x) => { }} dataUsuarios={dataUsuarios} /> : 'No se han establecido los permisos para tu usuario, contactar con el administrador para que te sean asignados'}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4} xl={4}>
                                    <DefaultInfoCard
                                        onSelec={() => { }}
                                        esAjustesSitio
                                        colorAjusteSitio={getColor(ajustesSitioUser?.[0]?.color_menu_lateral)}
                                        icon={<ColorLensIcon />}
                                        title="Color menú lateral"
                                        description="El color del elemento activo en el menú lateral"
                                        value={'Color seleccionado'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} xl={4}>
                                    <DefaultInfoCard
                                        onSelec={() => { }}
                                        icon={<FormatColorFillIcon />}
                                        title="Tipo de menú lateral"
                                        description="Estilo del menú lateral (Oscuro, Trasparente, Blanco)"
                                        value={'Color seleccionado'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} xl={4}>
                                    <DefaultInfoCard
                                        onSelec={() => { }}
                                        icon={<ViewSidebarIcon />}
                                        title="Cabecera fija"
                                        description="Establece si la cabecera es fija o si es visible en todo momento"
                                        value={ajustesSitioUser?.[0]?.cabecera_fija ? 'Cabecera no fija' : 'Cabecera fija'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} xl={6}>
                                    <DefaultInfoCard
                                        onSelec={() => { }}
                                        icon={<CloseFullscreenIcon />}
                                        title="Menú lateral mini"
                                        description="Establece el tamaño del menú lateral"
                                        value={ajustesSitioUser?.[0]?.menu_lateral_mini ? 'Menú lateral mini' : 'Menú lateral normal'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} xl={6}>
                                    <DefaultInfoCard
                                        onSelec={() => { }}
                                        icon={<DarkModeIcon />}
                                        title="Tema claro / oscuro"
                                        description="Establece el tema del sitio claro u oscuro"
                                        value={ajustesSitioUser?.[0]?.tema_claro_oscuro ? 'Tema oscuro' : 'Tema claro'}
                                    />
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={2}>
                                {
                                    proyectosUser?.length ?
                                        proyectosUser.map((t: any, i: any) => {
                                            return (
                                                <Grid key={i} item xs={12} md={4} lg={4} style={{ paddingBottom: '30px', paddingTop: '30px', minHeight: '250px' }}>
                                                    <ComplexProjectCard
                                                        image={''}
                                                        title={t?.obra}
                                                        element={t}
                                                        onSelect={(proyecto: any) => { }}
                                                        description={t?.descripcion}
                                                        dateTime={moment(t?.fecha_fin).format("DD-MM-YYYY")}
                                                        members={t?.asignados}
                                                    />
                                                </Grid>
                                            )
                                        })
                                        : null
                                }
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            {useMemo(
                                () => (
                                    <EventCalendar
                                        initialView="dayGridMonth"
                                        locale={'es'}
                                        initialDate={moment(new Date()).format("YYYY-MM-DD")}
                                        header={{ title: "Bitácora del usuario", date: moment(new Date()).format("DD-MM-YYYY"), }}
                                        events={eventos}
                                        selectable
                                    /* dateClick={handleDateClick} */
                                    /* eventClick={(info:any)=>{
                                        setMensajeAlert(eventos.find(e=> e?.id === +info.event.id)?.content || '');
                                        handleisAlertOpen()
                                    }} */
                                    />
                                ) as any,
                                [eventos]
                            )}
                        </CustomTabPanel>
                    </Box>
                </Grid>
            </Grid>
            <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    )
}

export default ProfileUser
