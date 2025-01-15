import React from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import useCatalogoPEP from './useCatalogoPEP';
import './style.scss';

const CatalogoPEP: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {
    
    const {
        formik,
        pep,
        setPep,
        descripcion,
        setDescripcion,
        cotizacion,
        setCotizacion,
        presupuesto,
        setPresupuesto,
        setCuenta,
        cuenta,
        orden,
        setOrden,
        imputable,
        setImputable,
        id_proyecto,
        proyectos,
        setId_proyecto,
        intl
    } = useCatalogoPEP(props);

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={pep || ''}
                                name="pep"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("pep", target?.value || '');
                                    setPep(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_pep' })}
                                placeholder={intl.formatMessage({ id: 'input_pep_descripcion' })}
                                type="text"
                                id="pep"
                                formik={formik?.getFieldMeta('pep')}
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
                                type="text"
                                id="descripcion"
                                formik={formik?.getFieldMeta('descripcion')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={cotizacion || ''}
                                name="cotizacion"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("cotizacion", target?.value || '');
                                    setCotizacion(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_cotizacion' })}
                                placeholder={intl.formatMessage({ id: 'input_cotizacion_descripcion' })}
                                type="text"
                                id="cotizacion"
                                formik={formik?.getFieldMeta('cotizacion')}
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
                        <Grid item xs={12} md={6}>
                        <SelectField
                                label={intl.formatMessage({ id: 'input_cuenta' })}
                                value={cuenta}
                                options={props?.peps.map((r:any)=> {
                                    return {
                                        value:r?.id+'',
                                        label:r?.pep
                                    }
                                })}
                                name="cuenta"
                                id="cuenta"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("cuenta", target?.value || '');
                                    setCuenta(target?.value);
                                }}
                                formik={formik?.getFieldMeta('cuenta')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={orden || ''}
                                name="orden"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("orden", target?.value || '');
                                    setOrden(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_orden' })}
                                placeholder={intl.formatMessage({ id: 'input_orden_descripcion' })}
                                type="text"
                                id="orden"
                                formik={formik?.getFieldMeta('orden')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_imputable' })}
                                value={imputable}
                                options={[
                                    {
                                        label: 'No',
                                        value: 'NO'
                                    },
                                    {
                                        label: 'Si',
                                        value: 'SI'
                                    }
                                ]}
                                name="imputable"
                                id="imputable"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("imputable", target?.value || '');
                                    setImputable(target?.value);
                                }}
                                formik={formik?.getFieldMeta('imputable')}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}> 
                        <SelectField
                                disabled={props?.esEdicion}
                                label={intl.formatMessage({ id: 'input_proyecto' })}
                                value={id_proyecto}
                                options={proyectos.map((e: any) => {
                                    return {
                                        label: e?.obra,
                                        value: e?.id
                                    }
                                })}
                                name="id_proyecto"
                                id="id_proyecto"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_proyecto", target?.value || '');
                                    setId_proyecto(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_proyecto')}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0" }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={(e) => {
                                    props?.action({
                                        pep,
                                        descripcion,
                                        cotizacion,
                                        presupuesto,
                                        cuenta,
                                        orden,
                                        imputable,
                                        id_obra:id_proyecto,
                                        BD: props?.catalogo
                                    });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Grid>

                    </Grid>
                </Form.Group>
            </FormikProvider>
        </div>
    )
}

export default CatalogoPEP
