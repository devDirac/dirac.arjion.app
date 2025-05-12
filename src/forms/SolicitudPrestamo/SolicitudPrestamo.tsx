import React, { useEffect, useMemo, useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import env from "react-dotenv";
import { Autocomplete, Box, Card, CardContent, Grid, Input, Link, TextField, Tooltip, Typography } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import _ from 'lodash';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import { getCurrentDate } from '../../utils';
import { numericFormatter } from 'react-number-format';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SelectMultipleAutoCompleteField from '../../componets/SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import moment from 'moment';

interface SolicitudPrestamoProps {
    item?: any
    resetForm?: any
    procesando: boolean
    enAction: (data: any) => void
    tipoSolicitud: any
    monedas?: any[]
    bancos?: any[]
    handleRefreshMonedas?: (form: any) => void
    handleRefreshTipoCambio?: (form: any) => void
    proyectos?: any[]
    beneficiarios?: any[],
    formasPago?: any[]
    empresas?: any[]
    conceptos?: any[]
    tipoCambio?: any
    proveedores?: any[]
    handleAddProveedor: (form: any) => void
    handlePreguntaAddBanco?: (data: any) => void
}

const SolicitudPrestamo: React.FC<SolicitudPrestamoProps> = (props: SolicitudPrestamoProps) => {
    const intl = useIntl();

    const [muestraOtroProyecto, setMuestraOtroProyecto] = useState(false);
    const [muestraOtroBeneficiario, setMuestraOtroBeneficiario] = useState(false)
    /* Para guardar el importe en pesos mexicanos */
    const [numero_quincenas, seNumero_quincenas] = useState("");
    const [valor_quincenas, seValor_quincenas] = useState("");

    const [importePesos, setImportePesos] = useState(0);
    const [importe, setImporte] = useState("");
    const [id_moneda, setId_moneda] = useState<any>([]);
    const [id_proyecto, setId_proyecto] = useState<any>([]);
    const [id_beneficiario, setId_beneficiario] = useState<any>([]);
    const [descripcion, setDescripcion] = useState('');
    const [id_forma_pago, setId_forma_pago] = useState<any>([]);
    const [bancoId, setBancoiD] = useState('');
    const [banco, setBanco] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [clabe, setClabe] = useState('');
    const [rutaBanco, setRutaBanco] = useState('');
    const [proyecto_sr, setProyecto_sr] = useState('');
    const [id_empresa, setId_empresa] = useState<any>([]);
    const [proveedor, setProveedor] = useState<any>([]);
    const [id_concepto, setId_concepto] = useState<any>([]);
    const [fecha_pago, setFecha_pago] = useState('');

    const formik = useFormik({
        initialValues: {
            importe: "",
            numero_quincenas: "",
            valor_quincenas: "",
            id_moneda: [],
            id_proyecto: [],
            id_beneficiario: [],
            descripcion: "",
            id_forma_pago: [],
            banco: "",
            cuenta: "",
            fecha_pago: "",
            clabe: "",
            proyecto_sr: "",
            id_empresa: [],
            //proveedor: "",
            proveedor: [],
            id_concepto: []
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            importe: Yup.string().max(500, 'Debe de tener máximo de 500 dígitos').matches(/^-?\d{1,500}(\.\d{1,50})?$/, 'Solo numeros son validos').required('Requerido'),
            numero_quincenas: Yup.string().max(2, 'Debe de tener máximo de 2 dígitos').matches(/^-?\d{1,2}(\.\d{1,2})?$/, 'Solo numeros son validos'),//.required('Requerido'),
            valor_quincenas: Yup.string().max(500, 'Debe de tener máximo de 500 dígitos').matches(/^-?\d{1,500}(\.\d{1,50})?$/, 'Solo numeros son validos'),//.required('Requerido'),
            id_moneda: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido'),
            id_proyecto: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido'),
            id_beneficiario: Yup.array(),//.min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido'),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_forma_pago: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido'),
            banco: Yup.string().max(150, 'Debe de tener máximo de 150 dígitos').required('Requerido'),
            cuenta: Yup.string().max(24, 'Debe de tener máximo de 24 dígitos').required('Requerido').matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            clabe: Yup.string().max(18, 'Debe de tener máximo de 24 dígitos').required('Requerido').matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            fecha_pago: Yup.string().test(
                "olderThanToday",
                'La fecha de ejecución no puede ser menor a la fecha de hoy',
                (value) => {
                    const date1 = moment().startOf("day");
                    const date2 = moment(value);
                    return !date1?.isValid || fecha_pago === ""
                        ? true
                        : !date2.isBefore(date1);
                }
            ),
            proyecto_sr: Yup.string().max(150, 'Debe de tener máximo de 150 dígitos'),
            id_empresa: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido'),
            //proveedor: Yup.string().max(150, 'Debe de tener máximo de 150 dígitos'),
            proveedor: Yup.array(),
            id_concepto: Yup.array(),//.min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido')
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }

    useEffect(() => {
        console.log(props?.monedas)


        if (props?.item && props?.item?.importe) {
            formik.setFieldValue("importe", props?.item?.importe || '');
            setImporte(props?.item?.importe || '');
        }


        if (props?.monedas?.length) {
            const mexico = props?.monedas?.filter((e: any) => e?.pais === 'Mexico').map((e: any) => {
                return {
                    label: 'Moneda: ' + e?.moneda + ', Pais:' + e?.pais + ', Valor en dolar:' + numericFormatter(e?.valor_en_dolar + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' }),
                    value: e?.id,
                }
            });
            formik.setFieldValue("id_moneda", mexico);
            setId_moneda(mexico);
        }

        if (props?.item && props?.item?.id_moneda) {
            formik.setFieldValue("id_moneda", props?.item?.id_moneda || '');
            setId_moneda(props?.item?.id_moneda || '');
        }


        if (props?.item && props?.item?.id_proyecto) {
            formik.setFieldValue("id_proyecto", props?.item?.id_proyecto || '');
            setId_proyecto(props?.item?.id_proyecto || '');
        }
        if (props?.item && props?.item?.id_beneficiario) {
            formik.setFieldValue("id_beneficiario", props?.item?.id_beneficiario || '');
            setId_beneficiario(props?.item?.id_beneficiario || '');
        }
        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || '');
            setDescripcion(props?.item?.descripcion || '');
        }
        if (props?.item && props?.item?.id_forma_pago) {
            formik.setFieldValue("id_forma_pago", props?.item?.id_forma_pago || '');
            setId_forma_pago(props?.item?.id_forma_pago || '');
        }
        if (props?.item && props?.item?.banco) {
            formik.setFieldValue("banco", props?.item?.banco || '');
            setBanco(props?.item?.banco || '');
        }
        if (props?.item && props?.item?.cuenta) {
            formik.setFieldValue("cuenta", props?.item?.cuenta || '');
            setCuenta(props?.item?.cuenta || '');
        }
        if (props?.item && props?.item?.clabe) {
            formik.setFieldValue("clabe", props?.item?.clabe || '');
            setClabe(props?.item?.clabe || '');
        }

        if (props?.item && props?.item?.fecha_pago) {
            formik.setFieldValue("fecha_pago", props?.item?.fecha_pago || '');
            setFecha_pago(props?.item?.fecha_pago || '');
        }

        if (props?.item && props?.item?.proyecto_sr) {
            formik.setFieldValue("proyecto_sr", props?.item?.proyecto_sr || '');
            setProyecto_sr(props?.item?.proyecto_sr || '');
        }

        if (props?.item && props?.item?.id_empresa) {
            formik.setFieldValue("id_empresa", props?.item?.id_empresa || '');
            setId_empresa(props?.item?.id_empresa || '');
        }

        if (props?.item && props?.item?.proveedor) {
            formik.setFieldValue("proveedor", props?.item?.proveedor || '');
            setProveedor(props?.item?.proveedor || '');
        }

        if (props?.item && props?.item?.proveedor && props?.item?.proveedor !== '') {
            setMuestraOtroBeneficiario(true)
        }

        if (props?.item && props?.item?.proyecto_sr && props?.item?.proyecto_sr !== '') {
            setMuestraOtroProyecto(true)
        }

        if (props?.item) {
            validate();
        }


    }, [props?.item]);

    useEffect(() => {
        if (props?.resetForm) {
            setDescripcion('');
            formik.resetForm();
        }
    }, [props?.resetForm]);

    const convertirAMXN = (importe: any, tasaOrigenUSD: any, tasaMXNUSD: any) => {
        if (tasaOrigenUSD <= 0 || tasaMXNUSD <= 0) {
            return 0
        }
        // Paso 1: Convertir la moneda de origen a dólares (multiplicar si está en centavos)
        let importeEnUSD = importe * tasaOrigenUSD;
        // Paso 2: Convertir los dólares a pesos mexicanos
        let importeEnMXN = importeEnUSD * tasaMXNUSD;

        return importeEnMXN;
    }


    useEffect(() => {
        let importe_: any = importe;
        const tasaCOPUSD = (props?.monedas || []).find((r: any) => r?.id === +id_moneda?.[0]?.value)?.valor_en_dolar
        let tasaMXNUSD = props?.tipoCambio?.pesos_dolar;
        let resultado = convertirAMXN(importe_, tasaCOPUSD, tasaMXNUSD);
        if (isNaN(resultado)) {
            setImportePesos(0)
        } else {
            if (resultado === 0) {
                setImportePesos(importe_)
            } else {
                setImportePesos(resultado)
            }

        }

    }, [id_moneda, importe, props?.tipoCambio?.pesos_dolar])

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2} mt={5} style={{ padding: 15 }}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'left', paddingLeft: 30 }}>


                            <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 16,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        fontWeight: "bold",
                                        background: '#ffff'
                                    }}
                                >

                                    <Typography variant="h6" fontWeight="medium">
                                        Información general <InfoIcon color='error' />


                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                                    <Typography variant="h6" fontWeight="medium">
                                        Tipo de solicitud: {props?.tipoSolicitud?.title}  <Tooltip title={props?.tipoSolicitud?.description}>
                                            <HelpCenterIcon style={{ cursor: 'help', color: 'rgb(32, 47, 80)' }} fontSize='medium' />
                                        </Tooltip>
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1}>
                                    <Typography variant="h6" fontWeight="medium">
                                        Nombre del solicitante: {props?.tipoSolicitud?.user?.nombre}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="medium">
                                        Fecha de solicitud: {getCurrentDate()}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                                    <Typography variant="h6" fontWeight="medium">
                                        Tipo de cambio: {numericFormatter(props?.tipoCambio?.pesos_dolar + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}, actualizado al día: {props?.tipoCambio?.fecha_registro}
                                        <Tooltip title={'Actualizar el tipo de cambio al valor mas reciente'} onClick={() => {
                                            props?.handleRefreshTipoCambio && props?.handleRefreshTipoCambio({
                                                importePesos,
                                                importe,
                                                quincenas_numero: numero_quincenas,
                                                quincenas_valor: valor_quincenas,
                                                id_moneda,
                                                id_proyecto,
                                                id_beneficiario,
                                                descripcion,
                                                id_forma_pago,
                                                banco,
                                                cuenta,
                                                clabe,
                                                fecha_pago,
                                                proyecto_sr,
                                                id_empresa,
                                                proveedor,
                                                bancoId
                                            })
                                        }}>
                                            <RefreshIcon style={{ cursor: 'pointer' }} color='info' fontSize='medium' />
                                        </Tooltip>
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                                    <Typography variant="h6" fontWeight="medium">
                                        Importe en pesos MXN: {numericFormatter(importePesos + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}
                                    </Typography>
                                </Box>
                            </Card>



                        </Grid>

                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                            <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
                                {/* Título en el borde superior */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 16,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        fontWeight: "bold",
                                        background: '#ffff'
                                    }}
                                >

                                    <Typography variant="h6" fontWeight="medium">
                                        Detalles de la solicitud <AssignmentIcon color='error' />


                                    </Typography>
                                </Box>

                                {/* Contenido del formulario */}
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <SelectMultipleAutoCompleteField
                                                label={intl.formatMessage({
                                                    id: "input_empresa",
                                                })}
                                                placeholder={'Seleccione una opción'}
                                                defaultValue={id_empresa?.[0]?.value}
                                                options={(props?.empresas || []).map((e: any) => {
                                                    return {
                                                        label: e?.nombre,
                                                        value: e?.id,
                                                    };
                                                })}
                                                EsMultiple
                                                name="id_empresa"
                                                id="id_empresa"
                                                key="id_empresa"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("id_empresa", [e]);
                                                    setId_empresa([e]);
                                                }}
                                                formik={formik?.getFieldMeta("id_empresa")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={muestraOtroProyecto ? 4 : 8} style={{ paddingLeft: 30 }}>
                                            <SelectMultipleAutoCompleteField
                                                label={intl.formatMessage({
                                                    id: "input_proyecto",
                                                })}
                                                EsMultiple
                                                placeholder={'Seleccione una opción'}
                                                defaultValue={id_proyecto?.[0]?.value}
                                                options={(props?.proyectos || []).map((e: any) => {
                                                    return {
                                                        label: e?.nombre,
                                                        value: e?.id,
                                                    };
                                                })}
                                                name="id_proyecto"
                                                id="id_proyecto"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("id_proyecto", [e]);
                                                    setId_proyecto([e]);
                                                    //drlryProect(true)
                                                    if (e?.value === 0) {
                                                        setMuestraOtroProyecto(true);
                                                    } else {
                                                        setMuestraOtroProyecto(false);
                                                        formik.setFieldValue("proyecto_sr", '');
                                                        setProyecto_sr('');
                                                    }
                                                }}
                                                formik={formik?.getFieldMeta("id_proyecto")}
                                            />
                                        </Grid>
                                        {muestraOtroProyecto ? <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <InputField
                                                required
                                                value={proyecto_sr || ''}
                                                name="proyecto_sr"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("proyecto_sr", target?.value || '');
                                                    setProyecto_sr(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: 'input_proyecto_sr' })}
                                                placeholder={intl.formatMessage({ id: 'input_proyecto_sr_descripcion' })}
                                                type="text"
                                                id="proyecto_sr"
                                                formik={formik?.getFieldMeta('proyecto_sr')}
                                            />
                                        </Grid> : null}

                                        {props?.tipoSolicitud?.requiere_beneficiario === 1 ? <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <SelectMultipleAutoCompleteField
                                                placeholder={'Seleccione una opción'}
                                                label={intl.formatMessage({
                                                    id: "input_beneficiario",
                                                })}
                                                EsMultiple
                                                defaultValue={id_beneficiario?.[0]?.value}
                                                options={(props?.beneficiarios || []).map((e: any) => {
                                                    return {
                                                        label: e?.correo,
                                                        value: e?.id_usuario,
                                                    };
                                                })}
                                                name="id_beneficiario"
                                                id="id_beneficiario"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("id_beneficiario", [e]);
                                                    setId_beneficiario([e]);
                                                    if (e?.value === 0) {
                                                        setMuestraOtroBeneficiario(true);
                                                    } else {
                                                        setMuestraOtroBeneficiario(false);
                                                        formik.setFieldValue("proveedor", '');
                                                        setProveedor('');
                                                    }
                                                }}
                                                formik={formik?.getFieldMeta("id_beneficiario")}
                                            />
                                        </Grid> : null}
                                        {muestraOtroBeneficiario ? <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <SelectMultipleAutoCompleteField
                                                label={intl.formatMessage({ id: 'input_beneficiario_otro' })}
                                                placeholder={intl.formatMessage({ id: 'input_beneficiario_otro_descripcion' })}
                                                EsMultiple
                                                btnPlus
                                                onAdd={() => {
                                                    props?.handleAddProveedor({
                                                        importePesos,
                                                        importe,
                                                        quincenas_numero: numero_quincenas,
                                                        quincenas_valor: valor_quincenas,
                                                        id_moneda,
                                                        id_proyecto,
                                                        id_beneficiario,
                                                        descripcion,
                                                        id_forma_pago,
                                                        banco,
                                                        cuenta,
                                                        clabe,
                                                        fecha_pago,
                                                        proyecto_sr,
                                                        id_empresa,
                                                        proveedor,
                                                        bancoId
                                                    })
                                                }}
                                                defaultValue={proveedor?.[0]?.value}
                                                options={(props?.proveedores || []).map((e: any) => {
                                                    return {
                                                        label: e?.nombre,
                                                        value: e?.id,
                                                    };
                                                })}
                                                name="proveedor"
                                                id="proveedor"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("proveedor", [e]);
                                                    setProveedor([e]);
                                                }}
                                                formik={formik?.getFieldMeta("proveedor")}
                                            />
                                        </Grid> : null}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                            <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
                                {/* Título en el borde superior */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 16,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        fontWeight: "bold",
                                        background: '#ffff'
                                    }}
                                >

                                    <Typography variant="h6" fontWeight="medium">
                                        Información de Pago <MonetizationOnIcon color='error' />
                                    </Typography>
                                </Box>
                                {/* Contenido del formulario */}
                                <CardContent>
                                    <Grid container spacing={2}>

                                        {props?.tipoSolicitud?.mostrar_pago_quincenas ?
                                            <Grid item xs={12} md={6} style={{ paddingLeft: 30 }}>
                                                <InputField
                                                    required
                                                    value={numero_quincenas || ''}
                                                    name="numero_quincenas"
                                                    onInput={(e: any) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        formik.setFieldValue("numero_quincenas", target?.value || '');
                                                        seNumero_quincenas(target?.value);
                                                    }}
                                                    label={'Número de quincenas'}
                                                    placeholder={'Ingrese el numero de quincenas a pagar'}
                                                    type="text"
                                                    id="numero_quincenas"
                                                    formik={formik?.getFieldMeta('numero_quincenas')}
                                                />
                                            </Grid> : null}
                                        {props?.tipoSolicitud?.mostrar_pago_quincenas ?
                                            <Grid item xs={12} md={6} style={{ paddingLeft: 30 }}>
                                                <InputField
                                                    required
                                                    value={valor_quincenas || ''}
                                                    name="valor_quincenas"
                                                    onInput={(e: any) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        formik.setFieldValue("valor_quincenas", target?.value || '');
                                                        seValor_quincenas(target?.value);
                                                    }}
                                                    label={'Importe por quincena'}
                                                    placeholder={'Ingrese el importe a descontar en cada quincena'}
                                                    type="text"
                                                    id="valor_quincenas"
                                                    formik={formik?.getFieldMeta('valor_quincenas')}
                                                />
                                            </Grid> : null


                                        }

                                        <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <SelectMultipleAutoCompleteField
                                                placeholder={'Seleccione una opción'}
                                                label={intl.formatMessage({
                                                    id: "input_moneda",
                                                })}
                                                btnActualiza
                                                onRefresh={() => {
                                                    props?.handleRefreshMonedas && props?.handleRefreshMonedas({
                                                        importePesos,
                                                        importe,
                                                        quincenas_numero: numero_quincenas,
                                                        quincenas_valor: valor_quincenas,
                                                        id_moneda,
                                                        id_proyecto,
                                                        id_beneficiario,
                                                        descripcion,
                                                        id_forma_pago,
                                                        banco,
                                                        cuenta,
                                                        clabe,
                                                        fecha_pago,
                                                        proyecto_sr,
                                                        id_empresa,
                                                        proveedor,
                                                        bancoId
                                                    })
                                                }}
                                                EsMultiple
                                                defaultValue={id_moneda?.[0]?.value}
                                                options={(props?.monedas || []).map((e: any) => {
                                                    return {
                                                        label: 'Moneda: ' + e?.moneda + ', Pais:' + e?.pais + ', Valor en dolar:' + numericFormatter(e?.valor_en_dolar + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' }),
                                                        value: e?.id,
                                                    };
                                                })}
                                                name="id_moneda"
                                                id="id_moneda"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("id_moneda", [e]);
                                                    setId_moneda([e]);
                                                }}
                                                formik={formik?.getFieldMeta("id_moneda")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <SelectMultipleAutoCompleteField
                                                placeholder={'Seleccione una opción'}
                                                label={intl.formatMessage({
                                                    id: "input_forma_pago",
                                                })}
                                                EsMultiple
                                                defaultValue={id_forma_pago?.[0]?.value}
                                                options={(props?.formasPago || []).map((e: any) => {
                                                    return {
                                                        label: e?.nombre,
                                                        value: e?.id,
                                                    };
                                                })}
                                                name="id_forma_pago"
                                                id="id_forma_pago"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("id_forma_pago", [e]);
                                                    setId_forma_pago([e]);
                                                }}
                                                formik={formik?.getFieldMeta("id_forma_pago")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                                            <InputField
                                                required
                                                value={importe || ''}
                                                name="importe"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("importe", target?.value || '');
                                                    setImporte(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: 'input_importe' })}
                                                placeholder={intl.formatMessage({ id: 'input_importe_descripcion' })}
                                                type="text"
                                                id="importe"
                                                formik={formik?.getFieldMeta('importe')}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>





                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                            <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
                                {/* Título en el borde superior */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 16,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        fontWeight: "bold",
                                        background: '#ffff'
                                    }}
                                >

                                    <Typography variant="h6" fontWeight="medium">
                                        Información bancaria <AccountBalanceIcon color='error' />
                                    </Typography>
                                </Box>

                                {/* Contenido del formulario */}
                                <CardContent>
                                    <Grid container spacing={2}>
                                        {(props?.bancos)?.length ? <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                            <p style={{ fontSize: 14 }}>Utiliza las cuentas guardadas con anterioridad</p>
                                        </Grid> : null}

                                        {(props?.bancos)?.length ? <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>

                                            {(props?.bancos)?.map((r: any) => {
                                                return (
                                                    <Button onClick={() => {
                                                        setBancoiD(r?.id)
                                                        formik.setFieldValue("banco", r?.banco || '');
                                                        setBanco(r?.banco || '');
                                                        formik.setFieldValue("cuenta", r?.cuenta || '');
                                                        setCuenta(r?.cuenta || '');
                                                        formik.setFieldValue("clabe", r?.clabe || '');
                                                        setClabe(r?.clabe || '');
                                                        setRutaBanco(r?.ruta || '')
                                                    }}
                                                        size='sm'
                                                        variant="outlined"
                                                        style={{ color: '#ffff', marginLeft: 5, marginRight: 5, backgroundColor: '#1A73E8' }}>
                                                        {r?.alias}
                                                    </Button>
                                                )
                                            })}
                                        </Grid> : <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: 12, color: 'grey' }}>
                                                Aun no cuentas con información bancaria
                                            </p>
                                        </Grid>}
                                        <Grid item xs={12} md={3} style={{ paddingLeft: 30 }}>
                                            <InputField
                                                required
                                                value={banco || ''}
                                                name="banco"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("banco", target?.value || '');
                                                    setBanco(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: 'input_banco' })}
                                                placeholder={intl.formatMessage({ id: 'input_banco_descripcion' })}
                                                type="text"
                                                id="banco"
                                                formik={formik?.getFieldMeta('banco')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3} style={{ paddingLeft: 30 }}>
                                            <InputField
                                                required
                                                value={cuenta || ''}
                                                name="cuenta"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("cuenta", target?.value || '');
                                                    setCuenta(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: 'input_cuenta' })}
                                                placeholder={intl.formatMessage({ id: 'input_cuenta_descripcion' })}
                                                type="text"
                                                id="cuenta"
                                                formik={formik?.getFieldMeta('cuenta')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3} style={{ paddingLeft: 30 }} >
                                            <InputField
                                                required
                                                value={clabe || ''}
                                                name="clabe"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("clabe", target?.value || '');
                                                    setClabe(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: 'input_clabe' })}
                                                placeholder={intl.formatMessage({ id: 'input_clabe_descripcion' })}
                                                type="text"
                                                id="clabe"
                                                formik={formik?.getFieldMeta('clabe')}
                                            />
                                        </Grid>
                                        {!(props?.bancos)?.find((r: any) => r?.banco === banco && r?.clabe === clabe && r?.cuenta === cuenta) && (banco !== '' && clabe !== '' && cuenta !== '') ? <Grid item xs={12} md={3} style={{ paddingLeft: 30 }} >
                                            <Button
                                                variant="primary"
                                                style={{ position: 'relative', top: '30px' }}
                                                onClick={(e) => {
                                                    props?.handlePreguntaAddBanco && props?.handlePreguntaAddBanco({ banco, cuenta, clabe })
                                                }}
                                            >
                                                Guardar esta información bancaria
                                            </Button>
                                        </Grid> : null}
                                        {props?.tipoSolicitud?.requiere_fechaPago === 1 ? <Grid item xs={12} md={4} style={{ paddingLeft: 30 }} >
                                            <InputField
                                                required
                                                value={fecha_pago || ''}
                                                name="fecha_pago"
                                                onInput={(e: any) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    formik.setFieldValue("fecha_pago", target?.value || '');
                                                    setFecha_pago(target?.value);
                                                }}
                                                label={intl.formatMessage({ id: 'input_fecha_pago' })}
                                                placeholder={intl.formatMessage({ id: 'input_fecha_pago_descripcion' })}
                                                type="date"
                                                id="fecha_pago"
                                                formik={formik?.getFieldMeta('fecha_pago')}
                                            />
                                        </Grid> : null}


                                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }} >
                                            {rutaBanco ? <Link
                                                target="_blank"
                                                style={{ fontSize: 14 }}
                                                href={`${env.API_URL_DOCUMENTOS}/${env.API_URL_DOCUMENTOS === 'https://dirac.api.arjion.com/' ? `${(rutaBanco || "").replaceAll('storage/app/', '')} ` : rutaBanco || ""}`}
                                            >
                                                <PreviewIcon color='primary' /> Ver documento bancario
                                            </Link> : null}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                            <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
                                {/* Título en el borde superior */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 16,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        fontWeight: "bold",
                                        background: '#ffff'
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="medium">
                                        Descripción de la solicitud <DescriptionIcon color='error' />
                                    </Typography>
                                </Box>
                                {/* Contenido del formulario */}
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
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
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "15", paddingBottom: "0", textAlign: 'right', marginTop: 15 }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid || (muestraOtroProyecto && proyecto_sr === '') || (muestraOtroBeneficiario && proveedor === '')}
                                onClick={(e) => {
                                    props?.enAction({
                                        importePesos,
                                        importe,
                                        quincenas_numero: numero_quincenas,
                                        quincenas_valor: valor_quincenas,
                                        id_moneda,
                                        id_proyecto,
                                        id_beneficiario,
                                        descripcion,
                                        id_forma_pago,
                                        banco,
                                        cuenta,
                                        clabe,
                                        fecha_pago,
                                        proyecto_sr,
                                        id_empresa,
                                        proveedor,
                                        bancoId
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

export default SolicitudPrestamo
