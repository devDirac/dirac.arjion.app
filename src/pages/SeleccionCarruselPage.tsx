import { Backdrop, CircularProgress, Divider, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Button, ButtonGroup } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlayListHttp } from "../actions/banner";
import { getErrorHttpMessage } from "../utils";
import ModalComponent from "../componets/Modal";
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { useIntl } from "react-intl";
import AppAppBarC from "../componets/Carrusel/AppAppBarC";
import SearchFiltro from "../componets/SearchFiltro/SearchFiltro";
import _ from "lodash";

const SeleccionCarruselPage: React.FC = () => {
    /* const intl = useIntl();
    const navigate = useNavigate();
    const [procesando, setProcesando] = useState(false);
    const [playList, setPlayList] = useState([]);
    const [playListAll, setPlayListAll] = useState([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const getPisos = useCallback(async () => {
        try {
            setProcesando(true);
            const resp: any = await getPlayListHttp();
            setPlayListAll(resp)
            setPlayList(resp)
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
        getPisos()
    }, [getPisos]);


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
 */

    return (
        <>
            {/* <AppAppBarC />
            <Grid
                container
                style={{ backgroundColor: '#fff', position: 'relative', top: 20 }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15 }}>
                    <h5>Listas de reproducción disponibles</h5>
                </Grid>
                <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 360 }}>
                        <SearchFiltro onFiltro={handleFiltro} />
                    </div>
                </Grid>
                {playList?.length ? <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'center' }}>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            margin: '0 auto',
                            bgcolor: 'background.paper',
                        }}
                    >
                        {playList.map((r: any) => {
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
                                                        {r?.elementos === 0 ? 'No hay elementos para mostrar' : 'Seleccione la lista (' + r?.elementos + ') elementos'}
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
            </Grid > */}
            <p>Texto </p>
        </>
    );
};

export default SeleccionCarruselPage;