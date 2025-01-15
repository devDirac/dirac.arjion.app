import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import NewsTicker from "react-advanced-news-ticker";
import CarruselDos from "../componets/Carrusel/CarruselDos";
import logo from "../assets/images/logo_dirac_2025.png";
import { getInfoBannerHttp } from "../actions/banner";
import { getErrorHttpMessage, isImageOrVideo } from "../utils";
import { useIntl } from "react-intl";
import ModalComponent from "../componets/Modal";
import { CommentsDisabledOutlined } from "@mui/icons-material";
import Marquee from "react-fast-marquee";
import { useSearchParams } from "react-router-dom";

const CarruselPage: React.FC = () => {

    const intl = useIntl();

    const [queryParameters] = useSearchParams();
    const playlist: string = queryParameters.get("playlist") || '';

    const [mediaItems, setMediaItem] = useState([]);
    const [news, setNews] = useState([]);
    const [procesando, setProcesando] = useState(false);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const handleAddItem = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getInfoBannerHttp(playlist);
            const result = isImageOrVideo(response.filter((r: any) => !r?.texto));
            console.log(result)
            setMediaItem(result)
            setNews(response.filter((r: any) => r?.texto))
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            console.log(error)
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }, [])

    useEffect(() => {
        handleAddItem()
    }, [handleAddItem])

    return (
        <Grid container style={{ backgroundColor: 'rgb(32 47 80)', height: '100vh' }}>
            <Grid xs={12} style={{ padding: 0, textAlign: 'center', paddingTop:15 }} >
                {mediaItems?.length ? <CarruselDos mediaItems={mediaItems} /> : procesando ? '' : <p style={{ position: 'relative', top: 250, color: '#fff', fontWeight: '400', fontSize: 20 }}></p>}
            </Grid>
            <Grid xs={12}>
                {news?.length ? <Marquee speed={150}>
                    {
                        news?.map((r: any, key: any) => {
                            return (
                                <div style={{
                                    boxShadow: '-1px 0px 17px -3px rgba(0,0,0,0.75)',
                                    border: 'solid 1px grey',
                                    backgroundColor: '#ffff',
                                    paddingLeft: 5,
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    paddingRight: 5
                                }} key={key}>{r?.texto}</div>
                            )
                        })
                    }
                </Marquee> : null}
            </Grid>
            <Grid xs={12} style={{ textAlign: 'right', padding: 5, paddingRight: 48 }}>
                <img
                    src={logo}
                    alt={`Slide`}
                    style={{ width: "190px", height: "85px" }}
                />
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
        </Grid>
    );
};

export default CarruselPage;