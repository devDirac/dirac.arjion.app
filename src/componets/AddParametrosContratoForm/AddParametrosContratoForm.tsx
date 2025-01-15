import React from 'react';
import type { AddParametrosContratoFormProps } from './types';
import { Button, Form } from 'react-bootstrap';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import InputField from '../../componets/InputField';
import CampoSwitch from '../../componets/CampoSwitch';
import useAddParametrosContratoForm from './useAddParametrosContratoForm';
import './style.scss';

export const AddParametrosContratoForm: React.FC<AddParametrosContratoFormProps> = (props: AddParametrosContratoFormProps) => {
    const {
        intl,
        darkMode,
        formik,
        area_expide,
        setArea_expide,
        tipo_contrato,
        setTipo_contrato,
        fecha_contrato,
        setFecha_contrato,
        modalidad,
        setModalidad,
        clave_presupuestaria,
        setClave_presupuestaria,
        oficina_pagadora,
        setOficina_pagadora,
        numero,
        setNumero,
        amortizacion,
        setAmortizacion,
        asignacion_iva,
        setAsignacion_iva,
        numero_pedido,
        setNumero_pedido,
        fecha_pedido,
        setFecha_pedido,
        fecha_pago_lvpl,
        setFecha_pago_lvpl,
        tipo_cambio,
        setTipo_cambio,
        fondo_gtia,
        setFondo_gtia,
        fecha_contabilizado,
        setFecha_contabilizado,
        contabilizado,
        setContabilizado,
        pagado,
        setPagado,
        pendiente_contabilizar,
        setPendiente_contabilizar,
        pendiente_contabilizarDisabled, setPendiente_contabilizarDisabled
    } = useAddParametrosContratoForm(props);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={area_expide || ''}
                                        name="area_expide"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("area_expide", target?.value || '');
                                            setArea_expide(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_area_expide' })}
                                        placeholder={intl.formatMessage({ id: 'input_area_expide_descripcion' })}
                                        type="text"
                                        id="area_expide"
                                        formik={formik?.getFieldMeta('area_expide')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={tipo_contrato || ''}
                                        name="tipo_contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo_contrato", target?.value || '');
                                            setTipo_contrato(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'inpput_tipo_contrato' })}
                                        placeholder={intl.formatMessage({ id: 'inpput_tipo_contrato_descripcion' })}
                                        type="text"
                                        id="tipo_contrato"
                                        formik={formik?.getFieldMeta('tipo_contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={fecha_contrato || ''}
                                        name="fecha_contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_contrato", target?.value || '');
                                            setFecha_contrato(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_contrato' })}
                                        type="date"
                                        id="fecha_contrato"
                                        formik={formik?.getFieldMeta('fecha_contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={modalidad || ''}
                                        name="modalidad"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("modalidad", target?.value || '');
                                            setModalidad(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_modalidad' })}
                                        placeholder={intl.formatMessage({ id: 'input_modalidad_descripcion' })}
                                        type="text"
                                        id="modalidad"
                                        formik={formik?.getFieldMeta('modalidad')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={clave_presupuestaria || ''}
                                        name="clave_presupuestaria"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("clave_presupuestaria", target?.value || '');
                                            setClave_presupuestaria(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_clave_presupuestaria' })}
                                        placeholder={intl.formatMessage({ id: 'input_clave_presupuestaria_descripcion' })}
                                        type="text"
                                        id="clave_presupuestaria"
                                        formik={formik?.getFieldMeta('clave_presupuestaria')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={oficina_pagadora || ''}
                                        name="oficina_pagadora"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("oficina_pagadora", target?.value || '');
                                            setOficina_pagadora(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_oficina_pagadora' })}
                                        placeholder={intl.formatMessage({ id: 'input_oficina_pagadora_descripcion' })}
                                        type="text"
                                        id="oficina_pagadora"
                                        formik={formik?.getFieldMeta('oficina_pagadora')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={numero || ''}
                                        name="numero"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("numero", target?.value || '');
                                            setNumero(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_numero' })}
                                        placeholder={intl.formatMessage({ id: 'input_numero_descripcion' })}
                                        type="text"
                                        id="numero"
                                        formik={formik?.getFieldMeta('numero')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={amortizacion || ''}
                                        name="amortizacion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("amortizacion", target?.value || '');
                                            setAmortizacion(target?.value);
                                        }}
                                        label={'% '+ intl.formatMessage({ id: 'input_amoritzacion' })}
                                        placeholder={intl.formatMessage({ id: 'input_amoritzacion_descripcion' })}
                                        type="text"
                                        id="amortizacion"
                                        formik={formik?.getFieldMeta('amortizacion')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={asignacion_iva || ''}
                                        name="asignacion_iva"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("asignacion_iva", target?.value || '');
                                            setAsignacion_iva(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_asignacion_iva' })}
                                        placeholder={intl.formatMessage({ id: 'input_asignacion_iva' })}
                                        type="text"
                                        id="asignacion_iva"
                                        formik={formik?.getFieldMeta('asignacion_iva')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={numero_pedido || ''}
                                        name="numero_pedido"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("numero_pedido", target?.value || '');
                                            setNumero_pedido(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_numero_pedido' })}
                                        placeholder={intl.formatMessage({ id: 'input_numero_pedido_descripcion' })}
                                        type="text"
                                        id="numero_pedido"
                                        formik={formik?.getFieldMeta('numero_pedido')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={fecha_pedido || ''}
                                        name="fecha_pedido"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_pedido", target?.value || '');
                                            setFecha_pedido(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_pedido' })}
                                        type="date"
                                        id="fecha_pedido"
                                        formik={formik?.getFieldMeta('fecha_pedido')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={fecha_pago_lvpl || ''}
                                        name="fecha_pago_lvpl"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_pago_lvpl", target?.value || '');
                                            setFecha_pago_lvpl(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_pago_lvpl' })}
                                        type="date"
                                        id="fecha_pago_lvpl"
                                        formik={formik?.getFieldMeta('fecha_pago_lvpl')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={tipo_cambio || ''}
                                        name="tipo_cambio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo_cambio", target?.value || '');
                                            setTipo_cambio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_tipo_cambio' })}
                                        placeholder={intl.formatMessage({ id: 'input_tipo_cambio_descripcion' })}
                                        type="text"
                                        id="tipo_cambio"
                                        formik={formik?.getFieldMeta('tipo_cambio')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        max={'100'}
                                        value={fondo_gtia || ''}
                                        name="fondo_gtia"

                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fondo_gtia", target?.value || '');
                                            setFondo_gtia(target?.value);
                                        }}
                                        label={'% '+ intl.formatMessage({ id: 'input_fondo_gtia' })}
                                        placeholder={intl.formatMessage({ id: 'input_fondo_gtia_descripcion' })}
                                        type="text"
                                        id="fondo_gtia"
                                        formik={formik?.getFieldMeta('fondo_gtia')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        required
                                        value={fecha_contabilizado || ''}
                                        name="fecha_contabilizado"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_contabilizado", target?.value || '');
                                            setFecha_contabilizado(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_contabilizado' })}
                                        type="date"
                                        id="fecha_contabilizado"
                                        formik={formik?.getFieldMeta('fecha_contabilizado')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={2} >
                                    <div style={{ position: 'relative', top: '50px' }}>
                                        <CampoSwitch
                                            key={"contabilizado"}
                                            disabled={pendiente_contabilizar}
                                            label={intl.formatMessage({ id: 'input_contabilizado' })}
                                            value={contabilizado}
                                            onAction={(v) => {
                                                setContabilizado(v);
                                                if(v){
                                                    setPendiente_contabilizar(false);
                                                    setPendiente_contabilizarDisabled(true)
                                                }else{
                                                    setPendiente_contabilizarDisabled(false)
                                                }

                                            }}
                                        />
                                    </div>
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <div style={{ position: 'relative', top: '50px' }}>
                                        <CampoSwitch
                                            key={"pagado"}
                                            label={intl.formatMessage({ id: 'input_pagado' })}
                                            value={pagado}
                                            onAction={(v) => setPagado(v)}
                                        />
                                    </div>
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <div style={{ position: 'relative', top: '50px' }}>
                                        <CampoSwitch
                                            disabled={pendiente_contabilizarDisabled}
                                            key={"pendiente_contabilizar"}
                                            label={intl.formatMessage({ id: 'input_pendiente_contabilizar' })}
                                            value={pendiente_contabilizar}
                                            onAction={(v) => {
                                                setPendiente_contabilizar(v)
                                                if(v){
                                                    setContabilizado(false); 
                                                }
                                            }}
                                        />
                                    </div>
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                        onClick={(e: any) => {
                                            props?.onAction({
                                                area_expide,
                                                tipo_contrato,
                                                fecha_contrato,
                                                modalidad,
                                                clave_presupuestaria,
                                                oficina_pagadora,
                                                numero,
                                                amortizacion,
                                                fecha_contabilizado,
                                                asignacion_iva,
                                                numero_pedido,
                                                fecha_pedido,
                                                fecha_pago_lvpl,
                                                contabilizado: contabilizado ? 1 : 0,
                                                pagado: pagado ? 1 : 0,
                                                pendiente_contabilizar: pendiente_contabilizar ? 1 : 0,
                                                tipo_cambio,
                                                fondo_gtia,
                                                id_contrato: props?.idContrato
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'general_guardar' })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    );
};
