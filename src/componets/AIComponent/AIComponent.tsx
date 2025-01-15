import { Badge, Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMaterialUIController } from 'context';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Button, ButtonGroup } from 'react-bootstrap';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { getParametrosHttp } from '../../actions/reportesIA';
import ParametrosForm from '../ReporteImagen/ParametrosForm';
import ModalComponent from '../Modal/index';
import TituloForm from '../ReporteVoz/tituloForm';


interface AIComponentProps {
    envarFoto?: (foto: any, user: string) => void
    envarFotos?: (fotos: any, user: string) => void
    envarVoz?: (voz: any, user: string) => void
    envarVoces?: (voces: any, user: string) => void
    procesando?:any
}


function CustomTabPanel(props: any) {
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

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const AIComponent: React.FC<AIComponentProps> = (props: AIComponentProps) => {

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [value, setValue] = useState(0);
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };


    const [recordings, setRecordings] = useState<any>([]);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<any>(null);
    const audioChunksRef = useRef<any>([]);
    const audioContextRef = useRef<any>(null);
    const analyserRef = useRef<any>(null);
    const canvasRef_ = useRef<any>(null);
    const [animationId, setAnimationId] = useState<any>(null);;
    const [counter, setCounter] = useState(129);
    let myInterval: any = null;
    let mytimeoutID: any = null;

    const startRecording = async () => {
        try {

            if (recordings?.length >= 9) {
                setMensajeAlert('Ha llegado al maximo de imagenes, procese las imagenes en lista o elimine alguna de ellas para poder tomar más fotografias');
                handleisAlertOpen();
                return;
            }


            myInterval = setInterval(() => {
                setCounter((c_) => c_ - 1)
            }, 1000);

            mytimeoutID = setTimeout(() => {
                stopRecording();
            }, 129000);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 2048;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (event: any) => {
                audioChunksRef.current.push(event?.data); // Guarda los fragmentos de audio
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioURL = URL.createObjectURL(audioBlob);
                const grabaciones = Object.assign([], recordings);
                const nueva = { id: recordings?.length + 1, audio: { blob: audioBlob, url: audioURL } };
                grabaciones.push(nueva);
                setRecordings(grabaciones);
                audioChunksRef.current = [];
            };
            mediaRecorder.start();
            setIsRecording(true);
            visualize(analyser);
        } catch (err) {
            console.error('Error al iniciar la grabación de audio: ', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            cancelAnimationFrame(animationId);
            clearInterval(myInterval);
            clearTimeout(mytimeoutID);
            setCounter(129);
            if (audioContextRef.current) {
                if(audioContextRef.current?.state !== "closed"){
                    audioContextRef.current.close();
                }
            }
        }
    };

    const visualize: any = (analyser: any) => {
        const canvas = canvasRef_.current;
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const draw = () => {
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'black';
            canvasCtx.beginPath();
            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
            setAnimationId(requestAnimationFrame(draw));
        };
        draw();
    };

    const deleteRecording = (id: any) => {
        const grabaciones = Object.assign([], recordings);
        const remove = grabaciones.filter((data: any) => data?.id !== id);
        setRecordings(remove);
    };

    const sendRecording = (grabacion: any, id: any) => {
        cancelAnimationFrame(animationId);
        props?.envarVoz && props?.envarVoz(grabacion, user);
        const grabaciones = Object.assign([], recordings);
        const remove = grabaciones.filter((data: any) => data?.id !== id);
        setRecordings(remove);
    };

    const enviarTodas = () => {
        cancelAnimationFrame(animationId);
        props?.envarVoces && props?.envarVoces(recordings, user);
        setRecordings([])
    }





    const [parametros, setParametros] = useState<any[]>([]);
    const [errorInicializar, setErrorInicializar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const user: any = useSelector((state: StoreType) => state?.app?.user?.data?.id || false);
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
    }


    const deletePhoto = (id: any) => {
        const fotos = Object.assign([], photos);
        const remove = fotos.filter((data: any) => data?.id !== id);
        setPhotos(remove);

    };

    const sendPhoto = (photo: any, id: any) => {
        const fotos = Object.assign([], photos);
        const remove = fotos.filter((data: any) => data?.id !== id);
        setPhotos(remove);
        props?.envarFoto && props?.envarFoto(photo, user);
    };

    const enviarFotosLista = () => {
        props?.envarFotos && props?.envarFotos(photos, user);
        setPhotos([]);
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
    const addTituloFoto = (titulo: any, id: any) => {
        const rec = Object.assign([], recordings);
        setRecordings(rec.map((fd: any) => {
            const titulo_ = fd?.id === id ? titulo : fd?.titulo
            return {
                ...fd,
                ...{
                    titulo: titulo_
                }
            }
        }));
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

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", mt: 3 }}
            style={darkMode ? { backgroundColor: '#1f283e', padding: '25px' } : { backgroundColor: '#fff', padding: '25px' }}>
            <Grid item xs={12} style={{ textAlign: 'center', }}>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={'Imagen'} {...a11yProps(0)} onClick={() => inicializaServicio()} />
                            <Tab label={'Audio'} {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid container spacing={2}>
                            <Grid item xl={12}>
                                <ButtonGroup>
                                    {!errorInicializar ? <Button variant="outline-primary" onClick={takePhoto}><CameraAltIcon /> Tomar foto</Button> : null}
                                    {!errorInicializar ?

                                        photos?.length && photos?.length > 1 ? <Button variant="outline-success" onClick={enviarFotosLista}><CameraAltIcon /> Enviar todas las fotos de la lista</Button> : null

                                        : null}

                                </ButtonGroup>
                            </Grid>
                            
                            {!props?.procesando ? <Grid item xl={12}></Grid> : <Grid item xl={12}> <CircularProgress color="inherit" /></Grid>}
                            <Grid item xl={12}>
                                {errorInicializar ? <Grid item xl={12}>
                                    <p id="errorTxt" className=" alert alert-info">Esta funcionalidad solo se permite en dispositivos móviles con cámara trasera</p>
                                </Grid> : null}
                                {!errorInicializar ? <Grid item xl={12} >
                                    <video ref={videoRef} width="100%" height="480" autoPlay></video>
                                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
                                </Grid> : null}
                            </Grid>
                        </Grid>


                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid container spacing={2}>
                            <Grid item xl={12}>
                                <ButtonGroup>
                                    <Button disabled={isRecording} variant="outline-primary" onClick={startRecording}>
                                        <MicTwoToneIcon /> Iniciar Grabación
                                    </Button>
                                    {isRecording ? <Button variant="outline-danger" onClick={stopRecording}>
                                        Detener Grabación
                                    </Button> : null}
                                    {recordings.length && recordings?.length > 1 ? <Button variant="outline-success" onClick={enviarTodas}>
                                        Enviar todas las grabaciones
                                    </Button> : null}
                                </ButtonGroup>
                            </Grid>
                            {!props?.procesando ? <Grid item xl={12}></Grid> : <Grid item xl={12}> <CircularProgress color="inherit" /></Grid>}
                            <Grid item xl={12}>
                                {isRecording ? <Grid item xl={12}>
                                    <p>Restan:  {counter}  Segundos</p>
                                </Grid> : null}
                                {isRecording ? <Grid item xl={12} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    <p>Grabando</p>
                                </Grid> : null}
                                <Grid item xl={12}>
                                    <canvas ref={canvasRef_} width="640" height="100" style={{ backgroundColor: '#fff', margin: '10px 0', width: isRecording ? '100%' : 0, height: isRecording ? '80px' : 0 }}></canvas>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>

                </Box>
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center', }}>
                <Grid container spacing={2} style={{ textAlign: 'center', }}>
                    <Grid item xl={12}>
                        <Grid container spacing={2}>
                            {photos.map((photo: any, index: any) => (
                                <Grid item xs={12} md={2} key={photo?.id} style={{ border: 'solid 1px #f0f2f5', borderRadius: 10 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xl={12}>
                                            <Badge badgeContent={photo?.id} color="info">
                                                <img src={photo?.foto} alt={`foto-${photo?.id}`} width="160" height="120" />
                                            </Badge>
                                        </Grid>
                                        <Grid item xl={12} style={{padding:8}}>
                                            <TituloForm darkMode={darkMode} enAccion={(parametro: string) => addTitulo(parametro, photo?.id)}/>
                                        </Grid>
                                        <Grid item xl={12} style={{padding:8}}>
                                            {parametros?.length ? <ParametrosForm darkMode={darkMode} parametros={parametros} enAccion={(parametro: string) => addParametro(parametro, photo?.id)} /> : null}
                                        </Grid>
                                        <Grid item xl={12}>
                                            <ButtonGroup>
                                                <Button variant="outline-danger" onClick={() => deletePhoto(photo?.id)}> <DeleteIcon /> Eliminar</Button>
                                                <Button variant="outline-primary" onClick={() => sendPhoto(photo, photo?.id)}> <AddAPhotoIcon /> Enviar </Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xl={12} style={{ textAlign: 'center', }}>
                        <Grid container spacing={2} >
                            <Grid item xl={12}>
                                <Grid container spacing={2}>
                                    {recordings.length === 0 ? null : (
                                        recordings.map((recording: any) => (
                                            <Grid item xs={12} md={3} key={recording?.id} style={{ border: 'solid 1px #f0f2f5', borderRadius: 10 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xl={12}>
                                                        <Badge badgeContent={recording?.id} color="info">
                                                            <audio controls src={recording?.audio?.url}></audio>
                                                        </Badge>
                                                    </Grid>
                                                    <Grid item xl={12} style={{padding:8}}>
                                                        <TituloForm darkMode={darkMode} enAccion={(parametro: string) => addTituloFoto(parametro, recording?.id)}/>
                                                    </Grid>
                                                    <Grid item xl={12}>
                                                        <ButtonGroup>
                                                            <Button variant="outline-danger" onClick={() => deleteRecording(recording?.id)}><DeleteIcon /> Eliminar</Button>
                                                            <Button variant="outline-primary" onClick={() => sendRecording(recording, recording?.id)}> <SendIcon /> Enviar </Button>
                                                        </ButtonGroup>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        ))
                                    )}
                                </Grid>
                            </Grid>
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
            </Grid>


        </Grid>
    )
}

export default AIComponent
