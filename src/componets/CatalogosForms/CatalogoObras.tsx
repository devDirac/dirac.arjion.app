import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import CampoAvatar from '../CampoAvatar/CampoAvatar';
import _ from 'lodash';
import useCatalogoObras from './useCatalogoObras';
import ModalComponent from '../../componets/Modal';
import CampoAutoCompleteCoordenadas from '../../componets/CampoAutoCompleteCoordenadas';
import { GoogleMap, Marker } from '@react-google-maps/api';
import './style.scss';

const CatalogoObras: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {

    const {
        formik,
        test1,
        setTest1,
        obra,
        setObra,
        descripcion,
        setDescripcion,
        fecha_inicio,
        setFecha_inicio,
        fecha_fin,
        setFecha_fin,
        latitud,
        setLatitud,
        longitud,
        setLongitud,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        limite_contratos,
        setLimite_contratos,
        foto,
        setImagen,
        presupuesto,
        setPresupuesto,
        intl,

        id_cliente,
        setCatalogoSeleccionado,
        setTipoCatalogo,
        handleOpen,
        setId_cliente,
        handleClose,
        isOpen
    } = useCatalogoObras(props);

    const [isAlertOpen_, setIsAlertOpen_] = useState(false);
    const [mensajeAlert_, setMensajeAlert_] = useState('');
    const handleisAlertOpen_ = () => setIsAlertOpen_(true);
    const handleisAlerClose_ = () => {
        setIsAlertOpen_(false);
    };


    const [procesando, setProcesando] = useState(false);
    const [location, setLocation] = useState<any>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false);

    };
    const defaultProps = {
        center: {
            lat: 19.42847,
            lng: -99.12766
        },
        zoom: 10
    };
    const handleMarkerClick = (s: any) => {
        setProcesando(true);
        setTimeout(() => {
            handleisAlerClose();
            setProcesando(false);
            setMensajeAlert_('Se establecio la direccion ' + location?.direccion);
            handleisAlertOpen_();
        }, 500);
    }
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={obra || ''}
                                name="obra"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("obra", target?.value || '');
                                    setObra(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_proyecto' })}
                                placeholder={intl.formatMessage({ id: 'input_proyecto_descripcion' })}
                                type="text"
                                id="obra"
                                formik={formik?.getFieldMeta('obra')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={descripcion || ''}
                                name="descripcion"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("descripcion", target?.value || '');
                                    setDescripcion(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_descripcion' })}
                                placeholder={intl.formatMessage({ id: 'input_descripcion_descripcion' })}
                                type="textArea"
                                id="descripcion"
                                formik={formik?.getFieldMeta('descripcion')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={fecha_inicio || ''}
                                name="fecha_inicio"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("fecha_inicio", target?.value || '');
                                    setFecha_inicio(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_fecha_inicio' })}
                                type="date"
                                id="fecha_inicio"
                                formik={formik?.getFieldMeta('fecha_inicio')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={fecha_fin || ''}
                                name="fecha_fin"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("fecha_fin", target?.value || '');
                                    setFecha_fin(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_fecha_final' })}
                                type="date"
                                id="fecha_fin"
                                formik={formik?.getFieldMeta('fecha_fin')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CampoAutoCompleteCoordenadas
                                required
                                value={test1 || ''}
                                name="test1"
                                onPlaceSelect={(e: any) => {
                                    formik.setFieldValue("test1", e?.formatted_address || '');
                                    setTest1(e?.formatted_address);
                                    setLatitud(e?.geometry?.location?.lat());
                                    setLongitud(e?.geometry?.location?.lng());
                                    setLocation({ direccion: e?.formatted_address || '', lat: e?.geometry?.location?.lat(), lng: e?.geometry?.location?.lng() });
                                    handleisAlertOpen();
                                }}
                                label={'Dirección'}
                                placeholder={'Ingrese y seleccione una dirección'}
                                id="test1"
                                formik={formik?.getFieldMeta('test1')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_estatus' })}
                                value={id_estatus}
                                options={estatusCatalogos.map((e: any) => {
                                    return {
                                        label: e?.estatus,
                                        value: e?.id
                                    }
                                })}
                                name="id_estatus"
                                id="id_estatus"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_estatus", target?.value || '');
                                    setId_estatus(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_estatus')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={limite_contratos || ''}
                                name="limite_contratos"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("limite_contratos", target?.value || '');
                                    setLimite_contratos(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_limite_contratos' })}
                                placeholder={intl.formatMessage({ id: 'input_limite_contratos_descripcion' })}
                                type="text"
                                id="limite_contratos"
                                formik={formik?.getFieldMeta('limite_contratos')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={presupuesto || ''}
                                name="presupuesto"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("presupuesto", target?.value || '');
                                    setPresupuesto(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_presupuesto' })}
                                placeholder={intl.formatMessage({ id: 'input_presupuesto_descripcion' })}
                                type="text"
                                id="presupuesto"
                                formik={formik?.getFieldMeta('presupuesto')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={6}>
                            <h5>{intl.formatMessage({ id: 'input_foto' })}</h5>
                            <CampoAvatar foto={foto} alt={obra} onChangeImage={setImagen} />
                            <br />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0" }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(foto)}
                                onClick={(e) => {
                                    props?.action({
                                        obra,
                                        descripcion,
                                        fecha_inicio,
                                        fecha_fin,
                                        id_estatus,
                                        latitud,
                                        longitud,
                                        address: test1,
                                        limite_contratos,
                                        presupuesto: presupuesto.replace(/,/g, ""),
                                        foto,
                                        BD: props?.catalogo
                                    });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Grid>
                        <ModalComponent handleClose={handleisAlerClose_} isOpen={isAlertOpen_} key={'alertassss'}>
                            <Grid container spacing={2} style={{ textAlign: 'center' }}>
                                <Grid item xs={12}>
                                    <br />
                                    <br />
                                    <p>{mensajeAlert_}</p>
                                </Grid>
                            </Grid>
                        </ModalComponent>
                        <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                            <Grid container spacing={2} style={{ textAlign: 'center', minHeight: '600px' }}>
                                <Grid item xs={12} style={{ height: '20px', paddingBottom: '10px' }}><p>Seleccione la marca en rojo para continuar o introduzca una nueva dirección</p></Grid>
                                <Grid item xs={12} style={{ height: '570px' }}>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={location ? {
                                            lat: location.lat,
                                            lng: location.lng
                                        } : defaultProps.center}
                                        zoom={10}
                                    >
                                        {location ? <Marker onClick={(s) => { handleMarkerClick({ lat: s?.latLng?.lat(), lng: s?.latLng?.lng() }) }} position={{
                                            lat: location.lat,
                                            lng: location.lng,
                                        }}
                                        /> : null}
                                        <></>
                                    </GoogleMap>
                                </Grid>
                            </Grid>
                        </ModalComponent>
                        <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Grid>
                </Form.Group>
            </FormikProvider>
        </div>
    )
}

export default CatalogoObras
