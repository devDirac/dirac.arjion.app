import React, { useCallback, useEffect, useState, useRef } from 'react'
import { ReporteImagenProps } from './types';
import { Badge, Grid } from '@mui/material';
import { getParameterValues } from '../../utils/index';
import ModalComponent from '../Modal/index';
import { Button, ButtonGroup } from 'react-bootstrap';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import { getParametrosHttp } from '../../actions/reportesIA';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ParametrosForm from './ParametrosForm';
import { useMaterialUIController } from 'context';
import { useSelector } from 'react-redux';
import TituloForm from './tituloForm';

const ReporteImagen: React.FC<ReporteImagenProps> = (props: ReporteImagenProps) => {

    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const [parametros, setParametros] = useState<any[]>([]);
    const [errorInicializar, setErrorInicializar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const user: any = useSelector((state: any) => state?.app?.user?.data?.id || false);
    const videoRef: any = useRef(null);
    const canvasRef: any = useRef(null);
    const [photos, setPhotos] = useState<any>([]);

    const getParametros = async () => {
        try {
            const resParametros = await getParametrosHttp({ user });
            setParametros(resParametros);
        } catch (error) {

        }
    }

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any)?.opera;
        if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    const inicializaServicio = useCallback(() => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: isMobile ? {
                width: 320,
                height: 240,
                facingMode: { exact: "environment" },
            } : {
                width: 320,
                height: 240,
            }
        }).then(stream => {
            videoRef.current.srcObject = stream;
            getParametros();
        }).catch(e => {
            setErrorInicializar(true);
        });
    }, [isMobile]);

    useEffect(() => {
        inicializaServicio();
    }, [inicializaServicio]);

    const takePhoto = () => {
        if (photos?.length >= 9) {
            setMensajeAlert('Ha llegado al maximo de imagenes, procese las imagenes en lista o elimine alguna de ellas para poder tomar más fotografias');
            handleisAlertOpen();
            return;
        }
        const context = canvasRef?.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const photoData = canvasRef?.current.toDataURL('image/png');
        const fotos = Object.assign([], photos);
        const nueva = { id: photos?.length + 1, foto: photoData, parametro: null };
        fotos.push(nueva);
        setPhotos(fotos);
    };

    const deletePhoto = (id: any) => {
        const fotos = Object.assign([], photos);
        const remove = fotos.filter((data:any)=> data?.id !== id);
        setPhotos(remove);
        
    };

    const sendPhoto = (photo: any, id: any) => {
        const fotos = Object.assign([], photos);
        const remove = fotos.filter((data:any)=> data?.id !== id);
        setPhotos(remove);
        props?.envarFoto && props?.envarFoto(photo, user);
    };

    const enviarFotosLista = () => {
        props?.envarFotos && props?.envarFotos(photos, user);
        setPhotos([]);
    }

    const addTitulo = (titulo: any, id: any) => {
        const fotos = Object.assign([], photos);
        setPhotos(fotos.map((fd: any) => {
            const titulo_ = fd?.id === id ? titulo : fd?.titulo
            return {
                ...fd,
                ...{
                    titulo: titulo_
                }
            }
        }));
    }

    const addParametro = (parametro: any, id: any) => {
        const fotos = Object.assign([], photos);
        setPhotos(fotos.map((fd: any) => {
            const parametro_ = fd?.id === id ? parametro : fd?.parametro
            return {
                ...fd,
                ...{
                    parametro: parametro_
                }
            }
        }));
    }

    return (
        <Grid container spacing={2}>
            {errorInicializar ? <Grid item xl={12}>
                <p id="errorTxt" className=" alert alert-info">Esta funcionalidad solo se permite en dispositivos móviles con cámara trasera</p>
            </Grid> : null}
            {!errorInicializar ? <Grid item xl={12}>
                <video ref={videoRef} width="100%" height="480" autoPlay></video>
                <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </Grid> : null}
            {!errorInicializar ? <Grid item xl={12}>
                <ButtonGroup>
                   {/*  <Button variant="outline-primary" onClick={inicializaServicio}><ReplayIcon /> Iniciar Cámara</Button> */}
                    <Button variant="outline-primary" onClick={takePhoto}><CameraAltIcon /> Tomar foto</Button>
                    {photos?.length && photos?.length > 1 ? <Button variant="outline-success" onClick={enviarFotosLista}><CameraAltIcon /> Enviar todas las fotos de la lista</Button> : null}
                </ButtonGroup>
            </Grid> : null}
            <Grid item xl={12}>
                <Grid container spacing={2}>
                    {photos.map((photo: any, index: any) => (
                        <Grid item xs={12} md={2} key={photo?.id} style={{ border: 'solid 1px #f0f2f5', borderRadius: 10 }}>
                            <Badge badgeContent={photo?.id} color="info">
                                <img src={photo?.foto} alt={`foto-${photo?.id}`} width="160" height="120" />
                            </Badge>
                            <TituloForm darkMode={darkMode} enAccion={(parametro: string) => addTitulo(parametro, photo?.id)}/>
                            {parametros?.length ? <ParametrosForm darkMode={darkMode} parametros={parametros} enAccion={(parametro: string) => addParametro(parametro, photo?.id)} /> : null}
                            <ButtonGroup>
                                <Button variant="outline-danger"
                                    onClick={() => deletePhoto(photo?.id)}> <DeleteIcon /> Eliminar</Button>
                                <Button variant="outline-primary" onClick={() => sendPhoto(photo, photo?.id)}> <AddAPhotoIcon /> Enviar</Button>
                            </ButtonGroup>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
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
    )
}

export default ReporteImagen