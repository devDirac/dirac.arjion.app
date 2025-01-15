import React from 'react'
import type { AddContratosFormProps } from './types'
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import ModalComponent from '../Modal';
import CatalogoEspecialidades from '../CatalogosForms/CatalogoEspecialidades'
import CatalogoContratistas from '../CatalogosForms/CatalogoContratistas'
import CatalogoPEP from '../CatalogosForms/CatalogoPEP'
import CatalogoTipoContrato from '../CatalogosForms/CatalogoTipoContrato';
import _ from 'lodash';
import { useAddContratosForm } from './useAddContratosForm';
import SelectMultipleField from '../SelectMultipleField/SelectMultipleField';
import CatalogosGenericos from '../CatalogosForms/CatalogosGenericos';
import './style.scss';
import AddClienteForm from '../../componets/AddClienteForm/AddClienteForm';
import CatalogosClasificacionContrato from '../../componets/CatalogosForms/CatalogosClasificacionContrato';
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';

const AddContratosForm: React.FC<AddContratosFormProps> = (props: AddContratosFormProps) => {

    const {
        formik,
        contrato,
        setContrato,
        id_contrato,
        setId_contrato,
        id_contratista,
        contratistas,
        setCatalogoSeleccionado,
        setTipoCatalogo,
        handleOpen,
        setId_contratista,
        importe,
        setImporte,
        fecha_inicio,
        setFecha_inicio,
        fecha_final,
        setFecha_final,
        estatus,
        setEstatus,
        id_cliente,
        setId_cliente,
        id_responsable,
        setId_responsable,
        autorizado,
        setAutorizado,
        id_autorizador,
        setId_autorizador,
        plantilla,
        setPlantilla,
        terminado,
        setTerminado,
        nota,
        setNota,
        id_tipo_contrato,
        catalogoTiposContrato,
        setId_tipo_contrato,
        id_obra_principal,
        catalogoObras,
        setId_obra_principal,
        id_tipo_proyecto,
        setId_tipo_proyecto,
        pep,
        catalogoPeps,
        setPep,
        moneda,
        setMoneda,
        anticipo,
        setAnticipo,
        categoria,
        setCategoria,
        alertas,
        setAlertas,
        fecha_limite,
        setFecha_limite,
        reclasificacion,
        setReclasificacion,
        propietario,
        setPropietario,
        tipo_contrato_ext,
        catalogoTipoContratoExt,
        setTipo_contrato_ext,
        tolerancia,
        setTolerancia,
        estatus_firma,
        setEstatus_firma,
        contrato_liberado,
        setContrato_liberado,
        clasificacion_contrato,
        setClasificacion_contrato,
        tipo_cambio,
        setTipo_cambio,
        id_especialidad,
        catalogoEspecialidades,
        setId_especialidad,
        handleClose,
        isOpen,
        catalogoSeleccionado,
        tipoCatalogo,
        guardaCatalogoContratistas,
        guardaCatalogoTipoContrato,
        guardaCataPEP,
        guardaCatalogoEspecialidades,
        guardaCatalogo,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        catalogoClasificacionContrato,
        guardaCatalogoClasificacionContrato,
        intl,

        subEspecialidades,
        subEspecialidad,
        setSubEspecialidad,
        resetForm, setResetForm,
        setCliente_,
        peps,
        setPeps
    } = useAddContratosForm(props);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={props?.darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={contrato || ''}
                                        name="contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contrato", target?.value || '');
                                            setContrato(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_contrato' })}
                                        placeholder={intl.formatMessage({ id: 'input_contrato_descripcion' })}
                                        type="text"
                                        id="contrato"
                                        formik={formik?.getFieldMeta('contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={id_contrato || ''}
                                        name="id_contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_contrato", target?.value || '');
                                            setId_contrato(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_id_contrato' })}
                                        placeholder={intl.formatMessage({ id: 'input_id_contrato_descripcion' })}
                                        type="text"
                                        id="id_contrato"
                                        formik={formik?.getFieldMeta('id_contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_contratista' })}
                                        value={id_contratista}
                                        options={contratistas.map((e: any) => {
                                            return {
                                                label: e?.contratista,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_contratistas');
                                            setTipoCatalogo('apm_contratistas');
                                            handleOpen();
                                        }}
                                        name="id_contratista"
                                        id="id_contratista"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_contratista", target?.value || '');
                                            setId_contratista(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_contratista')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={importe || ''}
                                        name="importe"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("importe", target?.value + "" || '');
                                            setImporte(target?.value + "");
                                        }}
                                        label={intl.formatMessage({ id: 'input_importe' })}
                                        placeholder={intl.formatMessage({ id: 'input_importe_descripcion' })}
                                        type="text"
                                        id="importe"
                                        formik={formik?.getFieldMeta('importe')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
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
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={fecha_final || ''}
                                        name="fecha_final"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_final", target?.value || '');
                                            setFecha_final(target?.value);
                                            formik.setFieldValue("fecha_limite", target?.value || '');
                                            setFecha_limite(target?.value);
                                            formik.setFieldTouched("fecha_limite");
                                            formik.setFieldTouched("fecha_limite");
                                            formik.validateField("fecha_limite");
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_final' })}
                                        type="date"
                                        id="fecha_final"
                                        formik={formik?.getFieldMeta('fecha_final')}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_estatus' })}
                                        value={estatus}
                                        options={[{
                                            label: 'Activo',
                                            value: "1"
                                        }, {
                                            label: 'Inactivo',
                                            value: '0'
                                        }]}
                                        name="estatus"
                                        id="estatus"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("estatus", target?.value || '');
                                            setEstatus(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('estatus')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_cliente' })}
                                        value={id_cliente}
                                        options={(props?.cientes || []).map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_cliente"
                                        id="id_cliente"
                                        required
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_clientes');
                                            setTipoCatalogo('apm_clientes');
                                            handleOpen();
                                        }}

                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_cliente", target?.value || '');
                                            setId_cliente(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_cliente')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_responsable' })}
                                        value={id_responsable}
                                        options={(props?.responsables || []).map((e: any) => {
                                            return {
                                                label: e?.email,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_responsable"
                                        id="id_responsable"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_responsable", target?.value || '');
                                            setId_responsable(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_responsable')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_autorizado' })}
                                        value={autorizado}
                                        options={[{
                                            label: 'Sin envío',
                                            value: "0"
                                        }, {
                                            label: 'Por autorizar',
                                            value: '1'
                                        }, {
                                            label: 'Autorizado',
                                            value: '2'
                                        }, {
                                            label: 'Cancelado',
                                            value: '3'
                                        }]}
                                        name="autorizado"
                                        id="autorizado"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("autorizado", target?.value || '');
                                            setAutorizado(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('autorizado')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_autorizador' })}
                                        value={id_autorizador}
                                        options={(props?.responsables || []).map((e: any) => {
                                            return {
                                                label: e?.email,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_autorizador"
                                        id="id_autorizador"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_autorizador", target?.value || '');
                                            setId_autorizador(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_autorizador')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={plantilla || ''}
                                        name="plantilla"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("plantilla", target?.value || '');
                                            setPlantilla(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_plantilla' })}
                                        placeholder={intl.formatMessage({ id: 'input_plantilla_descripcion' })}
                                        type="text"
                                        id="plantilla"
                                        formik={formik?.getFieldMeta('plantilla')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_terminado' })}
                                        value={terminado}
                                        options={[{
                                            label: 'En curso',
                                            value: "0"
                                        }, {
                                            label: 'Terminado',
                                            value: '1'
                                        }, {
                                            label: 'Rescindido',
                                            value: '2'
                                        }, {
                                            label: 'Cierre administrativo',
                                            value: '3'
                                        }]}
                                        name="terminado"
                                        id="terminado"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("terminado", target?.value || '');
                                            setTerminado(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('terminado')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={nota || ''}
                                        name="nota"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("nota", target?.value || '');
                                            setNota(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_nota' })}
                                        placeholder={intl.formatMessage({ id: 'input_nota_descripcion' })}
                                        type="textArea"
                                        id="nota"
                                        formik={formik?.getFieldMeta('nota')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'inpput_tipo_contrato' })}
                                        value={id_tipo_contrato}
                                        options={catalogoTiposContrato.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_cat_tipo_contrato')
                                            setTipoCatalogo('apm_cat_tipo_contrato');
                                            handleOpen()
                                        }}
                                        name="id_tipo_contrato"
                                        id="id_tipo_contrato"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_tipo_contrato", target?.value || '');
                                            setId_tipo_contrato(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_tipo_contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_obra_principal' })}
                                        value={id_obra_principal}
                                        options={catalogoObras.map((e: any) => {
                                            return {
                                                label: e?.obra,
                                                value: e?.id
                                            }
                                        })}
                                        name="id_obra_principal"
                                        id="id_obra_principal"
                                        required

                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_obra_principal", target?.value || '');
                                            setId_obra_principal(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_obra_principal')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_tipo_de_proyecto' })}
                                        value={id_tipo_proyecto}
                                        options={[{
                                            label: 'Presupuesto',
                                            value: '1'
                                        }, {
                                            label: 'Cotizado',
                                            value: '2'
                                        }, {
                                            label: 'Contratado',
                                            value: '3'
                                        }]}
                                        name="id_tipo_proyecto"
                                        id="id_tipo_proyecto"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_tipo_proyecto", target?.value || '');
                                            setId_tipo_proyecto(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_tipo_proyecto')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectMultipleAutoCompleteField
                                        label={intl.formatMessage({
                                            id: "input_pep",
                                        })}
                                        defaultValue={peps}
                                        options={catalogoPeps.filter((r:any)=>+r?.id !== +pep).map((e: any) => {
                                            return {
                                                label: e?.pep,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_pep');
                                            setTipoCatalogo('apm_pep');
                                            handleOpen();
                                        }}
                                        name="peps"
                                        id="peps"
                                        onInput={(e: any) => {
                                            /* const target: any = e.target as HTMLTextAreaElement; */
                                            formik.setFieldValue("peps", /* target?.value || [] */e);
                                            setPeps(/* target?.value */e);
                                        }}
                                        formik={formik?.getFieldMeta("peps")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_moneda' })}
                                        value={moneda}
                                        options={[{
                                            label: 'Pesos',
                                            value: '1'
                                        }, {
                                            label: 'Dolares',
                                            value: '2'
                                        }, {
                                            label: 'Euros',
                                            value: '3'
                                        }]}
                                        name="moneda"
                                        id="moneda"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("moneda", target?.value || '');
                                            setMoneda(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('moneda')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={anticipo || ''}
                                        name="anticipo"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("anticipo", target?.value || '');
                                            setAnticipo(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_anticipo' })}
                                        placeholder={intl.formatMessage({ id: 'input_anticipo_descripcion' })}
                                        type="text"
                                        id="anticipo"
                                        formik={formik?.getFieldMeta('anticipo')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={categoria || ''}
                                        name="categoria"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("categoria", target?.value || '');
                                            setCategoria(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_categoria' })}
                                        placeholder={intl.formatMessage({ id: 'input_categoria_descripcion' })}
                                        type="text"
                                        id="categoria"
                                        formik={formik?.getFieldMeta('categoria')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_alertas' })}
                                        value={alertas}
                                        options={[{
                                            label: 'Si',
                                            value: '1'
                                        }, {
                                            label: 'No',
                                            value: '0'
                                        }]}
                                        name="alertas"
                                        id="alertas"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("alertas", target?.value || '');
                                            setAlertas(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('alertas')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={fecha_limite || ''}
                                        name="fecha_limite"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_limite", target?.value || '');
                                            setFecha_limite(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_fecha_limite' })}
                                        type="date"
                                        id="fecha_limite"
                                        formik={formik?.getFieldMeta('fecha_limite')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_reclasificacion' })}
                                        value={reclasificacion}
                                        options={[{
                                            label: 'Si',
                                            value: '1'
                                        }, {
                                            label: 'No',
                                            value: '0'
                                        }]}
                                        name="reclasificacion"
                                        id="reclasificacion"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("reclasificacion", target?.value || '');
                                            setReclasificacion(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('reclasificacion')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_propietario' })}
                                        value={propietario}
                                        options={[{
                                            label: 'Si',
                                            value: '1'
                                        }, {
                                            label: 'No',
                                            value: '0'
                                        }]}
                                        name="propietario"
                                        id='propietario'
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("propietario", target?.value || '');
                                            setPropietario(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('propietario')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_tipo_contrato_externo' })}
                                        value={tipo_contrato_ext}
                                        options={catalogoTipoContratoExt.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_cat_tipo_contrato_ext');
                                            setTipoCatalogo('apm_cat_tipo_contrato_ext');
                                            handleOpen();
                                        }}
                                        name="tipo_contrato_ext"
                                        id="tipo_contrato_ext"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo_contrato_ext", target?.value || '');
                                            setTipo_contrato_ext(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('tipo_contrato_ext')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={tolerancia || ''}
                                        name="tolerancia"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tolerancia", target?.value || '');
                                            setTolerancia(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_tolerancia' })}
                                        placeholder={intl.formatMessage({ id: 'input_tolerancia_descripcion' })}
                                        type="text"
                                        id="tolerancia"
                                        formik={formik?.getFieldMeta('tolerancia')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_estatus_firma' })}
                                        value={estatus_firma}
                                        options={[{
                                            label: 'CONTRATO FIRMADO',
                                            value: "CONTRATO FIRMADO"
                                        }, {
                                            label: 'CONTRATO NO FIRMADO',
                                            value: 'CONTRATO NO FIRMADO'
                                        }]}
                                        name="estatus_firma"
                                        id="estatus_firma"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("estatus_firma", target?.value || '');
                                            setEstatus_firma(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('estatus_firma')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={contrato_liberado || ''}
                                        name="contrato_liberado"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contrato_liberado", target?.value || '');
                                            setContrato_liberado(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_contrato_liberado' })}
                                        placeholder={intl.formatMessage({ id: 'input_contrato_liberado_descripcion' })}
                                        type="text"
                                        id="contrato_liberado"
                                        formik={formik?.getFieldMeta('contrato_liberado')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_clasificacion_contrato' })}
                                        value={clasificacion_contrato}
                                        options={catalogoClasificacionContrato.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_cat_clasificacion_contrato');
                                            setTipoCatalogo('apm_cat_clasificacion_contrato');
                                            handleOpen();
                                        }}
                                        name="clasificacion_contrato"
                                        id="clasificacion_contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("clasificacion_contrato", target?.value || '');
                                            setClasificacion_contrato(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('clasificacion_contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <InputField
                                        required
                                        value={tipo_cambio || ''}
                                        name="tipo_cambio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo_cambio", target?.value || '');
                                            setTipo_cambio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: 'input_tipo_de_cambio' })}
                                        placeholder={intl.formatMessage({ id: 'input_tipo_de_cambio_descripcion' })}
                                        type="text"
                                        id="tipo_cambio"
                                        formik={formik?.getFieldMeta('tipo_cambio')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_especialidad' })}
                                        value={id_especialidad}
                                        options={catalogoEspecialidades.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_cat_especialidades');
                                            setTipoCatalogo('apm_cat_especialidades');
                                            handleOpen();
                                        }}
                                        name="id_especialidad"
                                        id="id_especialidad"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("id_especialidad", target?.value || '');
                                            setId_especialidad(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('id_especialidad')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SelectMultipleAutoCompleteField
                                        disabled={id_especialidad === '' || !subEspecialidades.length}
                                        label={intl.formatMessage({
                                            id: "input_sub_especialidad",
                                        })}
                                        defaultValue={subEspecialidad}
                                        options={subEspecialidades.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })}
                                        btnPlus
                                        onAdd={() => {
                                            setCatalogoSeleccionado('apm_cat_especialidades_sub');
                                            setTipoCatalogo('apm_cat_especialidades_sub');
                                            handleOpen();
                                        }}
                                        name="sub_especialidad"
                                        id="sub_especialidad"
                                        onInput={(e: any) => {
                                            /* const target: any = e.target as HTMLTextAreaElement; */
                                            formik.setFieldValue("sub_especialidad", e/* target?.value || [] */);
                                            setSubEspecialidad(/* target?.value */e);


                                        }}
                                        formik={formik?.getFieldMeta("sub_especialidad")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                        onClick={(e: any) => {
                                            props?.enAccion({
                                                contrato,
                                                id_contrato,
                                                id_contratista,
                                                fecha_inicio,
                                                fecha_final,
                                                importe,
                                                estatus,
                                                id_cliente,
                                                id_responsable,
                                                autorizado,
                                                id_autorizador,
                                                plantilla,
                                                terminado,
                                                nota,
                                                id_tipo_contrato,
                                                id_obra_principal,
                                                id_tipo_proyecto,
                                                pep: pep === "" || pep === "null" ? null : pep,
                                                peps: peps.map((r: any) => r?.value),
                                                moneda,
                                                anticipo,
                                                categoria,
                                                alertas: _.isEmpty(alertas) ? '0' : alertas,
                                                fecha_limite,
                                                reclasificacion,
                                                propietario,
                                                tipo_contrato_ext: tipo_contrato_ext !== 'null' && tipo_contrato_ext !== '' ? tipo_contrato_ext : null,
                                                tolerancia,
                                                estatus_firma,
                                                contrato_liberado,
                                                clasificacion_contrato: clasificacion_contrato === "" || clasificacion_contrato === "null" ? null : clasificacion_contrato,
                                                tipo_cambio,
                                                id_especialidad,
                                                subEspecialidad:subEspecialidad.map((r: any) => r?.value)
                                            });
                                        }}
                                    >
                                        {_.isEmpty(props?.item) ? intl.formatMessage({ id: 'general_guardar' }) : intl.formatMessage({ id: 'general_actualizar' })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
            <ModalComponent handleClose={handleClose} isOpen={isOpen}>
                {catalogoSeleccionado === 'apm_contratistas' ?
                    <CatalogoContratistas idObra={props?.obra} key={'actualizaItem_1'} catalogo={tipoCatalogo} titulo={''} action={guardaCatalogoContratistas} procesando={props?.procesando} /> :
                    catalogoSeleccionado === 'apm_cat_tipo_contrato' ?
                        <CatalogoTipoContrato key={'actualizaItem_2'} catalogo={tipoCatalogo} titulo={''} action={guardaCatalogoTipoContrato} procesando={props?.procesando} /> :
                        catalogoSeleccionado === 'apm_pep' ?
                            <CatalogoPEP idObra={props?.obra} key={'actualizaItem_3'} catalogo={tipoCatalogo} titulo={''} action={guardaCataPEP} procesando={props?.procesando} /> :
                            catalogoSeleccionado === 'apm_cat_especialidades' ?
                                <CatalogoEspecialidades idObra={props?.obra} key={'actualizaItem_4'} catalogo={tipoCatalogo} titulo={''} action={guardaCatalogoEspecialidades} procesando={props?.procesando} esEspecialidadPadre /> :
                                catalogoSeleccionado === 'apm_cat_tipo_contrato_ext' ?
                                    <CatalogosGenericos idObra={props?.obra} key={'actualizaItem_5'} catalogo={tipoCatalogo} titulo={''} action={guardaCatalogo} procesando={props?.procesando} /> :
                                    catalogoSeleccionado === 'apm_cat_clasificacion_contrato' ?
                                        <CatalogosClasificacionContrato idObra={props?.obra} key={'actualizaItem_6'} catalogo={tipoCatalogo} titulo={''} action={guardaCatalogoClasificacionContrato} procesando={props?.procesando} /> :
                                        catalogoSeleccionado === 'apm_clientes' ?
                                            <AddClienteForm onReset={() => setResetForm(false)} resetForm={resetForm} procesando={props?.procesando} enAccion={(data) => setCliente_(data)} /> :
                                            catalogoSeleccionado === 'apm_cat_especialidades_sub' ?
                                                <CatalogoEspecialidades idEspecialidadPadre={id_especialidad} idObra={props?.obra} key={'actualizaItem_6'} catalogo={tipoCatalogo} titulo={''} action={guardaCatalogoEspecialidades} procesando={props?.procesando} /> :
                                                null}
            </ModalComponent>
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

export default AddContratosForm
